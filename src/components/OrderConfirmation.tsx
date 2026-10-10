import { useEffect, useState } from 'react'
import type { OrderSummary } from '../checkout'
import { getOrder } from '../checkout'
import './Checkout.css'

type OrderConfirmationProps = {
  queueNumber: string
  onNavigate: (path: string) => void
}

const formatPrice = (amount: number) => `₱${amount.toFixed(2)}`

function OrderConfirmation({ queueNumber, onNavigate }: OrderConfirmationProps) {
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let active = true
    getOrder(queueNumber)
      .then((savedOrder) => { if (active) setOrder(savedOrder) })
      .catch((error: unknown) => {
        if (active) setErrorMessage(error instanceof Error ? error.message : 'Unable to load this order.')
      })
    return () => { active = false }
  }, [queueNumber])

  return (
    <main className="checkout-page confirmation-page">
      {errorMessage ? (
        <section className="checkout-card confirmation-card">
          <h1>We couldn’t load this order</h1>
          <p className="checkout-error" role="alert">{errorMessage}</p>
          <button className="checkout-primary-button" onClick={() => onNavigate('/menu')}>BACK TO MENU</button>
        </section>
      ) : !order ? (
        <section className="checkout-card confirmation-card" role="status">
          <span className="checkout-spinner confirmation-spinner" aria-hidden="true" />
          <p>Loading your order…</p>
        </section>
      ) : (
        <section className="checkout-card confirmation-card">
          <div className="confirmation-check" aria-hidden="true">✓</div>
          <p className="checkout-eyebrow">ORDER RECEIVED</p>
          <h1>Your order is in!</h1>
          <p className="confirmation-intro">Keep this number handy when you come to the counter.</p>
          <div className="queue-number-label">YOUR QUEUE NUMBER</div>
          <div className="queue-number">{order.queueNumber}</div>
          <div className="payment-status">
            <span>Payment status</span>
            <strong>{order.paymentStatus}</strong>
          </div>
          <div className="confirmation-messages">
            <p>Please pay at the counter. Show your order number when claiming your order.</p>
            <p>Your order will be prepared after payment. Wait for your number to be called.</p>
          </div>
          <div className="confirmation-order">
            <h2>Order summary</h2>
            <ul>
              {order.items.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>{item.quantity} × {item.name}</span>
                  <strong>{formatPrice(item.lineTotal)}</strong>
                </li>
              ))}
            </ul>
            <div className="confirmation-total"><span>Total</span><strong>{formatPrice(order.totalAmount)}</strong></div>
          </div>
          <button className="checkout-primary-button confirmation-menu-button" onClick={() => onNavigate('/menu')}>
            CONTINUE SHOPPING
          </button>
        </section>
      )}
    </main>
  )
}

export default OrderConfirmation
