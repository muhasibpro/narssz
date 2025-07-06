// src/components/GoldCardSlider.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './GoldCardSlider.css';

const GoldCardSlider = () => {
    // initialItems, state'lar va funksiyalarning deyarli hammasi o'zgarishsiz qoladi
    const initialItems = [
        { id: 1, imageUrl: 'https://muhasib.pro/uploads/images/2025-07-02 21.34.03.jpg', title: 'Stol', description:`Shohona korinish va mukammal struktutra` },
        { id: 2, imageUrl: 'https://muhasib.pro/uploads/images/2025-07-02 21.32.06.jpg', title: 'King Oatsim stoli', description: `Kelajakni shakllantiruvchi san'at asari .` },
        { id: 3, imageUrl: 'https://muhasib.pro/uploads/images/2025-07-02 21.32.25.jpg', title: 'Stul', description: 'Tilla rang (oltin rang) azaldan boylik, muvaffaqiyat, hashamat va yuksak maqom ramzi hisoblangan.' },
        { id: 4, imageUrl: 'https://muhasib.pro/uploads/images/2025-07-02 21.34.03.jpg', title: 'Stol', description: `Hashamatli Ko'rinish: Har qanday oddiy xonaga ham boy va ko'rkam ko'rinish beradi.. ` },
        { id: 5, imageUrl: 'https://muhasib.pro/uploads/images/2025-07-02 21.33.51.jpg', title: 'Servant ', description: 'Uch qavatli  ' },
    ];

    const [items, setItems] = useState(initialItems);
    const sliderRef = useRef(null);
    const itemRefs = useRef([]);
    const [isDown, setIsDown] = useState(false);
    const startX = useRef(0);
    const walk = useRef(0);
    const dragDistance = useRef(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

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

    useEffect(() => {
        const loadShow = () => {
            const currentItems = itemRefs.current.filter(Boolean);
            if (currentItems.length === 0) return;

            currentItems.forEach(item => {
                item.style.transition = 'none';
                item.style.transform = 'none';
                item.style.zIndex = 'auto';
                item.style.filter = 'none';
                item.style.opacity = '0';
            });

            if (currentItems[0]) {
                currentItems[0].style.transform = 'none';
                currentItems[0].style.zIndex = '1';
                currentItems[0].style.filter = 'none';
                currentItems[0].style.opacity = '1';
                currentItems[0].style.transition = 'transform 0.5s, opacity 0.5s, filter 0.5s, z-index 0.5s';
            }

            const offset = 180;
            const scaleFactor = 0.15;
            const blurAmount = 3;
            const opacityFade = 0.7;

            for (let i = 1; i < currentItems.length; i++) {
                const item = currentItems[i];
                if (!item) continue;
                const stt = i;
                item.style.transform = `translateX(${offset * stt}px) scale(${1 - scaleFactor * stt}) perspective(16px) rotateY(-1deg)`;
                item.style.zIndex = String(-stt);
                item.style.filter = `blur(${blurAmount * stt}px)`;
                item.style.opacity = stt > 2 ? '0' : String(opacityFade - (stt * 0.1));
                item.style.transition = 'transform 0.5s, opacity 0.5s, filter 0.5s, z-index 0.5s';
            }
            
            if (currentItems.length > 1) {
                const lastItem = currentItems[currentItems.length - 1];
                if(lastItem) {
                    const stt = 1;
                    lastItem.style.transform = `translateX(${-offset * stt}px) scale(${1 - scaleFactor * stt}) perspective(16px) rotateY(1deg)`;
                    lastItem.style.zIndex = String(-stt);
                    lastItem.style.filter = `blur(${blurAmount * stt}px)`;
                    lastItem.style.opacity = String(opacityFade - (stt * 0.1));
                    lastItem.style.transition = 'transform 0.5s, opacity 0.5s, filter 0.5s, z-index 0.5s';
                }
            }
        };
        loadShow();
    }, [items]);

    const handleMouseDown = (e) => {
        setIsDown(true);
        dragDistance.current = 0;
        startX.current = (e.pageX || e.touches[0].pageX) - (sliderRef.current ? sliderRef.current.offsetLeft : 0);
    };
    const handleMouseUp = () => {
        setIsDown(false);
        if (walk.current < -100) {
            setItems(prevItems => [...prevItems.slice(1), prevItems[0]]);
        } else if (walk.current > 100) {
            setItems(prevItems => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
        }
        walk.current = 0;
    };
    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - (sliderRef.current ? sliderRef.current.offsetLeft : 0);
        walk.current = (x - startX.current);
        dragDistance.current = Math.abs(walk.current);
    };

    const handleItemClick = (item, index) => {
        if (dragDistance.current > 10) return;
        if (index === 0) {
            setSelectedItem(item);
            const originalIndex = initialItems.findIndex(initialItem => initialItem.id === item.id);
            setCurrentLightboxIndex(originalIndex);
        }
    };

    const closeLightbox = () => setSelectedItem(null);

    const showNext = (e) => {
        e.stopPropagation();
        const nextIndex = (currentLightboxIndex + 1) % initialItems.length;
        setSelectedItem(initialItems[nextIndex]);
        setCurrentLightboxIndex(nextIndex);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        const prevIndex = (currentLightboxIndex - 1 + initialItems.length) % initialItems.length;
        setSelectedItem(initialItems[prevIndex]);
        setCurrentLightboxIndex(prevIndex);
    };


    return (
        <div className="gold-card-slider-container">
            <div
                className="slider"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleMouseMove}
            >
                {items.map((item, index) => (
                    <div
                        className="item"
                        key={item.id}
                        ref={el => itemRefs.current[index] = el}
                        onClick={() => handleItemClick(item, index)}
                    >
                        <img src={item.imageUrl} alt={item.title} />
                        <div className="text-overlay">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ O'ZGARISH: Lightbox JSX strukturasi to'liq yangilandi */}
            {selectedItem && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="close-btn" onClick={closeLightbox}><FaTimes /></button>

                    {/* Chap tarafda chiqadigan ma'lumotlar paneli */}
                    <div className="lightbox-info-pane">
                        <h2 className="lightbox-title">{selectedItem.title}</h2>
                        <p className="lightbox-description">{selectedItem.description}</p>
                    </div>

                    {/* O'ng tarafda chiqadigan rasm paneli */}
                    <div className="lightbox-image-pane">
                        <img src={selectedItem.imageUrl} alt={selectedItem.title} />
                    </div>

                    {/* Navigatsiya tugmalari avvalgidek qoladi */}
                    <button className="nav-btn prev" onClick={showPrev}><FaArrowLeft /></button>
                    <button className="nav-btn next" onClick={showNext}><FaArrowRight /></button>
                </div>
            )}
        </div>
    );
};

export default GoldCardSlider;