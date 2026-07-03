import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import FloatingActionButton from './components/FloatingActionButton'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import CursorBackground from './components/CursorBackground'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('cold')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const toggleTheme = () => {
    setTheme(prev => prev === 'cold' ? 'warm' : 'cold')
  }

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {!isTouchDevice && <CustomCursor />}
      <PageTransition>
         <div className="bg-[#0a0a0a] text-white overflow-x-hidden noise-bg" data-theme={theme}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          {!isTouchDevice && <CursorBackground />}
          <FloatingActionButton />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
          <Footer />
        </div>
      </PageTransition>
    </>
  )
}

export default App
