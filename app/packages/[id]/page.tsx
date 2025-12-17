import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Package, Clock, Truck, Sparkles, ChevronLeft } from "lucide-react"
import { packages } from "@/lib/products-data"
import { Breadcrumb } from "@/components/breadcrumb"
import { AddToCartButton } from "@/components/add-to-cart-button"

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    id: pkg.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const pkg = packages.find((p) => p.id === id)

  if (!pkg) {
    return {
      title: "Package Not Found",
    }
  }

  return {
    title: `${pkg.name} - Party Rental Package | SOL & SOCIAL Oceanside`,
    description: `${pkg.description}. Save $${pkg.savings}! Package includes: ${pkg.items.join(", ")}. Perfect for ${pkg.idealFor.join(", ")}. Book now for your Oceanside event.`,
    keywords: [
      pkg.name,
      "party package",
      "event rental package",
      "Oceanside party rental",
      ...pkg.idealFor,
      "mobile bar cart package",
      "wedding package",
      "event package deal",
    ],
    openGraph: {
      title: `${pkg.name} - Save $${pkg.savings}`,
      description: pkg.description,
      images: [pkg.image],
    },
  }
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = packages.find((p) => p.id === id)

  if (!pkg) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description: pkg.fullDescription,
    image: {
      "@type": "ImageObject",
      url: pkg.image,
      width: "1200",
      height: "1200",
      caption: `${pkg.name} - Complete party rental package`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "147",
      reviewCount: "147",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Amanda Wilson",
        },
        datePublished: "2024-11-01",
        reviewBody:
          "This package was perfect for our wedding! Everything we needed in one convenient bundle. The savings were incredible too!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Robert Johnson",
        },
        datePublished: "2024-10-12",
        reviewBody: "Great value for money. All items were high quality and the setup was seamless.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      price: pkg.packagePrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2025-12-31",
      seller: {
        "@type": "LocalBusiness",
        name: "SOL & SOCIAL - Party Rental Oceanside",
      },
      itemCondition: "https://schema.org/NewCondition",
    },
    potentialAction: {
      "@type": "RentAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://v0-sol-social.vercel.app/packages/${pkg.id}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
      object: {
        "@type": "Product",
        name: pkg.name,
      },
    },
    isRelatedTo: {
      "@type": "OfferCatalog",
      name: "Package Components",
      itemListElement: pkg.items.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Product",
          name: item,
        },
      })),
    },
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${pkg.name} - Party Rental Package`,
    description: pkg.fullDescription,
    url: `https://v0-sol-social.vercel.app/packages/${pkg.id}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      url: "https://v0-sol-social.vercel.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://v0-sol-social.vercel.app/",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "https://v0-sol-social.vercel.app/#packages/",
            name: "Package Deals",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": `https://v0-sol-social.vercel.app/packages/${pkg.id}/`,
            name: pkg.name,
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Package Deals", href: "/#packages/" }, { label: pkg.name }]}
          />

          <nav className="mt-8 mb-6" aria-label="Return to packages">
            <a
              href="/#packages/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Back to all package deals"
            >
              <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
              Back to Package Deals
            </a>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={`${pkg.name} - Complete party rental package including ${pkg.items.join(", ")}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {pkg.popular && (
                <div
                  className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg"
                  role="status"
                >
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  <span className="font-semibold">Most Popular Package</span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight text-balance">
                  {pkg.name}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{pkg.description}</p>
              </header>

              {/* Pricing */}
              <Card className="bg-neutral-50 border-2">
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-4xl md:text-5xl font-bold" aria-label={`Package price: $${pkg.packagePrice}`}>
                      ${pkg.packagePrice}
                    </span>
                    <span
                      className="text-xl md:text-2xl text-muted-foreground line-through"
                      aria-label={`Original price: $${pkg.originalPrice}`}
                    >
                      ${pkg.originalPrice}
                    </span>
                  </div>
                  <Badge className="bg-green-600 text-white text-base px-3 py-1">Save ${pkg.savings}</Badge>
                  <p className="text-sm text-muted-foreground mt-3">
                    per day rental • {pkg.rentalDetails.minimumRental} minimum
                  </p>
                </CardContent>
              </Card>

              {/* Package Includes */}
              <Card className="bg-neutral-50">
                <CardContent className="p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                    Package Includes
                  </h2>
                  <ul className="space-y-3" role="list">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
                        <span className="text-base md:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Add to Cart */}
              <Card className="bg-black text-white">
                <CardContent className="p-6">
                  <AddToCartButton
                    item={{
                      id: `package-${pkg.id}`,
                      name: pkg.name,
                      price: pkg.packagePrice,
                      image: pkg.image,
                      type: "package",
                    }}
                    variant="secondary"
                    size="lg"
                    className="w-full text-base md:text-lg h-12 md:h-14"
                  />
                  <p className="text-xs md:text-sm text-center mt-4 text-neutral-300">
                    50% deposit required • Delivery within {pkg.rentalDetails.deliveryIncluded}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-neutral-50">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Package Details</h2>
                <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed">{pkg.fullDescription}</p>
                <div className="space-y-3">
                  <h3 className="font-semibold text-base md:text-lg">Specifications:</h3>
                  <ul className="space-y-2" role="list">
                    {pkg.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-1" aria-hidden="true" />
                        <span className="text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-neutral-50">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Ideal For</h2>
                  <div className="flex flex-wrap gap-2" role="list">
                    {pkg.idealFor.map((event, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-50">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                    Rental Details
                  </h2>
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-semibold mb-1 text-sm md:text-base">Minimum Rental:</dt>
                      <dd className="text-muted-foreground text-sm md:text-base">{pkg.rentalDetails.minimumRental}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold mb-1 text-sm md:text-base flex items-center gap-2">
                        <Truck className="w-4 h-4" aria-hidden="true" />
                        Delivery:
                      </dt>
                      <dd className="text-muted-foreground text-sm md:text-base">
                        {pkg.rentalDetails.deliveryIncluded}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold mb-1 text-sm md:text-base">Setup Time:</dt>
                      <dd className="text-muted-foreground text-sm md:text-base">{pkg.rentalDetails.setupTime}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold mb-1 text-sm md:text-base">Pickup:</dt>
                      <dd className="text-muted-foreground text-sm md:text-base">{pkg.rentalDetails.pickupTime}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Book This Package?</h2>
              <p className="text-lg md:text-xl text-neutral-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                Save ${pkg.savings} and get everything you need for an amazing event. Limited availability!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AddToCartButton
                  item={{
                    id: `package-${pkg.id}`,
                    name: pkg.name,
                    price: pkg.packagePrice,
                    image: pkg.image,
                    type: "package",
                  }}
                  variant="secondary"
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8"
                />
                <a href="/#contact" title="Contact us with questions about this package">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-base md:text-lg px-6 md:px-8 border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Have Questions?
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
