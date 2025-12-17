"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    event: "Beach Wedding",
    rating: 5,
    text: "SOL & SOCIAL made our beach wedding absolutely perfect! The white mobile bar cart was stunning and became a focal point for our reception. Setup was seamless and professional.",
    image: "/diverse-woman-portrait.png",
  },
  {
    name: "Michael Rodriguez",
    event: "Birthday Celebration",
    rating: 5,
    text: "Rented the Coastal Blue cart and tiki umbrella for my wife's 40th birthday party. Everything was exactly as described, and the team was incredibly helpful with setup suggestions.",
    image: "/man.jpg",
  },
  {
    name: "Jennifer Lee",
    event: "Corporate Event",
    rating: 5,
    text: "We used SOL & SOCIAL for our company's summer party and it was a huge hit! The modern cart design fit perfectly with our brand aesthetic. Highly professional service from start to finish.",
    image: "/professional-woman.png",
  },
  {
    name: "David Thompson",
    event: "Backyard Party",
    rating: 5,
    text: "The vintage romance cart exceeded our expectations! Beautiful craftsmanship and attention to detail. Made our backyard gathering feel like a luxury event. Will definitely rent again!",
    image: "/man-casual.jpg",
  },
  {
    name: "Maria Garcia",
    event: "Baby Shower",
    rating: 5,
    text: "Perfect for our outdoor baby shower! The umbrella provided great shade and the decorative fringe added such a fun touch. Setup and pickup were right on schedule. Loved everything!",
    image: "/woman-happy.jpg",
  },
  {
    name: "Robert Chang",
    event: "Anniversary Party",
    rating: 5,
    text: "Celebrated our 25th anniversary with the boho chic cart. It was absolutely gorgeous and our guests couldn't stop complimenting it. SOL & SOCIAL helped make our day extra special!",
    image: "/man-smiling.jpg",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real events. See why people love SOL & SOCIAL.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name} - ${testimonial.event} client`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed flex-grow">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-black text-white rounded-lg">
          <p className="text-2xl font-bold mb-3">Ready to Create Your Own Amazing Event?</p>
          <p className="text-white/80 mb-6">Join hundreds of satisfied customers who trusted SOL & SOCIAL</p>
          <a
            href="#cart-options"
            className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
            title="Start browsing our cart options"
          >
            Start Planning Your Event
          </a>
        </div>
      </div>
    </section>
  )
}
