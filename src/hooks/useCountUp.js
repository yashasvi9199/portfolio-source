import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Animates a number from 0 to target when element becomes visible.
 * @param {number} target - The final number value
 * @param {string} suffix - Suffix to append (e.g., '%', '+', 'K')
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {number} delay - Delay before animation starts in ms (default: 0)
 * @returns {{ ref: React.RefObject, value: string }}
 */
export const useCountUp = (target, suffix = '', duration = 2000, delay = 0) => {
    const [value, setValue] = useState(`0${suffix}`);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now() + delay;
        const isFloat = target % 1 !== 0;

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            if (elapsed < 0) {
                requestAnimationFrame(step);
                return;
            }

            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isFloat) {
                setValue(`${current.toFixed(1)}${suffix}`);
            } else {
                setValue(`${Math.floor(current)}${suffix}`);
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setValue(`${target}${suffix}`);
            }
        };

        requestAnimationFrame(step);
    }, [target, suffix, duration, delay]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    return { ref, value };
};

export default useCountUp;
