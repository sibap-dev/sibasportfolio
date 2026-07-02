import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useFirebaseData } from '../hooks/useFirebaseData'

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = ({ theme, toggleTheme }) => {
  const { data: heroData } = useFirebaseData('hero')
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const resumeUrl = heroData?.resumeUrl || '/resume.pdf'

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1))
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0 }
      )
    })
    observers.forEach((obs, i) => {
      if (obs) {
        const el = document.getElementById(sectionIds[i])
        if (el) obs.observe(el)
      }
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(var(--color-primary-rgb),0.08), rgba(var(--color-secondary-rgb),0.08), rgba(var(--color-accent-rgb),0.08))',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                )
              })}
              <div className="ml-4 flex items-center gap-3">
                <motion.a
                  href={resumeUrl}
                  download="Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all"
                >
                  <FileText size={14} />
                  Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_40px_rgba(var(--color-secondary-rgb),0.3)] transition-shadow"
                >
                  Hire Me
                </motion.a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-[var(--color-primary)] transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 z-40 md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <motion.button
                    key={item.name}
                    whileHover={{ x: 8 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left py-3 px-4 rounded-xl transition-all ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                )
              })}
              <div className="flex gap-3 mt-2 pt-2 border-t border-white/5">
                <motion.a
                  href={resumeUrl}
                  download="Resume.pdf"
                  whileHover={{ x: 8 }}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 border border-white/20 text-gray-300 font-medium rounded-xl text-center text-sm"
                >
                  <FileText size={16} className="inline mr-2" />
                  Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ x: 8 }}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white font-semibold rounded-xl text-center text-sm"
                >
                  Hire Me
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
