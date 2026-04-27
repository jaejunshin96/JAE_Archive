'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Work } from '@/types'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Props {
  work: Work
  locale?: 'ko' | 'en' | 'ja'
}


export default function WorkDetail({ work, locale = 'ko' }: Props) {
  const description = work.description[locale] ?? work.description.ko
  const allImages = [work.coverImage, ...work.images]

  return (
    <article className="pt-20">
      {/* Header */}
      <div className="px-4 py-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <Link
            href="/"
            className="font-mono text-xs text-muted hover:text-ink transition-colors duration-200 tracking-widest"
          >
            ← Archive
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-muted">{work.year}</span>
            <span className="font-mono text-[10px] text-faint tracking-widest uppercase">
              {work.category}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-ink mb-8 leading-tight">
            {work.title}
          </h1>
          <p className="font-mono text-sm text-muted leading-relaxed">
            {description}
          </p>
          {work.keywords && work.keywords.length > 0 && (
            <p className="mt-4 font-mono text-[10px] text-faint tracking-widest uppercase">
              {work.keywords.join(' · ')}
            </p>
          )}
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 font-mono text-xs tracking-widest text-ink border-b border-ink pb-px hover:text-muted hover:border-muted transition-colors duration-200"
            >
              Visit Site →
            </a>
          )}
        </ScrollReveal>
      </div>

      {/* Images — alternating left / right */}
      <div className="px-6 pb-32 max-w-7xl mx-auto flex flex-col gap-y-16 md:gap-y-24">
        {allImages.map((src, i) => {
          const isRight = i % 2 === 1
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isRight ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              className={`w-full md:w-[65%] ${isRight ? 'md:ml-auto' : 'md:mr-auto'}`}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={src}
                  alt={`${work.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 65vw"
                  priority={i === 0}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </article>
  )
}
