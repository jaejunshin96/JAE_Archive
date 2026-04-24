export type TierKey = 'basic' | 'standard' | 'premium'

export const TIER_KEYS: readonly TierKey[] = ['basic', 'standard', 'premium']

export function isTierKey(value: unknown): value is TierKey {
  return typeof value === 'string' && (TIER_KEYS as readonly string[]).includes(value)
}

export function getPriceIdForTier(tier: TierKey): string {
  const map: Record<TierKey, string | undefined> = {
    basic: process.env.STRIPE_PRICE_BASIC,
    standard: process.env.STRIPE_PRICE_STANDARD,
    premium: process.env.STRIPE_PRICE_PREMIUM,
  }
  const id = map[tier]
  if (!id) {
    throw new Error(`Stripe Price ID for tier "${tier}" is not configured`)
  }
  return id
}
