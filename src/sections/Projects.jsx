import React, { useState } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const projects = [
    {
      id: 1,
      title: 'AI Image Generator',
      description: 'Advanced generative AI platform creating stunning visual art from text prompts',
      category: 'ai',
      tech: ['React', 'Python', 'TensorFlow', 'Three.js'],
      image: '/assets/projects/ai-generator.jpg'
    },
    {
      id: 2,
      title: 'Quantum Simulation',
      description: 'Interactive quantum computing simulator with real-time visualization',
      category: 'quantum',
      tech: ['Vue.js', 'WebGL', 'Qiskit', 'Node.js'],
      image: '/assets/projects/quantum-sim.jpg'
    },
    {
      id: 3,
      title: 'Neural Network Playground',
      description: 'Educational platform for understanding and experimenting with neural networks',
      category: 'ai',
      tech: ['React', 'TensorFlow.js', 'D3.js', 'TypeScript'],
      image: '/assets/projects/nn-playground.jpg'
    },
    {
      id: 4,
      title: 'Blockchain Explorer',
      description: 'Real-time blockchain data visualization and analytics dashboard',
      category: 'web3',
      tech: ['Next.js', 'Ethereum', 'Web3.js', 'GraphQL'],
      image: '/assets/projects/blockchain-explorer.jpg'
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'ai', label: 'AI/ML' },
    { key: 'quantum', label: 'Quantum' },
    { key: 'web3', label: 'Web3' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="section" style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
    }}>
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Featured Projects
        </h2>
        
        <div className="filters" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeFilter === filter.key 
                  ? 'linear-gradient(135deg, #6c63ff, #4a44b5)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                color: activeFilter === filter.key ? '#fff' : '#888',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                background: `linear-gradient(135deg, #6c63ff, #00ff88)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem'
              }}>
                {project.title.charAt(0)}
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p style={{ marginBottom: '1.5rem', color: '#888', lineHeight: '1.6' }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {project.tech.map((tech, index) => (
                    <span key={index} style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(108, 99, 255, 0.1)',
                      border: '1px solid rgba(108, 99, 255, 0.3)',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      color: '#6c63ff'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="btn btn-primary" style={{ width: '100%' }}>
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects