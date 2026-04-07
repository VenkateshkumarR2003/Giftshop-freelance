import "./Hero.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingBag, 
  faGift, 
  faBirthdayCake, 
  faHeart,
  faStar,
  faTruck 
} from "@fortawesome/free-solid-svg-icons";

const FRAME_COUNT = 160;

function Hero({ onShopClick }) {
  const greeting = getDynamicGreeting();
  
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  const [loadedFrames, setLoadedFrames] = useState(0);
  const imagesRef = useRef([]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const images = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameName = `ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.src = `/frames/${frameName}`;
      
      img.onload = () => {
        loaded++;
        setLoadedFrames(loaded);
      };
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Scroll Animation Loop with Lerp
  useEffect(() => {
    if (loadedFrames < FRAME_COUNT || !canvasRef.current || !sectionRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = imagesRef.current;
    
    let currentFrame = 0;
    let targetFrame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    
    let animationFrameId;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };
    
    // Draw initial frame
    updateCanvasSize();
    
    const drawContent = (image, progress) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = image.width;
      const imgHeight = image.height;
      
      // Calculate aspect ratios
      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = imgWidth / imgHeight;
      
      let drawWidth, drawHeight;
      
      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (fit width)
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
      } else {
        // Canvas is taller than image (fit height)
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
      }
      
      // Apply subtle cinematic zoom via canvas transform
      const zoom = 1 + progress * 0.1;
      
      ctx.save();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Move to center, scale, then move back
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
      
      // Draw centered
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;
      
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
      ctx.restore();
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      const progress = Math.min(
        1,
        Math.max(0, (scrollTop - sectionTop) / (sectionHeight - window.innerHeight))
      );
      
      targetProgress = progress;
      targetFrame = progress * (FRAME_COUNT - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCanvasSize);
    
    // Initial calculation
    handleScroll();

    const loop = () => {
      // Lerp logic for butter-smooth animation
      currentFrame += (targetFrame - currentFrame) * 0.1;
      currentProgress += (targetProgress - currentProgress) * 0.1;
      
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(currentFrame)));
      const activeImage = images[frameIndex];
      
      if (activeImage && activeImage.complete) {
        drawContent(activeImage, currentProgress);
      }
      
      // Update DOM Elements for Parallax + Fade Out
      if (contentRef.current) {
        // Text fully visible at start, slowly fades and moves up as we scroll
        const opacity = Math.max(0, 1 - currentProgress * 1.2);
        const ty = -(currentProgress * 100);
        contentRef.current.style.opacity = opacity.toFixed(3);
        contentRef.current.style.transform = `translateY(${ty.toFixed(1)}px)`;
      }

      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - currentProgress * 5);
        scrollIndicatorRef.current.style.opacity = opacity.toFixed(3);
      }
      
      animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadedFrames]);

  return (
    <section id="home" className="hero-scroll-wrapper" ref={sectionRef}>
      <div className="hero-sticky-container">
        
        {/* Loader while images are fetching */}
        {loadedFrames < FRAME_COUNT && (
          <div className="hero-loader">
            <div className="loader-spinner"></div>
            <span>Loading Cinematic Layout {Math.round((loadedFrames / FRAME_COUNT) * 100)}%</span>
          </div>
        )}

        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-overlay" />

        {/* Decorative blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="hero-scroll-indicator" ref={scrollIndicatorRef} />

        {/* Content LEFT SIDE */}
        <div className="hero-content" ref={contentRef}>
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
      </div>
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