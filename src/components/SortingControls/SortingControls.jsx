"use client"
import "./SortingControls.css"

const SortingControls = ({ totalItems, sortBy, setSortBy, itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="sorting-controls">
      <div className="items-count">{totalItems} Items</div>

      <div className="controls-group">
        <div className="sort-control">
          <label htmlFor="sort-select">Sort By</label>
          <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="show-control">
          <label htmlFor="show-select">Show</label>
          <select
            id="show-select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="show-select"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SortingControls
