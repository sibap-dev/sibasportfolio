import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

const Counter = ({ to = 0, suffix = '', prefix = '', duration = 2, start = false }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v))
    })
    return () => controls.stop()
  }, [start, to, duration])

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

export default Counter
