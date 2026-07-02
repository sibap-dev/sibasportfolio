import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Code, Palette, Rocket, Users, Award, Coffee, BookOpen, Heart,
  ChevronRight, Sparkles, Zap
} from 'lucide-react'
import Counter from './Counter'
import { useFirebaseData } from '../hooks/useFirebaseData'

const ICON_MAP = { Code, Palette, Rocket, Award, Coffee, Heart, BookOpen, Users }
const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)']

const DEFAULT_FEATURES = [
  { icon: Code, title: 'AI & Machine Learning Workshop', subtitle: 'IIT Bhubaneswar', description: '2-day intensive workshop on AI and Machine Learning with Data Science, exploring cutting-edge technologies and applications.', color: 'var(--color-primary)', link: '' },
  { icon: Palette, title: 'Advanced Programming Internship', subtitle: 'NIST University', description: 'Specialized training in Advanced Programming and Competitive Coding, enhancing problem-solving and algorithmic thinking skills.', color: 'var(--color-secondary)', link: '' },
  { icon: Rocket, title: 'Python Developer Intern', subtitle: 'Asirudh Software Private Limited', description: 'Professional development experience in Python programming, working on real-world projects and industry-standard practices.', color: 'var(--color-accent)', link: '' },
]

const DEFAULT_STATS = [
  { label: 'Projects Completed', value: 50, suffix: '+', icon: Award, color: 'var(--color-primary)' },
  { label: 'Years Experience', value: 3, suffix: '+', icon: Coffee, color: 'var(--color-secondary)' },
  { label: 'Cups of Coffee', value: 100, suffix: '+', icon: Heart, color: 'var(--color-accent)' },
  { label: 'Lines of Code', value: 99, suffix: 'K+', icon: BookOpen, color: 'var(--color-primary)' },
]

const About = () => {
  const { data: aboutData } = useFirebaseData('about')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const rawStats = aboutData?.stats || DEFAULT_STATS.map(({ icon, color, ...rest }) => rest)
  const stats = rawStats.map((s, i) => ({
    ...s,
    icon: ICON_MAP[Object.keys(ICON_MAP)[i % Object.keys(ICON_MAP).length]] || Award,
    color: COLORS[i % COLORS.length],
  }))

  const rawFeatures = aboutData?.features || DEFAULT_FEATURES.map(({ icon, color, ...rest }) => rest)
  const features = rawFeatures.map((f, i) => ({
    ...f,
    icon: ICON_MAP[Object.keys(ICON_MAP)[i % Object.keys(ICON_MAP).length]] || Code,
    color: COLORS[i % COLORS.length],
  }))

  const bio = aboutData?.bio || "I'm a CSE student at <strong className=\"text-white\">NIST University</strong>, passionate about development and programming, constantly exploring new technologies to build innovative solutions."
  const bioExtra = aboutData?.bioExtra || 'I thrive on turning complex problems into elegant solutions. Every challenge is an opportunity to learn and grow. Quality over quantity, always.'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="about"
      className="py-28 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-[var(--color-primary)] rounded-full filter blur-[80px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[var(--color-accent)] rounded-full filter blur-[80px] opacity-[0.03] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              About Me
            </span>
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 font-display">
            Passionate About Creating
            <span className="block mt-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent animate-gradient-text">
              Digital Experiences
            </span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Highlight card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative p-6 rounded-2xl mb-8 overflow-hidden border border-white/[0.06]"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb),0.05), rgba(var(--color-secondary-rgb),0.05), rgba(var(--color-accent-rgb),0.05))',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 via-transparent to-[var(--color-accent)]/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-[var(--color-secondary)]" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                    Quick Overview
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: bio }} />
                <p className="text-gray-400 leading-relaxed mt-4">{bioExtra}</p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className="group relative bg-white/[0.03] rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.15] transition-[border,transform] duration-500 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(250px circle at 50% 0%, ${stat.color}20, transparent)`,
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <div
                      className="inline-flex p-2.5 rounded-xl mb-3"
                      style={{ background: `${stat.color}15` }}
                    >
                      <stat.icon style={{ color: stat.color }} size={22} />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                      <Counter to={stat.value} suffix={stat.suffix} start={inView} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1.5 font-medium tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-[var(--color-accent)]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent uppercase tracking-wider">
                Key Achievements
              </span>
            </div>

            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  x: 8,
                  scale: 1.01,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative bg-white/[0.03] rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.15] transition-[border,transform] duration-500 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(250px circle at 0% 50%, ${feature.color}15, transparent)`,
                  }}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl transition-[transform] duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `${feature.color}15` }}
                  >
                    <feature.icon style={{ color: feature.color }} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{feature.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1.5">{feature.description}</p>
                    {feature.link && (
                      <a href={feature.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-white transition-colors mt-2"
                        onClick={(e) => e.stopPropagation()}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Certificate
                      </a>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-600 group-hover:text-[var(--color-primary)] transition-colors mt-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-[opacity,transform]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
