import React from 'react'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend Technologies',
      skills: [
        { name: 'JavaScript', level: 90, color: '#f7df1e' },
        { name: 'React', level: 85, color: '#61dafb' },
        { name: 'HTML5', level: 88, color: '#e34f26' },
        { name: 'CSS3', level: 85, color: '#1572b6' },
        { name: 'jQuery', level: 80, color: '#0769ad' },
        { name: 'Redux', level: 75, color: '#764abc' }
      ]
    },
    {
      category: 'Backend & Databases',
      skills: [
        { name: 'Node.js', level: 82, color: '#68a063' },
        { name: 'Java', level: 78, color: '#007396' },
        { name: 'Python', level: 75, color: '#3776ab' },
        { name: 'MySQL', level: 80, color: '#4479a1' },
        { name: 'MongoDB', level: 70, color: '#47a248' },
        { name: 'AJAX', level: 85, color: '#00ff88' }
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Git/GitHub', level: 88, color: '#6c63ff' },
        { name: 'BitBucket', level: 80, color: '#0052cc' },
        { name: 'Postman', level: 85, color: '#ff6c37' },
        { name: 'Jira', level: 82, color: '#0052cc' },
        { name: 'Linux', level: 75, color: '#fcc624' },
        { name: 'Visual Studio', level: 85, color: '#5c2d91' }
      ]
    }
  ]

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Technical Skills
        </h2>
        
        <div className="skills-categories" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem'
        }}>
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 style={{
                marginBottom: '2rem',
                color: '#fff',
                textAlign: 'center',
                fontSize: '1.5rem'
              }}>
                {category.category}
              </h3>
              
              <div className="skills-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-card" style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{ 
                        color: '#fff', 
                        margin: 0,
                        fontSize: '1rem'
                      }}>
                        {skill.name}
                      </h4>
                      <span style={{ 
                        color: skill.color, 
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                        borderRadius: '3px',
                        transition: 'width 1s ease-in-out'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="additional-skills" style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: '#fff'
          }}>
            Methodologies & Soft Skills
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {[
              'Full SDLC', 'Agile Development', 'Performance Optimization', 
              'Knowledge Management', 'Internal Tool Development', 'Leadership',
              'Team Collaboration', 'Problem Solving', 'Process Optimization'
            ].map((skill, index) => (
              <span key={index} style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                color: '#00ff88'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills