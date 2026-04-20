'use client'

import { motion } from 'framer-motion'
import { Work } from '@/types'
import WorkCard from '@/components/works/WorkCard'

interface Props {
  works: Work[]
}

export default function WorksGrid({ works }: Props) {
  return (
    <div className="flex flex-col gap-y-24 md:gap-y-32">
      {works.map((work, i) => {
        const isRight = i % 2 === 1

        return (
          <motion.div
            key={work.slug}
            initial={{ opacity: 0, x: isRight ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="w-full flex items-center gap-8 md:gap-12"
          >
            {isRight && (
              <div className="hidden md:flex flex-col justify-center flex-1 text-right pr-4">
                <p className="font-mono text-[11px] text-muted leading-relaxed mb-3 [word-break:keep-all]">
                  {work.description.ko}
                </p>
                <span className="font-mono text-[10px] text-faint tracking-widest">
                  {[String(work.year), ...(work.keywords ?? [])].join(' · ')}
                </span>
              </div>
            )}

            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full md:w-[62%] shrink-0"
            >
              <WorkCard work={work} />
              <p className="md:hidden mt-3 font-mono text-[11px] text-muted leading-relaxed [word-break:keep-all]">
                {work.description.ko}
              </p>
              {work.keywords && (
                <span className="md:hidden mt-2 block font-mono text-[10px] text-faint tracking-widest">
                  {[String(work.year), ...work.keywords].join(' · ')}
                </span>
              )}
            </a>

            {!isRight && (
              <div className="hidden md:flex flex-col justify-center flex-1 pl-4">
                <p className="font-mono text-[11px] text-muted leading-relaxed mb-3 [word-break:keep-all]">
                  {work.description.ko}
                </p>
                <span className="font-mono text-[10px] text-faint tracking-widest">
                  {[String(work.year), ...(work.keywords ?? [])].join(' · ')}
                </span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
