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
            company: "Skill Development Sabbatical",
            position: "Independent Full-Stack Developer & Systems Engineer",
            period: "April 2025 – Present",
            location: "Remote",
            achievements: [
                "Architected and deployed multiple production-grade applications including advanced weather dashboard and adaptive notes platform",
                "Mastered systems-level engineering through Arch Linux environment management, Git CLI workflows, and terminal-based development",
                "Developed comprehensive automation suites for Android device management using Bash, Python, ADB, and Fastboot protocols",
                "Implemented dual-boot system strategy (Arch/Windows) maintaining development flexibility and application compatibility",
                "Streamlined deployment pipelines using Vercel CLI and configured custom GitHub Pages for optimal project hosting"
            ],
            tech: ["React", "Python", "Github", "Vercel", "Deployment", "ADB" , "Data Analysis", "Systems Engineering", "Linux", "Bash", "Fastboot", "Windows"]
        },
        {
            company: "Lazy Corner (Food Truck Venture)",
            position: "Founder & Operator",
            period: "October 2023 – March 2025",
            location: "Jaipur, India",
            achievements: [
                "Engineered automated inventory management system with vendor API integration, reducing stock outages by 40%",
                "Developed QR-based contactless ordering web application with real-time Telegram bot notifications",
                "Implemented digital token system for queue management during high-volume events, serving 600+ customers efficiently",
                "Orchestrated record-breaking sales event generating ₹11,000+ revenue (₹7,000 net profit) over 2-day festival period",
                "Leveraged data analytics for menu optimization and strategic logistics planning near supplier hubs"
            ],
            tech: ["Operations Management", "Financial Planning", "Leadership", "Entrepreneurship", "Strategic Planning", "Problem Solving"]
        },
        {
            company: "Appgallop Pvt. Ltd.",
            position: "Software Engineer",
            period: "February 2023 – August 2023",
            location: "Jaipur, India",
            achievements: [
                "Led full-stack development of SaaS billing and subscription management platform using Java, React, and JavaScript",
                "Engineered critical front-end refactoring achieving 20% performance improvement in data loading and rendering",
                "Reduced critical bug resolution time by 7% through systematic analysis of persistent technical debt",
                "Spearheaded jQuery migration initiative across application, improving code consistency and mentoring team members",
                "Supported Azure DevOps pipeline deployments and contributed to admin panel with multi-level user role management"
            ],
            tech: ["Java" , "JavaScript" , "jQuery" , "React" , "SaaS Development" , "API Integration" , "Performance Optimization" , "Full-Stack Development"]
        },
        {
            company: "Amazon Development Center",
            position: "Resolution Specialist",
            period: "September 2020 – January 2023",
            location: "Remote",
            achievements: [
                "Served as technical escalation point for complex payment gateway, order fulfillment, and system integrity issues",
                "Architected internal wiki knowledge base serving 14,000+ representatives, reducing average call handle time",
                "Promoted to Subject Matter Expert (SME), training 7+ teams on advanced troubleshooting and system protocols",
                "Maintained 88%+ customer satisfaction score as top performer during high-volume sales events",
                "Developed definitive ticket routing guide streamlining cross-departmental resolution paths"
            ],
            tech: ["Customer Relationship Management (CRM)" , "Technical Support Fundamentals" , "Problem-Solving" , "Communication Skills" , "De-escalation Techniques" , "Quality Assurance"]
        },
        {
            company: "Amazon Development Center",
            position: "Customer Service Associate",
            period: "June 2019 – September 2020",
            location: "Remote",
            achievements: [
                "Delivered exceptional frontline customer support, mastering Amazon's internal systems and CRM platforms",
                "Awarded Customer Obsession Award for outstanding performance and positive workplace impact",
                "Achieved rapid promotion to Resolution Specialist within 16 months based on technical aptitude",
                "Maintained high customer satisfaction ratings through effective communication"
            ],
            tech: ["Customer Service" , "Problem Solving" , "Communication" , "Customer Relationship Management (CRM)", "Empathy"]
        }
    ];

    return (
        <section id="experience" ref={experienceRef} className={`experience-section`} >
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