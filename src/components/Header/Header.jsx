import React, { useState, useEffect } from 'react';
// react-scroll kutubxonasidan 'Link' komponentini import qilamiz
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollProps = {
        spy: true,
        smooth: true,
        duration: 500,
        offset: -80,
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="navbar">
                    <Link to="home" {...scrollProps} className="logo" onClick={closeMenu}>
                        <div className="logo-main">MixInfo</div>
                        <div className="logo-tagline">Furniture for Everyone</div>
                    </Link>

                    <div className="menu-icon" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        {/* Har bir link 'to' orqali kerakli section ID'siga ishora qiladi */}
                        <Link activeClass="active" to="home" {...scrollProps} onClick={closeMenu} className="nav-link">Home</Link>
                        <Link activeClass="active" to="about" {...scrollProps} onClick={closeMenu} className="nav-link">About</Link>
                        <Link activeClass="active" to="products" {...scrollProps} onClick={closeMenu} className="nav-link">Products</Link>
                        <Link activeClass="active" to="gallery" {...scrollProps} onClick={closeMenu} className="nav-link">Gallery</Link>
                        <Link activeClass="active" to="contact" {...scrollProps} onClick={closeMenu} className="nav-link">Contact</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;