// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // CSS faylini import qilamiz

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-about">
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i> {/* Font Awesome ikonasi */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h4>Tezkor Havolalar</h4>
          <ul>
            <li><a href="#home">Bosh Sahifa</a></li>
            <li><a href="#products">Mahsulotlar</a></li>
            <li><a href="#collections">Kolleksiyalar</a></li>
            <li><a href="#stores">Do'konlar</a></li>
            <li><a href="#about">Biz Haqimizda</a></li>
            <li><a href="#contact">Aloqa</a></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4>Bog'lanish</h4>
          <p>Manzil: Toshkent sh., Chilonzor tum., 123-uy</p>
          <p>Telefon: +998 71 123 45 67</p>
          <p>Email: <a href="mailto:info@yourcomforthome.uz">info@yourcomforthome.uz</a></p>
        </div>

        <div className="footer-section footer-newsletter">
          <h4>Yangiliklarimizga Obuna Bo'ling</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Email manzilingiz" aria-label="Email for newsletter" />
            <button type="submit">Obuna Bo'lish</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MixInfo. Barcha huquqlar himoyalangan.</p>
        <div className="footer-legal-links">
          <a href="#privacy">Maxfiylik Siyosati</a>
          <a href="#terms">Foydalanish Shartlari</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;