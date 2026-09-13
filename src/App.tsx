import { useEffect, useState } from 'react'
import burger1 from './assets/Burger 1.png'
import burger2 from './assets/Burger 2.png'
import burger3 from './assets/Burger 3.png'
import burger4 from './assets/Burger 4.png'
import burger1WithFries from './assets/Burger WFD/Burger 1/B1WF.png'
import burger1Combo from './assets/Burger WFD/Burger 1/B1WFD.png'
import logo from './assets/tastyburger logo.png'
import './App.css'

type Product = { id: number; name: string; description: string; price: number; rating: number; image: string }
type Burger1Variation = { id: 'regular' | 'with-fries' | 'combo'; name: string; description: string; image: string; price: number }
type CartItem = Product & { quantity: number; variation?: Burger1Variation['id']; baseProduct?: string }
const products: Product[] = [
  { id: 1, name: 'Crispy Chicken', description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw', price: 129, rating: 5, image: burger1 },
  { id: 2, name: 'Ultimate Bacon', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 149, rating: 4.5, image: burger2 },
  { id: 3, name: 'Black Sheep', description: 'American cheese, tomato relish, avocado, lettuce, red onion', price: 159, rating: 4, image: burger3 },
  { id: 4, name: 'Vegan Burger', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 179, rating: 4.5, image: burger4 },
]
const burger1Variations: Burger1Variation[] = [
  { id: 'regular', name: 'Regular Burger', description: 'Burger only', image: burger1, price: products[0].price },
  { id: 'with-fries', name: 'Burger + Fries', description: 'Burger with crispy fries', image: burger1WithFries, price: 159 },
  { id: 'combo', name: 'Combo Meal', description: 'Burger + fries + Coke', image: burger1Combo, price: 179 },
]
const readStorage = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }
function Rating({ value }: { value: number }) { return <span className="rating" aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= value ? 'star filled' : star - 0.5 === value ? 'star half' : 'star'}>★</span>)}</span> }
function BagIcon() { return <span className="bag-icon" aria-hidden="true"><span /></span> }

function BurgerAnimationLayer({ burgerName }: { burgerName: string }) {
  const getAnimationClass = (name: string) => {
    if (name === 'Crispy Chicken') return 'anim-crispy-chicken'
    if (name === 'Ultimate Bacon') return 'anim-ultimate-bacon'
    if (name === 'Black Sheep') return 'anim-black-sheep'
    if (name === 'Vegan Burger') return 'anim-vegan-burger'
    return ''
  }
  return (
    <>
      <div className={`steam-overlay ${getAnimationClass(burgerName)}`} aria-hidden="true">
        <span className="steam steam-1"></span>
        <span className="steam steam-2"></span>
        <span className="steam steam-3"></span>
      </div>
      <div className={`ingredient-overlay ${getAnimationClass(burgerName)}`}></div>
      <div className="ingredient-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </>
  )
}

function QuickViewModal({ product, isOpen, onClose, onAddToCart }: { product: Product | null; isOpen: boolean; onClose: () => void; onAddToCart: (product: Product) => void }) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => { const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; if (isOpen) { document.addEventListener('keydown', handleEscape); document.body.style.overflow = 'hidden' } else { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = '' } return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = '' } }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleAddToCart = () => { for (let i = 0; i < quantity; i++) { onAddToCart(product) } onClose(); setQuantity(1) }
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <div className="modal-info">
          <h2>{product.name}</h2>
          <Rating value={product.rating} />
          <p className="modal-description">{product.description}</p>
          <div className="modal-price">₱{product.price.toFixed(2)}</div>
          <div className="quantity-selector">
             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1} aria-label={`Decrease ${product.name} quantity`}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}

function Burger1VariationModal({ product, isOpen, onClose, onAddToCart }: { product: Product | null; isOpen: boolean; onClose: () => void; onAddToCart: (product: Product, variation: Burger1Variation, quantity: number) => void }) {
  const [selectedVariationId, setSelectedVariationId] = useState<Burger1Variation['id']>('regular')
  const [quantity, setQuantity] = useState(1)
  const selectedVariation = burger1Variations.find((variation) => variation.id === selectedVariationId) ?? burger1Variations[0]

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = '' }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) onClose() }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="variation-modal" role="dialog" aria-modal="true" aria-labelledby="variation-modal-title">
        <div className="variation-header"><img src={logo} alt="Tasty Burger" /><button className="modal-close" onClick={onClose} aria-label="Close modal">X</button><h2 id="variation-modal-title">Select Your Meal</h2></div>
        <div className="variation-main-image"><img src={selectedVariation.image} alt={`${product.name} - ${selectedVariation.name}`} /></div>
        <div className="variation-list">
          {burger1Variations.map((variation) => {
            const isSelected = variation.id === selectedVariationId
            return <button key={variation.id} className={isSelected ? 'variation-option selected' : 'variation-option'} onClick={() => setSelectedVariationId(variation.id)} aria-pressed={isSelected}>
              <span className="variation-copy"><strong>{variation.name}</strong><span>{variation.description}</span><b>₱{variation.price.toFixed(2)}</b></span>
              <img src={variation.image} alt="" /><span className="variation-select" aria-hidden="true">{isSelected ? '✓' : '+'}</span>
            </button>
          })}
        </div>
        <div className="variation-footer"><div className="quantity-selector"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div><button className="add-to-cart-button" onClick={() => { onAddToCart(product, selectedVariation, quantity); onClose() }}>ADD TO CART <span>₱{(selectedVariation.price * quantity).toFixed(2)}</span></button></div>
      </div>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('burger-cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => readStorage('burger-favorites', []))
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBurger1ModalOpen, setIsBurger1ModalOpen] = useState(false)
  useEffect(() => localStorage.setItem('burger-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('burger-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.product-image-container').forEach((wrapper) => {
      wrapper.classList.replace('product-image-container', 'burger-image-wrapper')
      wrapper.querySelector('img.product-image')?.classList.replace('product-image', 'burger-image')
    })
  })
  useEffect(() => { const onPopState = () => setPath(window.location.pathname); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  const navigate = (nextPath: string) => { window.history.pushState({}, '', nextPath); setPath(nextPath); setMenuOpen(false) }
  const addToCart = (product: Product, variation?: Burger1Variation, quantity = 1) => {
    if (product.id === 1 && !variation) { setIsBurger1ModalOpen(true); return }
    setCart((current) => {
    const variationIndex = variation ? burger1Variations.findIndex((item) => item.id === variation.id) + 1 : 0
    const cartProduct: CartItem = variation ? { ...product, id: product.id * 10 + variationIndex, name: `${product.name} - ${variation.name}`, price: variation.price, image: variation.image, variation: variation.id, baseProduct: product.name, quantity: 0 } : { ...product, quantity: 0 }
    const existing = current.find((item) => item.id === cartProduct.id && item.variation === cartProduct.variation)
    return existing ? current.map((item) => item.id === cartProduct.id && item.variation === cartProduct.variation ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...cartProduct, quantity }]
    })
  }
  const removeFromCart = (id: number, variation?: CartItem['variation']) => setCart((current) => current.filter((item) => !(item.id === id && item.variation === variation)))
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.cart-item').forEach((row, index) => {
      const item = cart[index]
      const minusButton = row.querySelector<HTMLButtonElement>('.quantity button:first-child')
      const quantity = item?.quantity ?? 0
      if (minusButton) minusButton.disabled = quantity === 0
      const quantityControls = row.querySelector<HTMLElement>('.quantity')
      if (quantityControls && item && !quantityControls.querySelector('.delete-cart-item')) {
        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-cart-item'
        deleteButton.type = 'button'
        deleteButton.textContent = 'Delete'
        deleteButton.setAttribute('aria-label', `Delete ${item.name}`)
        deleteButton.addEventListener('click', () => removeFromCart(item.id, item.variation))
        quantityControls.appendChild(deleteButton)
      }
    })
  }, [cart])
  const openQuickView = (product: Product) => { if (product.id === 1) { setIsBurger1ModalOpen(true); return }; setSelectedProduct(product); setIsModalOpen(true) }
  const closeQuickView = () => { setIsModalOpen(false); setSelectedProduct(null) }
  const changeQuantity = (id: number, variationOrAmount: CartItem['variation'] | number, requestedAmount?: number) => setCart((current) => {
    const variation = typeof variationOrAmount === 'number' ? undefined : variationOrAmount
    const amount = typeof variationOrAmount === 'number' ? variationOrAmount : (requestedAmount ?? 0)
    return current.map((item) => item.id === id && item.variation === variation ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item)
  })
  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const navItems = [['ABOUT', '/about'], ['MENU', '/menu'], ['SHOP', '/shop'], ['CONTACT', '/contact']]
  const isMenu = path === '/' || path === '/menu'

  return (
    <div className="app-shell"><header className="site-header"><div className="header-inner">
      <button className="logo-button" onClick={() => navigate('/')} aria-label="Tasty Burger home"><img src={logo} alt="Tasty Burger" /></button>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span /><span /><span /></button>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{navItems.map(([label, url]) => <button key={url} className={path === url ? 'active' : ''} onClick={() => navigate(url)}>{label}</button>)}</nav>
      <button className="cart-button" onClick={() => navigate('/cart')} aria-label={`Shopping cart with ${itemCount} items`}><BagIcon /><b>{itemCount}</b></button>
    </div></header>
    {isMenu ? <main className="menu-page"><section className="intro"><h1>OUR CRAZY BURGERS</h1><p>Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow your mind!</p></section><section className="product-grid" aria-label="Burger menu">{products.map((product) => <article className="product-card" key={product.id}><div className="product-image-container"><img className="product-image" src={product.image} alt={product.name} /><BurgerAnimationLayer burgerName={product.name} /><button className="quick-view-overlay" onClick={() => openQuickView(product)} aria-label={`Quick view ${product.name}`}>VIEW BURGER</button></div><div className="card-content"><div className="rating-row"><Rating value={product.rating} /><button className={favorites.includes(product.id) ? 'favorite selected' : 'favorite'} onClick={() => toggleFavorite(product.id)} aria-label={`${favorites.includes(product.id) ? 'Remove' : 'Add'} ${product.name} favorites`}>♡</button></div><h2>{product.name}</h2><p>{product.description}</p><button className="price-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>₱{product.price.toFixed(2)}</button></div></article>)}</section></main> : path === '/cart' ? <main className="content-page cart-page"><h1>YOUR CART</h1>{cart.length === 0 ? <p className="empty-state">Your cart is waiting for something delicious.</p> : <><div className="cart-list">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h2>{item.name}</h2><p>₱{item.price.toFixed(2)} each</p><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button></div></div><strong>₱{(item.price * item.quantity).toFixed(2)}</strong></div>)}</div><div className="cart-total"><span>SUBTOTAL</span><strong>₱{subtotal.toFixed(2)}</strong><button onClick={() => alert('Thanks for your order!')}>CHECKOUT</button></div></>}</main> : <main className="content-page"><h1>{path.slice(1).toUpperCase()}</h1><p>We're cooking up something delicious. Visit our menu to discover your next favorite burger.</p><button className="dark-button" onClick={() => navigate('/menu')}>VIEW OUR MENU</button></main>}
    <QuickViewModal product={selectedProduct} isOpen={isModalOpen} onClose={closeQuickView} onAddToCart={addToCart} />
    <Burger1VariationModal key={isBurger1ModalOpen ? 'burger-1-open' : 'burger-1-closed'} product={products[0]} isOpen={isBurger1ModalOpen} onClose={() => setIsBurger1ModalOpen(false)} onAddToCart={addToCart} />
    </div>
  )
}

export default App
