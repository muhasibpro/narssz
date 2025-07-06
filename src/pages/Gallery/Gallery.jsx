import React, { useState, useEffect } from 'react'; // useEffect import qilindi
import { galleryImages } from '../../data';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅✅✅ YANGI O'ZGARISH MANA SHU YERDA ✅✅✅
    // Bu hook lightbox ochilganda `<body>` ga klass qo'shadi va yopilganda olib tashlaydi.
    useEffect(() => {
        if (selectedImg) {
            document.body.classList.add('lightbox-active');
        } else {
            document.body.classList.remove('lightbox-active');
        }

        // Komponent yo'q qilinganda klassni olib tashlash (har ehtimolga qarshi)
        return () => {
            document.body.classList.remove('lightbox-active');
        };
    }, [selectedImg]); // Bu effekt faqat selectedImg o'zgarganda ishlaydi

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

    // JSX qismi o'zgarishsiz qoladi
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