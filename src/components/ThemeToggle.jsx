import { motion } from 'framer-motion'

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center h-8 w-[130px] rounded-full bg-white/[0.04] border border-white/[0.06] overflow-hidden"
      aria-label={`Switch to ${theme === 'cold' ? 'warm' : 'cold'} theme`}
    >
      <motion.div
        className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20"
        animate={{ x: theme === 'cold' ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <span
        className={`relative z-10 flex-1 text-[11px] font-medium tracking-wider uppercase transition-colors duration-300 ${
          theme === 'cold' ? 'text-white' : 'text-gray-500'
        }`}
      >
        Cold
      </span>
      <span
        className={`relative z-10 flex-1 text-[11px] font-medium tracking-wider uppercase transition-colors duration-300 ${
          theme === 'warm' ? 'text-white' : 'text-gray-500'
        }`}
      >
        Warm
      </span>
    </button>
  )
}

export default ThemeToggle