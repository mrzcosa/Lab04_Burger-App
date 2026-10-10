import { createHash, timingSafeEqual } from 'node:crypto'
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
const catalogPath = path.join(serverDirectory, 'catalog.json')
const distDirectory = path.resolve(serverDirectory, '..', 'dist')
const maximumBodyBytes = 32 * 1024
const variationIds = new Set(['regular', 'with-fries', 'combo'])

class RequestError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  response.end(JSON.stringify(body))
}

async function readJsonBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > maximumBodyBytes) throw new RequestError(413, 'The order request is too large.')
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new RequestError(400, 'The order request must contain valid JSON.')
  }
}

function normalizeItems(items, catalogById) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    throw new RequestError(400, 'Add at least one item before placing your order.')
  }
  const normalized = []
  for (const item of items) {
    if (
      !item ||
      !Number.isSafeInteger(item.productId) ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 50 ||
      !Number.isSafeInteger(item.unitPriceCents) ||
      item.unitPriceCents < 0 ||
      !variationIds.has(item.variation)
    ) {
      throw new RequestError(400, 'One or more order items are invalid.')
    }
    const product = catalogById.get(item.productId)
    const variation = product?.variations.find((entry) => entry.id === item.variation)
    if (!product || !variation) {
      throw new RequestError(400, 'One or more selected menu items are no longer available.')
    }
    if (item.unitPriceCents !== variation.priceCents) {
      throw new RequestError(409, 'Menu prices have changed. Return to your cart and review the updated total.')
    }
    normalized.push({
      productId: product.id,
      productName: product.name,
      variationId: variation.id,
      variationName: variation.name,
      quantity: item.quantity,
      unitPriceCents: variation.priceCents,
    })
  }
  return normalized
}

function createOrderStore(databasePath, catalogPathname = catalogPath) {
  const catalogData = JSON.parse(readFileSync(catalogPathname, 'utf8'))
  if (!Array.isArray(catalogData.products)) throw new Error('The server price catalog is invalid.')
  const catalogById = new Map(catalogData.products.map((product) => [product.id, product]))
  if (catalogById.size !== catalogData.products.length) throw new Error('The server price catalog has duplicate product IDs.')

  if (databasePath !== ':memory:') mkdirSync(path.dirname(databasePath), { recursive: true })
  const database = new DatabaseSync(databasePath)
  database.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      queue_number TEXT NOT NULL UNIQUE,
      idempotency_key TEXT NOT NULL UNIQUE,
      request_hash TEXT NOT NULL,
      total_cents INTEGER NOT NULL,
      payment_method TEXT NOT NULL CHECK (payment_method = 'cash'),
      payment_status TEXT NOT NULL,
      order_status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL,
      variation_id TEXT NOT NULL,
      item_name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0)
    );
    CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
  `)

  const getOrderStatement = database.prepare(`
    SELECT id, queue_number, total_cents, payment_method, payment_status, order_status, created_at
    FROM orders WHERE queue_number = ?
  `)
  const getItemsStatement = database.prepare(`
    SELECT item_name, quantity, unit_price_cents
    FROM order_items WHERE order_id = ? ORDER BY id
  `)

  function getOrder(queueNumber) {
    const order = getOrderStatement.get(queueNumber)
    if (!order) return null
    const items = getItemsStatement.all(order.id).map((item) => ({
      name: item.item_name,
      quantity: item.quantity,
      unitPrice: item.unit_price_cents / 100,
      lineTotal: (item.unit_price_cents * item.quantity) / 100,
    }))
    return {
      queueNumber: order.queue_number,
      items,
      totalAmount: order.total_cents / 100,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      orderStatus: order.order_status,
      createdAt: order.created_at,
    }
  }

  function createCashOrder(idempotencyKey, submittedItems) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) {
      throw new RequestError(400, 'A valid idempotency key is required to place an order.')
    }
    const items = normalizeItems(submittedItems, catalogById)
    const requestHash = createHash('sha256').update(JSON.stringify(items)).digest('hex')

    database.exec('BEGIN IMMEDIATE')
    try {
      const existing = database.prepare(`
        SELECT queue_number, request_hash FROM orders WHERE idempotency_key = ?
      `).get(idempotencyKey)
      if (existing) {
        if (existing.request_hash !== requestHash) {
          throw new RequestError(409, 'This order request was already used for different items.')
        }
        database.exec('COMMIT')
        return { order: getOrder(existing.queue_number), created: false }
      }

      const totalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0)
      if (!Number.isSafeInteger(totalCents) || totalCents <= 0) {
        throw new RequestError(400, 'The order total is invalid.')
      }

      const insert = database.prepare(`
        INSERT INTO orders (
          queue_number, idempotency_key, request_hash, total_cents,
          payment_method, payment_status, order_status
        ) VALUES ('pending', ?, ?, ?, 'cash', 'Pending Payment', 'Awaiting Payment')
      `).run(idempotencyKey, requestHash, totalCents)
      const orderId = Number(insert.lastInsertRowid)
      const queueNumber = `A${String(orderId).padStart(3, '0')}`
      database.prepare('UPDATE orders SET queue_number = ? WHERE id = ?').run(queueNumber, orderId)
      const insertItem = database.prepare(`
        INSERT INTO order_items (order_id, product_id, variation_id, item_name, quantity, unit_price_cents)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const item of items) {
        insertItem.run(
          orderId,
          item.productId,
          item.variationId,
          `${item.productName} - ${item.variationName}`,
          item.quantity,
          item.unitPriceCents,
        )
      }
      database.exec('COMMIT')
      return { order: getOrder(queueNumber), created: true }
    } catch (error) {
      try {
        database.exec('ROLLBACK')
      } catch (rollbackError) {
        console.error('Failed to roll back order creation:', rollbackError)
      }
      throw error
    }
  }

  function confirmCashPayment(queueNumber) {
    database.exec('BEGIN IMMEDIATE')
    try {
      const existing = getOrderStatement.get(queueNumber)
      if (!existing) throw new RequestError(404, 'Order not found.')
      if (existing.payment_status === 'Pending Payment') {
        database.prepare(`
          UPDATE orders SET payment_status = 'Paid', order_status = 'Preparing'
          WHERE queue_number = ? AND payment_status = 'Pending Payment'
        `).run(queueNumber)
      }
      database.exec('COMMIT')
      return getOrder(queueNumber)
    } catch (error) {
      try {
        database.exec('ROLLBACK')
      } catch (rollbackError) {
        console.error('Failed to roll back cash payment confirmation:', rollbackError)
      }
      throw error
    }
  }

  return { createCashOrder, getOrder, confirmCashPayment, close: () => database.close() }
}

function serveStaticFile(request, response, pathname) {
  const requestedPath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname)
  const filename = path.resolve(distDirectory, `.${requestedPath}`)
  if (!filename.startsWith(`${distDirectory}${path.sep}`) || !existsSync(filename) || !statSync(filename).isFile()) {
    return false
  }
  const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  }
  response.writeHead(200, {
    'content-type': contentTypes[path.extname(filename)] ?? 'application/octet-stream',
    'x-content-type-options': 'nosniff',
  })
  if (request.method === 'HEAD') response.end()
  else createReadStream(filename).pipe(response)
  return true
}

export function createOrderServer({
  databasePath = process.env.DATABASE_PATH ?? path.resolve(serverDirectory, '..', 'data', 'orders.sqlite'),
  catalogPathname = catalogPath,
  serveStatic = true,
  cashierApiKey = process.env.CASHIER_API_KEY ?? '',
} = {}) {
  const store = createOrderStore(databasePath, catalogPathname)
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', 'http://localhost')
      if (url.pathname === '/api/orders' && request.method === 'POST') {
        const body = await readJsonBody(request)
        if (!body || body.paymentMethod !== 'cash') {
          throw new RequestError(400, 'Only cash payment can be ordered online right now.')
        }
        const idempotencyKey = request.headers['idempotency-key']
        if (typeof idempotencyKey !== 'string') {
          throw new RequestError(400, 'A valid idempotency key is required to place an order.')
        }
        const result = store.createCashOrder(idempotencyKey, body.items)
        sendJson(response, result.created ? 201 : 200, result.order)
        return
      }
      const orderMatch = url.pathname.match(/^\/api\/orders\/(A\d{3,})$/)
      if (orderMatch && request.method === 'GET') {
        const order = store.getOrder(orderMatch[1])
        sendJson(response, order ? 200 : 404, order ?? { message: 'Order not found.' })
        return
      }
      const paymentConfirmationMatch = url.pathname.match(/^\/api\/orders\/(A\d{3,})\/payment\/confirm$/)
      if (paymentConfirmationMatch && request.method === 'POST') {
        if (cashierApiKey.length < 32) {
          throw new RequestError(503, 'Cashier payment confirmation is not configured.')
        }
        const authorization = request.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1]
        const receivedKey = Buffer.from(authorization ?? '')
        const expectedKey = Buffer.from(cashierApiKey)
        if (receivedKey.length !== expectedKey.length || !timingSafeEqual(receivedKey, expectedKey)) {
          throw new RequestError(401, 'Cashier authorization is required.')
        }
        sendJson(response, 200, store.confirmCashPayment(paymentConfirmationMatch[1]))
        return
      }
      if (url.pathname.startsWith('/api/')) {
        sendJson(response, 404, { message: 'API route not found.' })
        return
      }
      if (!['GET', 'HEAD'].includes(request.method ?? '')) {
        sendJson(response, 405, { message: 'Method not allowed.' })
        return
      }
      if (serveStatic && serveStaticFile(request, response, url.pathname)) return
      if (serveStatic && existsSync(path.join(distDirectory, 'index.html'))) {
        response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        if (request.method === 'HEAD') response.end()
        else createReadStream(path.join(distDirectory, 'index.html')).pipe(response)
        return
      }
      sendJson(response, 404, { message: 'Not found.' })
    } catch (error) {
      if (response.headersSent) {
        response.destroy(error instanceof Error ? error : undefined)
        return
      }
      if (error instanceof RequestError) {
        sendJson(response, error.status, { message: error.message })
        return
      }
      console.error('Order API request failed:', error)
      sendJson(response, 500, { message: 'Unable to process the request right now.' })
    }
  })
  server.once('close', store.close)
  return server
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4174)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port.')
  }
  const server = createOrderServer()
  server.listen(port, '0.0.0.0', () => {
    console.log(`Tasty Burger order server listening on port ${port}.`)
  })
}
