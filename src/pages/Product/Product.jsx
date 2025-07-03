import React, { useState, useMemo } from 'react';
import { products } from '../../data';
// O'zgartirish: Lightbox uchun kerakli ikonkalarni import qilish
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Product.css';

const allCategories = ['barchasi', ...new Set(products.map(p => p.category))];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('barchasi');

    // O'zgartirish: Lightbox (rasmni kattalashtirib ko'rsatish) uchun state'lar
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'barchasi') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [activeCategory]);


    // --- O'zgartirish: Lightbox uchun funksiyalar ---
    const openLightbox = (product, index) => {
        setSelectedImg(product.img);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImg(null);
    };

    const showNext = (e) => {
        e.stopPropagation(); // Orqa fon bosilib, lightbox yopilib qolmasligi uchun
        const nextIndex = (currentIndex + 1) % filteredProducts.length;
        setSelectedImg(filteredProducts[nextIndex].img);
        setCurrentIndex(nextIndex);
    };

    const showPrev = (e) => {
        e.stopPropagation(); // Orqa fon bosilib, lightbox yopilib qolmasligi uchun
        const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
        setSelectedImg(filteredProducts[prevIndex].img);
        setCurrentIndex(prevIndex);
    };


    return (
        <div className="products-page">
            <div className="page-header" data-aos="fade-in">
                <h1>Bizning Kolleksiyamiz</h1>
            </div>
            <div className="container">
                <div className="filter-bar" data-aos="fade-up">
                    {allCategories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="products-grid-full">
                    {filteredProducts.map((product, index) => (
                        // O'zgartirish: Kartaga bosganda lightbox ochilishi uchun onClick qo'shildi
                        <div
                            key={product.id}
                            className="product-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            onClick={() => openLightbox(product, index)}>
                             <div className="product-image-container">
                                <img src={product.img} alt={product.name} className="product-image"/>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- O'zgartirish: Lightbox'ning o'zi (agar rasm tanlangan bo'lsa ko'rinadi) --- */}
            {selectedImg && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="close-btn" onClick={closeLightbox}><FaTimes /></button>
                    <button className="nav-btn prev" onClick={showPrev}><FaArrowLeft /></button>
                    {/* Rasmning o'zini bosganda yopilib qolmasligi uchun */}
                    <img src={selectedImg} alt="Selected" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
                    <button className="nav-btn next" onClick={showNext}><FaArrowRight /></button>
                </div>
            )}
        </div>
    );
};

export default Products;