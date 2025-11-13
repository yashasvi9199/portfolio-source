import React, { useState, useRef, useEffect } from 'react';
import '../styles/sections/Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const projectCategories = [
        { id: 'all', name: 'All Projects' },
        { id: 'ai-ml', name: 'AI/ML' },
        { id: 'web', name: 'Web Development' },
        { id: 'tools', name: 'Professional Tools' }
    ];

    const projects = [
        // Professional Projects
        {
            id: 1,
            title: "Jio Business Marketplace",
            category: "tools",
            description: "Developed UI/backend integration with third-party APIs for Jio's business marketplace platform. Contributed to JioCloud Go Live and General Availability projects.",
            detailedDescription: "Led the integration of third-party APIs for Jio's enterprise marketplace, ensuring seamless data flow between frontend and backend systems. Played key role in JioCloud Go Live project with certificate recognition.",
            tech: ["HTML5", "JavaScript", "AJAX", "REST APIs", "UI Integration", "Backend Services"],
            githubLink: "#",
            liveDemo: "#",
            image: "/api/placeholder/400/250",
            featured: true,
            professional: true,
            achievement: "Certificate of Recognition for JioCloud Go Live project"
        },
        {
            id: 2,
            title: "Amazon Internal Wiki Systems",
            category: "tools", 
            description: "Created and maintained centralized knowledge-sharing portals and promotions portal on internal wiki.",
            detailedDescription: "Developed comprehensive internal wiki systems that enhanced team efficiency by 30% during peak sales events. Implemented curated links and streamlined ticket-raising functionality that reduced resolution time by 25%.",
            tech: ["Internal Wiki", "Knowledge Management", "Process Optimization", "Documentation"],
            githubLink: "#",
            liveDemo: "#",
            image: "/api/placeholder/400/250",
            featured: true,
            professional: true,
            achievement: "Recognized for creating knowledge-sharing websites and promotions portal"
        },
        {
            id: 3,
            title: "SaaS Solutions - Appgallop",
            category: "tools",
            description: "Engineered SaaS solutions for sales management, invoicing, and operational workflows.",
            detailedDescription: "Architected and developed scalable SaaS solutions that optimized code performance by 20% and reduced hardware costs by 7%. Implemented robust invoicing and sales management systems used by multiple clients.",
            tech: ["HTML", "CSS", "JavaScript", "Java", "Visual Studio", "SaaS"],
            githubLink: "#",
            liveDemo: "#",
            image: "/api/placeholder/400/250",
            professional: true,
            achievement: "Reduced bug rates by 25% through proactive issue resolution"
        },

        // GitHub Projects
        {
            id: 4,
            title: "React Notes Dashboard",
            category: "web",
            description: "Interactive notes application with dashboard functionality and modern UI components.",
            detailedDescription: "Full-featured notes application with real-time updates, categorization, search functionality, and responsive design. Built with React hooks and modern CSS for optimal user experience.",
            tech: ["React", "JavaScript", "CSS3", "Local Storage", "UI Components"],
            githubLink: "https://github.com/yashasvi9199/react-notes-dashboard",
            liveDemo: "https://yashasvi9199.github.io/react-notes-dashboard/",
            image: "/api/placeholder/400/250",
            featured: true
        },
        {
            id: 5,
            title: "Ecommerce Platform",
            category: "web",
            description: "Full-stack ecommerce application with user authentication and database integration.",
            detailedDescription: "Complete ecommerce solution featuring user authentication, product catalog management, shopping cart functionality, and secure payment integration. Built with MERN stack for optimal performance.",
            tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
            githubLink: "https://github.com/yashasvi9199/ecommerce",
            liveDemo: "#",
            image: "/api/placeholder/400/250",
            featured: true
        },
        {
            id: 6,
            title: "React.js Projects Collection",
            category: "web",
            description: "Collection of React applications with modern UI components and state management.",
            detailedDescription: "Comprehensive collection of React projects demonstrating proficiency in hooks, context API, component lifecycle, and modern development practices. Includes various UI patterns and interactive features.",
            tech: ["React", "JavaScript", "CSS3", "HTML5", "Context API"],
            githubLink: "https://github.com/yashasvi9199/React.js",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 7,
            title: "Python Applications",
            category: "ai-ml",
            description: "Various Python applications including data analysis and automation scripts.",
            detailedDescription: "Diverse Python projects showcasing data analysis with Pandas, web development with Flask, automation scripts, and backend services. Demonstrates strong problem-solving skills with Python.",
            tech: ["Python", "Pandas", "NumPy", "Flask", "SQLite"],
            githubLink: "https://github.com/yashasvi9199/python",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 8,
            title: "Node.js Learning Projects",
            category: "web",
            description: "Backend development projects with Node.js including REST APIs and authentication.",
            detailedDescription: "Comprehensive Node.js learning journey including REST API development, authentication systems, database integration with MongoDB, and server-side rendering. Focus on scalable backend architecture.",
            tech: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
            githubLink: "https://github.com/yashasvi9199/learn-node-js",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 9,
            title: "Weather Application",
            category: "web",
            description: "Real-time weather application with location detection and forecast data.",
            detailedDescription: "Feature-rich weather application integrating with weather APIs, geolocation services, and providing detailed forecasts with beautiful UI. Responsive design works seamlessly across all devices.",
            tech: ["React", "API Integration", "CSS3", "Geolocation"],
            githubLink: "https://github.com/yashasvi9199/weather-app",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        }
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <h2 className="projects-title">Featured Projects</h2>
                <p className="projects-subtitle">
                    Building scalable solutions with modern web technologies and enterprise tools
                </p>
                
                <div className="projects-filter">
                    {projectCategories.map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="flip-hint">
                    <i className="fas fa-hand-pointer"></i>
                    Click on project cards to flip and see more details
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div 
            ref={cardRef}
            className={`project-card ${project.featured ? 'featured' : ''} ${project.professional ? 'professional' : ''} ${isVisible ? 'visible' : ''} ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="card-inner">
                {/* Front of Card */}
                <div className="card-front">
                    {project.professional && <div className="professional-badge">Professional</div>}
                    {project.featured && !project.professional && <div className="featured-badge">Featured</div>}
                    
                    <div className="project-image">
                        <img src={project.image} alt="" />
                        <div className="project-overlay">
                            <div className="project-links">
                                {project.githubLink !== "#" && (
                                    <a href={project.githubLink} className="project-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <i className="fab fa-github"></i>
                                    </a>
                                )}
                                {project.liveDemo !== "#" && (
                                    <a href={project.liveDemo} className="project-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        
                        <div className="project-tech">
                            {project.tech.slice(0, 4).map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                            {project.tech.length > 4 && (
                                <span className="tech-tag more">+{project.tech.length - 4} more</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back of Card */}
                <div className="card-back">
                    <div className="back-content">
                        <h3 className="back-title">{project.title}</h3>
                        <p className="back-description">{project.detailedDescription}</p>
                        
                        {project.achievement && (
                            <div className="project-achievement">
                                <i className="fas fa-trophy"></i>
                                {project.achievement}
                            </div>
                        )}
                        
                        <div className="full-tech-stack">
                            <h4>Tech Stack:</h4>
                            <div className="tech-tags-full">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="back-links">
                            {project.githubLink !== "#" && (
                                <a href={project.githubLink} className="back-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <i className="fab fa-github"></i>
                                    View Code
                                </a>
                            )}
                            {project.liveDemo !== "#" && (
                                <a href={project.liveDemo} className="back-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <i className="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;