// ProductCard.jsx
import { useState } from "react";
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

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart(product);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card" style={{ "--delay": `${delay}s` }}>
      {/* Wishlist */}
      <button
        className={`wishlist-btn ${inWishlist ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onWishlistToggle(); // <— fixed: no product.id
        }}
        title="Add to Wishlist"
      >
        <FontAwesomeIcon icon={inWishlist ? faHeartSolid : faHeart} />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="discount-badge">
          <FontAwesomeIcon icon={faPercentage} />
          {discount}% OFF
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
                className={`star ${
                  product.rating >= i + 0.5 ? "filled" : ""
                }`}
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="current-price">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="original-price">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="delivery-info">
          <FontAwesomeIcon icon={faTruck} className="delivery-icon" />
          {product.delivery} Delivery
        </div>

        <button
          className={`add-to-cart ${
            added ? "added" : ""
          } ${!product.inStock ? "out-of-stock" : ""}`}
          onClick={handleAddToCart}
          disabled={added || !product.inStock}
        >
          {added ? (
            <span>✓ Added</span>
          ) : !product.inStock ? (
            <span>Out of Stock</span>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div
          className="quick-view-modal-overlay"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="quick-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowQuickView(false)}
            >
              ×
            </button>
            <img src={product.image} alt={product.title} className="modal-image" />
            <div className="modal-content">
              <h2>{product.title}</h2>
              <div className="modal-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`star ${
                        product.rating >= i + 0.5 ? "filled" : ""
                      }`}
                    />
                  ))}
                </div>
                <span>({product.reviews})</span>
              </div>
              <div className="modal-price">
                <span className="current-price">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
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