import Link from 'next/link'
import { Work } from '@/types'
import WorkCard from '@/components/works/WorkCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

interface Props {
  works: Work[]
  locale: string
}

export default function WorksGrid({ works, locale }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
      {works.map((work, i) => (
        <ScrollReveal
          key={work.slug}
          delay={i * 0.04}
          className={cn(
            work.gridSize === 'wide' && 'md:col-span-2',
            work.gridSize === 'full' && 'md:col-span-3',
          )}
        >
          <Link href={`/${locale}/works/${work.slug}`}>
            <WorkCard work={work} />
          </Link>
        </ScrollReveal>
      ))}
    </div>
  )
}
