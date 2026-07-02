import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 px-4 border-t border-white/[0.04]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-sm text-gray-500 text-center"
      >
        &copy; {currentYear} Siba Prasad Padhi. All rights reserved.
      </motion.div>
    </footer>
  )
}

export default Footer
