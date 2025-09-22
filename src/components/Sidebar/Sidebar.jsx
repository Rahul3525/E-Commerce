"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { categories, brands, colors } from "../../data/mockData"
import "./Sidebar.css"

const Sidebar = ({ filters, setFilters, isSidebarOpen, setIsSidebarOpen, clearAllFilters, activeFilterCount }) => {
  const [expandedSections, setExpandedSections] = useState({
    hotDeals: true,
    prices: true,
    colors: true,
    brands: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    setFilters((prev) => ({
      ...prev,
      categories: newCategories,
    }))
  }

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]

    setFilters((prev) => ({
      ...prev,
      brands: newBrands,
    }))
  }

  const handleColorChange = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]

    setFilters((prev) => ({
      ...prev,
      colors: newColors,
      selectedColor: newColors.length === 1 ? newColors[0] : null, // Set selected color for visual feedback
    }))
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      priceRange:
        name === "min"
          ? [Number.parseFloat(value), prev.priceRange[1]]
          : [prev.priceRange[0], Number.parseFloat(value)],
    }))
  }

  return (
    <>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <h2>Filters</h2>
            {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
          </div>
          <div className="sidebar-actions">
            {activeFilterCount > 0 && (
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
            <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close filters">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-header" onClick={() => toggleSection("hotDeals")}>
            <h3>Categories</h3>
            {expandedSections.hotDeals ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.hotDeals && (
            <div className="filter-content">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    <span className={category.isSpecial ? "category-special" : ""}>{category.name}</span>
                    <span className="count">{category.count}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-section">
          <div className="filter-header" onClick={() => toggleSection("prices")}>
            <h3>PRICES</h3>
            {expandedSections.prices ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.prices && (
            <div className="filter-content">
              <div className="price-range">
                <div className="price-display">
                  Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
                <div className="price-slider-container">
                  <input
                    type="range"
                    name="min"
                    min="60"
                    max="600"
                    step="10"
                    value={filters.priceRange[0]}
                    onChange={handlePriceChange}
                    className="price-slider price-slider-min"
                  />
                  <input
                    type="range"
                    name="max"
                    min="60"
                    max="600"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={handlePriceChange}
                    className="price-slider price-slider-max"
                  />
                </div>
                <div className="price-labels">
                  <span>$60</span>
                  <span>$600</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="filter-section">
          <div className="filter-header" onClick={() => toggleSection("colors")}>
            <h3>COLOR</h3>
            {expandedSections.colors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.colors && (
            <div className="filter-content">
              <div className="color-swatches">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-swatch ${filters.colors.includes(color) ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select ${color} color`}
                    title={`Color: ${color}`}
                  >
                    {filters.colors.includes(color) && <span className="color-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="filter-section">
          <div className="filter-header" onClick={() => toggleSection("brands")}>
            <h3>BRAND</h3>
            {expandedSections.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.brands && (
            <div className="filter-content">
              {brands.map((brand, index) => (
                <div key={index} className="brand-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand.name)}
                      onChange={() => handleBrandChange(brand.name)}
                    />
                    <span className={brand.name === "Nike" ? "brand-highlight" : ""}>{brand.name}</span>
                    <span className="count">{brand.count}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
