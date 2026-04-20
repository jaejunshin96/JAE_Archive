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

      <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto border-t border-faint">
        <p className="font-mono text-xs tracking-widest uppercase text-muted mb-16">
          연락
        </p>
        <div className="space-y-4">
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">Tel</span>
            <span className="font-mono text-sm text-ink">+82 10 3633 2487</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">Email</span>
            <a
              href="mailto:studio.zorba.contact@gmail.com"
              className="font-mono text-sm text-ink hover:text-muted transition-colors duration-200"
            >
              studio.zorba.contact@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
