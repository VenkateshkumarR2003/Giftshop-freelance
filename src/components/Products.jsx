// Products.jsx
import { useState, useRef, useEffect } from "react";
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
  faTimes,
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

  // Mobile Drawer & Anim States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const productsGridRef = useRef(null);

  // Smooth scroll logic
  const scrollToProducts = () => {
    if (window.innerWidth < 768 && productsGridRef.current) {
      const yOffset = -80;
      const y = productsGridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const updateFilters = (key, value) => {
    setIsFiltering(true);
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
    setCurrentPage(1);
    setTimeout(scrollToProducts, 100);
    setTimeout(() => setIsFiltering(false), 300);
  };

  const updateSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
    setTimeout(scrollToProducts, 100);
  };

  // FILTERING
  const filteredProducts = allProducts
    .filter((p) => !filters.category || p.category === filters.category)
    .filter((p) => {
      if (!filters.price) return true;
      if (filters.price === "₹0-₹499") return p.price <= 499;
      if (filters.price === "₹500-₹999") return p.price >= 500 && p.price <= 999;
      if (filters.price === "₹1000+") return p.price >= 1000;
      return true;
    })
    .filter((p) => !filters.rating || p.rating >= parseFloat(filters.rating))
    .filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()))
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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = (product) => {
    if (onAddToCart) onAddToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleResetFilters = () => {
    setIsFiltering(true);
    setFilters({ category: "", price: "", rating: "", sort: "popularity" });
    setSearch("");
    setCurrentPage(1);
    setTimeout(() => setIsFiltering(false), 300);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.price) count++;
    if (filters.rating) count++;
    return count;
  };

  return (
    <div className="products-layout-wrapper">
      <div className={`products-layout ${isFiltering ? "filtering-active" : ""}`}>
        
        {/* MOBILE OVERLAY */}
        <div 
          className={`drawer-overlay ${isMobileFilterOpen ? "open" : ""}`} 
          onClick={() => setIsMobileFilterOpen(false)} 
        />

        {/* LEFT FILTERS SIDEBAR / BOTTOM DRAWER */}
        <aside className={`filters-sidebar ${isMobileFilterOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3><FontAwesomeIcon icon={faFilter} /> Filters</h3>
            <button className="close-drawer-btn" onClick={() => setIsMobileFilterOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="filter-section">
            {/* Category */}
            <div className="filter-group">
              <h4>Category</h4>
              <div className="pill-group">
                {["Birthday", "Anniversary", "Wedding"].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill ${filters.category === cat ? "active" : ""}`}
                    onClick={() => updateFilters("category", cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="pill-group">
                {["₹0-₹499", "₹500-₹999", "₹1000+"].map((range) => (
                  <button
                    key={range}
                    className={`filter-pill ${filters.price === range ? "active" : ""}`}
                    onClick={() => updateFilters("price", range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="filter-group">
              <h4>Rating</h4>
              <div className="pill-group">
                <button
                  className={`filter-pill ${filters.rating === "4.5" ? "active" : ""}`}
                  onClick={() => updateFilters("rating", "4.5")}
                >
                  ⭐ 4.5+
                </button>
              </div>
            </div>

            <button className="reset-filters-btn" onClick={handleResetFilters}>
              Clear all filters
            </button>
          </div>

          <div className="drawer-footer">
            <button className="apply-btn" onClick={() => {
              setIsMobileFilterOpen(false);
              setTimeout(scrollToProducts, 300);
            }}>
              Show {filteredProducts.length} Results
            </button>
          </div>
        </aside>

        {/* RIGHT PRODUCTS CONTENT */}
        <main className="products-content">
          
          {/* TOP CONTROL BAR (Premium Shop Header) */}
          <div className="top-control-bar">
            {/* Mobile filter toggle */}
            <button className="mobile-filter-toggle" onClick={() => setIsMobileFilterOpen(true)}>
              <FontAwesomeIcon icon={faFilter} /> Filters {getActiveFilterCount() > 0 && <span className="badge">{getActiveFilterCount()}</span>}
            </button>

            <div className="search-section">
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search 100+ premium gifts..."
                  value={search}
                  onChange={(e) => updateSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="sort-section">
              <span className="results-info">{filteredProducts.length} results</span>
              <select
                value={filters.sort}
                onChange={(e) => updateFilters("sort", e.target.value)}
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

          {/* ACTIVE FILTER CHIPS */}
          {(filters.category || filters.price || filters.rating || search) && (
            <div className="active-filters-bar">
              {filters.category && (
                <span className="active-chip" onClick={() => updateFilters("category", filters.category)}>
                  {filters.category} <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
              {filters.price && (
                <span className="active-chip" onClick={() => updateFilters("price", filters.price)}>
                  {filters.price} <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
              {filters.rating && (
                <span className="active-chip" onClick={() => updateFilters("rating", "4.5")}>
                  ⭐ 4.5+ <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
              {search && (
                <span className="active-chip" onClick={() => updateSearch("")}>
                  "{search}" <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
              <button className="clear-all-text" onClick={handleResetFilters}>Clear All</button>
            </div>
          )}

          {/* GRID */}
          <div className="products-grid-wrapper" ref={productsGridRef}>
            <div className="products-grid">
              {currentProducts.length ? (
                currentProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inWishlist={wishlistItems.some((item) => item.id === product.id)}
                    onWishlistToggle={() => onToggleWishlist(product)}
                    onAddToCart={handleAddToCart}
                    delay={index * 0.05}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon-wrap">
                    <FontAwesomeIcon icon={faGift} className="empty-icon" />
                  </div>
                  <h3>No matching gifts found</h3>
                  <p>Try adjusting your filters or search to discover more.</p>
                  <button className="reset-filters-btn empty-btn" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={currentPage === 1} onClick={() => { setCurrentPage(currentPage - 1); setTimeout(scrollToProducts, 100); }}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => { setCurrentPage(page); setTimeout(scrollToProducts, 100); }}
                >
                  {page}
                </button>
              ))}
              <button className="page-btn" disabled={currentPage === totalPages} onClick={() => { setCurrentPage(currentPage + 1); setTimeout(scrollToProducts, 100); }}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FAB */}
      <button className={`mobile-fab ${isMobileFilterOpen ? "hidden" : ""}`} onClick={() => setIsMobileFilterOpen(true)}>
        <FontAwesomeIcon icon={faFilter} />
        {getActiveFilterCount() > 0 && <span className="fab-badge">{getActiveFilterCount()}</span>}
      </button>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="cart-toast bounce-in">
          <FontAwesomeIcon icon={faShoppingCart} />
          Added to cart ✓
        </div>
      )}
    </div>
  );
}

export default Products;