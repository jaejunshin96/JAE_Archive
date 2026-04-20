'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Work } from '@/types'
import { EASE_EXPO } from '@/lib/motion'

interface Props {
  work: Work
  priority?: boolean
}

const imageVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.6, ease: EASE_EXPO } },
}

const overlayVariants = {
  rest:  { opacity: 0 },
  hover: { opacity: 0.18, transition: { duration: 0.35, ease: EASE_EXPO } },
}

export default function WorkCard({ work, priority = false }: Props) {
  const aspectClass =
    work.aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : work.aspectRatio === 'landscape'
      ? 'aspect-[16/9]'
      : 'aspect-square'

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">

      <div className={`relative overflow-hidden ${aspectClass}`}>

        <motion.div variants={imageVariants} className="absolute inset-0">
          <Image
            src={work.coverImage}
            alt={work.title}
            fill
            priority={priority}
            className="object-cover"
            style={{ objectPosition: work.coverPosition ?? 'center' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-ink pointer-events-none"
        />

      </div>

      <div className="mt-3 space-y-1">
        <span className="font-mono text-xs text-muted">{work.year}</span>
        <h3 className="font-serif text-base text-ink">{work.title}</h3>
        {work.sample && (
          <span className="font-mono text-[10px] text-faint tracking-widest uppercase border border-faint px-1.5 py-0.5">
            Sample
          </span>
        )}
      </div>

    </motion.div>
  )
}
