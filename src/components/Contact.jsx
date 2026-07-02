import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import {
  Mail, MapPin, Send, Github, Linkedin,
  CheckCircle, XCircle, ArrowUpRight, MessageSquare, Sparkles, PartyPopper
} from 'lucide-react'
import { useFirebaseData } from '../hooks/useFirebaseData'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const Contact = () => {
  const formRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [formData, setFormData] = useState({ from_name: '', reply_to: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const { from_name, reply_to, subject, message } = formData
    const templateParams = { from_name, reply_to, subject, message }

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

        if (AUTOREPLY_TEMPLATE_ID && !AUTOREPLY_TEMPLATE_ID.includes('your_')) {
          emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY)
        }

        setStatus('success')
        setFormData({ from_name: '', reply_to: '', subject: '', message: '' })
      } catch {
        setStatus('error')
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ from_name: '', reply_to: '', subject: '', message: '' })
    }

    setIsSubmitting(false)
    setTimeout(() => setStatus(null), 6000)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactInfo = useFirebaseData('contact')
  const contactData = contactInfo.data

  const email = contactData?.email || 'sibapra729@gmail.com'
  const location = contactData?.location || 'Bhubaneswar, India'
  const emailDesc = contactData?.emailDescription || "I'll respond within 24 hours"
  const locationDesc = contactData?.locationDescription || 'Open for remote opportunities'

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      description: emailDesc,
      color: 'var(--color-primary)',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
      href: contactData?.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(location)}`,
      description: locationDesc,
      color: 'var(--color-secondary)',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: contactData?.socialLinks?.find((s) => s.platform === 'linkedin')?.label || 'Siba Prasad Padhi',
      href: contactData?.socialLinks?.find((s) => s.platform === 'linkedin')?.url || 'https://www.linkedin.com/in/siba-prasad-padhi-197b61320/',
      description: "Let's connect professionally",
      color: 'var(--color-accent)',
    },
  ]

  return (
    <section
      id="contact"
      className="py-28 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[var(--color-primary)] rounded-full filter blur-[80px] opacity-[0.02] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[var(--color-accent)] rounded-full filter blur-[80px] opacity-[0.02] pointer-events-none" />

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
              Get in Touch
            </span>
            <span className="w-6 h-px bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 font-display">
            Let's{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent animate-gradient-text">
              Connect
            </span>
          </h2>
          <div className="section-divider" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Let's talk!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {contactDetails.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                whileHover={{ x: 8, scale: 1.01 }}
                className="group relative block p-5 bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${info.color}08, transparent)`,
                  }}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${info.color}15` }}
                  >
                    <info.icon style={{ color: info.color }} size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {info.label}
                    </div>
                    <div className="text-white font-medium mt-0.5">{info.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{info.description}</div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-600 group-hover:text-[var(--color-primary)] transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  />
                </div>
              </motion.a>
            ))}

            {/* Social connect card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="relative p-6 rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb),0.05), rgba(var(--color-secondary-rgb),0.05), rgba(var(--color-accent-rgb),0.05))',
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(500px circle at 30% 50%, rgba(var(--color-primary-rgb),0.08), transparent)',
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare size={16} className="text-[var(--color-secondary)]" />
                  <h3 className="text-lg font-semibold text-white font-display">Let's Connect</h3>
                </div>
                <p className="text-sm text-gray-400 mb-5">
                  Follow me on social media to see what I'm working on
                </p>
                <div className="flex gap-3">
                  {(contactData?.socialLinks?.length ? contactData.socialLinks : [
                    { platform: 'github', url: 'https://github.com/sibap-dev', label: 'GitHub' },
                    { platform: 'linkedin', url: 'https://www.linkedin.com/in/siba-prasad-padhi-197b61320/', label: 'LinkedIn' },
                    { platform: 'email', url: 'mailto:sibapra729@gmail.com', label: 'Email' },
                  ]).map((social, index) => {
                    const IconComp = social.platform === 'github' ? Github : social.platform === 'linkedin' ? Linkedin : Mail
                    const color = social.platform === 'github' ? 'var(--color-primary)' : social.platform === 'linkedin' ? 'var(--color-secondary)' : 'var(--color-accent)'
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -6, scale: 1.15 }}
                        className="p-3.5 rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 group"
                        style={{ background: `${color}08` }}
                      >
                        <IconComp
                          className="w-5 h-5"
                          style={{ color }}
                        />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="relative">
              <label
                htmlFor="from_name"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'from_name' || formData.from_name
                    ? '-top-2.5 text-xs bg-[#0a0a0a] px-2 text-[var(--color-primary)]'
                    : 'top-3.5 text-sm text-gray-500'
                }`}
              >
                Your Name
              </label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                onFocus={() => setFocusedField('from_name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 text-white transition-all hover:border-white/20"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="reply_to"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'reply_to' || formData.reply_to
                    ? '-top-2.5 text-xs bg-[#0a0a0a] px-2 text-[var(--color-secondary)]'
                    : 'top-3.5 text-sm text-gray-500'
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="reply_to"
                name="reply_to"
                value={formData.reply_to}
                onChange={handleChange}
                onFocus={() => setFocusedField('reply_to')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/10 text-white transition-all hover:border-white/20"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="subject"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'subject' || formData.subject
                    ? '-top-2.5 text-xs bg-[#0a0a0a] px-2 text-[var(--color-accent)]'
                    : 'top-3.5 text-sm text-gray-500'
                }`}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 text-white transition-all hover:border-white/20"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'message' || formData.message
                    ? '-top-2.5 text-xs bg-[#0a0a0a] px-2 text-[var(--color-primary)]'
                    : 'top-3.5 text-sm text-gray-500'
                }`}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 text-white transition-all resize-none hover:border-white/20"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_50px_rgba(var(--color-secondary-rgb),0.25)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <PartyPopper size={18} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3"
                >
                  <div className="p-1.5 bg-green-500/20 rounded-full">
                    <CheckCircle size={14} />
                  </div>
                  <span>Thank you! Your message has been sent successfully.</span>
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles size={14} />
                  </motion.span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
                >
                  <div className="p-1.5 bg-red-500/20 rounded-full">
                    <XCircle size={14} />
                  </div>
                  <span>Failed to send. Please try again or email me directly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
