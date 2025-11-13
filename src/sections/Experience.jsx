import React from 'react'

const Experience = () => {
  const experiences = [
    {
      period: 'Oct 2023 – Mar 2025',
      role: 'Founder & Operator',
      company: 'Food Truck Venture',
      location: 'Jaipur, India',
      achievements: [
        'Directed end-to-end operations: menu development, daily procurement, inventory management, financial bookkeeping, and customer service',
        'Excelled in high-pressure environments managing handwritten order systems and manual ledger tracking',
        'Generated ₹11,000+ sales over 2 days (₹7,000 net profit) during Navratri 2024, serving ~600 customers'
      ],
      technologies: ['Operations Management', 'Financial Planning', 'Customer Service', 'Inventory Management']
    },
    {
      period: 'Feb 2023 – Aug 2023',
      role: 'Software Engineer',
      company: 'Appgallop Pvt. Ltd.',
      location: 'Jaipur, India',
      achievements: [
        'Engineered SaaS solutions for sales management, invoicing, and operational workflows',
        'Developed robust web applications using HTML, CSS, JavaScript, Java, and Visual Studio',
        'Optimized code architecture and performance by 20%, reduced hardware costs by 7%, decreased bug rates by 25%',
        'Produced comprehensive user documentation and maintained application stability'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Java', 'Visual Studio', 'SaaS Development']
    },
    {
      period: 'Sep 2020 – Jan 2023',
      role: 'Resolution Specialist',
      company: 'Amazon Development Center',
      location: 'Jaipur, India',
      achievements: [
        'Analyzed and resolved complex technical challenges for internal/external customers',
        'Created and maintained centralized portals on internal wiki during sales events',
        'Curated links and ticket-raising functionality to accelerate customer issue resolution',
        'Enhanced team efficiency through proactive documentation and process optimization'
      ],
      technologies: ['Technical Support', 'Knowledge Management', 'Process Optimization', 'Documentation']
    },
    {
      period: 'Jun 2019 – Sep 2020',
      role: 'Customer Service Associate',
      company: 'Amazon Development Center',
      location: 'Jaipur, India',
      achievements: [
        'Delivered exceptional customer support, resolving inquiries with empathy and accuracy',
        'Maintained high performance standards in fast-paced environment',
        'Recognized for customer obsession and workplace impact'
      ],
      technologies: ['Customer Service', 'Problem Solving', 'Communication', 'CRM Systems']
    }
  ]

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Professional Experience
        </h2>
        
        <div className="timeline" style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item" style={{
              display: 'flex',
              marginBottom: '3rem',
              position: 'relative'
            }}>
              <div style={{
                flex: '0 0 180px',
                textAlign: 'right',
                paddingRight: '2rem',
                color: '#6c63ff',
                fontWeight: '600'
              }}>
                {exp.period}
              </div>
              
              <div style={{
                position: 'relative',
                flex: '1'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-11px',
                  top: '0',
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #6c63ff, #00ff88)'
                }} />
                
                <div style={{
                  position: 'absolute',
                  left: '-16px',
                  top: '0',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#6c63ff',
                  border: '3px solid #0a0a0a'
                }} />
                
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginLeft: '1rem'
                }}>
                  <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{exp.role}</h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <h4 style={{ color: '#6c63ff', fontWeight: '600', margin: 0 }}>
                      {exp.company}
                    </h4>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>
                      {exp.location}
                    </span>
                  </div>
                  
                  <ul style={{ 
                    color: '#888', 
                    marginBottom: '1.5rem', 
                    lineHeight: '1.6',
                    paddingLeft: '1.5rem'
                  }}>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} style={{ marginBottom: '0.5rem' }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} style={{
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience