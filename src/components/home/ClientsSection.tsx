'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { clientLogos } from '@/data/clients'

type Testimonial = { quote: string; author: string; role: string }

export default function ClientsSection() {
  const t = useTranslations('clients')
  const testimonials = t.raw('testimonials') as Testimonial[]

  return (
    <section className="px-6 pt-24 pb-24 max-w-7xl mx-auto border-t border-faint">
      <ScrollReveal className="mb-14">
        <p className="font-mono text-[10px] tracking-widest uppercase text-faint mb-3">
          {t('label')}
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-ink leading-tight [word-break:keep-all] max-w-2xl">
          {t('heading')}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-6 border-y border-[var(--color-ink)]/10">
          {clientLogos.map((c) => (
            <div
              key={c.name}
              className="aspect-[3/2] flex items-center justify-center border-r border-b md:border-b-0 border-[var(--color-ink)]/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r odd:border-r"
            >
              <span
                className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-ink-muted)] hover:text-ink transition-colors duration-300"
                aria-label={c.name}
              >
                {c.mark}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {testimonials.map((q, i) => (
          <ScrollReveal key={q.author} delay={0.15 + i * 0.1}>
            <figure className="flex flex-col gap-5">
              <blockquote className="font-serif text-lg md:text-xl text-ink leading-relaxed [word-break:keep-all]">
                “{q.quote}”
              </blockquote>
              <figcaption className="font-mono text-[10px] tracking-widest uppercase text-faint">
                {q.author} · {q.role}
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
