// Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faGooglePay,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer id="contact" className="footer">
      {/* FOOTER HERO / SLOGAN */}
      <div className="footer-hero">
        <h2 className="footer-hero-title">
          Gifting made unforgettable.
        </h2>
        <p className="footer-hero-subtitle">
          One little box, a thousand smiles. Curated gifts for every moment that matters.
        </p>
      </div>

      <div className="footer-container">
        {/* BRAND + SOCIAL */}
        <div className="footer-section">
          <h3 className="footer-title">🎁 GiftShop</h3>
          <p>
            Thoughtful, handpicked gifts that turn everyday moments into
            lifelong memories.
          </p>
          <p className="footer-quote">
            “It’s not just a gift. It’s a story wrapped with love.”
          </p>

          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-btn" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-btn" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Explore</h4>
          <ul>
            <li><a href="#products">Shop Gifts</a></li>
            <li><a href="#occasions">Occasions</a></li>
            <li><a href="#best-sellers">Best Sellers</a></li>
            <li><a href="#about">Our Story</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Customer Care</h4>
          <ul>
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* CONTACT + NEWSLETTER + PAYMENTS */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Stay Connected</h4>
          <p>📧 hello@giftshop.com</p>
          <p>📱 1-800-GIFTS-99</p>
          <p>🏠 123 Gift Avenue, Joy City</p>
          <p className="subscribe-text">
            Join our newsletter for early access to drops, offers, and gift ideas.
          </p>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

          <div className="payment-icons">
            <span>We accept</span>
            <div className="payment-row">
              <FontAwesomeIcon icon={faCcVisa} />
              <FontAwesomeIcon icon={faCcMastercard} />
              <FontAwesomeIcon icon={faCcPaypal} />
              <FontAwesomeIcon icon={faGooglePay} />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} GiftShop. All rights reserved.
          &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms of Service
        </p>
      </div>
    </footer>
  );
}

export default Footer;