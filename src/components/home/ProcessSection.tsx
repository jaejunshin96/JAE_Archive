'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'

type Step = { num: string; title: string; desc: string }

export default function ProcessSection() {
  const t = useTranslations('process')
  const steps = t.raw('steps') as Step[]

  return (
    <section className="px-6 pt-24 pb-24 max-w-7xl mx-auto border-t border-faint">
      <ScrollReveal className="mb-16">
        <p className="font-mono text-[10px] tracking-widest uppercase text-faint mb-3">
          {t('label')}
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-ink leading-tight [word-break:keep-all] max-w-2xl">
          {t('heading')}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-10 md:gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.08}>
            <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-6 border-t border-[var(--color-ink)]/10">
              <span
                className="font-serif text-4xl md:text-5xl text-ink leading-none"
                style={{ color: 'var(--color-accent, #C4A882)' }}
              >
                {step.num}
              </span>
              <div className="md:flex md:items-baseline md:gap-8 flex-1">
                <p className="font-mono text-[11px] tracking-widest uppercase text-ink md:w-32 shrink-0 mb-2 md:mb-0">
                  {step.title}
                </p>
                <p className="font-mono text-[12px] text-muted leading-relaxed [word-break:keep-all] max-w-xl">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
