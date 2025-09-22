"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header/Header"
import HeroBanner from "./components/HeroBanner/HeroBanner"
import ProductListing from "./components/ProductListing/ProductListing"
import ProductDetail from "./components/ProductDetail/ProductDetail"
import Checkout from "./components/Checkout/Checkout"
import Footer from "./components/Footer/Footer"
import { mockProducts } from "./data/mockData"
import "./App.css"

function App() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    priceRange: [60, 600],
    selectedColor: null,
  })
  const [sortBy, setSortBy] = useState("name-asc")
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [viewMode, setViewMode] = useState("grid")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      let filtered = [...products]

      if (filters.categories.length > 0) {
        if (filters.categories.includes("Hot Deals")) {
          const hotProducts = filtered.filter((product) => product.isHot)
          const otherCategories = filters.categories.filter((cat) => cat !== "Hot Deals")
          const categoryProducts =
            otherCategories.length > 0 ? filtered.filter((product) => otherCategories.includes(product.category)) : []

          const combinedIds = new Set([...hotProducts.map((p) => p.id), ...categoryProducts.map((p) => p.id)])
          filtered = filtered.filter((product) => combinedIds.has(product.id))
        } else {
          filtered = filtered.filter((product) => filters.categories.includes(product.category))
        }
      }

      if (filters.brands.length > 0) {
        filtered = filtered.filter((product) => filters.brands.includes(product.brand))
      }

      if (filters.colors.length > 0) {
        filtered = filtered.filter((product) => product.colors.some((color) => filters.colors.includes(color)))
      }

      filtered = filtered.filter(
        (product) => product.discountPrice >= filters.priceRange[0] && product.discountPrice <= filters.priceRange[1],
      )

      filtered.sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.localeCompare(b.name)
          case "name-desc":
            return b.name.localeCompare(a.name)
          case "price-asc":
            return a.discountPrice - b.discountPrice
          case "price-desc":
            return b.discountPrice - a.discountPrice
          case "rating-desc":
            return b.ratingValue - a.ratingValue
          case "popularity":
            return b.ratingCount - a.ratingCount
          default:
            return 0
        }
      })

      setFilteredProducts(filtered)
      setCurrentPageNum(1)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [products, filters, sortBy])

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      colors: [],
      priceRange: [60, 600],
      selectedColor: null,
    })
  }

  const getActiveFilterCount = () => {
    return filters.categories.length + filters.brands.length + filters.colors.length
  }

  const navigateToPage = (page, productId = null) => {
    setCurrentPage(page)
    if (productId) {
      const product = products.find((p) => p.id === productId)
      setSelectedProduct(product)
    }
  }

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prevCart, { ...product, quantity }]
    })
  }

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((item) => item.id === product.id)
      if (isAlreadyInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id)
      }
      return [...prevWishlist, product]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.discountPrice * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <HeroBanner onShopNow={() => navigateToPage("sneakers")} />
            <ProductListing
              products={filteredProducts}
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currentPage={currentPageNum}
              setCurrentPage={setCurrentPageNum}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              viewMode={viewMode}
              setViewMode={setViewMode}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              isLoading={isLoading}
              clearAllFilters={clearAllFilters}
              activeFilterCount={getActiveFilterCount()}
              totalProducts={products.length}
              onProductClick={(productId) => navigateToPage("product", productId)}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          </>
        )
      case "sneakers":
      case "bag":
      case "belt":
        return (
          <ProductListing
            products={filteredProducts.filter(
              (p) =>
                p.category.toLowerCase() === currentPage.toLowerCase() ||
                (currentPage === "sneakers" && p.category === "Sneakers") ||
                (currentPage === "bag" && p.category === "Bag") ||
                (currentPage === "belt" && p.category === "Belt"),
            )}
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            currentPage={currentPageNum}
            setCurrentPage={setCurrentPageNum}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isLoading={isLoading}
            clearAllFilters={clearAllFilters}
            activeFilterCount={getActiveFilterCount()}
            totalProducts={products.length}
            onProductClick={(productId) => navigateToPage("product", productId)}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            wishlist={wishlist}
            categoryFilter={currentPage}
          />
        )
      case "product":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            onBackToProducts={() => navigateToPage("home")}
            isInWishlist={wishlist.some((item) => item.id === selectedProduct.id)}
          />
        ) : null
      case "checkout":
        return (
          <Checkout
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBackToShopping={() => navigateToPage("home")}
            total={getCartTotal()}
          />
        )
      case "contact":
        return (
          <div style={{ padding: "2rem", textAlign: "center", minHeight: "60vh" }}>
            <h1>Contact Us</h1>
            <p>Get in touch with our team for any questions or support.</p>
          </div>
        )
      default:
        return (
          <>
            <HeroBanner onShopNow={() => navigateToPage("sneakers")} />
            <ProductListing
              products={filteredProducts}
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currentPage={currentPageNum}
              setCurrentPage={setCurrentPageNum}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              viewMode={viewMode}
              setViewMode={setViewMode}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              isLoading={isLoading}
              clearAllFilters={clearAllFilters}
              activeFilterCount={getActiveFilterCount()}
              totalProducts={products.length}
              onProductClick={(productId) => navigateToPage("product", productId)}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          </>
        )
    }
  }

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        onNavigate={navigateToPage}
        cartItemCount={getCartItemCount()}
        cartTotal={getCartTotal()}
        onCartClick={() => navigateToPage("checkout")}
      />
      {renderCurrentPage()}
      <Footer />
    </div>
  )
}

export default App
