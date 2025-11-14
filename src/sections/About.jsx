import React, { useRef, useEffect, useState } from 'react';
import '../styles/sections/About.css';

const About = () => {
    const aboutRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    const stats = [
        { number: "3+", label: "Years Experience" },
        { number: "20+", label: "Projects Completed" },
        { number: "5", label: "Technologies" },
        { number: "100%", label: "Client Satisfaction" }
    ];

    return (
        <section id="about" className="about-section" ref={aboutRef}>
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="about-title">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        
                        <div className="about-description">
                            <p>
                                I'm a passionate <strong>AI Engineer & Quantum Developer</strong> with over 3 years of experience 
                                in building cutting-edge web applications and intelligent systems. My journey spans from 
                                enterprise solutions at <strong>Jio Marketplace</strong> and <strong>Amazon</strong> to innovative AI projects that push the 
                                boundaries of technology.
                            </p>
                            
                            <p>
                                I specialize in creating seamless user experiences with modern technologies like 
                                <strong> React, Node.js, Python, and AI/ML integrations</strong>. My work focuses on 
                                building scalable, performant applications that solve real-world problems.
                            </p>

                            <p>
                                When I'm not coding, I'm exploring the fascinating world of <strong>quantum computing</strong> 
                                and how it can revolutionize web technologies. I believe in continuous learning and 
                                staying at the forefront of technological innovation.
                            </p>
                        </div>

                        <div className="about-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="about-cta">
                            <a href="#contact" className="cta-button primary">
                                Let's Work Together
                            </a>
                            <a href="#projects" className="cta-button secondary">
                                View My Work
                            </a>
                        </div>
                    </div>

                    <div className="about-visual">
                        <div className="visual-card">
                            <div className="code-animation">
                                <div className="code-line">class Developer extends Engineer</div>
                                <div className="code-line">  constructor()</div>
                                <div className="code-line">    this.skills = ["AI/ML", "Quantum", "Web Dev"]</div>
                                <div className="code-line">    this.passion = "Innovation"</div>
                                <div className="code-line">  buildFuture()</div>
                                <div className="code-line">    return "Amazing Experiences"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;