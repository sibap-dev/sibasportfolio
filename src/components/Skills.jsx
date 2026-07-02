import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Server, Wrench, Sparkles, Braces, Database, GitBranch, Cloud } from 'lucide-react'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      color: 'var(--color-primary)',
      skills: [
        { name: 'HTML/CSS', level: 90, icon: Braces },
        { name: 'JavaScript', level: 85, icon: Braces },
        { name: 'React.js', level: 80, icon: Braces },
        { name: 'Tailwind CSS', level: 90, icon: Braces },
      ],
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'var(--color-secondary)',
      skills: [
        { name: 'Python', level: 88, icon: Database },
        { name: 'Flask', level: 82, icon: Server },
        { name: 'Node.js', level: 85, icon: Server },
        { name: 'PostgreSQL', level: 75, icon: Database },
      ],
    },
    {
      title: 'Tools & Others',
      icon: Wrench,
      color: 'var(--color-accent)',
      skills: [
        { name: 'Git', level: 90, icon: GitBranch },
        { name: 'Docker', level: 70, icon: Cloud },
        { name: 'AWS', level: 65, icon: Cloud },
        { name: 'Figma', level: 80, icon: Wrench },
      ],
    },
  ]

  const techMarquee = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
    'Tailwind', 'Framer Motion', 'PostgreSQL', 'Docker', 'AWS',
    'Git', 'Figma', 'GraphQL', 'MongoDB', 'Redis',
  ]

  return (
    <section id="skills" className="py-28 px-4 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-[var(--color-primary)] rounded-full filter blur-[80px] opacity-[0.02] pointer-events-none" />

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
              Expertise
            </span>
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 font-display">
            My{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent animate-gradient-text">
              Skills
            </span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Category cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: categoryIndex * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10, scale: 1.01 }}
              className="group relative bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-white/[0.06] hover:border-white/[0.15] transition-[border,transform] duration-500 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${category.color}12, transparent)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `${category.color}15` }}
                  >
                    <category.icon style={{ color: category.color }} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="flex items-center gap-2">
                          <skill.icon size={14} style={{ color: category.color }} />
                          <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                        </div>
                        <span
                          className="text-xs font-bold tabular-nums"
                          style={{ color: category.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white/[0.06] rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={inView ? { scaleX: skill.level / 100 } : {}}
                          transition={{
                            duration: 1.2,
                            delay: 0.5 + categoryIndex * 0.15 + skillIndex * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative h-full rounded-full origin-left overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer-sweep" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Sparkles size={14} className="text-[var(--color-secondary)]" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
              Technologies I work with
            </span>
            <Sparkles size={14} className="text-[var(--color-primary)]" />
          </div>
          <div className="relative overflow-hidden py-4 border-y border-white/[0.04]">
            <div className="flex gap-12 animate-marquee">
              {[...techMarquee, ...techMarquee].map((tech, i) => (
                <span
                  key={i}
                  className="text-sm text-gray-500 whitespace-nowrap font-medium hover:text-white transition-colors"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mr-2" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
