// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* main navbar pill */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* LEFT: logo */}
          <div className="logo" onClick={() => navigate("/")}>
            ● Sweet Treasure
          </div>

          {/* CENTER: links (desktop only) */}
          <nav className="nav-wrapper">
            <ul className="nav-links">
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              <li onClick={() => goToSection("hero")}>Home</li>
              <li onClick={() => goToSection("products")}>Shop</li>
              {/* <li onClick={() => goToSection("occasions")}>Occasions</li> */}
              <li onClick={() => goToSection("testimonials")}>Testimonials</li>
              <li onClick={() => goToSection("about")}>About</li>
              <li onClick={() => goToSection("contact")}>Contact</li>
            </ul>
          </nav>

          {/* RIGHT: icons + toggle */}
          <div className="nav-actions">
            <button
              className="nav-icon-btn"
              onClick={() => navigate("/wishlist")}
            >
              <FontAwesomeIcon icon={faHeart} />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </button>

            <button
              className="nav-icon-btn"
              onClick={() => navigate("/cart")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

            {/* mobile toggle – only visible on small screens via CSS */}
            <div className="menu-toggle" onClick={toggleMenu}>
              ☰
            </div>
          </div>
        </div>
      </header>

      {/* fullscreen mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={closeMenu}>
          ✕
        </div>
        <ul>
          <li
            onClick={() => {
              goToSection("hero");
              closeMenu();
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              goToSection("products");
              closeMenu();
            }}
          >
            Shop
          </li>
          
          <li
            onClick={() => {
              goToSection("testimonials");
              closeMenu();
            }}
          >
            Testimonials
          </li>
          <li
            onClick={() => {
              goToSection("about");
              closeMenu();
            }}
          >
            About
          </li>
          <li
            onClick={() => {
              goToSection("contact");
              closeMenu();
            }}
          >
            Contact
          </li>
          <li
            onClick={() => {
              navigate("/wishlist");
              closeMenu();
            }}
          >
            Wishlist
          </li>
          <li
            onClick={() => {
              navigate("/cart");
              closeMenu();
            }}
          >
            Cart
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;