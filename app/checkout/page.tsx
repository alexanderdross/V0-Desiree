"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import StripeCheckout from "@/components/stripe-checkout"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    deliveryAddress: "",
    city: "",
    zipCode: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setShowPayment(true)
    setIsSubmitting(false)
  }

  if (items.length === 0 && !showPayment) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => router.push("/")} title="Return to homepage">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2)
  const minDateStr = minDate.toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => (showPayment ? setShowPayment(false) : router.push("/cart/"))}
            className="gap-2"
            title={showPayment ? "Back to form" : "Return to cart"}
            aria-label={showPayment ? "Back to checkout form" : "Return to shopping cart"}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {showPayment ? "Back to Details" : "Back to Cart"}
          </Button>
        </div>
      </header>

      {/* Checkout Form or Payment */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900">
          {showPayment ? "Complete Payment" : "Checkout"}
        </h1>

        {!showPayment ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card className="bg-white border-2 border-neutral-200 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900">Contact Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          title="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          title="Enter your last name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          title="Enter your email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(760) 555-1234"
                          title="Enter your phone number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card className="bg-white border-2 border-neutral-200 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900">Event Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date *</Label>
                        <Input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          required
                          min={minDateStr}
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          title="Select your event date (minimum 2 days in advance)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventTime">Event Time *</Label>
                        <Input
                          id="eventTime"
                          name="eventTime"
                          type="time"
                          required
                          value={formData.eventTime}
                          onChange={handleInputChange}
                          title="Select your event start time"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Minimum 2 days in advance</p>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card className="bg-white border-2 border-neutral-200 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900">Delivery Address</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryAddress">Street Address *</Label>
                        <Input
                          id="deliveryAddress"
                          name="deliveryAddress"
                          required
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="123 Beach Boulevard"
                          title="Enter your delivery street address"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Oceanside"
                            title="Enter your city"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="92054"
                            title="Enter your ZIP code"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card className="bg-white border-2 border-neutral-200 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-900">Additional Notes</h2>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requests or Instructions</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests, access instructions, or preferences..."
                        rows={4}
                        title="Add any special requests or delivery instructions"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12 bg-neutral-900 hover:bg-neutral-800 text-white font-bold"
                  disabled={isSubmitting}
                  title="Proceed to payment"
                >
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-neutral-900 text-white border-2 border-neutral-800 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Order Summary</h2>

                  <div className="space-y-3 py-4 border-y border-neutral-700">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-white">{item.name}</p>
                          <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-white">${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 py-4 border-b border-neutral-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-300">Subtotal</span>
                      <span className="font-semibold text-white">${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-300">Delivery & Setup</span>
                      <span className="font-semibold text-white">Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-300">Deposit (50%)</span>
                      <span className="font-semibold text-white">${(getTotalPrice() * 0.5).toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold">${getTotalPrice()}</span>
                      <p className="text-xs text-neutral-400">per day</p>
                    </div>
                  </div>

                  <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      A 50% deposit (${(getTotalPrice() * 0.5).toFixed(0)}) is required to confirm your booking. The
                      remaining balance is due 7 days before your event.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <StripeCheckout
              items={items}
              customerInfo={{
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                eventDate: formData.eventDate,
                eventTime: formData.eventTime,
                deliveryAddress: formData.deliveryAddress,
                city: formData.city,
                zipCode: formData.zipCode,
                notes: formData.notes,
              }}
            />
          </div>
        )}
      </main>
    </div>
  )
}
