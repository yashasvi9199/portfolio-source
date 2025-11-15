import React from 'react';
import '../styles/sections/Footer.css';
import { useParallax } from '../hooks/useParallax';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { elementRef, isRefVisible } = useParallax(0.3);
  const handleRef = (element) => {
    elementRef.current = element;
    // add more refs to be used here
  }

  return (
    <footer ref={handleRef} className={`footer parallax-section ${isRefVisible ? 'section-fade-in' : 'section-fade-out'}`} >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <span className="logo-text">Yash Haldiya</span>
            </div>
            <p className="footer-description">
              AI Engineer & Quantum Developer passionate about building the future with cutting-edge technology.
            </p>
            
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Navigation</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
            </div>
            <div className="link-group">
              <h4>Connect</h4>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
              <a href="https://github.com/yashasvi9199" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="mailto:yashaldiya@gmail.com">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Yash Haldiya. All rights reserved.</p>
          <p>Built with React & lots of ☕</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;