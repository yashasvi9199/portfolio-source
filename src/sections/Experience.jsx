import React, { useRef, useEffect, useState } from 'react';
import '../styles/sections/Experience.css';

const Experience = () => {
    const experienceRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (experienceRef.current) {
            observer.observe(experienceRef.current);
        }

        return () => {
            if (experienceRef.current) {
                observer.unobserve(experienceRef.current);
            }
        };
    }, []);

    const experiences = [
        {
            company: "Self-Employed",
            position: "Founder & Operator, Food Truck Venture",
            period: "October 2023 – March 2025",
            location: "Jaipur, India",
            achievements: [
                "Directed end-to-end operations: menu development, daily procurement, inventory management, financial bookkeeping, and customer service",
                "Excelled in high-pressure environments managing handwritten order systems and manual ledger tracking",
                "Generated ₹11,000+ sales over 2 days (₹7,000 net profit) during Navratri 2024 festival, serving ~600 customers",
                "Transitioned to focus on software engineering skill enhancement following health considerations"
            ],
            tech: ["Operations Management", "Financial Planning", "Customer Service", "Inventory Management"]
        },
        {
            company: "Appgallop Pvt. Ltd.",
            position: "Software Engineer",
            period: "February 2023 – August 2023",
            location: "Jaipur, India",
            achievements: [
                "Engineered SaaS solutions for sales management, invoicing, and operational workflows",
                "Developed robust web applications using HTML, CSS, JavaScript, Java, and Visual Studio",
                "Optimized code architecture and performance by 20%, reduced hardware costs by 7%",
                "Decreased bug rates by 25% through proactive issue resolution and minimal downtime",
                "Produced comprehensive user documentation for all developed applications"
            ],
            tech: ["HTML", "CSS", "JavaScript", "Java", "SaaS", "Visual Studio"]
        },
        {
            company: "Amazon Development Center",
            position: "Resolution Specialist",
            period: "September 2020 – January 2023",
            location: "Jaipur, India",
            achievements: [
                "Analyzed and resolved complex technical challenges for internal/external customers",
                "Created and maintained centralized portals on internal wiki during sales events",
                "Curated links and ticket-raising functionality to accelerate customer issue resolution",
                "Enhanced team efficiency through proactive documentation and process optimization initiatives",
                "Recognized for creating knowledge-sharing websites and promotions portal"
            ],
            tech: ["Technical Support", "Knowledge Management", "Process Optimization", "Documentation"]
        },
        {
            company: "Amazon Development Center",
            position: "Customer Service Associate",
            period: "June 2019 – September 2020",
            location: "Jaipur, India",
            achievements: [
                "Delivered exceptional customer support, resolving inquiries with empathy, accuracy, and diligence",
                "Received Customer Obsession Award for exceptional performance and workplace impact",
                "Awarded Trainee of the Batch as top performer among new hires",
                "Maintained high customer satisfaction ratings through effective communication"
            ],
            tech: ["Customer Service", "Problem Solving", "Communication", "Empathy"]
        }
    ];

    return (
        <section id="experience" className="experience-section" ref={experienceRef}>
            <div className="experience-container">
                <h2 className="experience-title">
                    Professional <span className="gradient-text">Journey</span>
                </h2>
                <p className="experience-subtitle">
                    My path from customer service to software engineering, building expertise with every role
                </p>

                <div className="experience-content">
                    <div className="timeline-tabs">
                        {experiences.map((exp, index) => (
                            <button
                                key={index}
                                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <span className="tab-period">{exp.period.split(' – ')[0]}</span>
                                <span className="tab-company">{exp.company}</span>
                            </button>
                        ))}
                    </div>

                    <div className="experience-details">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`experience-item ${activeTab === index ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
                            >
                                <div className="experience-header">
                                    <h3 className="position">{exp.position}</h3>
                                    <div className="company-period">
                                        <span className="company">{exp.company}</span>
                                        <span className="period">{exp.period}</span>
                                    </div>
                                    <div className="location">{exp.location}</div>
                                </div>

                                <div className="achievements">
                                    <h4>Key Achievements:</h4>
                                    <ul>
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="tech-used">
                                    <h4>Skills & Technologies:</h4>
                                    <div className="tech-tags">
                                        {exp.tech.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;