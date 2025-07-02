import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="page-header" data-aos="fade-in">
                <h1>Biz Bilan Bog'laning</h1>
            </div>
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info-section" data-aos="fade-right">
                        <h3>Aloqa Ma'lumotlari</h3>
                        <p>Savollaringiz bo'lsa yoki hamkorlikni xohlasangiz, biz bilan bog'laning. Biz yordam berishdan doim mamnunmiz!</p>
                        <div className="info-item">
                            <FaMapMarkerAlt className="icon" />
                            <span>Toshkent sh., Mustaqillik ko'chasi, 1-uy</span>
                        </div>
                         <div className="info-item">
                            <FaPhone className="icon" />
                            <span>+998 (71) 234-56-78</span>
                        </div>
                         <div className="info-item">
                            <FaEnvelope className="icon" />
                            <span>info@felt.uz</span>
                        </div>
                    </div>
                    <div className="contact-form-section" data-aos="fade-left">
                        <h3>Xabar Yuborish</h3>
                        <form>
                            <input type="text" placeholder="Ismingiz" required />
                            <input type="email" placeholder="Email manzilingiz" required />
                            <textarea placeholder="Xabaringiz" rows="6" required></textarea>
                            <button type="submit" className="btn-primary">Yuborish</button>
                        </form>
                    </div>
                </div>
                <div className="map-section" data-aos="fade-up">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.34584749281!2d69.2810428153925!3d41.32305097927003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bfaedfe3807%3A0x74f2a35315b22b49!2sMustaqillik%20Maydoni!5e0!3m2!1sen!2s!4v1672582813581!5m2!1sen!2s" 
                        width="100%" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="FELT Furniture Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;