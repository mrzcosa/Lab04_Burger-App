import { useState } from 'react'
import type { CheckoutItem, OrderSummary } from '../checkout'
import { createCashOrder } from '../checkout'
import './Checkout.css'

const idempotencyStorageKey = 'burger-order-request'

function createIdempotencyKey(): string {
  const randomBytes = new Uint8Array(16)
  const cryptoApi = globalThis.crypto
  if (typeof cryptoApi?.randomUUID === 'function') return cryptoApi.randomUUID()
  if (typeof cryptoApi?.getRandomValues === 'function') {
    cryptoApi.getRandomValues(randomBytes)
  } else {
    for (let index = 0; index < randomBytes.length; index += 1) {
      randomBytes[index] = Math.floor(Math.random() * 256)
    }
  }
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80
  const hex = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

type CheckoutProps = {
  path: string
  cart: CheckoutItem[]
  subtotal: number
  onNavigate: (path: string) => void
  onOrderCreated: (order: OrderSummary) => void
}

type PaymentMethod = 'cash' | 'online'

const formatPrice = (amount: number) => `₱${amount.toFixed(2)}`

function CheckoutProgress({ step }: { step: 'payment' | 'review' }) {
  return (
    <ol className="checkout-progress" aria-label="Checkout progress">
      <li className="complete"><span>1</span>Cart</li>
      <li className={step === 'payment' ? 'current' : 'complete'} aria-current={step === 'payment' ? 'step' : undefined}>
        <span>2</span>Payment
      </li>
      <li className={step === 'review' ? 'current' : ''} aria-current={step === 'review' ? 'step' : undefined}>
        <span>3</span>Review
      </li>
    </ol>
  )
}

function CashIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="5" y="11" width="38" height="27" rx="4" />
      <path d="M9 17c3 0 5-2 5-4m20 0c0 2 2 4 5 4M9 32c3 0 5 2 5 4m20 0c0-2 2-4 5-4" />
      <circle cx="24" cy="24.5" r="7" />
      <path d="M24 20v9m3-7c-1-2-5-2-6 0-1 2 0 3 3 3s4 1 3 3c-1 2-5 2-6 0" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="13" y="4" width="22" height="40" rx="4" />
      <path d="M20 9h8m-8 29h8" />
      <path d="M20 19h8m-8 5h8m-8 5h5" />
    </svg>
  )
}

function Checkout({ path, cart, subtotal, onNavigate, onOrderCreated }: CheckoutProps) {
  const isReview = path === '/checkout/review'
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [showOnlineNotice, setShowOnlineNotice] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const placeOrder = async () => {
    if (isSubmitting || cart.length === 0) return
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const signature = btoa(JSON.stringify(cart.map((item) => ({
        productId: item.variation ? Math.floor(item.id / 10) : item.id,
        variation: item.variation ?? 'regular',
        quantity: item.quantity,
      }))))
      const [savedSignature, savedKey] = sessionStorage.getItem(idempotencyStorageKey)?.split(':') ?? []
      const reusableKey = savedKey && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(savedKey)
        ? savedKey
        : null
      const idempotencyKey = savedSignature === signature && reusableKey ? reusableKey : createIdempotencyKey()
      if (savedSignature !== signature || !reusableKey) {
        sessionStorage.setItem(idempotencyStorageKey, `${signature}:${idempotencyKey}`)
      }
      const order = await createCashOrder(cart, idempotencyKey)
      onOrderCreated(order)
      sessionStorage.removeItem(idempotencyStorageKey)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'The order could not be completed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add something delicious before starting checkout.</p>
          <button className="checkout-primary-button" onClick={() => onNavigate('/menu')}>BACK TO MENU</button>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-content">
        <CheckoutProgress step={isReview ? 'review' : 'payment'} />
        <header className="checkout-heading">
          <p className="checkout-eyebrow">TASTY BURGER · PICK-UP</p>
          <h1>{isReview ? 'Review your order' : 'How would you like to pay?'}</h1>
          <p>{isReview ? 'Check your items and total before placing your order.' : 'Choose a payment method for your order.'}</p>
        </header>

        {!isReview ? (
          <>
            <fieldset className="payment-options" aria-label="Payment method">
              <label className={`payment-option${paymentMethod === 'cash' ? ' selected' : ''}`}>
                <input
                  type="radio"
                  name="payment-method"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => { setPaymentMethod('cash'); setShowOnlineNotice(false) }}
                />
                <span className="payment-icon cash-icon"><CashIcon /></span>
                <span className="payment-option-copy">
                  <strong>Cash</strong>
                  <span>Pay at the counter when you claim your order.</span>
                </span>
                <span className="payment-radio" aria-hidden="true" />
              </label>
              <label className={`payment-option${paymentMethod === 'online' ? ' selected' : ''}`}>
                <input
                  type="radio"
                  name="payment-method"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => { setPaymentMethod('online'); setShowOnlineNotice(false) }}
                />
                <span className="payment-icon online-icon"><PhoneIcon /></span>
                <span className="payment-option-copy">
                  <strong>Online Payment</strong>
                  <span>Pay securely using an available online payment method.</span>
                </span>
                <span className="payment-radio" aria-hidden="true" />
              </label>
            </fieldset>
            {paymentMethod === 'online' && (
              <p className="checkout-info" role="status">
                Online payment is not configured yet. No online payment methods are available right now. Choose Cash to place your order.
              </p>
            )}
            {showOnlineNotice && (
              <p className="checkout-error" role="alert">
                This order can’t continue with online payment because a payment provider hasn’t been configured.
              </p>
            )}
          </>
        ) : (
          <div className="checkout-review-layout">
            <section className="checkout-card review-items" aria-labelledby="review-items-title">
              <h2 id="review-items-title">Your items <span>{cart.reduce((count, item) => count + item.quantity, 0)}</span></h2>
              <ul>
                {cart.map((item) => (
                  <li className="review-item" key={`${item.id}-${item.variation}`}>
                    <img src={item.image} alt="" />
                    <span className="review-item-copy">
                      <strong>{item.name}</strong>
                      <small>Qty {item.quantity} · {formatPrice(item.price)} each</small>
                    </span>
                    <strong className="review-item-price">{formatPrice(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
            </section>
            <aside className="checkout-card order-total-card" aria-label="Order total">
              <h2>Order summary</h2>
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Discount</span><strong>{formatPrice(0)}</strong></div>
              <div className="order-grand-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
              <p><span aria-hidden="true">●</span> Pay with Cash at the counter</p>
            </aside>
          </div>
        )}

        {errorMessage && <p className="checkout-error" role="alert">{errorMessage}</p>}
        <div className="checkout-actions">
          <button
            className="back-home-button checkout-back-button"
            disabled={isSubmitting}
            onClick={() => onNavigate(isReview ? '/checkout' : '/cart')}
          >
            ‹ <span>{isReview ? 'Back to payment' : 'Back to cart'}</span>
          </button>
          {isReview ? (
            <button className="checkout-primary-button" disabled={isSubmitting} onClick={placeOrder}>
              {isSubmitting ? <><span className="checkout-spinner" aria-hidden="true" /> PLACING ORDER…</> : 'CONFIRM ORDER'}
            </button>
          ) : (
            <button
              className="checkout-primary-button"
              disabled={cart.length === 0}
              onClick={() => {
                if (paymentMethod === 'online') {
                  setShowOnlineNotice(true)
                  return
                }
                onNavigate('/checkout/review')
              }}
            >
              CONTINUE
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default Checkout
