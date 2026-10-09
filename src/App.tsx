import { useEffect, useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Navigation from './components/Navigation'
import { AllDayBreakfastSection, BurgerVariationModal, ChickenRiceMealsSection, DessertsSection, DrinksSection, FlameGrilledSection, FourCheeseWhopperSection, GroupMeals, PlantBasedWhopperSection, Product, TBCafeSection, TBChickenBurgerSection, TBSaversBundles, TBSpecialSection, UltimateSideKicksSection, WhopperSection, XtraLongChickenSection } from './components/Product'
import { getProductVariations } from './components/productData'
import type { BurgerVariation, Product as ProductData } from './components/productData'
import logo from './assets/tastyburger logo.png'

type CartItem = ProductData & { quantity: number; variation?: 'regular' | 'with-fries' | 'combo'; baseProduct?: string }
const readStorage = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('burger-cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => readStorage('burger-favorites', []))
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false)
  useEffect(() => localStorage.setItem('burger-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('burger-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => { const onPopState = () => setPath(window.location.pathname); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  const navigate = (nextPath: string) => { window.history.pushState({}, '', nextPath); setPath(nextPath); setMenuOpen(false) }
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
  return <div className="app-shell">
    <Navigation path={path} menuOpen={menuOpen} itemCount={itemCount} logo={logo} onNavigate={navigate} onToggleMenu={() => setMenuOpen((open) => !open)} />
    {isMenu ? <main className="menu-page"><Banner /><Product favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><GroupMeals favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><TBSaversBundles favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><WhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><FourCheeseWhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><XtraLongChickenSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><AllDayBreakfastSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><PlantBasedWhopperSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><TBChickenBurgerSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><FlameGrilledSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><TBSpecialSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><ChickenRiceMealsSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><UltimateSideKicksSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><TBCafeSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><DrinksSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /><DessertsSection favoriteIds={favorites} onQuickView={openProduct} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} /></main> : path === '/cart' ? <main className="content-page cart-page"><h1>YOUR CART</h1>{cart.length === 0 ? <p className="empty-state">Your cart is waiting for something delicious.</p> : <><div className="cart-list">{cart.map((item) => <div className="cart-item" key={`${item.id}-${item.variation}`}><img src={item.image} alt="" /><div><h2>{item.name}</h2><p>₱{item.price.toFixed(2)} each</p><div className="quantity"><button onClick={() => changeQuantity(item.id, item.variation, -1)} disabled={item.quantity <= 1}>-</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, item.variation, 1)}>+</button></div></div><div className="cart-item-total"><strong>₱{(item.price * item.quantity).toFixed(2)}</strong><button className="delete-cart-item" onClick={() => removeFromCart(item.id, item.variation)} aria-label={`Remove ${item.name} from cart`} title={`Remove ${item.name}`}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h2v9H7V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9z" fill="currentColor" /></svg></button></div></div>)}</div><div className="cart-total"><span>SUBTOTAL</span><strong>₱{subtotal.toFixed(2)}</strong><button onClick={() => alert('Thanks for your order!')}>CHECKOUT</button></div></>}</main> : <main className="content-page"><h1>{path.slice(1).toUpperCase()}</h1><p>We're cooking up something delicious. Visit our menu to discover your next favorite burger.</p><button className="dark-button" onClick={() => navigate('/menu')}>VIEW OUR MENU</button></main>}
    <BurgerVariationModal key={`${selectedProduct?.id ?? 'none'}-${isVariationModalOpen}`} product={selectedProduct} isOpen={isVariationModalOpen} onClose={() => { setIsVariationModalOpen(false); setSelectedProduct(null) }} onAddToCart={addToCart} />
  </div>
}

export default App
