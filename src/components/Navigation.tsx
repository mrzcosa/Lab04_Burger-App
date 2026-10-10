import './Navigation.css'
import { useEffect, useRef, useState } from 'react'
import MenuMegaDropDown from './MenuMegaDropDown'

type NavigationProps = {
  path: string
  menuOpen: boolean
  itemCount: number
  logo: string
  onNavigate: (path: string) => void
  onToggleMenu: () => void
}

const navItems = [['ABOUT', '/about'], ['MENU', '/menu'], ['SHOP', '/shop'], ['CONTACT', '/contact']]

function BagIcon() {
  return <span className="bag-icon" aria-hidden="true"><span /></span>
}

function Navigation({ path, menuOpen, itemCount, logo, onNavigate, onToggleMenu }: NavigationProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const menuAreaRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isMobile = () => window.matchMedia('(max-width: 800px)').matches
  const keepMegaMenuOpen = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }
  const scheduleMegaMenuClose = () => {
    if (isMobile()) return
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => setMegaMenuOpen(false), 220)
  }

  useEffect(() => {
    if (!megaMenuOpen) return () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current) }
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuAreaRef.current?.contains(event.target)) setMegaMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMegaMenuOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [megaMenuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => onNavigate('/#hero-banner')} aria-label="Tasty Burger home"><img src={logo} alt="Tasty Burger" /></button>
        <button className="menu-toggle" onClick={onToggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}><span /><span /><span /></button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{navItems.map(([label, url]) => label === 'MENU' ? <div className="menu-nav-item" key={url} ref={menuAreaRef} onMouseEnter={() => { keepMegaMenuOpen(); if (!isMobile()) setMegaMenuOpen(true) }} onMouseLeave={scheduleMegaMenuClose} onFocus={() => { if (!isMobile()) setMegaMenuOpen(true) }}>
          <button className={path === url || megaMenuOpen ? 'active' : ''} aria-expanded={megaMenuOpen} aria-haspopup="true" onClick={() => { if (isMobile()) setMegaMenuOpen((open) => !open); else onNavigate(url) }}>{label}</button>
          <MenuMegaDropDown isOpen={megaMenuOpen} onPointerEnter={keepMegaMenuOpen} onPointerLeave={scheduleMegaMenuClose} onNavigate={(nextPath) => { keepMegaMenuOpen(); onNavigate(nextPath); setMegaMenuOpen(false) }} />
        </div> : <button key={url} className={path === url ? 'active' : ''} onClick={() => onNavigate(url)}>{label}</button>)}</nav>
        <button className="cart-button" onClick={() => onNavigate('/cart')} aria-label={`Shopping cart with ${itemCount} items`}><BagIcon /><b>{itemCount}</b></button>
      </div>
    </header>
  )
}

export default Navigation