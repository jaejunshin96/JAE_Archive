import { notFound } from 'next/navigation'
import { works } from '@/data/works'
import WorkDetail from '@/components/works/WorkDetail'
import { routing } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    works.map((work) => ({ locale, slug: work.slug }))
  )
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const work = works.find((w) => w.slug === slug)

  if (!work) notFound()

  return <WorkDetail work={work} />
}
