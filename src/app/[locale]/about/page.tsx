import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { use } from 'react'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import ScrollReveal from '@/components/ui/ScrollReveal'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const url = `${siteUrl}/${locale}/about`

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: {
        ko: `${siteUrl}/ko/about`,
        en: `${siteUrl}/en/about`,
        ja: `${siteUrl}/ja/about`,
        'x-default': `${siteUrl}/ko/about`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url,
      type: 'website',
    },
  }
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()
  setRequestLocale(locale)
  const t = useTranslations('about')
  const services = t.raw('services') as { title: string; desc: string }[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rooviz',
    url: siteUrl,
    description: t('metaDescription'),
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@roovizstudio.com',
      contactType: 'customer support',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-widest text-faint mb-6 uppercase">
            {t('label')}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-ink leading-tight mb-12 [word-break:keep-all]">
            {t('heading')}
          </h1>
          <p className="font-mono text-sm text-muted leading-relaxed [word-break:keep-all] max-w-2xl">
            {t('intro')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-24 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="font-mono text-[10px] tracking-widest text-faint uppercase">
            {t('philosophyHeading')}
          </h2>
          <p className="font-mono text-sm text-muted leading-relaxed [word-break:keep-all]">
            {t('philosophy')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-24 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="font-mono text-[10px] tracking-widest text-faint uppercase">
            {t('servicesHeading')}
          </h2>
          <ul className="space-y-8">
            {services.map((s, i) => (
              <li key={i} className="border-t border-faint pt-6">
                <h3 className="font-serif text-lg text-ink mb-2">{s.title}</h3>
                <p className="font-mono text-sm text-muted leading-relaxed [word-break:keep-all]">
                  {s.desc}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-24 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="font-mono text-[10px] tracking-widest text-faint uppercase">
            {t('processHeading')}
          </h2>
          <p className="font-mono text-sm text-muted leading-relaxed [word-break:keep-all]">
            {t('process')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-24 grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="font-mono text-[10px] tracking-widest text-faint uppercase">
            {t('stackHeading')}
          </h2>
          <p className="font-mono text-sm text-muted leading-relaxed [word-break:keep-all]">
            {t('stack')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-24 pt-16 border-t border-faint grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="font-mono text-[10px] tracking-widest text-faint uppercase">
            {t('ctaHeading')}
          </h2>
          <div>
            <p className="font-mono text-sm text-muted leading-relaxed mb-6 [word-break:keep-all]">
              {t('cta')}
            </p>
            <a
              href="mailto:contact@roovizstudio.com"
              className="font-mono text-xs tracking-widest text-ink border-b border-ink pb-px hover:text-muted hover:border-muted transition-colors duration-200"
            >
              contact@roovizstudio.com →
            </a>
          </div>
        </ScrollReveal>
      </main>
    </>
  )
}
