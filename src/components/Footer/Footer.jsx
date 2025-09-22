import { Facebook, Twitter } from "lucide-react"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <div className="diamond-icon"></div>
              </div>
              <span className="logo-text">E-Comm</span>
            </div>
            <p className="brand-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever.Since the 1500s, when an unknown printer.
            </p>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <p className="footer-description">
              Since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <p>E-Comm, 4578</p>
              <p>Marmora Road,</p>
              <p>Glasgow D04 89GR</p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="links-column">
            <h4 className="links-title">Information</h4>
            <ul className="links-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Information</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="links-column">
            <h4 className="links-title">Service</h4>
            <ul className="links-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Information</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="links-column">
            <h4 className="links-title">My Account</h4>
            <ul className="links-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Information</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="links-column">
            <h4 className="links-title">Our Offers</h4>
            <ul className="links-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Information</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© 2018 Ecommerce theme by www.bisenbaev.com</p>
          </div>
          <div className="payment-methods">
            <img src="/placeholder.svg?height=30&width=50&text=BITCOIN" alt="Bitcoin" className="payment-icon" />
            <img src="/placeholder.svg?height=30&width=50&text=MASTERCARD" alt="Mastercard" className="payment-icon" />
            <img src="/placeholder.svg?height=30&width=50&text=PAYPAL" alt="PayPal" className="payment-icon" />
            <img src="/placeholder.svg?height=30&width=50&text=VISA" alt="Visa" className="payment-icon" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
