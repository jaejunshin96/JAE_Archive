import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import { routing } from '@/i18n/routing'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rooviz.com'
const locales = ['ko', 'en', 'ja'] as const
type SupportedLocale = (typeof locales)[number]

const localeMap: Record<SupportedLocale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('title')
  const description = t('description')
  const ogLocale = localeMap[(locale as SupportedLocale)] ?? 'ko_KR'
  const alternateLocales = locales.filter((l) => l !== locale).map((l) => localeMap[l])

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | Rooviz`,
    },
    description,
    keywords: locale === 'ko'
      ? ['웹디자인', '웹개발', '포트폴리오', '브랜드 웹사이트', 'Next.js', 'Rooviz']
      : locale === 'ja'
      ? ['ウェブデザイン', 'ウェブ開発', 'ポートフォリオ', 'Next.js', 'Rooviz']
      : ['web design', 'web development', 'portfolio', 'brand website', 'Next.js', 'Rooviz'],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        ko: `${siteUrl}/ko`,
        en: `${siteUrl}/en`,
        ja: `${siteUrl}/ja`,
        'x-default': `${siteUrl}/ko`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: 'Rooviz',
      type: 'website',
      locale: ogLocale,
      alternateLocale: alternateLocales,
      images: [
        {
          url: '/assets/ROOVIZ.jpg',
          width: 2000,
          height: 2000,
          alt: 'Rooviz — Visual Archive',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/ROOVIZ.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${GeistMono.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
