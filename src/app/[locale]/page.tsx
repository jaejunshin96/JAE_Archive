import HeroSection from '@/components/home/HeroSection'
import WorksGrid from '@/components/works/WorksGrid'
import { works } from '@/data/works'
import { getTranslations } from 'next-intl/server'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('contact')

  return (
    <main>
      <HeroSection />

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <WorksGrid works={works} locale={locale} />
      </section>

      <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto border-t border-faint">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-16">
          {t('heading')}
        </p>
        <div className="space-y-4">
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">Tel</span>
            <span className="font-mono text-sm text-ink">+82 10 3633 2487</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">Email</span>
            <a
              href="mailto:jaeshinkorean@gmail.com"
              className="font-mono text-sm text-ink hover:text-muted transition-colors duration-200"
            >
              jaeshinkorean@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
