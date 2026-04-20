'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Work } from '@/types'
import { EASE_EXPO } from '@/lib/motion'

interface Props {
  work: Work
  priority?: boolean
}

export default function WorkCard({ work, priority = false }: Props) {
  const locale = useLocale()
  const displayTitle = locale === 'en' && work.titleEn ? work.titleEn : work.title
  const aspectClass =
    work.aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : work.aspectRatio === 'landscape'
      ? 'aspect-[16/9]'
      : 'aspect-square'

  return (
    <div className="group">
      {/* 이미지 */}
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="absolute inset-0"
        >
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
      </div>

      {/* 메타 */}
      <motion.div
        initial={{ opacity: 0.7, y: 0 }}
        whileHover={{ opacity: 1, y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mt-3 space-y-1"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">{work.year}</span>
          <span className="font-mono text-[10px] text-faint tracking-widest uppercase">
            {work.category}
          </span>
          {work.sample && (
            <span className="font-mono text-[10px] text-faint tracking-widest uppercase border border-faint px-1.5 py-0.5">
              Sample
            </span>
          )}
        </div>
        <h3 className="font-serif text-base text-ink">
          {displayTitle}
        </h3>
      </motion.div>
    </div>
  )
}
