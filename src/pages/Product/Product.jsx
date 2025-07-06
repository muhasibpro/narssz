import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../../data';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Product.css';

const allCategories = ['barchasi', ...new Set(products.map(p => p.category))];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('barchasi');
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (selectedItem) {
            document.body.classList.add('lightbox-active');
        } else {
            document.body.classList.remove('lightbox-active');
        }
        return () => {
            document.body.classList.remove('lightbox-active');
        };
    }, [selectedItem]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'barchasi') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const openLightbox = (product) => {
        const productIndexInFilteredList = filteredProducts.findIndex(p => p.id === product.id);
        setSelectedItem(product);
        setCurrentIndex(productIndexInFilteredList);
    };

    const closeLightbox = () => {
        setSelectedItem(null);
    };

    const showNext = (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % filteredProducts.length;
        setSelectedItem(filteredProducts[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
        setSelectedItem(filteredProducts[prevIndex]);
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
                        <div
                            key={product.id}
                            className="product-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            onClick={() => openLightbox(product)}>
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
            
            {/* ✅ O'ZGARISH: Lightbox JSX strukturasi to'liq yangilandi */}
            {selectedItem && (
                <div className="lightbox" onClick={closeLightbox}>
                    {/* Navigatsiya va yopish tugmalari asosiy qoplamada qoladi */}
                    <button className="close-btn" onClick={closeLightbox}><FaTimes /></button>
                    <button className="nav-btn prev" onClick={showPrev}><FaArrowLeft /></button>
                    <button className="nav-btn next" onClick={showNext}><FaArrowRight /></button>

                    {/* Kontent bloki. Bunga bosish lightbox'ni yopmaydi */}
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        
                        {/* CHAP PANEL: Ma'lumotlar uchun */}
                        <div className="lightbox-info-pane">
                            <h2 className="lightbox-title">{selectedItem.name}</h2>
                            <p className="lightbox-price">{selectedItem.price}</p>
                            <p className='lightbox-extra-info'>
                                Bu yerga mahsulot haqida qo'shimcha, batafsil ma'lumot yozilishi mumkin. Masalan, uning materiali, o'lchamlari va boshqa xususiyatlari.
                            </p>
                        </div>

                        {/* O'NG PANEL: Rasm uchun */}
                        <div className="lightbox-image-pane">
                            <img src={selectedItem.img} alt={selectedItem.name} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;