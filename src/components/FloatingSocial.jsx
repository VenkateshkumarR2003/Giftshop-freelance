// src/components/FloatingSocial.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./FloatingSocial.css";

function FloatingSocial() {
  return (
    <div className="floating-social">
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>

      <a
        href="https://www.instagram.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon instagram"
        aria-label="Visit Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  );
}

export default FloatingSocial;