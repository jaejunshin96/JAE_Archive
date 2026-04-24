import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { assertStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = req.headers.get('stripe-signature')

  if (!secret || !signature) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  const stripe = assertStripe()
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('[stripe] checkout.session.completed', {
      id: session.id,
      tier: session.metadata?.tier,
      email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
    })
  }

  return NextResponse.json({ received: true })
}
