import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight Bootstrap-style Carousel with auto-play
 * @param {number} interval - Auto-play interval in milliseconds (default 4000)
 * @param {string} id - Unique ID for the carousel
 * @param {React.ReactNode} children - Carousel content
 */
export const SimpleCarousel = ({ interval = 4000, id, children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    // Get total number of slides from carousel-item children
    const slides = useRef([]);

    useEffect(() => {
        if (!carouselRef.current) return;
        slides.current = Array.from(carouselRef.current.querySelectorAll('.carousel-item'));
    }, [children]);

    const goToSlide = (index) => {
        if (!slides.current.length) return;
        const nextIndex = ((index % slides.current.length) + slides.current.length) % slides.current.length;
        setActiveIndex(nextIndex);
    };

    const nextSlide = () => {
        goToSlide(activeIndex + 1);
    };

    const prevSlide = () => {
        goToSlide(activeIndex - 1);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!interval || !slides.current.length) return;

        intervalRef.current = setInterval(() => {
            nextSlide();
        }, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeIndex, interval]);

    // Update active class on slides
    useEffect(() => {
        slides.current.forEach((slide, idx) => {
            if (idx === activeIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicators
        if (carouselRef.current) {
            const indicators = carouselRef.current.querySelectorAll('.carousel-indicators button');
            indicators.forEach((indicator, idx) => {
                if (idx === activeIndex) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.removeAttribute('aria-current');
                }
            });
        }
    }, [activeIndex]);

    // Handle indicator clicks
    useEffect(() => {
        if (!carouselRef.current) return;

        const indicators = carouselRef.current.querySelectorAll('.carousel-indicators button');
        const handleIndicatorClick = (idx) => {
            goToSlide(idx);
        };

        indicators.forEach((indicator, idx) => {
            const handler = () => handleIndicatorClick(idx);
            indicator.addEventListener('click', handler);
            indicator._handler = handler; // Store reference for cleanup
        });

        return () => {
            indicators.forEach((indicator) => {
                if (indicator._handler) {
                    indicator.removeEventListener('click', indicator._handler);
                }
            });
        };
    }, [children]);

    // Handle prev/next button clicks
    useEffect(() => {
        if (!carouselRef.current) return;

        const prevBtn = carouselRef.current.querySelector('[data-bs-slide="prev"]');
        const nextBtn = carouselRef.current.querySelector('[data-bs-slide="next"]');

        const prevHandler = (e) => {
            e.preventDefault();
            prevSlide();
        };

        const nextHandler = (e) => {
            e.preventDefault();
            nextSlide();
        };

        if (prevBtn) prevBtn.addEventListener('click', prevHandler);
        if (nextBtn) nextBtn.addEventListener('click', nextHandler);

        return () => {
            if (prevBtn) prevBtn.removeEventListener('click', prevHandler);
            if (nextBtn) nextBtn.removeEventListener('click', nextHandler);
        };
    }, [activeIndex]);

    return <div ref={carouselRef}>{children}</div>;
};
