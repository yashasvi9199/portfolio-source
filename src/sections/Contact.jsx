import React, { useRef, useEffect, useState } from 'react';
import '../styles/sections/Contact.css';

const Contact = () => {
    const contactRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: 'fas fa-envelope',
            label: 'Email',
            value: 'yashaldiya@gmail.com',
            link: 'mailto:yashaldiya@gmail.com'
        },
        {
            icon: 'fas fa-phone',
            label: 'Phone',
            value: '+91 7976401542',
            link: 'tel:+917976401542'
        },
        {
            icon: 'fab fa-github',
            label: 'GitHub',
            value: 'github.com/yashasvi9199',
            link: 'https://github.com/yashasvi9199'
        },
        {
            icon: 'fas fa-map-marker-alt',
            label: 'Location',
            value: 'Jaipur, India',
            link: '#'
        }
    ];

    return (
        <section id="contact" className="contact-section" ref={contactRef}>
            <div className="contact-container">
                <h2 className="contact-title">
                    Get In <span className="gradient-text">Touch</span>
                </h2>
                <p className="contact-subtitle">
                    Ready to bring your ideas to life? Let's discuss your next project.
                </p>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="info-title">Let's Connect</h3>
                        <p className="info-description">
                            I'm always interested in new opportunities, whether it's a freelance project, 
                            collaboration, or full-time role. Don't hesitate to reach out!
                        </p>

                        <div className="contact-methods">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.link}
                                    className="contact-method"
                                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    <div className="method-icon">
                                        <i className={info.icon}></i>
                                    </div>
                                    <div className="method-details">
                                        <div className="method-label">{info.label}</div>
                                        <div className="method-value">{info.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="social-links">
                            <h4>Follow Me</h4>
                            <div className="social-icons">
                                <a href="https://github.com/yashasvi9199" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="#" className="social-link">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="#" className="social-link">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell me about your project or just say hello!"
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-button">
                                <span>Send Message</span>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div> 
            </div>
        </section>
    );
};

export default Contact;