import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download, Code2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

import { useFirebaseData } from '../hooks/useFirebaseData'
import { useTouchDevice } from '../hooks/useTouchDevice'

const DEFAULT_WORDS = ['Developer', 'Creative Thinker', 'Problem Solver', 'Innovator', 'Tech Enthusiast']
const DEFAULT_SOCIALS = [
  { icon: Github, href: 'https://github.com/sibap-dev', label: 'GitHub', color: 'var(--color-primary)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/siba-prasad-padhi-197b61320/', label: 'LinkedIn', color: 'var(--color-secondary)' },
  { icon: Mail, href: 'mailto:sibapra729@gmail.com', label: 'Email', color: 'var(--color-accent)' },
]

const Hero = () => {
  const { data: heroData } = useFirebaseData('hero')
  const isTouch = useTouchDevice()
  const WORDS = heroData?.subtitleWords || DEFAULT_WORDS
  const tagline = heroData?.tagline || 'Crafting innovative web applications, exploring cutting-edge technologies, and building digital experiences that make an impact.'
  const profileImage = heroData?.profileImage
  const resumeUrl = heroData?.resumeUrl
  const badge = heroData?.badge || 'Available for opportunities'

  const name = heroData?.name || 'Siba Prasad Padhi'
  const socialLinks = heroData?.socialLinks?.length
    ? heroData.socialLinks.map((s) => ({
        icon: s.platform === 'github' ? Github : s.platform === 'linkedin' ? Linkedin : Mail,
        href: s.url,
        label: s.label,
        color: s.platform === 'github' ? 'var(--color-primary)' : s.platform === 'linkedin' ? 'var(--color-secondary)' : 'var(--color-accent)',
      })).filter((s) => s.href)
    : DEFAULT_SOCIALS

  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [showExpanded, setShowExpanded] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const swipeRef = useRef(null)

  const allImages = useMemo(() => {
    const imgs = []
    if (profileImage) imgs.push(profileImage)
    if (heroData?.gallery?.length) imgs.push(...heroData.gallery)
    return imgs
  }, [profileImage, heroData?.gallery])

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % WORDS.length
      const fullText = WORDS[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )
      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(n => n + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  const stars = useMemo(
    () =>
      [...Array(25)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        duration: 2 + Math.random() * 5,
        delay: Math.random() * 5,
        color: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'][Math.floor(Math.random() * 3)],
      })),
    []
  )

  const floatingShapes = useMemo(
    () =>
      [...Array(3)].map((_, i) => ({
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 20 + Math.random() * 30,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 4,
        rotation: Math.random() * 360,
      })),
    []
  )

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.06] animate-blob will-change-transform" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-[var(--color-secondary)] rounded-full mix-blend-screen filter blur-[80px] opacity-[0.06] animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.04] animate-blob animation-delay-4000 will-change-transform" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full star-css"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              background: star.color,
              '--star-duration': `${star.duration}s`,
              '--star-delay': `${star.delay}s`,
              '--star-opacity': '0.9',
              '--star-scale': '1.2',
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute border border-white/10 shape-css"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: i === 0 ? '50%' : i === 1 ? '4px' : '0',
              background: `linear-gradient(135deg, ${['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'][i % 3]}10, transparent)`,
              '--shape-duration': `${shape.duration}s`,
              '--shape-delay': `${shape.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[var(--color-primary)]/10 via-[var(--color-secondary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20 rounded-full text-sm font-medium mb-8 animate-float shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.08)] cursor-pointer hover:scale-105 transition-transform"
        >
            <motion.span
              className={isTouch ? 'm-spin' : ''}
              animate={!isTouch ? { rotate: [0, 360] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={14} className="text-[var(--color-primary)]" />
            </motion.span>
          <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent font-semibold">
            {badge}
          </span>
          <motion.span
            className={`w-2 h-2 rounded-full bg-green-400${isTouch ? ' m-pulse' : ''}`}
            animate={!isTouch ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>

        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[3px] border-transparent bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] p-[3px] shadow-[0_0_40px_rgba(var(--color-secondary-rgb),0.2)]">
              <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Siba Prasad Padhi" className="w-full h-full object-cover cursor-pointer" onClick={() => { setShowExpanded(true); setImgIndex(0) }} />
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-white/40 font-display">SP</span>
                )}
              </div>
            </div>
            <motion.div
              className={`absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-30 blur-md -z-10${isTouch ? ' m-glow' : ''}`}
              animate={!isTouch ? { opacity: [0.2, 0.5, 0.2] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]">
              <motion.span
                className={`text-white text-xs${isTouch ? ' m-pulse-sm' : ''}`}
                animate={!isTouch ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] font-display"
        >
          <span className="text-white">Hi, I'm </span>
          <br className="sm:hidden" />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-[length:200%] animate-gradient bg-clip-text text-transparent">
              {name}
            </span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-1.5 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent))',
                filter: 'blur(2px)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-xl sm:text-2xl md:text-3xl"
        >
          <span className="text-gray-400 font-light">I'm a </span>
          <span className="inline-block min-w-[180px] text-white font-medium">
            {text}
            <motion.span
              className={`inline-block w-[3px] h-[1em] ml-1 rounded-full${isTouch ? ' m-blink' : ''}`}
              style={{
                background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary), var(--color-accent))',
              }}
              animate={!isTouch ? { opacity: [1, 0] } : {}}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white font-semibold rounded-full overflow-hidden shadow-[0_0_30px_rgba(var(--color-secondary-rgb),0.2)] hover:shadow-[0_0_60px_rgba(var(--color-secondary-rgb),0.4)] transition-shadow duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <motion.span
                className={isTouch ? 'm-bounce-x' : ''}
                animate={!isTouch ? { x: [0, 6, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3.5 border border-white/20 text-white font-semibold rounded-full overflow-hidden"
          >
            <span className="relative z-10">Let's Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 via-[var(--color-secondary)]/10 to-[var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {resumeUrl && (
            <motion.a
              href={resumeUrl}
              download="Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3.5 bg-white/5 border border-white/10 text-gray-300 font-semibold rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={16} />
                Resume
              </span>
            </motion.a>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex gap-5 justify-center"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.15 }}
              className="group relative p-3.5 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/10 transition-all duration-300"
            >
              <social.icon
                size={20}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium tracking-wide uppercase">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Image expand modal */}
      <AnimatePresence>
        {showExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 select-none"
            onClick={() => { setShowExpanded(false); setImgIndex(0) }}
            onTouchStart={(e) => { swipeRef.current = e.changedTouches[0].clientX }}
            onTouchEnd={(e) => {
              if (allImages.length < 2) return
              const dx = e.changedTouches[0].clientX - (swipeRef.current || 0)
              if (dx > 50) setImgIndex(i => (i - 1 + allImages.length) % allImages.length)
              else if (dx < -50) setImgIndex(i => (i + 1) % allImages.length)
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={allImages[imgIndex]} alt="Siba Prasad Padhi" className="w-full rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)]" />

                {/* Close button */}
                <button
                  onClick={() => { setShowExpanded(false); setImgIndex(0) }}
                  className="absolute -top-3 -right-3 p-2 bg-[#0a0a0a] border border-white/10 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                  <X size={18} className="text-white" />
                </button>

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex(i => (i - 1 + allImages.length) % allImages.length)}
                      className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#0a0a0a] border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft size={22} className="text-white" />
                    </button>
                    <button
                      onClick={() => setImgIndex(i => (i + 1) % allImages.length)}
                      className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#0a0a0a] border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight size={22} className="text-white" />
                    </button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i) }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === imgIndex ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
