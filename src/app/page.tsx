import HeroSection from '@/components/home/HeroSection'
import WorksGrid from '@/components/works/WorksGrid'
import { works } from '@/data/works'

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <WorksGrid works={works} />
      </section>

      <section className="px-6 pt-24 pb-16 max-w-7xl mx-auto border-t border-faint">
        <div className="space-y-10">
          <p className="font-mono text-[10px] tracking-widest text-faint">문의 및 상담</p>
          <div className="space-y-4">
            <div className="flex items-baseline gap-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16 shrink-0">Tel</span>
              <span className="font-mono text-xs text-ink">+82 10 3633 2487</span>
            </div>
            <div className="flex items-baseline gap-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16 shrink-0">Email</span>
              <a
                href="mailto:rooviz-contact@naver.com"
                className="font-mono text-xs text-ink hover:text-muted transition-colors duration-200"
              >
                rooviz-contact@naver.com
              </a>
            </div>
          </div>
          <p className="font-mono text-[10px] tracking-widest text-muted leading-loose">
            SHIN &amp; CO &nbsp;·&nbsp; 신재준 &nbsp;·&nbsp; 404-64-00558 &nbsp;·&nbsp; 제2026-대구달서-0427호 &nbsp;·&nbsp; 대구광역시 이곡공원로 83
          </p>
        </div>
      </section>
    </main>
  )
}
