import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaAward, FaHeadset } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { products } from '../../data';
import './Home.css';
import About from '../About/About';
import Products from '../Product/Product';
import Gallery from '../Gallery/Gallery';
import Contact from '../Contact/Contact';
import Footer from '../../components/Footer/Footer';

const sectionBackgrounds = {
    default: "url('https://muhasib.pro/uploads/images/2025-07-02 21.33.20.jpg')",
    whyUs: "url('https://muhasib.pro/uploads/images/2025-07-02 21.33.00.jpg')",
    featured: "url('https://muhasib.pro/uploads/images/2025-07-02 21.32.35.jpg')",
    about: "url('https://muhasib.pro/uploads/images/2025-07-02 21.33.51.jpg')",
    gallery: "url('https://muhasib.pro/uploads/images/2025-07-02 21.32.06.jpg')",
    cta: "url('https://muhasib.pro/uploads/images/2025-07-02%2021.30.48.jpg')"
};

const Home = () => {
    const featuredProducts = products.slice(0, 3);
    const [heroContentOpacity, setHeroContentOpacity] = useState(1);
    const [bgImage, setBgImage] = useState(sectionBackgrounds.default);

    useEffect(() => {
        const handleScroll = () => {
            setHeroContentOpacity(Math.max(0, 1 - window.scrollY / 400));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { ref: whyUsRef, inView: isWhyUsVisible } = useInView({ threshold: 0.4 });
    const { ref: featuredRef, inView: isFeaturedVisible } = useInView({ threshold: 0.4 });
    const { ref: aboutRef, inView: isAboutVisible } = useInView({ threshold: 0.4 });
    const { ref: galleryRef, inView: isGalleryVisible } = useInView({ threshold: 0.4 });
    const { ref: ctaRef, inView: isCtaVisible } = useInView({ threshold: 0.4 });

    const handleScrollToGallery = () => {
        const gallerySection = document.getElementById('products');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 1. YORDAMCHI FUNKSIYA YARATAMIZ (CONTACT UCHUN)
    const handleScrollToContact = () => {
        // `contact` section'iga bog'langan elementni `id` orqali topamiz
        const contactSection = document.getElementById('contact');
        // Agar element topilsa, unga silliq o'tamiz
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (isGalleryVisible) {
            setBgImage(sectionBackgrounds.gallery);
        } else if (isAboutVisible) {
            setBgImage(sectionBackgrounds.about);
        } else if (isCtaVisible) {
            setBgImage(sectionBackgrounds.cta);
        } else if (isFeaturedVisible) {
            setBgImage(sectionBackgrounds.featured);
        } else if (isWhyUsVisible) {
            setBgImage(sectionBackgrounds.whyUs);
        } else {
            setBgImage(sectionBackgrounds.default);
        }
    }, [isWhyUsVisible, isFeaturedVisible, isAboutVisible, isGalleryVisible, isCtaVisible]);

    return (
        <div className="home-page-wrapper">
            <section
                className="sticky-hero"
                style={{ backgroundImage: bgImage }}
            >
                <div className="hero-overlay"></div>
                <div
                    className="hero-content"
                    style={{ opacity: heroContentOpacity }}>
                    <h1 className="hero-title">Orzuyingizdagi Makonni Yarating</h1>
                    <p className="hero-subtitle">Eng yuqori sifatli materiallardan yaratilgan betakror mebellar kolleksiyasi.</p>
                    <button onClick={handleScrollToGallery} className="btn-primary">
                        Kolleksiyani Ko'rish
                    </button>
                </div>
            </section>

            <div className="content-after-hero">
                <section ref={whyUsRef} className="why-us-section solid-bg">
                    <div className="container">
                        <h2 className="section-title" data-aos="fade-up">Nega Aynan Biz?</h2>
                        <div className="features-grid">
                            <div className="feature-item" data-aos="fade-up" data-aos-delay="100"><FaAward className="feature-icon" /><h3>Yuqori Sifat</h3><p>Har bir mahsulotimiz Yevropa standartlariga javob beradi va uzoq yillar xizmat qiladi.</p></div>
                            <div className="feature-item" data-aos="fade-up" data-aos-delay="200"><FaShippingFast className="feature-icon" /><h3>Tez Yetkazib Berish</h3><p>Buyurtmangizni O'zbekiston bo'ylab eng qisqa muddatlarda yetkazib beramiz.</p></div>
                            <div className="feature-item" data-aos="fade-up" data-aos-delay="300"><FaHeadset className="feature-icon" /><h3>24/7 Qo'llab-quvvatlash</h3><p>Bizning mutaxassislarimiz har qanday savolingizga javob berishga doim tayyor.</p></div>
                        </div>
                    </div>
                </section>

                <section ref={featuredRef} className="featured-products-section transparent-bg">
                    <div className="container">
                        <h2 className="section-title text-light" data-aos="fade-up">Eng Ommabop Mahsulotlar</h2>
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={product.id * 100}><div className="product-image-container"><img src={product.img} alt={product.name} className="product-image" /></div><div className="product-info"><h3 className="product-name">{product.name}</h3><p className="product-price">{product.price}</p></div></div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={ctaRef} className="cta-section solid-bg">
                    <div className="container" data-aos="zoom-in">
                        <h2>O'z uslubingizni topishga tayyormisiz?</h2>
                        <p>Bizning dizaynerlarimiz sizga yordam berishdan mamnun bo'lishadi.</p>
                        {/* 2. TUGMANI O'ZGARTIRAMIZ */}
                        <button onClick={handleScrollToContact} className="btn-primary">Hozir Bog'lanish</button>
                    </div>
                </section>

                <section ref={aboutRef} id="about">
                    <About />
                </section>

                <section id="products">
                    <Products />
                </section>

                <section ref={galleryRef} id="gallery">
                    <Gallery />
                </section>

                {/* Mana shu section'ga scroll bo'ladi */}
                <section id="contact">
                    <Contact />
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default Home;