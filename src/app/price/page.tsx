import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'

const tiers = [
  {
    name: 'BASIC',
    price: '₩390,000',
    items: [
      '1~5페이지 구성',
      '랜딩 · 메뉴판 수준',
      '반응형 디자인',
      '납기 약 4일',
    ],
    highlight: false,
  },
  {
    name: 'STANDARD',
    price: '₩790,000',
    items: [
      '~10페이지 구성',
      '인사말 · 오시는 길',
      '서비스 · 제품 소개',
      '납기 약 1주',
    ],
    highlight: false,
  },
  {
    name: 'PREMIUM',
    price: '₩1,490,000',
    items: [
      '20페이지 이상',
      '완전 맞춤형 제작',
      '기업 규모 프로젝트',
      '납기 별도 협의',
    ],
    highlight: false,
  },
]

export default function PricePage() {
  return (
    <PageTransition>
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-muted)] mb-3">
            Price
          </p>
          <h1 className="font-serif text-3xl text-[var(--color-ink)]">
            웹사이트 제작 비용
          </h1>
          <p className="font-mono text-[11px] text-[var(--color-ink-muted)] mt-4">
            모든 프로젝트는 사전 상담 후 가격과 일정을 확정합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-ink)]/10">
          {tiers.map((tier, i) => (
            <ScrollReveal
              key={tier.name}
              delay={i * 0.1}
              className={[
                'p-8 border-[var(--color-ink)]/10',
                'border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0',
                tier.highlight
                  ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
                  : 'bg-[var(--color-bg)] text-[var(--color-ink)]',
              ].join(' ')}
            >
              <p
                className={[
                  'font-mono text-[10px] tracking-widest uppercase mb-6',
                  tier.highlight
                    ? 'text-[var(--color-bg)]/60'
                    : 'text-[var(--color-ink-muted)]',
                ].join(' ')}
              >
                {tier.name}
              </p>

              <p className="font-serif text-3xl mb-1">{tier.price}</p>
              <p
                className={[
                  'font-mono text-[10px] mb-8',
                  tier.highlight
                    ? 'text-[var(--color-bg)]/50'
                    : 'text-[var(--color-ink-faint)]',
                ].join(' ')}
              >
                ~부터
              </p>

              <ul className="space-y-2">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className={[
                      'font-mono text-[11px] flex items-start gap-2',
                      tier.highlight
                        ? 'text-[var(--color-bg)]/70'
                        : 'text-[var(--color-ink-muted)]',
                    ].join(' ')}
                  >
                    <span className="mt-px opacity-40">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35} className="mt-10 flex flex-col gap-1">
          <p className="font-mono text-[10px] text-[var(--color-ink-faint)]">
            문의 및 상담
          </p>
          <div className="flex items-baseline gap-8 mt-2">
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
        </ScrollReveal>
      </main>
    </PageTransition>
  )
}
