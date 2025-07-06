import React, { useState, useEffect } from 'react';
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        closeMenu();
    };

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
                    <div className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                        <img className='logo__image' src="https://muhasib.pro/uploads/images/Tilla.png" alt="Logo" />
                    </div>

                    <div className="menu-icon" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <div className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
                        <div className="nav__link" onClick={scrollToTop}>Home</div>
                        <Link activeClass="active" to="about" {...scrollProps} onClick={closeMenu} className="nav__link">About</Link>
                        <Link activeClass="active" to="products" {...scrollProps} onClick={closeMenu} className="nav__link">Products</Link>
                        <Link activeClass="active" to="gallery" {...scrollProps} onClick={closeMenu} className="nav__link">Gallery</Link>
                        <Link activeClass="active" to="contact" {...scrollProps} onClick={closeMenu} className="nav__link">Contact</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;