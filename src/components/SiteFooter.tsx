import './SiteFooter.css'

type SiteFooterProps = {
  logo: string
  onNavigate: (path: string) => void
  onOrderNow: () => void
}

const quickLinks = [
  ['Home', '/'],
  ['Menu', '/menu'],
  ['Restaurants', '/shop'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

function SiteFooter({ logo, onNavigate, onOrderNow }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <section className="footer-brand" aria-labelledby="footer-follow-title">
          <button className="footer-logo" onClick={() => onNavigate('/')} aria-label="Tasty Burger home">
            <img src={logo} alt="Tasty Burger" />
          </button>
          <h2 id="footer-follow-title">Follow Us!</h2>
          <div className="footer-social-icons" role="img" aria-label="Facebook, Instagram, YouTube, X, and TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4z" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 3.5h9A4 4 0 0 1 20.5 7.5v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.6" cy="6.7" r="1.1" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 7.2a2.7 2.7 0 0 0-1.9-1.9C17.4 4.8 12 4.8 12 4.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 7.2a28 28 0 0 0-.5 4.8 28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8z" />
              <path d="m10 8.5 5.5 3.5-5.5 3.5z" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.9L18.9 3zm-1.1 16.2H19L8.1 4.7H6.8l11 14.5z" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 3c.2 2.1 1.4 3.4 3.5 3.5v3.1a8 8 0 0 1-3.5-1v6.2a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3.2a2.8 2.8 0 1 0 1.5 2.5V3h3.1z" />
            </svg>
          </div>
          <p>Fresh flavors, good times, and more from Tasty Burger.</p>
        </section>

        <nav className="footer-links" aria-label="Footer quick links">
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map(([label, path]) => (
              <li key={path}>
                <button onClick={() => onNavigate(path)}>{label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="footer-order" aria-labelledby="footer-order-title">
          <h2 id="footer-order-title">Order Online</h2>
          <button className="footer-order-button" onClick={onOrderNow}>Order Now</button>
          <h3 className="footer-app-title">Download Tasty Burger App</h3>
          <div className="footer-app-badges" aria-label="Tasty Burger app coming soon to Google Play and the App Store">
            <div className="footer-app-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#34a853" d="M2.7 2.9a2 2 0 0 0-.4 1.2v15.8a2 2 0 0 0 .4 1.2l8.7-9.1z" />
                <path fill="#4285f4" d="m11.4 12 3.1 3.2 4-2.3a1 1 0 0 0 0-1.8l-4-2.3z" />
                <path fill="#fbbc04" d="m2.7 21.1 11.8-6.8-3.1-3.2z" />
                <path fill="#ea4335" d="m2.7 2.9 8.7 9.1 3.1-3.2z" />
              </svg>
              <span><small>COMING SOON</small><strong>Google Play</strong></span>
            </div>
            <div className="footer-app-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.5 12.8c0-2.1 1.7-3.1 1.8-3.2a3.9 3.9 0 0 0-3.1-1.7c-1.3-.1-2.5.8-3.2.8s-1.7-.8-2.8-.8a4.2 4.2 0 0 0-3.5 2.1c-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.7.7 2.8.7 1.8-1 2.5-2.1a9.5 9.5 0 0 0 1.1-2.3 3.6 3.6 0 0 1-1.9-3.4zM14.4 6.5a3.8 3.8 0 0 0 .9-2.7 3.9 3.9 0 0 0-2.5 1.3 3.6 3.6 0 0 0-.9 2.6 3.3 3.3 0 0 0 2.5-1.2z" />
              </svg>
              <span><small>COMING SOON</small><strong>App Store</strong></span>
            </div>
          </div>
        </section>
      </div>
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} Tasty Burger Corporation. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default SiteFooter
