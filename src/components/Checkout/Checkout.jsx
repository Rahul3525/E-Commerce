"use client"

import { useState } from "react"
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Truck, Shield } from "lucide-react"
import "./Checkout.css"

const Checkout = ({ cart, onUpdateQuantity, onRemoveItem, onBackToShopping, total }) => {
  const [step, setStep] = useState(1) // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmation
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingCost = 15.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shippingCost + tax

  const handleShippingChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field, value) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStep(4)
    setIsProcessing(false)
  }

  const isShippingValid = () => {
    return (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode
    )
  }

  const isPaymentValid = () => {
    return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardholderName
  }

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to proceed with checkout.</p>
            <button className="continue-shopping-btn" onClick={onBackToShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <button className="back-button" onClick={onBackToShopping}>
            <ArrowLeft size={20} />
            Back to Shopping
          </button>
          <h1>Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Cart</span>
          </div>
          <div className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`progress-step ${step >= 3 ? "active" : ""} ${step > 3 ? "completed" : ""}`}>
            <span className="step-number">3</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
            <span className="step-number">4</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Step 1: Cart Review */}
          {step === 1 && (
            <div className="checkout-step">
              <h2>Review Your Order</h2>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.images[0] || "/placeholder.svg"} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-brand">{item.brand}</p>
                      <p className="item-price">${item.discountPrice.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="item-total">${(item.discountPrice * item.quantity).toFixed(2)}</div>
                    <button className="remove-btn" onClick={() => onRemoveItem(item.id)} aria-label="Remove item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="step-actions">
                <button className="next-btn" onClick={() => setStep(2)}>
                  Proceed to Shipping
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Information */}
          {step === 2 && (
            <div className="checkout-step">
              <h2>Shipping Information</h2>
              <form className="shipping-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleShippingChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleShippingChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => handleShippingChange("state", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleShippingChange("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(1)}>
                  Back to Cart
                </button>
                <button className="next-btn" onClick={() => setStep(3)} disabled={!isShippingValid()}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Information */}
          {step === 3 && (
            <div className="checkout-step">
              <h2>Payment Information</h2>
              <div className="payment-security">
                <Shield size={20} />
                <span>Your payment information is secure and encrypted</span>
              </div>
              <form className="payment-form">
                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => handlePaymentChange("cardholderName", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Card Number *</label>
                  <div className="card-input">
                    <CreditCard size={20} />
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </form>
              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(2)}>
                  Back to Shipping
                </button>
                <button
                  className={`place-order-btn ${isProcessing ? "processing" : ""}`}
                  onClick={handlePlaceOrder}
                  disabled={!isPaymentValid() || isProcessing}
                >
                  {isProcessing ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Order Confirmation */}
          {step === 4 && (
            <div className="checkout-step confirmation">
              <div className="confirmation-icon">
                <div className="success-checkmark">✓</div>
              </div>
              <h2>Order Confirmed!</h2>
              <p>Thank you for your purchase. Your order has been successfully placed.</p>
              <div className="order-details">
                <h3>Order Summary</h3>
                <div className="order-number">Order #12345678</div>
                <div className="delivery-info">
                  <Truck size={20} />
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
              </div>
              <button className="continue-shopping-btn" onClick={onBackToShopping}>
                Continue Shopping
              </button>
            </div>
          )}

          {/* Order Summary Sidebar */}
          {step !== 4 && (
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.discountPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout
