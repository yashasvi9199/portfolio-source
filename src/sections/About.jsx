import React from 'react'
import { useCountUp } from '../hooks/useCountUp'

const CountUpStat = ({ target, suffix, color, label, delay = 0 }) => {
  const { ref, value } = useCountUp(target, suffix, 2000, delay);
  return (
    <div className="stat" ref={ref} style={{ textAlign: 'center' }}>
      <div className="counter-value" style={{ fontSize: '2rem', fontWeight: 'bold', color }}>
        {value}
      </div>
      <div style={{ color: '#888' }}>{label}</div>
    </div>
  );
};

const About = () => {

  return (
    <section className={`section`} style={{
      background: 'transparent',
      width: '100%',
    }}>
      <div className="container">
        <h2 className="fp-animate" style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #6c63ff, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Professional Summary
        </h2>

        <div className="about-content" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div className="about-text fp-animate">
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Results-driven Software Engineer specializing in JavaScript, React, and full-stack development.
              Proven expertise in delivering scalable web applications, internal knowledge systems,
              performance optimization, and complete SDLC execution.
            </p>

            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              Passionate about driving technical innovation in dynamic engineering teams with a focus on
              modern web technologies, agile development practices, and knowledge management systems.
            </p>

            <div className="stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              <CountUpStat target={20} suffix="%" color="#6c63ff" label="Performance Optimization" delay={0} />
              <CountUpStat target={25} suffix="%" color="#00ff88" label="Bug Reduction" delay={200} />
              <CountUpStat target={7} suffix="%" color="#ff6b6b" label="Cost Reduction" delay={400} />
              <CountUpStat target={600} suffix="+" color="#ffa500" label="Customers Served" delay={600} />
            </div>
          </div>

          <div className="about-skills fp-animate" style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Core Competencies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Full SDLC Execution',
                'Performance Optimization',
                'Internal Tool Development',
                'Knowledge Management Systems',
                'Agile Methodologies',
                'Team Collaboration & Leadership'
              ].map((skill, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#6c63ff',
                    borderRadius: '50%'
                  }} />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About