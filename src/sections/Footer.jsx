import React from 'react';
import '../styles/sections/Footer.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <span className="logo-text">Yash Haldiya</span>
              <span className="logo-dot">.</span>
            </div>
            <p className="footer-description">
              AI Engineer & Quantum Developer passionate about building the future with cutting-edge technology.
            </p>
            <div className="footer-social">
              <a href="https://github.com/yashasvi9199" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i> 
              </a>
              <a href="mailto:yashaldiya@gmail.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
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