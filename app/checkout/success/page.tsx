"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { getCheckoutSession } from "@/app/actions/stripe"
import { useCart } from "@/lib/cart-context"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        router.push("/")
        return
      }

      try {
        const session = await getCheckoutSession(sessionId)
        setSessionData(session)
        // Clear cart after successful payment
        clearCart()
      } catch (error) {
        console.error("[v0] Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [sessionId, router, clearCart])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Confirming your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 md:p-12">
          <div className="text-center">
            <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Your booking has been confirmed and payment processed.
            </p>

            {sessionData?.metadata && (
              <div className="bg-neutral-50 p-6 rounded-lg mb-8 text-left">
                <h2 className="font-bold text-lg mb-4">Booking Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-semibold">{sessionData.metadata.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-semibold">{sessionData.metadata.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Date:</span>
                    <span className="font-semibold">{sessionData.metadata.eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Time:</span>
                    <span className="font-semibold">{sessionData.metadata.eventTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Address:</span>
                    <span className="font-semibold">
                      {sessionData.metadata.deliveryAddress}, {sessionData.metadata.city},{" "}
                      {sessionData.metadata.zipCode}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We've sent a confirmation email with all the details. Our team will contact you within 24 hours to
                finalize your event setup and answer any questions.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 font-semibold mb-1">Important Reminder</p>
                <p className="text-xs text-yellow-700">
                  The remaining balance is due 7 days before your event date. We'll send you a reminder.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <Button onClick={() => router.push("/")} className="w-full" size="lg" title="Return to homepage">
                  Return to Home
                </Button>
                <Button variant="outline" onClick={() => window.print()} className="w-full" title="Print confirmation">
                  Print Confirmation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
