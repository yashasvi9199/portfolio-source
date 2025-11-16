import React, { useState, useEffect, useRef } from 'react'
import QuantumLoader from './components/QuantumLoader'
import ThreeBackground from './components/ThreeBackground'
import AIChatbot from './components/AI/AIChatbot'
import VoiceControl from './components/Interactive/VoiceControl'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'
import Navigation from './sections/Navigation'; // Fixed import path
import Footer from './sections/Footer'; // Fixed import path
import { useScrollAnimation } from './hooks/useScrollAnimation'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showAI, setShowAI] = useState(false)
  const sectionRefs = useScrollAnimation()

  useEffect(() => {
    const loadAssets = async () => {
      const steps = 8
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setProgress((i / steps) * 100)
        
        if (i === 3) await import('three')
        if (i === 6) await import('gsap')
      }
      setIsLoading(false)
      
      // Show AI components after main content is loaded
      setTimeout(() => setShowAI(true), 1000)
    }

    loadAssets()
  }, [])

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
      
      {/* Navigation - FIXED: Added Navigation component */}
      <Navigation />
      
      {/* AI & Interactive Components - Load after main content */}
      {showAI && (
        <>
          <AIChatbot />
          <VoiceControl />
        </>
      )}
      
      {/* Main Content Sections */}
      <main className="main-content">
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
          <Achievements/>
        </div>
        
        <div ref={setSectionRef(6)}>
          <Contact />
        </div>
      </main>
      
      {/* Footer - FIXED: Added Footer component */}
      <Footer />
    </div>
  )
}

export default App