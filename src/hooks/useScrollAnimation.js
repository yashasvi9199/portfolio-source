import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimation = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Simple section animations
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(section,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Skill bars animation - wait a bit for DOM to be ready
    setTimeout(() => {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: width,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar.closest('.skill-category'),
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, 500);

  }, []);

  return sectionRefs;
};