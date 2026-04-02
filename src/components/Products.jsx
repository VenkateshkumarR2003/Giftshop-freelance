// Products.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faShoppingCart,
  faFilter,
  faTruck,
  faFire,
  faSearch,
  faBirthdayCake,
  faGift,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";
import "./Products.css";

const generateProducts = () =>
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Premium Gift Item ${i + 1}`,
    originalPrice: Math.floor(Math.random() * 2000) + 800,
    price: Math.floor(Math.random() * 1200) + 200,
    rating: +(Math.random() * 1 + 4).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 50,
    category: ["Birthday", "Anniversary", "Wedding"][i % 3],
    tags: Math.random() > 0.7 ? ["Best Seller"] : [],
    delivery: Math.random() > 0.5 ? "Tomorrow" : "Free",
    inStock: Math.random() > 0.1,
    image: `https://via.placeholder.com/350x240/${
      ["ffe4e1", "fff0f5", "f0f8ff"][i % 3]
    }/${["ff6b9d", "ff1493", "4169e1"][i % 3]}?text=Gift+${i + 1}`,
  }));

function Products({ onAddToCart, onToggleWishlist, wishlistItems }) {
  const [allProducts] = useState(generateProducts());
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    sort: "popularity",
  });
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // FILTERING
  const filteredProducts = allProducts
    .filter((p) => !filters.category || p.category === filters.category)
    .filter((p) => {
      if (!filters.price) return true;
      if (filters.price === "₹0-₹499") return p.price <= 499;
      if (filters.price === "₹500-₹999")
        return p.price >= 500 && p.price <= 999;
      if (filters.price === "₹1000+") return p.price >= 1000;
      return true;
    })
    .filter((p) => !filters.rating || p.rating >= parseFloat(filters.rating))
    .filter((p) =>
      p.title.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sort === "price-low") return a.price - b.price;
      if (filters.sort === "price-high") return b.price - a.price;
      if (filters.sort === "newest") return b.id - a.id;
      if (filters.sort === "best-selling") return b.reviews - a.reviews;
      return 0; // popularity
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (product) => {
    if (onAddToCart) onAddToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // RESET FILTERS
  const handleResetFilters = () => {
    setFilters({
      category: "",
      price: "",
      rating: "",
      sort: "popularity",
    });
    setSearch("");
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-layout">
      {/* LEFT FILTERS SIDEBAR */}
      <aside className="filters-sidebar">
        <div className="sidebar-header">
          <h3>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </h3>
        </div>

        {/* RESET BUTTON */}
        <button className="reset-filters-btn" onClick={handleResetFilters}>
          Clear all filters
        </button>

        <div className="filter-section">
          {/* Category */}
          <div className="filter-group">
            <h4>Category</h4>
            {["Birthday", "Anniversary", "Wedding"].map((cat) => (
              <label key={cat} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => {
                    setFilters((prev) => ({
                      ...prev,
                      category: prev.category === cat ? "" : cat,
                    }));
                    setCurrentPage(1);
                  }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="filter-group">
            <h4>Price Range</h4>
            {["₹0-₹499", "₹500-₹999", "₹1000+"].map((range) => (
              <label key={range} className="filter-option">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === range}
                  onChange={() => {
                    setFilters((prev) => ({
                      ...prev,
                      price: prev.price === range ? "" : range,
                    }));
                    setCurrentPage(1);
                  }}
                />
                <span>{range}</span>
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className="filter-group">
            <h4>Rating</h4>
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === "4.5"}
                onChange={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: prev.rating === "4.5" ? "" : "4.5",
                  }));
                  setCurrentPage(1);
                }}
              />
              <span>⭐ 4.5+</span>
            </label>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <h4>Sort By</h4>
            <select
              value={filters.sort}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, sort: e.target.value }));
                setCurrentPage(1);
              }}
              className="sort-select"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>
        </div>
      </aside>

      {/* RIGHT PRODUCTS CONTENT */}
      <main className="products-content">
        <div className="products-header">
          <div className="search-section">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search 100+ gifts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="results-info">
            <span>{filteredProducts.length} gifts found</span>
          </div>
        </div>

        {/* GRID */}
        <div className="products-grid">
          {currentProducts.length ? (
            currentProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                inWishlist={wishlistItems.some(
                  (item) => item.id === product.id
                )}
                onWishlistToggle={() => onToggleWishlist(product)}
                onAddToCart={handleAddToCart}
                delay={index * 0.05}
              />
            ))
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faGift} className="empty-icon" />
              <h3>No gifts found</h3>
              <p>Try adjusting your filters or search</p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`page-btn ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => paginate(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}

        {showToast && (
          <div className="cart-toast">
            <FontAwesomeIcon icon={faShoppingCart} />
            Added to cart ✓
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;