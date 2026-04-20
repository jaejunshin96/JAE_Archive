'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Work } from '@/types'
import { imageReveal } from '@/lib/motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Props {
  work: Work
}

export default function WorkDetail({ work }: Props) {
  const locale = useLocale() as 'ko' | 'en'
  const t = useTranslations('works')

  return (
    <article className="pt-20">
      {/* 헤더 이미지 */}
      <motion.div
        variants={imageReveal}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <Image
          src={work.coverImage}
          alt={work.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* 메타 + 설명 */}
      <div className="px-6 py-16 max-w-3xl mx-auto">
        <ScrollReveal>
          <Link
            href={`/${locale}/works`}
            className="font-mono text-xs text-muted hover:text-ink transition-colors duration-200 tracking-widest"
          >
            {t('back')}
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
            {locale === 'en' && work.titleEn ? work.titleEn : work.title}
          </h1>
          <p className="font-mono text-sm text-muted leading-relaxed">
            {work.description[locale]}
          </p>
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

      {/* 추가 이미지 */}
      {work.images.length > 0 && (
        <div className="px-6 pb-24 max-w-5xl mx-auto space-y-8">
          {work.images.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={src}
                  alt={`${work.title} ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </article>
  )
}
