import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STUDIO ZORBA',
  description: 'Visual Archive — Web Design & Development',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${playfair.variable} ${GeistMono.variable}`}>
      <body>
        <Nav />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
