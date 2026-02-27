import React, { useState, useRef, useEffect } from 'react';
import '../styles/sections/Projects.css';
import '../styles/sections/shared-timeline.css';
import projectsData from '../data/projects.json';

const { projectCategories, projects } = projectsData;

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsGridRef = useRef(null);
    const [visibleProjects, setVisibleProjects] = useState(new Set());

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    // Pagination logic - 3 projects on desktop (3x1), 2 on tablet (2x1), 1 on mobile (1x1)
    const projectsPerRow = window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const projectsPerPage = projectsPerRow; // 1 row
    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
    const currentProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    // Recalculate on window resize
    useEffect(() => {
        const handleResize = () => {
            setCurrentPage(1);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeFilter]);

    useEffect(() => {
        const gridElement = projectsGridRef.current;
        if (!gridElement) return;

        // Reset visibility when page or filter changes
        setVisibleProjects(new Set());

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
        timeoutId = setTimeout(showAllProjects, 300); // reduced timeout slightly

        return () => {
            if (observer) {
                observer.disconnect();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [currentProjects.length, activeFilter, currentPage]);

    return (
        <section className={`projects-section`}>
            <div className="projects-container">

                <div ref={projectsGridRef} className="projects-grid" style={{ "--item-count": currentProjects.length }}>
                    {currentProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isVisible={visibleProjects.has(index)}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
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

            <div className="bottom-timeline-container">
                <div className="timeline-track">
                    <div className="timeline-line"></div>
                    {projectCategories.map((category) => (
                        <div
                            key={category.id}
                            className={`timeline-item ${activeFilter === category.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category.id)}
                        >
                            <span className="timeline-label">{category.name}</span>
                            <div className="timeline-notch"></div>
                        </div>
                    ))}
                </div>
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