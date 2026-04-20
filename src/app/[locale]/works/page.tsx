import { getTranslations } from 'next-intl/server'
import { works } from '@/data/works'
import WorksGrid from '@/components/works/WorksGrid'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('works')

  return (
    <main className="px-6 pt-32 pb-24 max-w-7xl mx-auto">
      <h1 className="font-mono text-xs tracking-widest uppercase text-muted mb-16">
        {t('heading')}
      </h1>
      <WorksGrid works={works} locale={locale} />
    </main>
  )
}
