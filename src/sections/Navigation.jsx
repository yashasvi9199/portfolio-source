import React, { useState } from 'react';
import '../styles/sections/Navigation.css';

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' }
];

const Navigation = ({ currentSection = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derive scrolled state from section index (scrolled = not on hero)
  const isScrolled = currentSection > 0;

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" className="logo-link">
            <span className="logo-text">YH</span>
          </a>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`nav-link ${currentSection === index ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;