import React, { useState } from 'react';
import { galleryImages } from '../../data';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (img, index) => {
        setSelectedImg(img.src);
        setCurrentIndex(index);
    };

    const closeLightbox = () => setSelectedImg(null);

    const showNext = (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImg(galleryImages[nextIndex].src);
        setCurrentIndex(nextIndex);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImg(galleryImages[prevIndex].src);
        setCurrentIndex(prevIndex);
    };

    return (
        <div className="gallery-page">
            <div className="page-header" data-aos="fade-in">
                <h1>Ilhom Manbai</h1>
            </div>
            <div className="container">
                <div className="gallery-grid">
                    {galleryImages.map((img, index) => (
                        <div 
                            key={img.id} 
                            className="gallery-item" 
                            data-aos="zoom-in" 
                            data-aos-delay={index * 50}
                            onClick={() => openLightbox(img, index)}
                        >
                            <img src={img.src} alt={`Gallery item ${index + 1}`} />
                            <div className="overlay">Ko'rish</div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImg && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="close-btn" onClick={closeLightbox}><FaTimes /></button>
                    <button className="nav-btn prev" onClick={showPrev}><FaArrowLeft /></button>
                    <img src={selectedImg} alt="Selected" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
                    <button className="nav-btn next" onClick={showNext}><FaArrowRight /></button>
                </div>
            )}
        </div>
    );
};

export default Gallery;