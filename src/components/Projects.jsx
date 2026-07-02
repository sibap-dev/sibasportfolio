import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, X, ArrowUpRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { useFirebaseData } from '../hooks/useFirebaseData'

const DEFAULT_PROJECTS = [
  {
    pinned: true,
    image: null,
    icon: '\u{1F680}',
    title: 'Personal Portfolio Website',
    description: 'A responsive multi-page personal website created using Flask to showcase my skills, projects, resume, and contact information.',
    tech: ['Flask', 'HTML5', 'CSS3', 'Jinja2', 'Python'],
    github: 'https://github.com/sibap-dev/My_Portfolio',
    demo: 'https://sibas-portfolio.onrender.com/',
    category: 'Full Stack',
    gradient: 'from-[var(--color-primary)] via-[#0099CC] to-[#005577]',
  },
  {
    pinned: true,
    image: null,
    icon: '\u{1F3AC}',
    title: 'Netflix Clone',
    description: 'A pixel-perfect front-end recreation of Netflix\'s interface using modern HTML and CSS techniques with responsive design and smooth animations.',
    tech: ['HTML5', 'CSS3', 'Responsive Design'],
    github: 'https://github.com/sibap-dev/Netflix_clone',
    demo: 'https://sibap-dev.github.io/Netflix_clone/',
    category: 'Frontend',
    gradient: 'from-[var(--color-secondary)] via-[#7B1FA2] to-[#4A0072]',
  },
  {
    pinned: true,
    image: null,
    icon: '\u{1F3C6}',
    title: 'Tribute Page',
    description: 'An elegant tribute page showcasing clean HTML structure and beautiful CSS styling with attention to typography and visual hierarchy.',
    tech: ['HTML5', 'CSS3', 'Typography'],
    github: 'https://github.com/sibap-dev/Tribute_page',
    demo: null,
    category: 'Frontend',
    gradient: 'from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]',
  },
  {
    pinned: false,
    image: null,
    icon: '\u{1F4FA}',
    title: 'YouTube Video Downloader',
    description: 'A powerful web application that allows users to download YouTube videos with ease, built with Flask backend and intuitive user interface.',
    tech: ['Flask', 'Python', 'HTML5', 'API Integration'],
    github: 'https://github.com/sibap-dev/Youtube-download-main',
    demo: null,
    category: 'Backend',
    gradient: 'from-[var(--color-accent)] via-[var(--color-secondary)] to-[var(--color-primary)]',
  },
  {
    pinned: false,
    image: null,
    icon: '\u{1F9EE}',
    title: 'Online Calculator App',
    description: 'A fully functional calculator web application with a clean interface and smooth user experience, deployed on Render.',
    tech: ['Flask', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/sibap-dev/Task_internship',
    demo: 'https://siba-calculator.onrender.com/',
    category: 'Full Stack',
    gradient: 'from-[var(--color-primary)] via-[#0099CC] to-[#005577]',
  },
  {
    pinned: false,
    image: null,
    icon: '\u{1F9F4}',
    title: 'Green Shyne - Phenyl Website',
    description: 'A feature-rich website built for a phenyl brand with product categories, media gallery, branches, contact form, and more.',
    tech: ['Flask', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/sibap-dev/Green-Shyne',
    demo: 'https://green-shyne.vercel.app/',
    category: 'Full Stack',
    gradient: 'from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]',
  },
]

const Projects = () => {
  const { data: projectsData } = useFirebaseData('projects')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRefs = useRef([])

  const tiltRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  const handleMouseMove = useCallback((e, index) => {
    const card = cardRefs.current[index]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    tiltRef.current = { x: y * -15, y: x * 15 }
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        setTilt(tiltRef.current)
        frameRef.current = null
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  const allProjects = projectsData?.items?.length ? projectsData.items : DEFAULT_PROJECTS
  const projects = showAll ? allProjects : allProjects.filter(p => p.pinned)

  return (
    <section
      id="projects"
      className="py-28 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] relative overflow-hidden"
    >
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
              Portfolio
            </span>
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 font-display">
            Featured{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent animate-gradient-text">
              Projects
            </span>
          </h2>
          <div className="section-divider" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and creativity
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => {
                setHoveredIndex(null)
                handleMouseLeave()
              }}
              style={{
                perspective: '1000px',
              }}
              className="group relative bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-[border,transform] duration-500"
            >
              <motion.div
                className="relative"
                animate={{
                  rotateX: hoveredIndex === index ? tilt.x : 0,
                  rotateY: hoveredIndex === index ? tilt.y : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`}>
                      <div className="absolute inset-0 bg-black/5" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
                      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5 blur-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: hoveredIndex === index ? 1.15 : 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-lg"
                        >
                          <span className="text-3xl select-none">{project.icon}</span>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  {/* Tech badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  {/* Shine overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors font-display">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <motion.a
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-lg hover:bg-[var(--color-primary)]/15 transition-all"
                      >
                        <Github size={16} className="text-gray-400 hover:text-[var(--color-primary)]" />
                      </motion.a>
                      {project.demo && (
                        <motion.a
                          whileHover={{ scale: 1.15, rotate: -8 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-[var(--color-accent)]/15 transition-all"
                        >
                          <ExternalLink size={16} className="text-gray-400 hover:text-[var(--color-accent)]" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.08 }}
                        className="px-2.5 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/10"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t border-white/5">
                    <motion.button
                      whileHover="hover"
                      className="ml-auto text-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-2 text-xs font-medium"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye size={14} />
                      <span>Details</span>
                      <motion.span
                        variants={{ hover: { x: 2, y: -2 } }}
                        className="inline-flex"
                      >
                        <ArrowUpRight size={12} />
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Show more / Show less */}
        {allProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-white/5 text-white rounded-full text-sm font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
            >
              {showAll ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>Show More <ChevronDown size={16} /></>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#121212] rounded-3xl max-w-lg w-full overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal thumbnail */}
              <div className="h-44 relative overflow-hidden">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${selectedProject.gradient}`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-transparent" />
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/5 blur-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15">
                        <span className="text-2xl select-none">{selectedProject.icon}</span>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 z-10 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-2xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h3>
                  <span className="text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-gray-300 mt-4 leading-relaxed">{selectedProject.description}</p>

                <div className="mt-6">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={selectedProject.github}
                    target="_blank"
                    className="flex-1 py-3 bg-white/5 text-white rounded-xl text-center text-sm font-medium hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Github size={16} className="inline mr-2" />
                    View Code
                  </motion.a>
                  {selectedProject.demo && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href={selectedProject.demo}
                      target="_blank"
                      className="flex-1 py-3 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white rounded-xl text-center text-sm font-semibold hover:shadow-[0_0_40px_rgba(var(--color-secondary-rgb),0.3)] transition-shadow"
                    >
                      <ExternalLink size={16} className="inline mr-2" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
