import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTruck, faBoxOpen, faRotate } from "@fortawesome/free-solid-svg-icons";

function About({ onShopClick }) {
  return (
    <section id="about" className="about">
      {/* background decorative shapes */}
      <div className="about-bg-shape about-bg-shape-1" />
      <div className="about-bg-shape about-bg-shape-2" />

      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">About GiftShop</h2>

          <p>
            Welcome to GiftShop, your ultimate destination for thoughtful, 
            beautiful gifts for every occasion. With over a decade of experience, 
            we pride ourselves on curating unique items that bring joy and 
            create lasting memories.
          </p>

          {/* Stats */}
          <div className="about-stats">
            <div>
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div>
              <h3>500+</h3>
              <p>Curated Products</p>
            </div>
            <div>
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>

          {/* Features */}
          <div className="about-features">
            <div className="feature">
              <span className="feature-icon">
                <FontAwesomeIcon icon={faBoxOpen} />
              </span>
              <div>
                <h4>Carefully Curated</h4>
                <p>Handpicked items from around the world</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">
                <FontAwesomeIcon icon={faTruck} />
              </span>
              <div>
                <h4>Fast Shipping</h4>
                <p>Free shipping on orders over ₹999</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <div>
                <h4>Quality Guaranteed</h4>
                <p>Premium quality products & service</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">
                <FontAwesomeIcon icon={faRotate} />
              </span>
              <div>
                <h4>Easy Returns</h4>
                <p>30-day hassle-free return</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="about-btn" onClick={onShopClick}>Shop Now</button>
        </div>

        {/* Right image grid */}
        <div className="about-image">
          <div className="image-grid">
            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f" alt="Gift 1" />
            <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" alt="Gift 2" />
            <img src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf" alt="Gift 3" />
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48" alt="Gift 4" />
            <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383" alt="Gift 3" />
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48" alt="Gift 4" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;