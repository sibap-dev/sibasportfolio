import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Inner dot — very responsive, almost instant tracking
  const dotSpring = { stiffness: 3000, damping: 50, mass: 0.1 }
  const dotX = useSpring(cursorX, dotSpring)
  const dotY = useSpring(cursorY, dotSpring)

  // Outer ring — gentle lag for magnetic feel
  const ringSpring = { stiffness: 500, damping: 30, mass: 0.5 }
  const ringX = useSpring(cursorX, ringSpring)
  const ringY = useSpring(cursorY, ringSpring)

  const dotXOffset = useTransform(dotX, v => v - 5)
  const dotYOffset = useTransform(dotY, v => v - 5)
  const ringXOffset = useTransform(ringX, v => v - 24)
  const ringYOffset = useTransform(ringY, v => v - 24)

  useEffect(() => {
    const updatePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const updateHover = (e) => {
      setIsHovering(
        !!e.target.closest(
          'button, a, input, textarea, [role="button"], .cursor-pointer'
        )
      )
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)
    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updatePosition, { passive: true })
    window.addEventListener('mouseover', updateHover, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateHover)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Inner dot — instant tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none hidden md:block custom-cursor will-change-transform z-[10002]"
        style={{ x: dotXOffset, y: dotYOffset }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 2.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-[10px] h-[10px] rounded-full bg-white shadow-[0_0_12px_var(--color-primary),0_0_24px_rgba(var(--color-primary-rgb),0.6),0_0_48px_rgba(var(--color-primary-rgb),0.3)]" />
      </motion.div>

      {/* Outer ring — gentle trailing effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none hidden md:block custom-cursor will-change-transform z-[10002]"
        style={{ x: ringXOffset, y: ringYOffset }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? (isHovering ? 1 : 0.5) : 0,
          rotate: isClicking ? 180 : isHovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      >
        <div
          className="w-12 h-12 rounded-full border-2 transition-all duration-300"
          style={{
            borderImage: isHovering
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-accent)) 1'
              : 'none',
            borderColor: isHovering ? 'transparent' : 'rgba(var(--color-primary-rgb),0.25)',
            boxShadow: isHovering
              ? '0 0 30px rgba(var(--color-secondary-rgb),0.2), inset 0 0 30px rgba(var(--color-secondary-rgb),0.05)'
              : 'none',
          }}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor
