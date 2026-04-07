// ProductCard.jsx
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faHeart as faHeartSolid,
  faStar,
  faFire,
  faTruck,
  faPercentage,
  faShoppingCart,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";

function ProductCard({
  product,
  inWishlist,
  onWishlistToggle,
  onAddToCart,
  delay = 0,
}) {
  const [added, setAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlistPop, setWishlistPop] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleAddToCart = (e) => {
    // Add Ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setAdded(true);
    onAddToCart(product);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      setAdded(false);
    }, 1500);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onWishlistToggle();
    if (!inWishlist) {
      setWishlistPop(true);
      setTimeout(() => setWishlistPop(false), 400); // 400ms duration for pop
    }
  };



  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="product-card-container" 
      style={{ "--delay": `${delay}s` }}
    >
      <div className="product-card">
        {/* Wishlist */}
        <button
          className={`wishlist-btn ${inWishlist ? "active" : ""} ${wishlistPop ? "pop" : ""}`}
          onClick={handleWishlistToggle}
          title="Add to Wishlist"
        >
          <FontAwesomeIcon icon={inWishlist ? faHeartSolid : faHeart} />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="discount-badge">
            <FontAwesomeIcon icon={faPercentage} /> {discount}% OFF
          </div>
        )}

        {/* Offer Badge */}
        {product.tags?.includes("Best Seller") && (
          <div className="offer-badge">
            <FontAwesomeIcon icon={faFire} /> Best Seller
          </div>
        )}

        {/* Image */}
        <div className="product-image">
          <img src={product.image} alt={product.title} loading="lazy" />
          <div className="image-overlay">
            <button
              className="quick-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
            >
              <FontAwesomeIcon icon={faEye} /> Quick View
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          {product.tags?.map((tag) => (
            <span key={tag} className="product-tag">
              {tag}
            </span>
          ))}

          <h3 className="product-title">{product.title}</h3>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`star ${product.rating >= i + 0.5 ? "filled" : ""}`}
                />
              ))}
            </div>
            <span className="reviews-count">({product.reviews})</span>
          </div>

          <div className="product-price">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="delivery-info">
            <FontAwesomeIcon icon={faTruck} className="delivery-icon" />
            {product.delivery} Delivery
          </div>

          <button
            className={`add-to-cart ${added ? "added" : ""} ${!product.inStock ? "out-of-stock" : ""}`}
            onClick={handleAddToCart}
            disabled={added || !product.inStock}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
            {added ? (
              <span className="btn-content bounce-check"><FontAwesomeIcon icon={faCheck} /> Added</span>
            ) : !product.inStock ? (
              <span className="btn-content">Out of Stock</span>
            ) : (
              <span className="btn-content">Add to Cart</span>
            )}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal-overlay" onClick={() => setShowQuickView(false)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQuickView(false)}>×</button>
            <img src={product.image} alt={product.title} className="modal-image" />
            <div className="modal-content">
              <h2>{product.title}</h2>
              <div className="modal-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`star ${product.rating >= i + 0.5 ? "filled" : ""}`}
                    />
                  ))}
                </div>
                <span>({product.reviews})</span>
              </div>
              <div className="modal-price">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button className="modal-add-cart" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;