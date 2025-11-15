import React, { useRef, useEffect, useState } from 'react';
import '../styles/sections/Contact.css';
import { useParallax } from '../hooks/useParallax';

const Contact = () => {
    const contactRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { elementRef, isRefVisible } = useParallax(0.3);
    const handleRef = (element) => {
        elementRef.current = element;
        contactRef.current = element;
        // add more refs to be used here
    }
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Your secure Vercel API endpoint
        const API_URL = 'https://portfolio-api-rust-nine.vercel.app/api/send-telegram';
        
        try {
            // 1. Send to your secure Vercel API (Telegram)
            console.log('Sending to Vercel API...');
            const apiResponse = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                })
            });
            
            console.log('API Response status:', apiResponse.status);
            const apiResult = await apiResponse.json();
            console.log('API Result:', apiResult);
            
            if (apiResult.success) {
                // 2. Also send to FormSubmit for email backup (optional)
                console.log('Sending to FormSubmit...');
                await fetch('https://formsubmit.co/ajax/yashaldiya@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        _captcha: 'false',
                        _subject: 'New Portfolio Message!'
                    })
                });
                
                setIsLoading(false);
                alert('Message sent successfully! 📧✓');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setIsLoading(false);
                alert(`Failed to send message: ${apiResult.error || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setIsLoading(false);
            alert('Failed to send message. Please check your connection.');
        }
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
        <section id="contact" ref={handleRef} className={`contact-section ${isRefVisible ? 'section-fade-in' : 'section-fade-out'}`}>
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
                                <a href="https://www.linkedin.com/in/yash-haldiya/" className="social-link">
                                    <i className="fab fa-linkedin"></i>
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

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="button-loader">
                                        <div className="loader-spinner"></div>
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <i className="fas fa-paper-plane"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div> 
            </div>
        </section>
    );
};

export default Contact;