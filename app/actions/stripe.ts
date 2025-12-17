"use server"

import { stripe } from "@/lib/stripe"
import type { CartItem } from "@/lib/cart-context"

export async function createCheckoutSession(
  items: CartItem[],
  customerInfo: {
    email: string
    name: string
    eventDate: string
    eventTime: string
    deliveryAddress: string
    city: string
    zipCode: string
    notes?: string
  },
) {
  try {
    // Create line items from cart
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.selectedColor ? `Color: ${item.selectedColor}` : undefined,
          metadata: {
            type: item.type,
            itemId: item.id,
          },
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: lineItems,
      mode: "payment",
      // Store customer and event info in metadata
      metadata: {
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        eventDate: customerInfo.eventDate,
        eventTime: customerInfo.eventTime,
        deliveryAddress: customerInfo.deliveryAddress,
        city: customerInfo.city,
        zipCode: customerInfo.zipCode,
        notes: customerInfo.notes || "",
      },
      customer_email: customerInfo.email,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("[v0] Stripe checkout session creation error:", error)
    throw new Error("Failed to create checkout session")
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error("[v0] Error retrieving checkout session:", error)
    return null
  }
}
