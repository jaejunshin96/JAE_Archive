import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CheckoutButton from '@/components/price/CheckoutButton'

const OPEN_EVENT_SLOTS = { total: 10, remaining: 9 }

type TierKey = 'basic' | 'standard' | 'premium'
type Currency = 'ko' | 'en' | 'ja'

const PRICES: Record<TierKey, Record<Currency, { price: string; originalPrice?: string }>> = {
  basic: {
    ko: { price: '₩149,000', originalPrice: '₩390,000' },
    en: { price: '$109', originalPrice: '$290' },
    ja: { price: '¥16,900', originalPrice: '¥44,000' },
  },
  standard: {
    ko: { price: '₩790,000' },
    en: { price: '$590' },
    ja: { price: '¥89,000' },
  },
  premium: {
    ko: { price: '₩1,490,000' },
    en: { price: '$1,090' },
    ja: { price: '¥168,000' },
  },
}

const PAYMENT_LINKS: Record<TierKey, string> = {
  basic: 'https://buy.stripe.com/6oU14hfZYgGW62O7dx9EI00',
  standard: 'https://buy.stripe.com/3cIeV7eVU62i4YK8hB9EI01',
  premium: 'https://buy.stripe.com/eVqdR38xw3Uabn89lF9EI02',
}

const TIER_META: { key: TierKey; hasEvent?: boolean }[] = [
  { key: 'basic', hasEvent: true },
  { key: 'standard' },
  { key: 'premium' },
]

export default function PricePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  setRequestLocale(locale)
  const t = useTranslations('price')
  const tc = useTranslations('contact')
  const currentLocale = useLocale() as Currency

  return (
    <PageTransition>
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-muted)] mb-3">
            {t('label')}
          </p>
          <h1 className="font-serif text-3xl text-[var(--color-ink)]">{t('heading')}</h1>
          <p className="font-mono text-[11px] text-[var(--color-ink-muted)] mt-4">
            {t('subheading')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-ink)]/10">
          {TIER_META.map((tier, i) => {
            const items = t.raw(`tiers.${tier.key}.items`) as string[]
            const name = t(`tiers.${tier.key}.name`)
            const { price, originalPrice } = PRICES[tier.key][currentLocale]
            return (
              <ScrollReveal
                key={tier.key}
                delay={i * 0.1}
                className={[
                  'p-8 border-[var(--color-ink)]/10',
                  'border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0',
                  'bg-[var(--color-bg)] text-[var(--color-ink)]',
                  tier.hasEvent ? 'outline outline-2 outline-red-500 relative z-10' : '',
                ].join(' ')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-muted)]">
                    {name}
                  </p>
                  {tier.hasEvent && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <p className="font-mono text-[10px] tracking-widest uppercase text-red-500">
                        {t('eventNote')}
                      </p>
                    </div>
                  )}
                </div>

                {tier.hasEvent && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: OPEN_EVENT_SLOTS.total }).map((_, idx) => (
                        <span
                          key={idx}
                          className={[
                            'w-2 h-2',
                            idx < OPEN_EVENT_SLOTS.remaining
                              ? 'bg-red-500'
                              : 'border border-red-500/40',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                    <p className="font-mono text-[10px] text-red-500">
                      {OPEN_EVENT_SLOTS.remaining}/{OPEN_EVENT_SLOTS.total}
                    </p>
                  </div>
                )}
                {originalPrice && (
                  <p className="font-mono text-sm line-through text-[var(--color-ink-faint)] mb-1">
                    {originalPrice}
                  </p>
                )}
                <p
                  className={[
                    'font-serif text-4xl mb-1',
                    tier.hasEvent ? 'text-red-500' : '',
                  ].join(' ')}
                >
                  {price}
                </p>
                <p className="font-mono text-[10px] mb-8 text-[var(--color-ink-faint)]">
                  {t('from')}
                </p>

                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[11px] flex items-start gap-2 text-[var(--color-ink-muted)]"
                    >
                      <span className="mt-px opacity-40">·</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {currentLocale === 'en' && <CheckoutButton href={PAYMENT_LINKS[tier.key]} />}
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.35} className="mt-10 flex flex-col gap-1">
          <p className="font-mono text-[10px] text-[var(--color-ink-faint)]">{tc('label')}</p>
          <div className="flex items-baseline gap-8 mt-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">
              {tc('tel')}
            </span>
            <span className="font-mono text-sm text-ink">+82 10 3633 2487</span>
          </div>
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-faint w-16">
              {tc('email')}
            </span>
            <a
              href="mailto:contact@roovizstudio.com"
              className="font-mono text-sm text-ink hover:text-muted transition-colors duration-200"
            >
              contact@roovizstudio.com
            </a>
          </div>
        </ScrollReveal>
      </main>
    </PageTransition>
  )
}
