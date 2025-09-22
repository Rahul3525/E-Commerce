"use client"

import Sidebar from "../Sidebar/Sidebar"
import ProductGrid from "../ProductGrid/ProductGrid"
import SortingControls from "../SortingControls/SortingControls"
import Pagination from "../Pagination/Pagination"
import "./ProductListing.css"

const ProductListing = ({
  products,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode,
  isSidebarOpen,
  setIsSidebarOpen,
  isLoading,
  clearAllFilters,
  activeFilterCount,
  totalProducts,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  wishlist,
  categoryFilter,
}) => {
  // Calculate pagination
  const totalItems = products.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="product-listing">
      <div className="container">
        <div className="listing-layout">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            clearAllFilters={clearAllFilters}
            activeFilterCount={activeFilterCount}
          />

          <div className="main-content">
            <SortingControls
              totalItems={totalItems}
              sortBy={sortBy}
              setSortBy={setSortBy}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isLoading={isLoading}
            />

            <ProductGrid
              products={currentProducts}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              wishlist={wishlist}
            />

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListing
