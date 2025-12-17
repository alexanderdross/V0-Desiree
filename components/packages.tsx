"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { packages } from "@/lib/products-data"

export function Packages() {
  const router = useRouter()

  const handleViewPackage = (pkgId: string) => {
    router.push(`/packages/${pkgId}/`)
  }

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Party Rental Package Deals",
    description: "Curated party rental packages with significant savings",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Product",
        name: pkg.name,
        description: pkg.description,
        image: pkg.image,
        offers: {
          "@type": "Offer",
          price: pkg.packagePrice,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      url: `https://v0-sol-social.vercel.app/packages/${pkg.id}/`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }} />
      <section id="packages" className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black text-white px-4 py-1">Best Value</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Package Deals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save big with our curated packages. Everything you need for your event at an unbeatable price.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <a
                key={pkg.id}
                href={`/packages/${pkg.id}/`}
                onClick={(e) => {
                  e.preventDefault()
                  handleViewPackage(pkg.id)
                }}
                title={`View details for ${pkg.name} - Save $${pkg.savings}`}
                className="block group"
              >
                <Card
                  className={`overflow-hidden transition-all hover:shadow-xl flex flex-col cursor-pointer ${pkg.popular ? "border-2 border-black" : ""}`}
                >
                  {pkg.popular && (
                    <div className="bg-black text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  )}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      alt={`${pkg.name} - ${pkg.description}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-2xl font-bold mb-2">{pkg.name}</p>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-bold">${pkg.packagePrice}</span>
                        <span className="text-lg text-muted-foreground line-through">${pkg.originalPrice}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Save ${pkg.savings}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">per day rental</p>
                    </div>

                    <div className="mb-6 flex-grow">
                      <p className="font-semibold mb-3">Package Includes:</p>
                      <ul className="space-y-2">
                        {pkg.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button size="lg" className="w-full" title={`View details for ${pkg.name}`}>
                      View Package Details
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold mb-3">Need a Custom Package?</p>
            <p className="text-muted-foreground mb-6">
              Let us create a personalized package that perfectly fits your event needs and budget.
            </p>
            <a href="#contact" className="inline-block" title="Contact us to create a custom package">
              <Button variant="outline" size="lg">
                Contact Us for Custom Quote
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
