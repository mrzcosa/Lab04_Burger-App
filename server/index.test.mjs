import assert from 'node:assert/strict'
import { once } from 'node:events'
import { after, before, test } from 'node:test'
import { createOrderServer } from './index.mjs'

const cashierKey = 'test-cashier-key-at-least-32-bytes-long'
const server = createOrderServer({ databasePath: ':memory:', serveStatic: false, cashierApiKey: cashierKey })
let baseUrl

before(async () => {
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  server.close()
  await once(server, 'close')
})

async function placeOrder(items, key, paymentMethod = 'cash') {
  return fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'idempotency-key': key },
    body: JSON.stringify({ paymentMethod, items }),
  })
}

test('creates a server-priced cash order and makes retries idempotent', async () => {
  const key = '00000000-0000-4000-8000-000000000001'
  const items = [{ productId: 1, variation: 'regular', quantity: 2, unitPriceCents: 12900, price: 0, name: 'Changed in browser' }]
  const stalePriceResponse = await placeOrder(
    [{ productId: 1, variation: 'regular', quantity: 2, unitPriceCents: 1 }],
    key,
  )
  assert.equal(stalePriceResponse.status, 409)

  const firstResponse = await placeOrder(items, key)
  const firstOrder = await firstResponse.json()

  assert.equal(firstResponse.status, 201)
  assert.equal(firstOrder.queueNumber, 'A001')
  assert.equal(firstOrder.totalAmount, 258)
  assert.equal(firstOrder.items[0].unitPrice, 129)
  assert.equal(firstOrder.items[0].name, 'Crispy Chicken - Regular Burger')
  assert.equal(firstOrder.paymentStatus, 'Pending Payment')
  assert.equal(firstOrder.orderStatus, 'Awaiting Payment')

  const retryResponse = await placeOrder(items, key)
  const retriedOrder = await retryResponse.json()
  assert.equal(retryResponse.status, 200)
  assert.equal(retriedOrder.queueNumber, firstOrder.queueNumber)

  const conflictingRetry = await placeOrder(
    [{ productId: 1, variation: 'regular', quantity: 1, unitPriceCents: 12900 }],
    key,
  )
  assert.equal(conflictingRetry.status, 409)
})

test('assigns unique sequential queue numbers to distinct orders', async () => {
  const response = await placeOrder(
    [{ productId: 1, variation: 'with-fries', quantity: 1, unitPriceCents: 15900 }],
    '00000000-0000-4000-8000-000000000002',
  )
  const order = await response.json()
  assert.equal(response.status, 201)
  assert.equal(order.queueNumber, 'A002')
  assert.equal(order.totalAmount, 159)

  const lookup = await fetch(`${baseUrl}/api/orders/${order.queueNumber}`)
  assert.equal(lookup.status, 200)
  assert.deepEqual(await lookup.json(), order)
})

test('keeps cash unpaid until an authorized cashier confirms receipt', async () => {
  const orderResponse = await fetch(`${baseUrl}/api/orders/A001`)
  assert.equal((await orderResponse.json()).paymentStatus, 'Pending Payment')

  const unauthorized = await fetch(`${baseUrl}/api/orders/A001/payment/confirm`, { method: 'POST' })
  assert.equal(unauthorized.status, 401)

  const confirmed = await fetch(`${baseUrl}/api/orders/A001/payment/confirm`, {
    method: 'POST',
    headers: { authorization: `Bearer ${cashierKey}` },
  })
  const paidOrder = await confirmed.json()
  assert.equal(confirmed.status, 200)
  assert.equal(paidOrder.paymentStatus, 'Paid')
  assert.equal(paidOrder.orderStatus, 'Preparing')

  const retry = await fetch(`${baseUrl}/api/orders/A001/payment/confirm`, {
    method: 'POST',
    headers: { authorization: `Bearer ${cashierKey}` },
  })
  assert.equal((await retry.json()).paymentStatus, 'Paid')
})

test('rejects empty carts, unavailable payment methods, and invalid items', async () => {
  assert.equal((await placeOrder([], '00000000-0000-4000-8000-000000000003')).status, 400)
  assert.equal((await placeOrder(
    [{ productId: 1, variation: 'regular', quantity: 1, unitPriceCents: 12900 }],
    '00000000-0000-4000-8000-000000000004',
    'online',
  )).status, 400)
  assert.equal((await placeOrder(
    [{ productId: 99999, variation: 'regular', quantity: 1, unitPriceCents: 12900 }],
    '00000000-0000-4000-8000-000000000005',
  )).status, 400)
})
