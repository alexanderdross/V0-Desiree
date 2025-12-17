"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cartDesigns } from "@/lib/products-data"

export function CartOptions() {
  const router = useRouter()

  return (
    <section id="cart-options" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Choose Your Cart Design</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our curated collection of mobile bar carts, each designed to match your event's unique style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartDesigns.map((cart) => (
            <a
              key={cart.id}
              href={`/carts/${cart.id}/`}
              title={`View details for ${cart.name} - $${cart.price}/day`}
              className="block group"
            >
              <Card className="overflow-hidden transition-all hover:shadow-xl cursor-pointer flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cart.image || "/placeholder.svg"}
                    alt={`${cart.name} mobile bar cart - ${cart.description}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-2xl font-bold">{cart.name}</p>
                    <span className="text-2xl font-bold">${cart.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow">{cart.description}</p>
                  <Button className="w-full group" title={`View details and pricing for ${cart.name}`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
