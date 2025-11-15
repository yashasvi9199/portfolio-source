import { useEffect, useRef, useState } from 'react';

export const useParallax = (speed = 0.5) => {
    const elementRef = useRef(null);
    const [isRefVisible, setIsRefVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            
            // Original parallax movement (keep what was working)
            const rate = scrolled * speed;
            element.style.transform = `translateY(${rate}px)`;
            
            // NEW: Fade effects based on viewport position
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate when element enters/leaves viewport
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            // Calculate visibility ratio (0 to 1)
            const visibleHeight = Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
            const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
            
            setIsRefVisible(visibilityRatio > 0.3);
            
            // Smooth opacity based on visibility
            const opacity = Math.max(0.1, Math.min(1, visibilityRatio));
            element.style.opacity = opacity;
            
            // Optional: Add subtle scale effect
            const scale = 0.95 + (visibilityRatio * 0.05);
            element.style.transform = `translateY(${rate}px) scale(${scale})`;
        };

        // Throttle scroll events for performance (keep your existing logic)
        let ticking = false;
        const updatePosition = () => {
            handleScroll();
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updatePosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll(); // Initialize
        
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [speed]);

    return { elementRef, isRefVisible };
};