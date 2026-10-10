import { useEffect, useState } from 'react'
import './Banner.css'
import heroBanner1 from '../assets/Hero Banner/Hero banner 1.png'
import heroBanner2 from '../assets/Hero Banner/Hero banner 2.png'
import heroBanner3 from '../assets/Hero Banner/Hero banner 3.png'

const heroBanners = [heroBanner1, heroBanner2, heroBanner3]

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((slide) => slide + 1)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [])

  const resetToFirstSlide = () => {
    if (currentSlide !== heroBanners.length) return

    setIsTransitioning(false)
    setCurrentSlide(0)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsTransitioning(true))
    })
  }

  return (
    <>
      <section id="hero-banner" className="hero-banner" aria-label="Featured promotions" aria-roledescription="carousel">
        <div
          className={`hero-banner-track${isTransitioning ? '' : ' is-resetting'}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTransitionEnd={resetToFirstSlide}
        >
          {heroBanners.map((image, index) => (
            <img key={image} src={image} alt={`Tasty Burger promotion ${index + 1}`} />
          ))}
          <img src={heroBanners[0]} alt="" aria-hidden="true" />
        </div>
      </section>
      <section className="intro">
        <h1>OUR CRAZY BURGERS</h1>
        <p>Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun. Whether you like it cheesy, or extra meaty, we’ve got a burger that will blow your mind!</p>
      </section>
    </>
  )
}

export default Banner