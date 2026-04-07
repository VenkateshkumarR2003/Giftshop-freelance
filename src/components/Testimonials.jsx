// src/components/Testimonials.jsx
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Priya S.",
    location: "Chennai",
    rating: 5,
    occasion: "Birthday",
    text: "The birthday gift I ordered was absolutely perfect. Delivery was super fast and the packaging was beautiful! Highly recommend this to everyone.",
  },
  {
    id: 2,
    name: "Rahul M.",
    location: "Bengaluru",
    rating: 5,
    occasion: "Anniversary",
    text: "My wife loved the anniversary box. It felt so personal and premium – way better than generic gifts. 10/10 experience.",
  },
  {
    id: 3,
    name: "Ananya K.",
    location: "Hyderabad",
    rating: 5,
    occasion: "Surprise Gift",
    text: "The surprise gift made my best friend cry happy tears. Loved the detailing and handwritten note! Thank you guys.",
  },
  {
    id: 4,
    name: "Vikram R.",
    location: "Coimbatore",
    rating: 4.9,
    occasion: "Wedding",
    text: "Elegant, classy, and right on time for the wedding. Everyone asked where I ordered it from. Very impressive.",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef(null);
  
  // Swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const total = testimonialsData.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goTo = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (hovering) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [hovering, total]);

  // Handle Swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-header">
        <span className="trust-pill"><FontAwesomeIcon icon={faStar} className="pill-icon" /> 4.9/5 · 10,000+ Happy Customers</span>
        <h2>What our customers say</h2>
        <p>
          Real stories from people who turned simple moments into unforgettable memories with our curated gifts.
        </p>
      </div>

      <div
        className="testimonials-slider"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        <div
          className="testimonials-track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {testimonialsData.map((t, index) => (
            <div
              key={t.id}
              className="testimonial-card-container"
            >
              <div className={`testimonial-card ${index === activeIndex ? "active" : "inactive"}`}>
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />

                <div className="rating-row">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`star-icon ${i < Math.round(t.rating) ? "filled" : ""}`}
                    />
                  ))}
                </div>

                <p className="testimonial-text">
                  "{t.text}"
                </p>

                <div className="testimonial-footer">
                  <div className="avatar">{t.name.charAt(0)}</div>

                  <div className="customer-meta">
                    <span className="customer-name">{t.name}</span>
                    <span className="customer-location">
                      {t.location} · <span className="occasion-tag">{t.occasion}</span>
                    </span>
                    <span className="verified-badge">
                      <FontAwesomeIcon icon={faCheckCircle} /> Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NAV */}
        <div className="testimonial-nav">
          <button className="arrow-btn" onClick={prevSlide}>‹</button>

          <div className="testimonial-dots">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button className="arrow-btn" onClick={nextSlide}>›</button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;