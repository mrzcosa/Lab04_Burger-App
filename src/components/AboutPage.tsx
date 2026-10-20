import './AboutPage.css'
import whopperImage from '../assets/MenuCategory/Whopper/Whopper.png'
import sharingImage from '../assets/Hero Banner/About hero banner.png'

type AboutPageProps = {
  onNavigate: (path: string) => void
}

const brandValues = [
  {
    title: 'Made with Care',
    description: 'Every order is made with attention to the little things that make a meal feel special.',
    icon: <><path d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  },
  {
    title: 'Big Flavor',
    description: 'From first bite to last, we bring together bold favorites and satisfying flavor.',
    icon: <><path d="M4 14h16l-1.5 6h-13L4 14z" /><path d="M7 11c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3m5 3c-1-1 1-2 0-3" /><path d="M3 14h18" /></>,
  },
  {
    title: 'Made to Share',
    description: 'Good food is even better together. Bring your people and make a moment of it.',
    icon: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0m.5-.5a4.5 4.5 0 0 1 6.5-3.9" /></>,
  },
]

function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <main className="about-page">
      <div className="about-content">
        <section className="about-hero" aria-labelledby="about-hero-title">
          <div className="about-hero-copy">
            <span className="about-eyebrow">Welcome to Tasty Burger</span>
            <h1 id="about-hero-title">GOOD FOOD.<br /><span>GREAT MOMENTS.</span></h1>
            <p>Big, satisfying burgers and feel-good favorites—made for the moments worth sharing.</p>
            <button className="about-primary-button" onClick={() => onNavigate('/menu')}>EXPLORE OUR MENU</button>
          </div>
          <div className="about-hero-image">
            <img src={whopperImage} alt="Tasty Burger flame-grilled burger with fresh lettuce and tomato" />
            <span className="about-image-stamp">Good food<br />good mood</span>
          </div>
        </section>
        <section className="about-story" aria-labelledby="about-story-title">
          <div className="about-story-image">
            <img src={whopperImage} alt="A freshly prepared Tasty Burger" loading="lazy" />
          </div>
          <div className="about-story-copy">
            <span className="about-eyebrow">A little about us</span>
            <h2 id="about-story-title">Our Story</h2>
            <p>At Tasty Burger, we believe a great burger can turn an ordinary day into something memorable. We bring together crave-worthy flavors, familiar favorites, and a welcoming place to enjoy them.</p>
            <p>Whether it is a quick bite, a meal with family, or time with friends, we are here to make every visit a little more delicious.</p>
          </div>
        </section>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-section-heading">
            <span className="about-eyebrow">The Tasty Burger difference</span>
            <h2 id="about-values-title">Good food brings us together.</h2>
          </div>
          <div className="about-value-grid">
            {brandValues.map((value) => (
              <article className="about-value-card" key={value.title}>
                <span className="about-value-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{value.icon}</svg>
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="about-sharing" aria-label="Friends enjoying a meal together">
        <img src={sharingImage} alt="Friends sharing Tasty Burger meals together" loading="lazy" />
        <div className="about-sharing-overlay">
          <span className="about-eyebrow">Better together</span>
          <h2>Bring your appetite.<br />Bring your people.</h2>
          <p>There is always room at the table for one more good moment.</p>
          <button className="about-primary-button" onClick={() => onNavigate('/menu')}>EXPLORE OUR MENU</button>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-inner">
          <span className="about-eyebrow">Your next delicious moment starts here</span>
          <h2>YOUR NEXT FAVORITE<br />BURGER AWAITS.</h2>
          <p>Find your new favorite or come enjoy it with us.</p>
          <div className="about-cta-actions">
            <button className="about-primary-button" onClick={() => onNavigate('/menu')}>EXPLORE OUR MENU</button>
            <button className="about-secondary-button" onClick={() => onNavigate('/shop')}>FIND A RESTAURANT</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
