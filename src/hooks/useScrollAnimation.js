import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimation = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    let skillAnimation;

    const initAnimations = () => {
      // Kill any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Section animations
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

      // Skill bars animation - wait for DOM to be fully ready
      skillAnimation = setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (skillBars.length > 0) {
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
              gsap.fromTo(bar,
                { width: '0%' },
                {
                  width: width,
                  duration: 1.5,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: bar.closest('.skill-category') || bar.parentElement.parentElement,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                  },
                }
              );
            }
          });
        }
      }, 1000); // Increased delay for AI components

      // Project cards animation
      const projectCards = document.querySelectorAll('.project-card');
      if (projectCards.length > 0) {
        projectCards.forEach((card, i) => {
          gsap.fromTo(card,
            {
              y: 60,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: i * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Refresh ScrollTrigger after all animations are set up
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);
    };

    // Wait a bit longer for AI components to initialize
    const initTimer = setTimeout(initAnimations, 500);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(skillAnimation);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return sectionRefs;
};