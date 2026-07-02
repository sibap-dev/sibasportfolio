import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const PARTICLE_COUNT = 40
const REPULSION_RADIUS = 40
const REPULSION_STRENGTH = 20
const IDLE_WANDER = 3.5

const CursorBackground = () => {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const containerRef = useRef(null)

  // RAF-throttled mouse tracking
  useEffect(() => {
    let rafId
    const handleMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth)
        mouseY.set(e.clientY / window.innerHeight)
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [mouseX, mouseY])

  // Particle field — imperative DOM for zero React overhead per particle
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const colors = [
      'rgba(var(--color-primary-rgb),',
      'rgba(var(--color-secondary-rgb),',
      'rgba(var(--color-accent-rgb),',
    ]
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div')
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = 1 + Math.random() * 2.5
      const opacity = 0.08 + Math.random() * 0.12
      const phaseX = Math.random() * Math.PI * 2
      const phaseY = Math.random() * Math.PI * 2
      const speed = 0.6 + Math.random() * 1.2

      el.className = 'absolute rounded-full pointer-events-none will-change-transform'
      el.style.cssText = `
        left:${x}%;top:${y}%;
        width:${size}px;height:${size}px;
        background:${colors[i % 3]}${opacity});
      `
      container.appendChild(el)
      particles.push({ el, x, y, phaseX, phaseY, speed })
    }

    let running = true
    const loop = () => {
      if (!running) return

      const mx = mouseX.get() * 100
      const my = mouseY.get() * 100
      const now = performance.now() * 0.001

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const distSq = dx * dx + dy * dy

        const idleX = Math.sin(now * p.speed + p.phaseX) * IDLE_WANDER
        const idleY = Math.cos(now * p.speed * 0.7 + p.phaseY) * IDLE_WANDER
        let fx = idleX
        let fy = idleY

        if (distSq < REPULSION_RADIUS * REPULSION_RADIUS) {
          const dist = Math.sqrt(distSq) || 1
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH
          fx += (dx / dist) * force
          fy += (dy / dist) * force
        }
        p.el.style.transform = `translate(${fx}px, ${fy}px)`
      }

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      running = false
      particles.forEach((p) => p.el.remove())
    }
  }, [])

  // Spring configs for the three orbs — different responsiveness for parallax
  const springA = { stiffness: 35, damping: 22, mass: 0.8 }
  const springB = { stiffness: 18, damping: 28, mass: 1.2 }
  const springC = { stiffness: 50, damping: 18, mass: 0.5 }

  const pxA = useSpring(useTransform(mouseX, [0, 1], [-60, 60]), springA)
  const pyA = useSpring(useTransform(mouseY, [0, 1], [-60, 60]), springA)
  const pxB = useSpring(useTransform(mouseX, [0, 1], [40, -40]), springB)
  const pyB = useSpring(useTransform(mouseY, [0, 1], [40, -40]), springB)
  const pxC = useSpring(useTransform(mouseX, [0, 1], [-25, 25]), springC)
  const pyC = useSpring(useTransform(mouseY, [0, 1], [-25, 25]), springC)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Ambient gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_50%,rgba(var(--color-primary-rgb),0.03),transparent_70%)]" />

      {/* Full-page constantly-drifting ambient orbs — CSS keyframes, no JS overhead */}
      <div className="absolute left-[10%] top-[15%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[var(--color-primary)] opacity-[0.03] pointer-events-none will-change-transform"
        style={{ animation: 'ambient-drift-1 25s ease-in-out infinite' }}
      />
      <div className="absolute right-[15%] top-[40%] w-[400px] h-[400px] rounded-full blur-[100px] bg-[var(--color-secondary)] opacity-[0.025] pointer-events-none will-change-transform"
        style={{ animation: 'ambient-drift-2 30s ease-in-out infinite' }}
      />
      <div className="absolute left-[30%] bottom-[10%] w-[350px] h-[350px] rounded-full blur-[80px] bg-[var(--color-accent)] opacity-[0.02] pointer-events-none will-change-transform"
        style={{ animation: 'ambient-drift-3 20s ease-in-out infinite' }}
      />

      {/* Antigravity particle field — created imperatively */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Cursor-reactive blurred orbs with parallax */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-[500px] h-[500px] rounded-full blur-[100px] will-change-transform"
          style={{ background: 'rgba(var(--color-primary-rgb),0.05)', x: pxA, y: pyA }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-[400px] h-[400px] rounded-full blur-[80px] will-change-transform"
          style={{ background: 'rgba(var(--color-secondary-rgb),0.04)', x: pxB, y: pyB }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-[300px] h-[300px] rounded-full blur-[60px] will-change-transform"
          style={{ background: 'rgba(var(--color-accent-rgb),0.03)', x: pxC, y: pyC }}
        />
      </div>
    </div>
  )
}

export default CursorBackground
