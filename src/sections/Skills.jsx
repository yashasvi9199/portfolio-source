import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            category: "Frontend Technologies",
            skills: [
                { name: "JavaScript", level: 69 },
                { name: "React", level: 88 },
                { name: "HTML5", level: 88 },
                { name: "CSS3", level: 88 },
                { name: "jQuery", level: 68 },
                { name: "Redux", level: 72 }
            ]
        },
        {
            category: "Backend & Databases", 
            skills: [
                { name: "Node.js", level: 82 },
                { name: "Java", level: 74 },
                { name: "Python", level: 70 },
                { name: "MySQL", level: 80 },
                { name: "MongoDB", level: 70 },
                { name: "AJAX", level: 68 }
            ]
        },
        {
            category: "Tools & Platforms",
            skills: [
                { name: "GitHub", level: 92 },
                { name: "Docker", level: 93 },
                { name: "Postman", level: 89 },
                { name: "Jira", level: 91 },
                { name: "Linux", level: 78 },
                { name: "Visual Studio", level: 88 }
            ]
        }
    ];
    
    const skillsRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 } // Changed from 0.3 to 0.5 as you mentioned
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            if (skillsRef.current) {
                observer.unobserve(skillsRef.current);
            }
        };
    }, []);

    // Animation effect
    useEffect(() => {
        if (!isInView) return;

        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Reset all bars
        skillBars.forEach(bar => {
            bar.style.width = '0%';
            bar.style.transition = 'none';
        });

        // Force reflow and animate
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                }
            });
        }, 100);

    }, [isInView]);

    // Helper function to get skill level class
    const getSkillLevelClass = (level) => {
        if (level >= 80) return 'advanced';
        if (level >= 60) return 'intermediate';
        return 'beginner';
    };

    return (
        <section ref={skillsRef} id="skills" className="skills-section">
            <div className="skills-container">
                <h2 className="skills-title">
                    Technical Skills
                </h2>
                
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar-container">
                                            <div 
                                                className={`skill-progress ${getSkillLevelClass(skill.level)}`}
                                                data-width={`${skill.level}%`}
                                                style={{ width: '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;