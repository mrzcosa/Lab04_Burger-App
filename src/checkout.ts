export type CheckoutItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  variation?: 'regular' | 'with-fries' | 'combo'
}

export type OrderSummary = {
  queueNumber: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
    lineTotal: number
  }>
  totalAmount: number
  paymentMethod: 'cash'
  paymentStatus: 'Pending Payment' | 'Paid'
  orderStatus: string
  createdAt: string
}

function isOrderSummary(value: unknown): value is OrderSummary {
  return typeof value === 'object' && value !== null &&
    'queueNumber' in value && typeof value.queueNumber === 'string' &&
    'items' in value && Array.isArray(value.items) &&
    value.items.every((item: unknown) =>
      typeof item === 'object' && item !== null &&
      'name' in item && typeof item.name === 'string' &&
      'quantity' in item && typeof item.quantity === 'number' &&
      'unitPrice' in item && typeof item.unitPrice === 'number' &&
      'lineTotal' in item && typeof item.lineTotal === 'number') &&
    'totalAmount' in value && typeof value.totalAmount === 'number' &&
    'paymentMethod' in value && value.paymentMethod === 'cash' &&
    'paymentStatus' in value && (value.paymentStatus === 'Pending Payment' || value.paymentStatus === 'Paid') &&
    'orderStatus' in value && typeof value.orderStatus === 'string' &&
    'createdAt' in value && typeof value.createdAt === 'string'
}

async function readResponse(response: Response): Promise<OrderSummary> {
  const body: unknown = await response.json()
  if (!response.ok) {
    const message =
      typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string'
        ? body.message
        : 'The order could not be completed. Please try again.'
    throw new Error(message)
  }
  if (!isOrderSummary(body)) throw new Error('The order service returned an invalid confirmation.')
  return body
}

export async function createCashOrder(items: CheckoutItem[], idempotencyKey: string): Promise<OrderSummary> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'idempotency-key': idempotencyKey,
    },
    body: JSON.stringify({
      paymentMethod: 'cash',
      items: items.map((item) => ({
        productId: item.variation ? Math.floor(item.id / 10) : item.id,
        variation: item.variation ?? 'regular',
        quantity: item.quantity,
        unitPriceCents: Math.round(item.price * 100),
      })),
    }),
  })
  return readResponse(response)
}

export async function getOrder(queueNumber: string): Promise<OrderSummary> {
  const response = await fetch(`/api/orders/${encodeURIComponent(queueNumber)}`)
  return readResponse(response)
}
