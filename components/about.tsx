import { Card, CardContent } from "@/components/ui/card"
import { Waves, Calendar, Sparkles, Shield } from "lucide-react"

const features = [
  {
    icon: Waves,
    title: "Oceanside Specialists",
    description: "Expert in beach and coastal events with weather-resistant equipment",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Easy online reservation system with flexible dates and packages",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Meticulously maintained, high-end party equipment and decor",
  },
  {
    icon: Shield,
    title: "Insured & Licensed",
    description: "Fully insured rentals with professional setup and breakdown",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Why Choose SOL & SOCIAL?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Based in beautiful Oceanside, California, we specialize in creating unforgettable party experiences with
              our premium mobile bar carts and rental equipment. Whether you're planning a beach wedding, birthday
              celebration, or corporate event, we bring style and sophistication to every occasion.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our customizable carts and extensive equipment selection allow you to create the perfect aesthetic for
              your event. From elegant white classics to bohemian chic designs, we have something for every style and
              budget.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2">
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 mb-4 text-primary" />
                  <p className="text-lg font-bold mb-2">{feature.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
