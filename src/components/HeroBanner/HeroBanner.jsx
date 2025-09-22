"use client"

import "./HeroBanner.css"

const HeroBanner = ({ onShopNow }) => {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Adidas Men Running
              <br />
              Sneakers
            </h1>
            <p className="hero-subtitle">Performance and design. Taken right to the edge.</p>
            <button className="hero-cta" onClick={onShopNow}>
              SHOP NOW
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/blue-adidas-running-sneaker-with-orange-accents.jpg"
              alt="Adidas Men Running Sneakers"
              className="hero-product-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
