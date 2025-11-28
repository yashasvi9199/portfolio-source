import React, { useState, useRef, useEffect } from 'react';
import '../styles/sections/Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsGridRef = useRef(null);
    const [visibleProjects, setVisibleProjects] = useState(new Set());
    
    const projectCategories = [
        { id: 'all', name: 'All Projects' },
        { id: 'ai', name: 'AI Apps' },
        { id: 'web', name: 'Web Development' },
        { id: 'edu', name: 'Learning' },
        { id: 'tools', name: 'Professional Tools' }
    ];

    const projects = [
        // Professional Projects
        {
            id: 1,
            title: "Jio Business Marketplace",
            category: "tools",
            description: "Engineered enterprise B2B marketplace with full-stack API integration and microservices architecture for JioCloud deployment.",
            detailedDescription: "Architected enterprise B2B marketplace handling 50+ third-party API integrations, reducing data synchronization latency by 40%. Implemented microservices architecture serving 10,000+ concurrent users, contributing to JioCloud's successful production deployment with 99.8% uptime.",
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
            description: "Architected scalable knowledge management systems with workflow automation and process optimization for enterprise operations.",
            detailedDescription: "Engineered knowledge management systems used by 5,000+ employees, reducing internal query resolution time by 25%. Automated workflow processes decreased manual interventions by 60% during peak sales events, enhancing operational efficiency across departments.",
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
            description: "Developed multi-tenant SaaS solutions for CRM and automated invoicing with cloud-native architecture optimization.",
            detailedDescription: "Designed multi-tenant SaaS architecture supporting 100+ concurrent clients, optimizing code performance by 20% through algorithm enhancements. Reduced server infrastructure costs by 15% while maintaining 99.5% service availability for CRM and invoicing modules.",
            tech: ["HTML", "CSS", "JavaScript", "Java", "Visual Studio", "SaaS"],
            githubLink: "#",
            liveDemo: "#",
            image: "/api/placeholder/400/250",
            professional: true,
            achievement: "Reduced bug rates by 25% through proactive issue resolution"
        },

        // ai based projects
        {
            id: 4,
            title: "FitLife AI",
            category: "ai",
            description: "Built AI-powered health analysis platform generating lifestyle reports, nutrition insights and barcode-based meal breakdown using serverless APIs.",
            detailedDescription: "AI-powered health assistant that analyzes user metrics against CDC/WHO standards and generates clear lifestyle insights. Supports meal-image calorie detection, barcode nutrition lookup and message-based reminders, all powered by optimized Vercel serverless APIs for fast responses.",
            tech: ["React", "JavaScript", "CSS3", "AI Integration", "Vercel Serverless", "Cloudinary", "Telegram Bot API"],
            githubLink: "https://github.com/yashasvi9199/Fitlife-AI",
            liveDemo: "https://yashasvi9199.github.io/Fitlife-AI/",
            image: "/api/placeholder/400/250",
            featured: true
        },
        {
            id: 5,
            title: "StyleGlow AI",
            category: "ai",
            description: "Built AI-enabled portrait analysis tool evaluating appearance, emotions, and aesthetic quality with tailored enhancement suggestions.",
            detailedDescription: "AI-driven portrait analyzer that interprets emotions, evaluates composition and identifies skin issues from user photos. Delivers quick enhancement suggestions and complementary color guidance through a fast, responsive Tailwind-powered interface backed by Vercel serverless APIs.",
            tech: ["React", "JavaScript", "Tailwind CSS", "AI Integration", "Vercel Serverless", "Cloudinary"],
            githubLink: "https://github.com/yashasvi9199/style-glow-ai",
            liveDemo: "https://yashasvi9199.github.io/style-glow-ai/",
            image: "/api/placeholder/400/250",
            featured: true
        },

        // GitHub Projects
        {
            id: 6,
            title: "React Notes Dashboard",
            category: "web",
            description: "Built responsive React notes management system with real-time synchronization and progressive web app capabilities.",
            detailedDescription: "Developed React-based notes application with real-time synchronization, reducing data persistence latency by 300ms. Implemented PWA features achieving 85% Lighthouse performance score with offline functionality and seamless user experience across devices.",
            tech: ["React", "JavaScript", "CSS3", "Local Storage", "UI Components"],
            githubLink: "https://github.com/yashasvi9199/react-notes-dashboard",
            liveDemo: "https://yashasvi9199.github.io/react-notes-dashboard/",
            image: "/api/placeholder/400/250",
            featured: true
        },
        {
            id: 5,
            title: "Weather Application",
            category: "web",
            description: "Built geolocation-enabled weather application with API integration and responsive data visualization components.",
            detailedDescription: "Created weather application integrating 3+ meteorological APIs with 95% data accuracy. Implemented geolocation services reducing location detection time by 2 seconds and responsive visualizations supporting 50+ weather parameters in real-time.",
            tech: ["React", "API Integration", "CSS3", "Geolocation"],
            githubLink: "https://github.com/yashasvi9199/weather-app",
            liveDemo: "https://yashasvi9199.github.io/weather-app/",
            image: "/api/placeholder/400/250",
            featured: true
        },
        {
            id: 6,
            title: "React.js Projects Collection",
            category: "edu",
            description: "Demonstrated advanced React patterns including hooks, context API, and component composition with optimization.",
            detailedDescription: "Showcased advanced React patterns including custom hooks reducing code duplication by 30%. Implemented Context API managing complex state across 15+ components, achieving 90+ Lighthouse scores through performance optimization techniques.",
            tech: ["React", "JavaScript", "CSS3", "HTML5", "Context API"],
            githubLink: "https://github.com/yashasvi9199/React.js",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 7,
            title: "Python Applications",
            category: "edu",
            description: "Created Python automation tools and system utilities for workflow optimization and development efficiency.",
            detailedDescription: "Engineered Python automation tools reducing manual task execution time by 70%. Developed system utilities handling file processing for 10,000+ records, optimizing development workflows and increasing team productivity by 25%.",
            tech: ["Python", "Pandas", "NumPy", "Flask", "SQLite"],
            githubLink: "https://github.com/yashasvi9199/python",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 8,
            title: "Node.js Learning Projects",
            category: "edu",
            description: "Developed scalable Node.js backend systems with RESTful APIs, middleware, and MongoDB integration.",
            detailedDescription: "Architected Node.js backend systems handling 1,000+ RPM with RESTful APIs. Implemented middleware reducing request processing time by 200ms and MongoDB aggregation pipelines improving data retrieval efficiency by 35%.",
            tech: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
            githubLink: "https://github.com/yashasvi9199/learn-node-js",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 9,
            title: "Ecommerce Platform",
            category: "web",
            description: "Implemented full-stack MERN ecommerce platform with JWT authentication and secure payment gateway integration.",
            detailedDescription: "Built full-stack ecommerce solution processing 500+ daily transactions with JWT-based authentication. Integrated payment gateways achieving 99.2% success rate and optimized MongoDB queries reducing database response time by 45%.",
            tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
            githubLink: "https://github.com/yashasvi9199/ecommerce",
            liveDemo: "#",
            image: "/api/placeholder/400/250"
        },
        {
            id: 10,
            title: "Drop Panel",
            category: "web",
            description: "Built interactive drag-and-drop panel system with smooth animations and responsive positioning",
            detailedDescription: "Developed a dynamic drag-and-drop interface component featuring smooth transition animations, boundary detection, and responsive positioning logic. Implemented touch and mouse event handling for cross-device compatibility.",
            tech: ["React", "API Integration", "CSS3", "Geolocation"],
            githubLink: "https://github.com/yashasvi9199/drop-panel",
            liveDemo: "https://yashasvi9199.github.io/drop-panel/",
            image: "/api/placeholder/400/250"
        },
        {
            id: 11,
            title: "Image Carousel",
            category: "web",
            description: "Engineered responsive image carousel with touch gestures and auto-rotation features",
            detailedDescription: "Built a performant image carousel supporting touch swipes, keyboard navigation, and auto-rotation. Optimized image loading with lazy loading techniques and implemented smooth transition effects.",
            tech: ["React", "API Integration", "CSS3", "Geolocation"],
            githubLink: "https://github.com/yashasvi9199/image-carousel",
            liveDemo: "https://yashasvi9199.github.io/image-carousel/",
            image: "/api/placeholder/400/250"
        },
        {
            id: 12,
            title: "Tic Tac Toe",
            category: "web",
            description: "Developed interactive Tic Tac Toe game with smart opponent and score tracking",
            detailedDescription: "Created an engaging Tic Tac Toe game featuring intelligent AI opponent with multiple difficulty levels. Implemented real-time score tracking, game history, and responsive design with smooth animations.",
            tech: ["React", "API Integration", "CSS3", "Geolocation"],
            githubLink: "https://github.com/yashasvi9199/tic-tac-toe",
            liveDemo: "https://yashasvi9199.github.io/tic-tac-toe/",
            image: "/api/placeholder/400/250"
        }
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    // Pagination logic - only for 'all' filter
    const showPagination = activeFilter === 'all';
    const projectsPerRow = window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const projectsPerPage = projectsPerRow * 2; // 2 rows
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const currentProjects = showPagination 
        ? filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)
        : filteredProjects;

    // Reset to page 1 when filter changes or window resizes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    // Recalculate on window resize
    useEffect(() => {
        const handleResize = () => {
            if (activeFilter === 'all') {
                setCurrentPage(1);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeFilter]);

    useEffect(() => {
        const gridElement = projectsGridRef.current;
        if (!gridElement) return;

        let timeoutId;
        let observer;

        const showAllProjects = () => {
            const allIndices = currentProjects.map((_, index) => index);
            setVisibleProjects(new Set(allIndices));
        };

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    showAllProjects();
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px 0px 50px 0px'
            }
        );

        observer.observe(gridElement);
        timeoutId = setTimeout(showAllProjects, 500);

        return () => {
            if (observer) {
                observer.disconnect();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [currentProjects.length, activeFilter]);

    return (
        <section id="projects" className={`projects-section`}>
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

                <div ref={projectsGridRef} className="projects-grid">
                    {currentProjects.map((project, index) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            isVisible={visibleProjects.has(index)}
                        />
                    ))}
                </div>

                {showPagination && totalPages > 1 && (
                    <div className="pagination-controls">
                        <button 
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        <span className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        
                        <button 
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

const ProjectCard = ({ project, isVisible }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showBadge, setShowBadge] = useState(true);

    const handleFlip = () => {
        const newFlippedState = !isFlipped;
        setIsFlipped(newFlippedState);
        setShowBadge(!newFlippedState);
    };

    return (
        <div 
            className={`project-card ${project.featured ? 'featured' : ''} ${project.professional ? 'professional' : ''} ${isVisible ? 'visible' : ''} ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="card-inner">
                <div className="card-front">
                    {showBadge && project.professional && <div className="professional-badge">Professional</div>}
                    {showBadge && project.featured && !project.professional && <div className="featured-badge">Featured</div>}
                    
                    <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        
                        <div className="project-tech">
                            {project.tech.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>

                    <button className={`flip-btn ${isFlipped ? 'flipped' : ''}`} onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>

                <div className="card-back">
                    <div className="back-content">
                        <p className="back-description">{project.detailedDescription}</p>
                        
                        {project.achievement && (
                            <div className="project-achievement">
                                <i className="fas fa-trophy"></i>
                                {project.achievement}
                            </div>
                        )}

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

                        <button className={`flip-btn ${isFlipped ? 'flipped' : ''}`} onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;