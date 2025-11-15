import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/sections/Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const skillsRef = useRef(null);

  const portfolioSkills = {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "jQuery", 
      "Redux", "Bootstrap", "Vite", "GSAP", "Framer Motion"
    ],
    backend: [
      "Node.js", "Python", "Java", "JSP", "REST APIs", 
      "MySQL", "MongoDB", "Mongoose", "Hibernate"
    ],
    tools: [
      "Git", "GitHub", "GitLab", "Bitbucket", "npm", "pip",
      "Visual Studio Code", "Postman", "Chrome DevTools", 
      "Jira", "Notion", "Obsidian"
    ],
    deployment: [
      "Netlify", "Vercel", "GitHub Actions"
    ],
    mobileSystems: [
      "Magisk", "KernelSU", "Xposed Framework", "ADB & Fastboot"
    ]
  };

  const categoryColors = {
    frontend: '#667eea',
    backend: '#f093fb', 
    tools: '#4facfe',
    deployment: '#43e97b',
    mobileSystems: '#fa709a'
  };

  const categoryIcons = {
    frontend: '⚡',
    backend: '⚙️',
    tools: '🛠️',
    deployment: '🚀',
    mobileSystems: '📱'
  };

  const getCategoryName = (category) => {
    const names = {
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools & Platforms',
      deployment: 'Deployment',
      mobileSystems: 'Mobile Systems'
    };
    return names[category] || category;
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.category-sidebar', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3
      });

      gsap.from('.skills-content', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">
          Technical Skills
        </h2>

        <div className="skills-layout">
          {/* Left Sidebar - Category Selection */}
          <div className="category-sidebar">
            {Object.keys(portfolioSkills).map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                style={{ 
                  '--category-color': categoryColors[category],
                  '--category-gradient': `linear-gradient(135deg, ${categoryColors[category]}, ${categoryColors[category]}99)`
                }}
              >
                <span className="category-icon">{categoryIcons[category]}</span>
                <span className="category-name">{getCategoryName(category)}</span>
                <span className="skill-count">{portfolioSkills[category].length}</span>
              </button>
            ))}
          </div>

          {/* Right Content - Skills Tile */}
          <div className="skills-content">
            <div 
              className="skills-tile"
              style={{ 
                '--category-color': categoryColors[activeCategory],
                '--category-gradient': `linear-gradient(135deg, ${categoryColors[activeCategory]}, ${categoryColors[activeCategory]}99)`
              }}
            >
              <div className="tile-header">
                <div className="header-icon">{categoryIcons[activeCategory]}</div>
                <h3 className="header-title">{getCategoryName(activeCategory)}</h3>
                <div className="header-count">{portfolioSkills[activeCategory].length} skills</div>
              </div>

              <div className="skills-grid">
                {portfolioSkills[activeCategory].map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-bullet">•</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;