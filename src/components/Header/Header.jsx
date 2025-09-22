"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import "./Header.css"

const Header = ({ currentPage, onNavigate, cartItemCount, cartTotal, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (page, e) => {
    e.preventDefault()
    onNavigate(page)
    setIsMobileMenuOpen(false) // Close mobile menu on navigation
  }

  const isActive = (page) => {
    return currentPage === page
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleNavClick("home")}>
            <div className="logo-icon">
              <div className="diamond-icon"></div>
            </div>
            <span className="logo-text">E-Comm</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              <li>
                <a
                  href="#"
                  className={`nav-link ${isActive("home") ? "active" : ""}`}
                  onClick={(e) => handleNavClick("home", e)}
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${isActive("bag") ? "active" : ""}`}
                  onClick={(e) => handleNavClick("bag", e)}
                >
                  BAG
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${isActive("sneakers") ? "active" : ""}`}
                  onClick={(e) => handleNavClick("sneakers", e)}
                >
                  SNEAKERS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${isActive("belt") ? "active" : ""}`}
                  onClick={(e) => handleNavClick("belt", e)}
                >
                  BELT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${isActive("contact") ? "active" : ""}`}
                  onClick={(e) => handleNavClick("contact", e)}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="header-actions">
            <div className="cart" onClick={onCartClick}>
              <ShoppingCart size={20} />
              <span className="cart-text">Items</span>
              <span className="cart-price">${cartTotal.toFixed(2)}</span>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </div>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? "nav-mobile-open" : ""}`}>
          <ul className="nav-list-mobile">
            <li>
              <a
                href="#"
                className={`nav-link-mobile ${isActive("home") ? "active" : ""}`}
                onClick={(e) => handleNavClick("home", e)}
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link-mobile ${isActive("bag") ? "active" : ""}`}
                onClick={(e) => handleNavClick("bag", e)}
              >
                BAG
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link-mobile ${isActive("sneakers") ? "active" : ""}`}
                onClick={(e) => handleNavClick("sneakers", e)}
              >
                SNEAKERS
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link-mobile ${isActive("belt") ? "active" : ""}`}
                onClick={(e) => handleNavClick("belt", e)}
              >
                BELT
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link-mobile ${isActive("contact") ? "active" : ""}`}
                onClick={(e) => handleNavClick("contact", e)}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
