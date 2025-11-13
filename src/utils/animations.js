import { gsap } from 'gsap';

// Reusable animation configurations
export const fadeInUp = {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
};

export const staggerFadeIn = {
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power2.out'
};

export const scaleIn = {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  ease: 'back.out(1.7)'
};

// Pre-built animations
export const animations = {
  // Page load animations
  pageEnter: (element) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  },

  // Button hover animations
  buttonHover: (element) => {
    return gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  buttonHoverOut: (element) => {
    return gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  // Text reveal animation
  textReveal: (element) => {
    return gsap.fromTo(element,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  },

  // Pulse animation for attention
  pulse: (element) => {
    return gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  },

  // Magnetic button effect
  magnetic: (element, x, y) => {
    return gsap.to(element, {
      x: x,
      y: y,
      duration: 0.5,
      ease: 'power2.out'
    });
  },

  magneticReset: (element) => {
    return gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  }
};

// Utility functions
export const createScrollTrigger = (trigger, animation, options = {}) => {
  const defaults = {
    trigger,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false,
    ...options
  };

  return gsap.to(animation, {
    scrollTrigger: defaults
  });
};

export const createTimeline = (config = {}) => {
  return gsap.timeline({
    defaults: { ease: 'power3.out' },
    ...config
  });
};