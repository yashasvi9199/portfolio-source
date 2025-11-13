import React, { useState, useEffect } from 'react'
import QuantumLoader from './components/QuantumLoader'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadAssets = async () => {
      const steps = 10
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setProgress((i / steps) * 100)
      }
      setIsLoading(false)
    }

    loadAssets()
  }, [])

  if (isLoading) {
    return <QuantumLoader progress={progress} />
  }

  return (
    <div className="app">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  )
}

export default App