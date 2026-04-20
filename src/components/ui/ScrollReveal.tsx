'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollReveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
