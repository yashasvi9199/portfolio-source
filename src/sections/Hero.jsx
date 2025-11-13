import React, { useEffect, useRef } from 'react'
import '../styles/main.css'

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrame

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const particles = []
    const particleCount = 100

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 0.5
        this.alpha = Math.random() * 0.5 + 0.1
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        this.alpha = 0.1 + 0.4 * Math.abs(Math.sin(Date.now() * 0.001 + this.x * 0.01))
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      
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
            backgroundClip: 'text'
          }}>
            Yash Haldiya
          </h1>
          
          <h2 style={{
            marginBottom: '2rem',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#b0b0b0',
            fontWeight: '400'
          }}>
            AI Engineer & Quantum Developer
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
            <button className="btn btn-primary">
              Explore My Work
            </button>
            <button className="btn btn-secondary">
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