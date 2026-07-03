import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, GraduationCap, Briefcase, Award, Sparkles, ArrowRight } from 'lucide-react'
import { useFirebaseData } from '../hooks/useFirebaseData'
import { useTouchDevice } from '../hooks/useTouchDevice'

const ICON_MAP = { GraduationCap, Briefcase, Code, Award }
const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-primary)']

const DEFAULT_TIMELINE = [
  { icon: GraduationCap, year: '2022 - Present', title: 'CSE Student', description: 'Pursuing Computer Science degree at NIST University, building a strong foundation in programming, algorithms, and software engineering.', color: 'var(--color-primary)', highlights: ['Data Structures', 'Algorithms', 'Web Development'] },
  { icon: Briefcase, year: '2024', title: 'Python Developer Intern', description: 'Professional development experience in Python programming at Asirudh Software Private Limited, working on real-world projects and industry-standard practices.', color: 'var(--color-secondary)', highlights: ['Python', 'Real-world Projects', 'Industry Practices'] },
  { icon: Code, year: '2024', title: 'Advanced Programming Internship', description: 'Specialized training in Advanced Programming and Competitive Coding at NIST University, enhancing problem-solving and algorithmic thinking skills.', color: 'var(--color-accent)', highlights: ['Competitive Coding', 'Problem Solving', 'Algorithms'] },
  { icon: Award, year: '2024', title: 'AI & Machine Learning Workshop', description: '2-day intensive workshop on AI and Machine Learning with Data Science at IIT Bhubaneswar, exploring cutting-edge technologies and applications.', color: 'var(--color-primary)', highlights: ['Artificial Intelligence', 'Machine Learning', 'Data Science'] },
]

const Journey = () => {
  const { data: journeyData } = useFirebaseData('journey')
  const isTouch = useTouchDevice()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const rawTimeline = journeyData?.items?.length ? journeyData.items : DEFAULT_TIMELINE.map(({ icon, color, ...rest }) => rest)
  const timeline = rawTimeline.map((item, i) => ({
    ...item,
    icon: ICON_MAP[Object.keys(ICON_MAP)[i % Object.keys(ICON_MAP).length]] || GraduationCap,
    color: COLORS[i % COLORS.length],
  }))

  return (
    <section
      id="journey"
      className="py-28 px-4 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-primary)] rounded-full filter blur-[80px] opacity-[0.02] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent)] rounded-full filter blur-[80px] opacity-[0.02] pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
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
              Timeline
            </span>
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 font-display">
            My{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent animate-gradient-text">
              Journey
            </span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[1.75rem] md:left-1/2 md:-translate-x-px top-0 w-[2px] h-full origin-top z-0"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))',
            }}
          />

          {timeline.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[1fr_3.5rem_1fr] mb-12 last:mb-0 md:mb-16"
            >
              {/* Dot - col 1 mobile, col 2 desktop */}
              <div className="flex justify-center items-start z-10 row-start-1 md:col-start-2">
                <div className="relative inline-flex">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                    style={{
                      background: `${item.color}15`,
                      borderColor: item.color,
                      boxShadow: `0 0 25px ${item.color}30`,
                    }}
                  >
                    <item.icon size={22} style={{ color: item.color }} />
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full${isTouch ? ' m-pulse-ring' : ''}`}
                    style={{
                      border: `2px solid ${item.color}`,
                    }}
                    animate={!isTouch ? {
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 0, 0.5],
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </div>
              </div>

              {/* Content card - col 2 mobile, col 1/3 desktop */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`row-start-1 col-start-2 group ${
                  index % 2 === 0 ? 'md:col-start-3' : 'md:col-start-1'
                }`}
              >
                <div className={`bg-white/[0.03] rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 ${
                  index % 2 === 0 ? 'md:ml-8' : 'md:mr-8 md:text-right'
                }`}>
                  <div
                    className="flex items-center gap-3 mb-3"
                    style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
                  >
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.year}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {/* Highlights */}
                  <div
                    className="flex flex-wrap gap-2 mt-4"
                    style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}
                  >
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `${item.color}10`,
                          color: item.color,
                        }}
                      >
                        <ArrowRight size={10} />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-2 mt-12 text-gray-500 text-xs"
        >
          <Sparkles size={12} className="text-[var(--color-primary)]" />
          <span>And the journey continues...</span>
          <Sparkles size={12} className="text-[var(--color-accent)]" />
        </motion.div>
      </div>
    </section>
  )
}

export default Journey
