import React, { useState, useMemo } from 'react';
import { products } from '../../data';
import './Product.css';

const allCategories = ['barchasi', ...new Set(products.map(p => p.category))];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('barchasi');

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'barchasi') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="products-page">
            <div className="page-header" data-aos="fade-in">
                <h1 className='bg-white'>Bizning Kolleksiyamiz</h1>
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
                        <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={index * 50}>
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
        </div>
    );
};

export default Products;