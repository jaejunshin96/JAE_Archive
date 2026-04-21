'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Nav() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92])
  const bgColor = useMotionTemplate`rgba(245, 244, 241, ${bgOpacity})`
  const pathname = usePathname()

  return (
    <motion.header
      style={{ backgroundColor: bgColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <nav className="px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-sm tracking-widest text-ink hover:text-muted transition-colors duration-200"
        >
          STUDIO ZORBA
        </Link>
        <Link
          href="/price"
          className={[
            'font-mono text-[10px] tracking-widest uppercase transition-colors duration-200',
            pathname === '/price'
              ? 'text-[var(--color-ink)]'
              : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
          ].join(' ')}
        >
          Price
        </Link>
      </nav>
    </motion.header>
  )
}
