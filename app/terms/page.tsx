import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use - SOL & SOCIAL Party Rental Oceanside",
  description:
    "Terms and conditions for renting mobile bar carts and event equipment from SOL & SOCIAL Party Rental Oceanside.",
  robots: "index, follow",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" title="Return to homepage">
          <Button variant="ghost" className="mb-8 hover:bg-neutral-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Terms of Use</h1>
        <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              By accessing and using the SOL & SOCIAL Party Rental website and services, you accept and agree to be
              bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our
              services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Rental Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Booking and Reservation</p>
              <p className="text-neutral-600 leading-relaxed">
                All rentals require a valid booking with a 50% deposit. Reservations are confirmed upon receipt of
                deposit payment. Full payment is due 48 hours before the event date.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Rental Period</p>
              <p className="text-neutral-600 leading-relaxed">
                Standard rental periods are for single-day events. Extended rental periods may be arranged at additional
                cost. Equipment must be returned in the same condition as received.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Cancellation Policy</p>
              <p className="text-neutral-600 leading-relaxed">
                Cancellations made 14+ days before event: Full refund minus 10% processing fee. Cancellations made 7-13
                days before: 50% refund. Cancellations within 7 days: No refund. Deposits are non-refundable.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Delivery and Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Delivery and setup services are available within our service area in Oceanside and surrounding regions.
              Delivery fees vary based on location and event requirements.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Customers must provide accurate venue information including access details, parking availability, and any
              restrictions. Additional fees may apply for difficult access or last-minute changes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Equipment Care and Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Renters are responsible for the care and security of all rented equipment during the rental period. Any
              damage, loss, or theft must be reported immediately.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Customers are liable for the replacement cost of lost or stolen equipment and repair costs for damaged
              items. Normal wear and tear is expected and will not incur additional charges.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Safety and Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              All equipment must be used as intended and according to provided instructions. Unsafe or improper use may
              result in termination of rental and forfeiture of deposit. Alcohol service must comply with all local laws
              and regulations.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Weather and Force Majeure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              SOL & SOCIAL is not liable for weather-related issues or acts of God. In case of extreme weather warnings,
              we will work with customers to reschedule. Rescheduling is subject to availability.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              All content, images, logos, and materials on this website are the property of SOL & SOCIAL Party Rental or
              licensed for use. Unauthorized reproduction or use is prohibited.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Modifications to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              SOL & SOCIAL reserves the right to modify these terms at any time. Changes will be effective immediately
              upon posting to the website. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
