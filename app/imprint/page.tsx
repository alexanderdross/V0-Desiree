import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Imprint - SOL & SOCIAL Party Rental Oceanside",
  description:
    "Legal information and contact details for SOL & SOCIAL Party Rental Oceanside. Premium mobile bar cart and event equipment rentals.",
  robots: "index, follow",
}

export default function ImprintPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" title="Return to homepage">
          <Button variant="ghost" className="mb-8 hover:bg-neutral-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-balance">Imprint</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Company Name:</p>
              <p className="text-neutral-600">SOL & SOCIAL Party Rental</p>
            </div>
            <div>
              <p className="font-semibold">Owner:</p>
              <p className="text-neutral-600">Desiree Renard</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p className="text-neutral-600">Oceanside, CA 92054</p>
              <p className="text-neutral-600">United States</p>
            </div>
            <div>
              <p className="font-semibold">Contact:</p>
              <p className="text-neutral-600">
                Phone:{" "}
                <a href="tel:+13104941585" className="hover:underline" title="Call us">
                  +1 (310) 494-1585
                </a>
              </p>
              <p className="text-neutral-600">
                Email:{" "}
                <a href="mailto:hello@solandsocial.com" className="hover:underline" title="Email us">
                  hello@solandsocial.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Responsible for Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              The party rental business operator is responsible for the content of this website according to § 5 TMG
              (German Telemedia Act) and other applicable laws.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-4">
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
                title="Visit EU ODR platform"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="text-neutral-600 leading-relaxed">
              We are not willing or obliged to participate in dispute resolution proceedings before a consumer
              arbitration board.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Copyright Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              All content, images, and materials on this website are protected by copyright and belong to SOL & SOCIAL
              Party Rental or our licensors. Unauthorized use, reproduction, or distribution is prohibited.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
