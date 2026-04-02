import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingBag, 
  faGift, 
  faBirthdayCake, 
  faHeart,
  faStar,
  faTruck 
} from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/hero-gift.jpg";

function Hero({ onShopClick }) {
  const greeting = getDynamicGreeting();

  return (
    <section id="home" className="hero">
      {/* Background image container */}
      <div className="hero-bg">
        <img src={heroImage} alt="Premium gifts" className="hero-bg-image" />
        <div className="hero-overlay" />
      </div>

      {/* Decorative blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="hero-scroll-indicator" />

      {/* Content LEFT SIDE */}
      <div className="hero-content">
        <p className="hero-eyebrow">
          <FontAwesomeIcon icon={faStar} className="eyebrow-icon" />
          {greeting}
        </p>

        <h1>Find the <span>Premium Gift</span><br />for Every Occasion</h1>

        <p className="hero-subtitle">
          Discover beautifully curated, hand‑picked gifts for birthdays, 
          anniversaries, and special moments.
        </p>

        <div className="hero-trust">
          <span>
            <FontAwesomeIcon icon={faStar} className="trust-icon" />
            Trusted by 10,000+ customers
          </span>
          <span>
            <FontAwesomeIcon icon={faGift} className="trust-icon" />
            500+ curated gifts
          </span>
        </div>

        <div className="hero-buttons">
          <button className="btn primary anim-gradient" onClick={onShopClick}>
            <FontAwesomeIcon icon={faShoppingBag} className="btn-icon" />
            Find Perfect Gift
          </button>
          <button className="btn secondary" onClick={() => window.scrollBy({ top: 200, behavior: "smooth" })}>
            <FontAwesomeIcon icon={faGift} className="btn-icon" />
            Browse Collection
          </button>
        </div>

        <div className="hero-quick-links">
          <button className="pill active">
            <FontAwesomeIcon icon={faBirthdayCake} className="pill-icon" />
            Birthday
          </button>
          <button className="pill">
            <FontAwesomeIcon icon={faHeart} className="pill-icon" />
            Anniversary
          </button>
          <button className="pill">
            <FontAwesomeIcon icon={faStar} className="pill-icon" />
            Special Occasions
          </button>
        </div>

        <p className="hero-microcopy">
          <FontAwesomeIcon icon={faTruck} className="micro-icon" />
          Free delivery on orders above ₹999
        </p>
      </div>

      {/* Mobile sticky CTA */}
      {/* <button className="mobile-sticky-cta" onClick={onShopClick}>
        <FontAwesomeIcon icon={faShoppingBag} className="sticky-icon" />
        Shop Now
      </button> */}
    </section>
  );
}

function getDynamicGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default Hero;