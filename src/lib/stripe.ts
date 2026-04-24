import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY

export const stripe = key
  ? new Stripe(key)
  : (null as unknown as Stripe)

export function assertStripe(): Stripe {
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return stripe
}
