"use client"

import React from "react"
import ProductCard from "../ProductCard/ProductCard"
import { Grid, List } from "lucide-react"
import "./ProductGrid.css"

const ProductGrid = ({ products, onProductClick, onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const [viewMode, setViewMode] = React.useState("grid")

  return (
    <div className="product-grid-container">
      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
          aria-label="Grid view"
        >
          <Grid size={16} />
        </button>
        <button
          className={`view-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
          aria-label="List view"
        >
          <List size={16} />
        </button>
      </div>

      {/* Product Grid */}
      <div className={`product-grid ${viewMode === "list" ? "list-view" : ""}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onProductClick={onProductClick}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            isInWishlist={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
