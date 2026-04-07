// src/components/Gallery.jsx
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Gallery.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1607082349566-187342175e2f",
  "https://images.unsplash.com/photo-1513883049090-d0b7439799bf",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const total = galleryImages.length;

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
    if (isHovered) return;
    
    // Auto rotate every 3.5s
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [isHovered, total]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">Moments We've Delivered</h2>
        <p className="gallery-subtitle">Real smiles, real stories, real gifts.</p>
      </div>

      <div 
        className="gallery-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Desktop 3D Carousel */}
        <div className="gallery-carousel desktop-carousel">
          {galleryImages.map((src, index) => {
            // Compute shortest distance in a loop
            let dist = index - activeIndex;
            if (dist > total / 2) dist -= total;
            if (dist < -total / 2) dist += total;

            let className = "gallery-card";
            if (dist === 0) className += " card-center";
            else if (dist === 1) className += " card-right-1";
            else if (dist === -1) className += " card-left-1";
            else if (dist === 2) className += " card-right-2";
            else if (dist === -2) className += " card-left-2";
            else className += " card-hidden";

            return (
              <div 
                key={index}
                className={className}
                onClick={() => goTo(index)}
              >
                <div className="card-shadow"></div>
                <img src={src} alt={`Gallery moment ${index + 1}`} loading="lazy" />
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap Scroll */}
        <div className="gallery-carousel mobile-scroller">
          {galleryImages.map((src, index) => (
            <div key={index} className="mobile-card">
              <img src={src} alt={`Gallery moment ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <button className="gallery-nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="gallery-nav-btn next-btn" onClick={nextSlide} aria-label="Next">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="gallery-dots">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`gallery-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
