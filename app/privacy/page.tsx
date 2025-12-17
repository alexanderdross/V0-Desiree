import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - SOL & SOCIAL Party Rental Oceanside",
  description:
    "Privacy policy for SOL & SOCIAL Party Rental Oceanside. Learn how we collect, use, and protect your personal information.",
  robots: "index, follow",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" title="Return to homepage">
          <Button variant="ghost" className="mb-8 hover:bg-neutral-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Privacy Policy</h1>
        <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              SOL & SOCIAL Party Rental ("we," "us," or "our") respects your privacy and is committed to protecting your
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Personal Information</p>
              <p className="text-neutral-600 leading-relaxed">
                We collect personal information that you voluntarily provide when making a reservation or contacting us,
                including: name, email address, phone number, event date and location, billing address, and payment
                information.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Automatically Collected Information</p>
              <p className="text-neutral-600 leading-relaxed">
                We automatically collect certain information when you visit our website, including: IP address, browser
                type, device information, pages visited, time spent on pages, and referring website addresses.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Cookies and Tracking Technologies</p>
              <p className="text-neutral-600 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze site usage, and
                assist in marketing efforts. You can control cookies through your browser settings.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-2">We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 leading-relaxed ml-4">
              <li>Process and fulfill your rental reservations</li>
              <li>Communicate with you about your bookings and our services</li>
              <li>Send promotional emails and marketing materials (with your consent)</li>
              <li>Improve our website, services, and customer experience</li>
              <li>Process payments and prevent fraudulent transactions</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Respond to customer service requests and support needs</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 leading-relaxed ml-4">
              <li>Service providers who assist in business operations (payment processors, delivery services)</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no internet
              transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required by law. Booking information is typically
              retained for 7 years for accounting and legal purposes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 leading-relaxed ml-4">
              <li>Access, correct, or delete your personal information</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Disable cookies through your browser settings</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Object to or restrict certain processing of your data</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mt-4">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:hello@solandsocial.com" className="hover:underline" title="Email us">
                hello@solandsocial.com
              </a>
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Third-Party Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of
              these external sites. We encourage you to review their privacy policies before providing any personal
              information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child, please contact us
              immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>10. California Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including
              the right to know what personal information is collected, the right to delete personal information, and
              the right to opt-out of the sale of personal information. We do not sell personal information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>11. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated
              revision date. We encourage you to review this policy regularly to stay informed about how we protect your
              information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-neutral-600">
              <p>SOL & SOCIAL Party Rental</p>
              <p>Desiree Renard</p>
              <p>Oceanside, CA 92054</p>
              <p>
                Email:{" "}
                <a href="mailto:hello@solandsocial.com" className="hover:underline" title="Email us">
                  hello@solandsocial.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+13104941585" className="hover:underline" title="Call us">
                  +1 (310) 494-1585
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
