import React, { useState, useEffect, useRef, useCallback } from 'react'
import QuantumLoader from './components/QuantumLoader'
import ThreeBackground from './components/ThreeBackground'
import AIChatbot from './components/AI/AIChatbot'
import VoiceControl from './components/Interactive/VoiceControl'
import SectionDotNav from './components/SectionDotNav'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'
import Navigation from './sections/Navigation'
import Footer from './sections/Footer'
import { useFullPageScroll } from './hooks/useFullPageScroll'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './utils/analytics'
import './styles/fullpage.css'

const SECTIONS = [
  { id: 'home', Component: Hero },
  { id: 'about', Component: About },
  { id: 'skills', Component: Skills },
  { id: 'projects', Component: Projects, overflow: true },
  { id: 'experience', Component: Experience, overflow: true },
  { id: 'achievements', Component: Achievements, overflow: true },
  { id: 'contact', Component: Contact, overflow: true },
];

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showAI, setShowAI] = useState(false)
  const location = useLocation()

  const { currentSection, goToSection, sectionWrapperRef } = useFullPageScroll(SECTIONS.length);

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

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

      // Activate fullpage mode after load
      document.documentElement.classList.add('fp-active')

      setTimeout(() => setShowAI(true), 1000)
    }

    loadAssets()

    return () => {
      document.documentElement.classList.remove('fp-active')
    }
  }, [])

  // Intercept nav hash clicks to use programmatic scroll
  const handleNavClick = useCallback((e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href === '#') return;

    const sectionId = href.replace('#', '');
    const sectionIndex = SECTIONS.findIndex(s => s.id === sectionId);

    if (sectionIndex !== -1) {
      e.preventDefault();
      goToSection(sectionIndex);
    }
  }, [goToSection]);

  useEffect(() => {
    document.addEventListener('click', handleNavClick, true);
    return () => document.removeEventListener('click', handleNavClick, true);
  }, [handleNavClick]);

  if (isLoading) {
    return <QuantumLoader progress={progress} />
  }

  return (
    <div className="app">
      <ThreeBackground />

      <Navigation currentSection={currentSection} />

      {showAI && (
        <>
          <AIChatbot />
          <VoiceControl />
        </>
      )}

      <SectionDotNav
        currentSection={currentSection}
        goToSection={goToSection}
        total={SECTIONS.length}
      />

      <div ref={sectionWrapperRef} className="fp-wrapper">
        {SECTIONS.map(({ id, Component, overflow }, index) => {
          const isLast = index === SECTIONS.length - 1;
          const classes = [
            'fp-section',
            currentSection === index ? 'fp-visible' : '',
            overflow ? 'fp-overflow' : '',
          ].filter(Boolean).join(' ');

          return (
            <div key={id} id={id} className={classes}>
              <div>
                <Component isActive={currentSection === index} />
                {isLast && <Footer />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App