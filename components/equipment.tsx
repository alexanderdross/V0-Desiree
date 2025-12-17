"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { equipmentItems } from "@/lib/products-data"

const categories = ["All", "Shade", "Decor", "Lighting", "Essentials"]

export function Equipment() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredEquipment =
    selectedCategory === "All" ? equipmentItems : equipmentItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="equipment" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Add Equipment & Accessories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your rental package with premium equipment and decorative touches
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
              title={`Filter equipment by ${category} category`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => (
            <a
              key={item.id}
              href={`/equipment/${item.id}/`}
              title={`View details for ${item.name} - $${item.price}/day`}
              className="block group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.name} - ${item.description}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-black">{item.category}</Badge>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-xl font-bold">{item.name}</p>
                    <span className="text-xl font-bold">${item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>

                  {/* Color Options Preview */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2 text-muted-foreground">
                      {item.colors.length} color{item.colors.length !== 1 ? "s" : ""} available
                    </p>
                  </div>

                  <Button className="w-full group" title={`View details and options for ${item.name}`}>
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
