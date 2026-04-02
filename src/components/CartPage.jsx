// src/components/CartPage.jsx
import "./CartPage.css";

function CartPage({ cartItems, onRemoveFromCart, onClearCart, onUpdateQuantity }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const calcSaved = (item) =>
    item.originalPrice
      ? (item.originalPrice - item.price) * item.quantity
      : 0;

  const totalSaved = cartItems.reduce((sum, item) => sum + calcSaved(item), 0);

  // send cart to WhatsApp
  const sendToWhatsApp = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "919626723127"; // your WhatsApp number

    let message = "Hello, I would like to place an order:\n\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ₹${item.price} x ${
        item.quantity
      }\n`;
    });

    message += `\nTotal: ₹${subtotal}\n\n`;
    message += "Name:\nAddress:\nPayment method:\n\n";
    message += "I will share the payment screenshot here 📷";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="cart-page">
      <h2>My Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add some lovely gifts to see them here.</p>
        </div>
      ) : (
        <>
          <div className="cart-layout">
            {/* LEFT: QR card */}
            <div className="cart-qr-card">
              <h3>Scan & Pay</h3>
              {/* Put your QR image in public/images/payment-qr.png or adjust path */}
              <img src="/images/payment-qr.png" alt="Scan to pay" />
              <p>Use any UPI app to scan and complete your payment.</p>
            </div>

            {/* MIDDLE: cart items */}
            <div className="cart-page-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-page-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-page-details">
                    <h4>{item.title}</h4>
                    <p className="price">
                      ₹{item.price.toLocaleString()}
                      {item.originalPrice && (
                        <span className="original">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                    {item.originalPrice && (
                      <p className="saved">
                        You saved ₹{calcSaved(item).toLocaleString()} 🎉
                      </p>
                    )}
                    <div className="quantity">
                      <button
                        onClick={() => onUpdateQuantity(item.id, "dec")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT: summary + WhatsApp */}
            <div className="cart-page-summary">
              <div className="row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              {totalSaved > 0 && (
                <div className="row saved-row">
                  <span>You saved</span>
                  <span>₹{totalSaved.toLocaleString()}</span>
                </div>
              )}
              <div className="row total">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <p className="wa-note">
                After payment, click the button and send your payment screenshot
                on WhatsApp.
              </p>
              <button className="whatsapp-order" onClick={sendToWhatsApp}>
                Order via WhatsApp
              </button>

              <button className="clear" onClick={onClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;