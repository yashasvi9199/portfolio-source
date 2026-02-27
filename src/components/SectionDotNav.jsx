import React from 'react';
import '../styles/fullpage.css';

const sectionLabels = [
    'Home',
    'About',
    'Skills',
    'Projects',
    'Experience',
    'Achievements',
    'Contact',
];

const SectionDotNav = ({ currentSection, goToSection, total }) => {
    return (
        <nav className="fp-dot-nav" aria-label="Section navigation">
            {sectionLabels.slice(0, total).map((label, index) => (
                <button
                    key={index}
                    className={`fp-dot ${currentSection === index ? 'active' : ''}`}
                    onClick={() => goToSection(index)}
                    aria-label={`Go to ${label}`}
                    title={label}
                >
                    <span className="fp-dot-inner" />
                    <span className="fp-dot-label">{label}</span>
                </button>
            ))}
        </nav>
    );
};

export default SectionDotNav;
