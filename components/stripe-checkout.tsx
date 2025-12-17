"use client"

import { useCallback, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import type { CartItem } from "@/lib/cart-context"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  items: CartItem[]
  customerInfo: {
    email: string
    name: string
    eventDate: string
    eventTime: string
    deliveryAddress: string
    city: string
    zipCode: string
    notes?: string
  }
}

export default function StripeCheckout({ items, customerInfo }: StripeCheckoutProps) {
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    try {
      const { clientSecret } = await createCheckoutSession(items, customerInfo)
      return clientSecret
    } catch (err) {
      setError("Failed to initialize payment. Please try again.")
      console.error("[v0] Stripe checkout error:", err)
      return ""
    }
  }, [items, customerInfo])

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-semibold">Payment Error</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div id="stripe-checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
