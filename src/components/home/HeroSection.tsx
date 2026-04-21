'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export default function HeroSection() {
  return (
    <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto flex items-end justify-between">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-ink leading-none"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
      >
        ROOVIZ ARCHIVE
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="font-mono text-xs text-muted tracking-widest text-right hidden sm:block pb-2"
      >
        구현된 디지털 시선 — 2021–현재
      </motion.p>
    </section>
  )
}
