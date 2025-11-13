import React, { useEffect, useRef } from 'react'
import '../styles/main.css'

const QuantumLoader = ({ progress }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrame

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.size = Math.random() * 3 + 1
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
        this.alpha = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        this.alpha = Math.max(0.1, this.alpha - 0.002)
        if (this.alpha <= 0.1) {
          this.reset()
        }
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
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
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
    <div className="quantum-loader">
      <canvas
        ref={canvasRef}
        className="quantum-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
        }}
      />
      
      <div className="loader-content" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="quantum-spinner" style={{
          width: '80px',
          height: '80px',
          border: '3px solid rgba(108, 99, 255, 0.3)',
          borderTop: '3px solid #6c63ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 2rem'
        }} />
        
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem', background: 'linear-gradient(135deg, #6c63ff, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Quantum Interface
        </h2>
        
        <p style={{ marginBottom: '2rem', color: '#b0b0b0' }}>
          Initializing neural network...
        </p>
        
        <div className="progress-container" style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div className="progress-bar" style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6c63ff, #00ff88)',
            transition: 'width 0.3s ease',
            borderRadius: '2px'
          }} />
        </div>
        
        <div style={{ marginTop: '1rem', color: '#b0b0b0', fontSize: '0.9rem' }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default QuantumLoader