import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/Skills.css';

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
    const categoryRefs = useRef([]);
    const [animatedCategories, setAnimatedCategories] = useState(new Set());
    
    // Set up refs for each category
    const setCategoryRef = (index) => (element) => {
        categoryRefs.current[index] = element;
    };

    // Multiple observers for each category
    useEffect(() => {
        const observers = [];
        
        categoryRefs.current.forEach((categoryElement, index) => {
            if (!categoryElement) return;
            
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setAnimatedCategories(prev => new Set([...prev, index]));
                    }
                },
                { 
                    threshold: 0.3,
                    rootMargin: '0px 0px -100px 0px'
                }
            );
            
            observer.observe(categoryElement);
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    // UPDATED: Animation effect with CSS integration
    useEffect(() => {
        animatedCategories.forEach(categoryIndex => {
            const categoryElement = categoryRefs.current[categoryIndex];
            if (!categoryElement) return;

            const skillItems = categoryElement.querySelectorAll('.skill-item');
            const skillBars = categoryElement.querySelectorAll('.skill-progress');
            
            skillItems.forEach((skillItem, itemIndex) => {
                if (!skillItem.classList.contains('in-view')) {
                    skillItem.classList.add('in-view');
                }
            });

            skillBars.forEach((bar, barIndex) => {
                if (!bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    bar.style.setProperty('--skill-level', width); // Set CSS variable
                    bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.classList.add('animated');
                    }, barIndex * 150);
                }
            });
        });
    }, [animatedCategories]);

    // Helper function to get skill level class
    const getSkillLevelClass = (level) => {
        if (level >= 80) return 'advanced';
        if (level >= 60) return 'intermediate';
        return 'beginner';
    };

    return (
        <section id="skills" ref={skillsRef} className={`skills-section`}>
            <div className="skills-container">
                <h2 className="skills-title">
                    Technical Skills
                </h2>
                
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div 
                            key={index} 
                            ref={setCategoryRef(index)}
                            className="skill-category"
                        >
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