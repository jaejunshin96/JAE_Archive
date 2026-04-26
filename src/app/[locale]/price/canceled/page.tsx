import { use } from 'react'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function CheckoutCanceledPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  setRequestLocale(locale)
  const t = useTranslations('price.canceled')

  return (
    <PageTransition>
      <main className="pt-32 pb-24 px-6 max-w-2xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-muted)] mb-3">
            {t('label')}
          </p>
          <h1 className="font-serif text-3xl text-[var(--color-ink)]">{t('heading')}</h1>
          <p className="font-mono text-[11px] text-[var(--color-ink-muted)] mt-4 leading-relaxed">
            {t('body')}
          </p>
          <Link
            href={`/${locale}/price`}
            className="inline-block mt-10 font-mono text-[10px] tracking-widest uppercase border-b border-[var(--color-ink)]/30 pb-1 text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
          >
            {t('back')}
          </Link>
        </ScrollReveal>
      </main>
    </PageTransition>
  )
}
