import { useEffect, useState } from 'react'
import './App.css'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import SiteFooter from './components/SiteFooter'
import ContactPage from './components/ContactPage'
import Banner from './components/Banner'
import Navigation from './components/Navigation'
import { AllDayBreakfastSection, BurgerVariationModal, ChickenRiceMealsSection, DessertsSection, DrinksSection, FlameGrilledSection, FourCheeseWhopperSection, GroupMeals, PlantBasedWhopperSection, Product, TBCafeSection, TBChickenBurgerSection, TBSaversBundles, TBSpecialSection, UltimateSideKicksSection, WhopperSection, XtraLongChickenSection } from './components/Product'
import { getProductVariations } from './components/productData'
import type { BurgerVariation, Product as ProductData } from './components/productData'
import type { OrderSummary } from './checkout'
import logo from './assets/tastyburger logo.png'
import storeImage from './assets/Shop/Tasty Burger Official store.png'
import grabLogo from './assets/Delivery Services/Grab.png'
import foodpandaLogo from './assets/Delivery Services/FoodPanda.png'

type CartItem = ProductData & { quantity: number; variation?: 'regular' | 'with-fries' | 'combo'; baseProduct?: string }
const readStorage = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }

function RestaurantBranchFeature() {
  const address = 'Cabid-An, Sorsogon City, Sorsogon'
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const [searchTerm, setSearchTerm] = useState('')
  const [region, setRegion] = useState('')
  const [province, setProvince] = useState('')
  const matchesSearch = `sorsogon diversion rd ${address} bicol region`.toLowerCase().includes(searchTerm.trim().toLowerCase())
  const matchesRegion = !region || region === 'Bicol Region'
  const matchesProvince = !province || province === 'Sorsogon'
  const showBranch = matchesSearch && matchesRegion && matchesProvince

  return <>
    <form className="restaurant-locator" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="locator-search">
        <span className="visually-hidden">Search restaurant locations</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="7.2" /><path d="m16 16 5 5" /></svg>
        <input type="search" placeholder="Enter Street, Barangay, or City" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </label>
      <span className="locator-filter-label">Filter By</span>
      <label className="visually-hidden" htmlFor="restaurant-region">Region</label>
      <select id="restaurant-region" value={region} onChange={(event) => { setRegion(event.target.value); setProvince('') }}>
        <option value="">All Regions</option>
        <option value="South Luzon">South Luzon</option>
        <option value="Bicol Region">Bicol Region</option>
      </select>
      <label className="visually-hidden" htmlFor="restaurant-province">Province</label>
      <select id="restaurant-province" value={province} onChange={(event) => setProvince(event.target.value)}>
        <option value="">All Provinces</option>
        {(!region || region === 'South Luzon') && <option value="Quezon">Quezon</option>}
        {(!region || region === 'Bicol Region') && <option value="Sorsogon">Sorsogon</option>}
      </select>
      <button className="locator-clear" type="button" onClick={() => { setSearchTerm(''); setRegion(''); setProvince('') }}>Clear</button>
    </form>
    {showBranch ? <section className="restaurant-branch" aria-labelledby="sorsogon-branch-title">
    <div className="restaurant-branch-summary">
      <h2 id="sorsogon-branch-title">Sorsogon Diversion Rd</h2>
      <p><span aria-hidden="true">●</span>{address}</p>
      <p><span aria-hidden="true">◷</span>10:00AM - 09:00PM</p>
      <p><span aria-hidden="true">⌕</span><a href="tel:639123456789">639123456789</a></p>
    </div>
    <div className="restaurant-branch-details">
      <h3>Sorsogon Diversion Rd</h3>
      <strong>{address.toUpperCase()}</strong>
      <a className="maps-link" href={mapsUrl} target="_blank" rel="noreferrer">◎ <span>Show in Google Maps</span></a>
      <p>Mobile: <a href="tel:639123456789">639123456789</a><br />Landline: <a href="tel:0569110143">(056) 911-0143</a></p>
      <p><strong>Business Hours</strong><br />10:00AM - 09:00PM</p>
      <p><strong>Delivery Hours</strong><br />10:00AM - 09:00PM</p>
      <div className="branch-services"><strong>Services</strong><span>Pick Up</span><span>Delivery</span><span>Dine-in</span></div>
      <div className="delivery-platforms" aria-label="Available delivery platforms"><img src={grabLogo} alt="Grab" /><img src={foodpandaLogo} alt="foodpanda" /></div>
    </div>
  </section> : <p className="locator-empty-state">No restaurant locations match your search.</p>}
  </>
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [showIntro, setShowIntro] = useState(true)
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('burger-cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => readStorage('burger-favorites', []))
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState({ hash: window.location.hash })
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setShowIntro(false), prefersReducedMotion ? 500 : 1400)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => localStorage.setItem('burger-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('burger-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname)
      setNavigationTarget({ hash: window.location.hash })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => {
    if (!navigationTarget.hash) return
    const section = document.getElementById(navigationTarget.hash.slice(1))
    section?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [navigationTarget])
  const navigate = (nextPath: string) => {
    const target = new URL(nextPath, window.location.origin)
    window.history.pushState({}, '', target)
    setPath(target.pathname)
    setNavigationTarget({ hash: target.hash })
    setMenuOpen(false)
    setMegaMenuOpen(false)
    if (target.pathname.startsWith('/checkout') || target.pathname.startsWith('/orders/')) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }
  const openProduct = (product: ProductData) => { setSelectedProduct(product); setIsVariationModalOpen(true) }
  const addToCart = (product: ProductData, variation?: BurgerVariation, quantity = 1) => {
    if (!variation) { openProduct(product); return }
    const variationIndex = getProductVariations(product).findIndex((item) => item.id === variation.id) + 1
    const cartProduct: CartItem = { ...product, id: product.id * 10 + variationIndex, name: `${product.name} - ${variation.name}`, price: variation.price, image: variation.image, variation: variation.id, baseProduct: product.name, quantity }
    setCart((current) => { const existing = current.find((item) => item.id === cartProduct.id && item.variation === cartProduct.variation); return existing ? current.map((item) => item.id === cartProduct.id && item.variation === cartProduct.variation ? { ...item, quantity: item.quantity + quantity } : item) : [...current, cartProduct] })
  }
  const changeQuantity = (id: number, variation: CartItem['variation'], amount: number) => setCart((current) => current.flatMap((item) => { if (item.id !== id || item.variation !== variation) return [item]; const quantity = item.quantity + amount; return quantity <= 0 ? [] : [{ ...item, quantity }] }))
  const removeFromCart = (id: number, variation: CartItem['variation']) => setCart((current) => current.filter((item) => item.id !== id || item.variation !== variation))
  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const isMenu = path === '/' || path === '/menu'
  const orderQueueNumber = path.match(/^\/orders\/(A\d{3,})$/)?.[1]
  return <div className="app-shell">
    <Navigation path={path} menuOpen={menuOpen} megaMenuOpen={megaMenuOpen} itemCount={itemCount} logo={logo} onNavigate={navigate} onToggleMenu={() => setMenuOpen((open) => !open)} onMegaMenuOpenChange={setMegaMenuOpen} />
    {isMenu ? <main className="menu-page">
      <Banner />
      <Product favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <GroupMeals favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <TBSaversBundles favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <WhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <FourCheeseWhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <XtraLongChickenSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <AllDayBreakfastSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <PlantBasedWhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <TBChickenBurgerSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <FlameGrilledSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <TBSpecialSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <ChickenRiceMealsSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <UltimateSideKicksSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <TBCafeSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <DrinksSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <DessertsSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
      <button className="back-home-button home-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 10 5-5 5 5" /></svg>
        <span>Back to Top</span>
      </button>
    </main> : path === '/cart' ? <main className="content-page cart-page">
      <h1>YOUR CART</h1>
      {cart.length === 0 ? <p className="empty-state">Your cart is waiting for something delicious.</p> : <>
        <div className="cart-list">{cart.map((item) => <div className="cart-item" key={`${item.id}-${item.variation}`}>
          <img className="cart-item-image" src={item.image} alt="" />
          <div className="cart-item-details"><h2>{item.name}</h2><p>₱{item.price.toFixed(2)} each</p><div className="quantity">
            <button onClick={() => changeQuantity(item.id, item.variation, -1)} disabled={item.quantity <= 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => changeQuantity(item.id, item.variation, 1)}>+</button>
          </div></div>
          <div className="cart-item-total"><strong>₱{(item.price * item.quantity).toFixed(2)}</strong>
            <button className="delete-cart-item" onClick={() => removeFromCart(item.id, item.variation)} aria-label={`Remove ${item.name} from cart`} title={`Remove ${item.name}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h2v9H7V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9z" fill="currentColor" /></svg>
            </button>
          </div>
        </div>)}</div>
        <div className="cart-total"><span>SUBTOTAL</span><strong>₱{subtotal.toFixed(2)}</strong>
          <button onClick={() => navigate('/checkout')}>CHECKOUT</button>
        </div>
      </>}
    </main> : path === '/checkout' || path === '/checkout/review' ? <Checkout
      path={path}
      cart={cart}
      subtotal={subtotal}
      onNavigate={navigate}
      onOrderCreated={(order: OrderSummary) => { setCart([]); navigate(`/orders/${order.queueNumber}`) }}
    /> : orderQueueNumber ? <OrderConfirmation queueNumber={orderQueueNumber} onNavigate={navigate} />
    : path === '/contact' ? <ContactPage onNavigate={navigate} />
    : path === '/shop' ? <main className="restaurants-page"><div className="restaurants-content">
      <button className="back-home-button" onClick={() => navigate('/')}>‹ <span>Back to Home</span></button>
      <h1>Restaurants</h1>
      <section className="restaurant-feature" aria-label="Tasty Burger restaurants">
        <img src={storeImage} alt="Tasty Burger restaurant storefront" />
        <div className="restaurant-copy">
          <h2>Our stores are open for dine-in, take-out, drive-thru, and delivery from Monday to Sunday, however operating hours may vary per location.</h2>
          <p>For more information, kindly contact our branches.</p>
        </div>
      </section>
      <RestaurantBranchFeature />
      <button className="shop-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 10 5-5 5 5" /></svg>
        <span>Back to Top</span>
      </button>
    </div></main> : <main className="content-page">
      <h1>{path.slice(1).toUpperCase()}</h1>
      <p>We're cooking up something delicious. Visit our menu to discover your next favorite burger.</p>
      <button className="dark-button" onClick={() => navigate('/menu')}>VIEW OUR MENU</button>
    </main>}
    {(isMenu || path === '/shop' || path === '/contact') && <SiteFooter logo={logo} onNavigate={navigate} onOrderNow={() => { navigate('/menu'); setMenuOpen(true); setMegaMenuOpen(true); window.scrollTo({ top: 0, behavior: 'instant' }) }} />}
    <BurgerVariationModal key={`${selectedProduct?.id ?? 'none'}-${isVariationModalOpen}`} product={selectedProduct} isOpen={isVariationModalOpen} onClose={() => { setIsVariationModalOpen(false); setSelectedProduct(null) }} onAddToCart={addToCart} />
    {showIntro && <div className="splash-intro" role="status" aria-label="Loading Tasty Burger">
      <img src={logo} alt="Tasty Burger" />
    </div>}
  </div>
}

export default App
