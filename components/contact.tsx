"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { getTurnstileSiteKey } from "@/app/actions/turnstile"

function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [siteKey, setSiteKey] = useState<string | null>(null)

  useEffect(() => {
    // Fetch site key from server
    getTurnstileSiteKey().then(setSiteKey)
  }, [])

  useEffect(() => {
    // Lazy load Turnstile script only when component mounts
    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
      )
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded && containerRef.current && window.turnstile && siteKey) {
      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        theme: "light",
        size: "normal",
      })
    }
  }, [isLoaded, onVerify, siteKey])

  return <div ref={containerRef} className="flex justify-center" />
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    if (!turnstileToken) {
      setMessage({ type: "error", text: "Please complete the verification challenge." })
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      eventDate: formData.get("eventDate"),
      message: formData.get("message"),
      turnstileToken,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you! We'll get back to you soon." })
        e.currentTarget.reset()
        setTurnstileToken(null)
        // Reset Turnstile widget
        if (window.turnstile) {
          window.turnstile.reset()
        }
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to submit form. Please try again later." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+1-310-494-1585",
    email: "hello@solandsocial.com",
    areaServed: "US",
    availableLanguage: ["English"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }} />
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Book Your Event</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to elevate your celebration? Get in touch to check availability and receive a custom quote
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                        First Name
                      </label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                        Last Name
                      </label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>

                  <div className="w-full">
                    <label htmlFor="eventDate" className="block text-sm font-semibold mb-2">
                      Event Date
                    </label>
                    <Input id="eventDate" name="eventDate" type="date" required className="w-full" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Tell us about your event
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="What type of event are you planning? How many guests? Any special requests?"
                      rows={5}
                      required
                    />
                  </div>

                  <TurnstileWidget onVerify={setTurnstileToken} />

                  {message && (
                    <div
                      className={`p-4 rounded-md ${
                        message.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !turnstileToken}>
                    {isSubmitting ? "Sending..." : "Request Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Email</p>
                      <a
                        href="mailto:hello@solandsocial.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary underline transition-colors"
                        title="Send email to SOL & SOCIAL"
                      >
                        hello@solandsocial.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Phone</p>
                      <a
                        href="tel:+13104941585"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary underline transition-colors"
                        title="Call SOL & SOCIAL"
                      >
                        +1 (310) 494-1585
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Location</p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Oceanside+San+Diego+County+CA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary underline transition-colors"
                        title="View location on Google Maps"
                      >
                        Serving Oceanside & surrounding
                        <br />
                        San Diego County areas
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-primary text-primary-foreground rounded-lg">
                <p className="font-bold text-xl mb-3">Quick Info</p>
                <ul className="space-y-2 text-sm">
                  <li>• Free delivery within 15 miles</li>
                  <li>• Professional setup included</li>
                  <li>• 24-hour rental minimum</li>
                  <li>• Discounts for multi-day events</li>
                  <li>• Last-minute bookings available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
