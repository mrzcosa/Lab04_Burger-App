import './ContactPage.css'
import grabLogo from '../assets/Delivery Services/Grab.png'
import foodpandaLogo from '../assets/Delivery Services/FoodPanda.png'

type ContactPageProps = {
  onNavigate: (path: string) => void
}

const restaurantAddress = 'Cabid-An, Sorsogon City, Sorsogon'
const restaurantMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Sorsogon Diversion Rd, ${restaurantAddress}`)}`

function ContactSocialIcons() {
  return (
    <div className="contact-social-icons" role="img" aria-label="Facebook, Instagram, YouTube, X, and TikTok">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4z" /></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 3.5h9A4 4 0 0 1 20.5 7.5v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.6" cy="6.7" r="1.1" /></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.2a2.7 2.7 0 0 0-1.9-1.9C17.4 4.8 12 4.8 12 4.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 7.2a28 28 0 0 0-.5 4.8 28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8z" /><path d="m10 8.5 5.5 3.5-5.5 3.5z" /></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.9L18.9 3zm-1.1 16.2H19L8.1 4.7H6.8l11 14.5z" /></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3c.2 2.1 1.4 3.4 3.5 3.5v3.1a8 8 0 0 1-3.5-1v6.2a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3.2a2.8 2.8 0 1 0 1.5 2.5V3h3.1z" /></svg>
    </div>
  )
}

function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <main className="contact-page">
      <div className="contact-page-content">
        <button className="back-home-button" onClick={() => onNavigate('/')}>‹ <span>Back to Home</span></button>
        <h1>Contact Us</h1>

        <div className="contact-page-panel">
          <section className="contact-details-panel" aria-labelledby="contact-details-title">
            <h2 id="contact-details-title">Contact Details</h2>
            <p>For questions about your order, our menu, or restaurant services, please contact or visit your nearest Tasty Burger restaurant.</p>
            <button className="contact-details-link" onClick={() => onNavigate('/shop')}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" /><circle cx="12" cy="9" r="2.2" /></svg>
              Find a Tasty Burger restaurant
            </button>
            <p className="contact-privacy-note">Please have your order number ready when asking about an online order.</p>
          </section>

          <section className="contact-delivery-info" aria-labelledby="contact-delivery-title">
            <p id="contact-delivery-title">Delivery service availability may vary by restaurant. Check the services listed for your location:</p>
            <div className="contact-delivery-platforms" aria-label="Delivery services listed by the restaurant">
              <div className="contact-delivery-contact">
                <img className="contact-delivery-platform" src={grabLogo} alt="Grab" />
                <a href="https://help.grab.com/passenger/en-ph/" target="_blank" rel="noreferrer">https://help.grab.com/passenger/en-ph/</a>
              </div>
              <div className="contact-delivery-contact">
                <img className="contact-delivery-platform" src={foodpandaLogo} alt="foodpanda" />
                <a href="mailto:support@foodpanda.ph">support@foodpanda.ph</a>
              </div>
            </div>
            <p className="contact-delivery-note">Available services are shown in the restaurant directory. Delivery partner links are not configured on this website.</p>
          </section>

          <section className="contact-info-grid" aria-label="Tasty Burger information">
            <article className="contact-info-card">
              <h2>Menu &amp; Orders</h2>
              <p>Explore our burgers, meals, sides, drinks, and desserts.</p>
              <button onClick={() => onNavigate('/menu')}>View Menu</button>
            </article>
            <article className="contact-info-card">
              <h2>Store Directory</h2>
              <p>See our restaurant location and the services available there.</p>
              <button onClick={() => onNavigate('/shop')}>See Store List</button>
            </article>
            <article className="contact-info-card">
              <h2>Follow Us!</h2>
              <ContactSocialIcons />
              <p className="contact-social-note">Social profile links are not configured yet.</p>
            </article>
            <article className="contact-info-card">
              <h2>Restaurant Location</h2>
              <p>Sorsogon Diversion Rd<br />{restaurantAddress}</p>
              <a href={restaurantMapUrl} target="_blank" rel="noreferrer">View on Google Maps</a>
            </article>
          </section>
        </div>

        <button className="contact-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 10 5-5 5 5" /></svg>
          <span>Back to Top</span>
        </button>
      </div>
    </main>
  )
}

export default ContactPage
