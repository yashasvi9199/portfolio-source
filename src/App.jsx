import React, { useState, useEffect, useRef } from 'react'
import QuantumLoader from './components/QuantumLoader'
import ThreeBackground from './components/ThreeBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const sectionRefs = useScrollAnimation()

  useEffect(() => {
    const loadAssets = async () => {
      const steps = 8
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setProgress((i / steps) * 100)
        
        // Load critical assets at specific progress points
        if (i === 3) {
          // Preload Three.js
          await import('three')
        }
        if (i === 6) {
          // Preload GSAP
          await import('gsap')
        }
      }
      setIsLoading(false)
    }

    loadAssets()
  }, [])

  // Assign refs to sections for scroll animations
  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el
  }

  if (isLoading) {
    return <QuantumLoader progress={progress} />
  }

  return (
    <div className="app">
      {/* Three.js Animated Background */}
      <ThreeBackground />
      
      {/* Main Content Sections with Scroll Animations */}
      <div ref={setSectionRef(0)}>
        <Hero />
      </div>
      
      <div ref={setSectionRef(1)}>
        <About />
      </div>
      
      <div ref={setSectionRef(2)}>
        <Skills />
      </div>
      
      <div ref={setSectionRef(3)}>
        <Projects />
      </div>
      
      <div ref={setSectionRef(4)}>
        <Experience />
      </div>
      
      <div ref={setSectionRef(5)}>
        <Contact />
      </div>
    </div>
  )
}

export default App