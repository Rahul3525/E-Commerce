"use client"

import { useState } from "react"
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react"
import Badge from "../Badge/Badge"
import "./ProductDetail.css"

const ProductDetail = ({ product, onAddToCart, onAddToWishlist, onBackToProducts, isInWishlist }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onAddToCart(product, quantity)
    setIsLoading(false)
  }

  const handleWishlistToggle = () => {
    onAddToWishlist(product)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? "star-filled" : "star-empty"}
        fill={index < Math.floor(rating) ? "#FFD700" : "none"}
      />
    ))
  }

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        {/* Back Button */}
        <button className="back-button" onClick={onBackToProducts}>
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="main-product-image"
              />
              {product.isHot && <Badge type="hot" />}
            </div>

            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImageIndex === index ? "active" : ""}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <button
                className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                onClick={handleWishlistToggle}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={24} fill={isInWishlist ? "#ff4757" : "none"} />
              </button>
            </div>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">{renderStars(product.ratingValue)}</div>
              <span className="rating-text">
                {product.ratingValue} ({product.ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-pricing">
              <span className="current-price">${product.discountPrice.toFixed(2)}</span>
              <span className="original-price">${product.price.toFixed(2)}</span>
              <span className="discount-badge">{product.discountPercent}% Off</span>
            </div>

            {/* Description */}
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="color-selection">
              <h3>Color</h3>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-option ${selectedColor === color ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={incrementQuantity}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`add-to-cart-btn ${isLoading ? "loading" : ""}`}
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <ShoppingCart size={20} />
              {isLoading ? "Adding to Cart..." : "Add to Cart"}
            </button>

            {/* Product Details */}
            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">Brand:</span>
                <span className="detail-value">{product.brand}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Product ID:</span>
                <span className="detail-value">#{product.id.toString().padStart(6, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
