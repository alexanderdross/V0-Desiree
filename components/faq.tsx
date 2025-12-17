"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-4 weeks in advance, especially during peak season (May-September). However, we'll do our best to accommodate last-minute requests based on availability.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve Oceanside and surrounding areas including Carlsbad, Vista, San Marcos, and Encinitas. Additional delivery fees may apply for locations outside our standard service area.",
  },
  {
    question: "Do you provide setup and breakdown services?",
    answer:
      "Yes! All our rentals include delivery, professional setup, and breakdown. Our team will ensure everything is perfectly arranged before your event and handle all cleanup afterward.",
  },
  {
    question: "Can I customize the cart decorations?",
    answer:
      "We offer various decoration packages and can work with you to match your event theme. Choose from our fringe options, LED lighting, custom signage, and more.",
  },
  {
    question: "What's included in the rental price?",
    answer:
      "Our rental prices include the cart or equipment itself, delivery within our service area, setup and breakdown, and basic cleaning. Additional decorations, equipment, and custom requests may have separate pricing.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Cancellations made 14+ days before the event receive a full refund. Cancellations made 7-13 days before receive a 50% refund. Unfortunately, cancellations within 7 days are non-refundable due to booking commitments.",
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Yes, we require a 50% deposit to secure your booking, with the remaining balance due 7 days before your event. We accept credit cards, Venmo, and Zelle.",
  },
  {
    question: "What if it rains on my event day?",
    answer:
      "For outdoor events, we recommend having a backup plan. If severe weather makes setup impossible, we'll work with you to reschedule at no additional charge. Our umbrellas provide shade and light rain protection.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about renting from SOL & SOCIAL
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => toggleFAQ(index)}
              >
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-4 flex items-center justify-between gap-4"
                    title={`${openIndex === index ? "Collapse" : "Expand"} FAQ: ${faq.question}`}
                  >
                    <span className="font-bold text-lg pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4 text-muted-foreground leading-relaxed">{faq.answer}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="text-lg font-semibold hover:underline"
              title="Contact us for more information"
            >
              Contact us for more information
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
