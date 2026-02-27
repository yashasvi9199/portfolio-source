import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

/**
 * Full-page snap scroll system using GSAP Observer.
 * Hijacks native scroll, animates sections in/out with slide transitions.
 *
 * @param {number} totalSections - Total number of scrollable sections
 * @returns {{ currentSection, goToSection, sectionWrapperRef }}
 */
export const useFullPageScroll = (totalSections) => {
    const [currentSection, setCurrentSection] = useState(0);
    const sectionWrapperRef = useRef(null);
    const isAnimating = useRef(false);
    const currentRef = useRef(0);

    const goToSection = useCallback((index, immediate = false) => {
        if (index < 0 || index >= totalSections) return;
        if (isAnimating.current && !immediate) return;

        isAnimating.current = true;
        currentRef.current = index;
        setCurrentSection(index);

        const wrapper = sectionWrapperRef.current;
        if (!wrapper) {
            isAnimating.current = false;
            return;
        }

        const sections = wrapper.querySelectorAll('.fp-section');
        const target = sections[index];
        if (!target) {
            isAnimating.current = false;
            return;
        }

        const duration = immediate ? 0 : 0.8;

        gsap.to(wrapper, {
            y: -index * window.innerHeight,
            duration,
            ease: 'power2.inOut',
            onComplete: () => {
                isAnimating.current = false;
            },
        });

        // Safety: force-clear animating flag after max duration + buffer
        setTimeout(() => {
            isAnimating.current = false;
        }, (duration + 0.5) * 1000);
    }, [totalSections]);

    // Observer for wheel / touch / keyboard
    useEffect(() => {
        const wrapper = sectionWrapperRef.current;
        if (!wrapper) return;

        // Set initial transform
        gsap.set(wrapper, { y: 0 });

        // Check if a section has internal scrollable content
        const canSectionScroll = (direction) => {
            const sections = wrapper.querySelectorAll('.fp-section');
            const current = sections[currentRef.current];
            if (!current) return false;

            const scrollables = current.querySelectorAll('.fp-overflow > *');
            if (scrollables.length === 0) return false;

            for (const el of scrollables) {
                const { scrollTop, scrollHeight, clientHeight } = el;
                if (direction === 'down' && scrollTop + clientHeight < scrollHeight - 2) return true;
                if (direction === 'up' && scrollTop > 2) return true;
            }
            return false;
        };

        const goPrev = () => {
            if (isAnimating.current) return;
            if (canSectionScroll('up')) return;
            if (currentRef.current > 0) {
                goToSection(currentRef.current - 1);
            }
        };

        const goNext = () => {
            if (isAnimating.current) return;
            if (canSectionScroll('down')) return;
            if (currentRef.current < totalSections - 1) {
                goToSection(currentRef.current + 1);
            }
        };

        const observer = Observer.create({
            target: document.documentElement,
            type: 'wheel,touch',
            tolerance: 10,
            onDown: goNext,
            onUp: goPrev,
            preventDefault: true,
        });

        // Keyboard navigation
        const handleKeyDown = (e) => {
            if (isAnimating.current) return;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    goNext();
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    goPrev();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    goToSection(totalSections - 1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Handle window resize — reposition to current section
        const handleResize = () => {
            goToSection(currentRef.current, true);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            observer.kill();
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, [totalSections, goToSection]);

    return { currentSection, goToSection, sectionWrapperRef };
};

export default useFullPageScroll;
