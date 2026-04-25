'use client'

import { useTranslations } from 'next-intl'

export default function CheckoutButton({ href }: { href: string }) {
  const t = useTranslations('price.checkout')

  return (
    <div className="mt-8">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full font-mono text-[10px] tracking-widest uppercase border border-[var(--color-ink)]/20 py-3 text-center text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors duration-300"
      >
        {t('button')}
      </a>
    </div>
  )
}
