"use client"

import { Heart, ShoppingCart } from "lucide-react"
import Badge from "../Badge/Badge"
import Rating from "../Rating/Rating"
import "./ProductCard.css"

const ProductCard = ({
  product,
  viewMode = "grid",
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
}) => {
  const discountAmount = product.price - product.discountPrice

  const getProductImage = (product) => {
    return product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg?height=250&width=250"
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart && onAddToCart(product)
  }

  const handleAddToWishlist = (e) => {
    e.stopPropagation()
    onAddToWishlist && onAddToWishlist(product)
  }

  const handleProductClick = () => {
    onProductClick && onProductClick(product.id)
  }

  return (
    <div className={`product-card ${viewMode === "list" ? "list-mode" : ""}`} onClick={handleProductClick}>
      <div className="product-image-container">
        {product.isHot && <Badge text="HOT" variant="hot" />}
        <img src={getProductImage(product) || "/placeholder.svg"} alt={product.name} className="product-image" />
        <div className="product-actions">
          <button
            className={`action-btn wishlist-btn ${isInWishlist ? "active" : ""}`}
            aria-label="Add to wishlist"
            onClick={handleAddToWishlist}
          >
            <Heart size={16} fill={isInWishlist ? "#ff4757" : "none"} />
          </button>
          <button className="action-btn cart-btn" aria-label="Add to cart" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
          </button>
        </div>
        <div className="quick-actions">
          <button className="quick-add-btn" onClick={handleAddToCart}>
            Quick Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <Rating value={product.ratingValue} count={product.ratingCount} />

        <div className="product-pricing">
          <span className="current-price">${product.discountPrice}</span>
          <span className="original-price">${product.price}</span>
          <span className="discount-percent">{product.discountPercent}% Off</span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            {product.colors.slice(0, 3).map((color, index) => (
              <div key={index} className="color-dot" style={{ backgroundColor: color }} title={color} />
            ))}
            {product.colors.length > 3 && <span className="more-colors">+{product.colors.length - 3}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
