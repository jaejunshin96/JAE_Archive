import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { works } from '@/data/works'
import { routing } from '@/i18n/routing'
import WorkDetail from '@/components/works/WorkDetail'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'
type SupportedLocale = 'ko' | 'en' | 'ja'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    works.map((w) => ({ locale, slug: w.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const work = works.find((w) => w.slug === slug)
  if (!work) return {}

  const loc = (locale as SupportedLocale)
  const description = work.description[loc] ?? work.description.ko
  const title = `${work.title}${work.titleEn ? ` (${work.titleEn})` : ''} — ${work.category}`
  const url = `${siteUrl}/${locale}/works/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ko: `${siteUrl}/ko/works/${slug}`,
        en: `${siteUrl}/en/works/${slug}`,
        ja: `${siteUrl}/ja/works/${slug}`,
        'x-default': `${siteUrl}/ko/works/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: work.coverImage, alt: work.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [work.coverImage],
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()
  setRequestLocale(locale)

  const work = works.find((w) => w.slug === slug)
  if (!work) notFound()

  const loc = (locale as SupportedLocale)
  const description = work.description[loc] ?? work.description.ko

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    alternateName: work.titleEn,
    description,
    dateCreated: String(work.year),
    image: [work.coverImage, ...work.images].map((src) => `${siteUrl}${src}`),
    url: `${siteUrl}/${locale}/works/${slug}`,
    creator: { '@type': 'Organization', name: 'Rooviz', url: siteUrl },
    keywords: work.keywords?.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkDetail work={work} locale={loc} />
    </>
  )
}
