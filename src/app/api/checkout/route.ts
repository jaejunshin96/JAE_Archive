import { NextResponse } from 'next/server'
import { assertStripe } from '@/lib/stripe'
import { getPriceIdForTier, isTierKey } from '@/lib/stripe-prices'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { tier } = await req.json()
    if (!isTierKey(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const stripe = assertStripe()
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'en',
      line_items: [{ price: getPriceIdForTier(tier), quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${origin}/en/price/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/en/price/canceled`,
      metadata: { tier },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] error:', err)
    const message = err instanceof Error ? err.message : 'Checkout error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
