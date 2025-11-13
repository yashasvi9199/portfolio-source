import React, { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import '../styles/main.css'

const Hero = () => {
  const textRef = useRef(null)
  const { displayText: typedText } = useTypewriter('AI Engineer & Quantum Developer', 50, 1000)

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        <div ref={textRef} className="hero-content">
          <h1 style={{
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #6c63ff 0%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'
          }}>
            Yash Haldiya
          </h1>
          
          <h2 style={{
            marginBottom: '2rem',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#b0b0b0',
            fontWeight: '400',
            minHeight: '60px'
          }}>
            {typedText}
          </h2>
          
          <p style={{
            marginBottom: '3rem',
            fontSize: '1.2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
            color: '#888'
          }}>
            Pushing the boundaries of web technology with cutting-edge AI, 
            quantum-inspired interfaces, and immersive digital experiences.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button className="btn btn-primary interactive">
              Explore My Work
            </button>
            <button className="btn btn-secondary interactive">
              Contact Me
            </button>
          </div>
        </div>
        
        <div className="scroll-indicator" style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '2px',
            height: '40px',
            background: 'linear-gradient(to bottom, #6c63ff, transparent)',
            margin: '0 auto 0.5rem',
            animation: 'float 2s ease-in-out infinite'
          }} />
          <span style={{
            color: '#888',
            fontSize: '0.9rem'
          }}>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

export default Hero