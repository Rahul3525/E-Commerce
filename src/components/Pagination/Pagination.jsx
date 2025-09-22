"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
      // Scroll to top of product grid
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <div className="pagination">
      <div className="pagination-container">
        {/* Previous Button */}
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button
                  className={`pagination-number ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page Info */}
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default Pagination
