import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import HeroSection from '@/components/home/HeroSection'
import WorksGrid from '@/components/works/WorksGrid'
import ProcessSection from '@/components/home/ProcessSection'
import ClientsSection from '@/components/home/ClientsSection'
import { works } from '@/data/works'

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  setRequestLocale(locale)
  const t = useTranslations('contact')

  return (
    <main>
      <HeroSection />

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <WorksGrid works={works} />
      </section>

      <ProcessSection />
      <ClientsSection />

      <section className="px-6 pt-24 pb-16 max-w-7xl mx-auto border-t border-faint">
        <div className="space-y-10">
          <p className="font-mono text-[10px] tracking-widest text-faint">{t('label')}</p>
          <div className="space-y-4">
            <div className="flex items-baseline gap-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16 shrink-0">
                {t('tel')}
              </span>
              <span className="font-mono text-xs text-ink">+82 10 3633 2487</span>
            </div>
            <div className="flex items-baseline gap-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16 shrink-0">
                {t('email')}
              </span>
              <a
                href="mailto:rooviz-contact@naver.com"
                className="font-mono text-xs text-ink hover:text-muted transition-colors duration-200"
              >
                rooviz-contact@naver.com
              </a>
            </div>
          </div>
          <p className="font-mono text-[10px] tracking-widest text-muted leading-loose">
            {t('business')}
          </p>
        </div>
      </section>
    </main>
  )
}
