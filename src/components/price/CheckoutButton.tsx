'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { TierKey } from '@/lib/stripe-prices'

export default function CheckoutButton({ tier }: { tier: TierKey }) {
  const t = useTranslations('price.checkout')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout failed')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="w-full font-mono text-[10px] tracking-widest uppercase border border-[var(--color-ink)]/20 py-3 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? t('loading') : t('button')}
      </button>
      {error && (
        <p className="font-mono text-[10px] text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
