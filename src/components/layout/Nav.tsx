'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Nav() {
  const locale = useLocale()
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92])
  const bgColor = useMotionTemplate`rgba(245, 244, 241, ${bgOpacity})`

  return (
    <motion.header
      style={{ backgroundColor: bgColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <nav className="px-6 py-5">
        <Link
          href={`/${locale}`}
          className="font-serif text-sm tracking-widest text-ink hover:text-muted transition-colors duration-200"
        >
          JAE ARCHIVE
        </Link>
      </nav>
    </motion.header>
  )
}
