// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import Wishlist from "./components/Wishlist";
import Testimonials from "./components/Testimonials";
import FloatingSocial from "./components/FloatingSocial";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // wishlist persistence (optional)
  useEffect(() => {
    const saved = localStorage.getItem("wishlistItems");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const newQty =
            type === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
         <FloatingSocial />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="hero">
                <Hero onShopClick={scrollToProducts} /></section>
                <section id="products" className="products-section">
                  <Products
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    wishlistItems={wishlist}
                  />
                </section>
                <section id="testimonials">
    <Testimonials />
  </section>
                <About />
                <Footer />
              </>
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlistItems={wishlist}
                onAddToCart={handleAddToCart}
                onRemove={handleRemoveFromWishlist}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;