// Wishlist.jsx
import "./Wishlist.css";

function Wishlist({ wishlistItems, onAddToCart, onRemove }) {
  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>My Wishlist ❤️</h2>
        {wishlistItems.length > 0 && (
          <p>{wishlistItems.length} items saved</p>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <h3>No items saved yet</h3>
          <p>Tap the heart icon on any product to save it here.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p className="wishlist-price">
                ₹{item.price.toLocaleString()}
              </p>
              {item.inStock ? (
                <p className="wishlist-availability in-stock">In stock</p>
              ) : (
                <p className="wishlist-availability out-of-stock">
                  Out of stock
                </p>
              )}

              <button
                className="wishlist-add-btn"
                onClick={() => onAddToCart(item)}
                disabled={!item.inStock}
              >
                Add to Cart
              </button>
              <button
                className="wishlist-remove-btn"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;