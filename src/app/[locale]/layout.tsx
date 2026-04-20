import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JAE ARCHIVE',
  description: 'Visual Archive — Web Design & Development',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${GeistMono.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
