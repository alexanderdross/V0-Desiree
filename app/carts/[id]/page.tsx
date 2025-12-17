"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, ShoppingCart } from "lucide-react"
import { cartDesigns } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CartDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  const cart = cartDesigns.find((c) => c.id === params.id)

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cart not found</h1>
          <Button onClick={() => router.push("/#cart-options")} title="Browse all available cart options">
            Back to Cart Options
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    console.log("[v0] Add to cart button clicked for:", cart.name)
    addItem({
      id: cart.id,
      name: cart.name,
      price: cart.price,
      image: cart.image,
      type: "cart",
    })
    console.log("[v0] Item added, showing confirmation")
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cart.name,
    description: cart.fullDescription,
    image: {
      "@type": "ImageObject",
      url: `https://v0-sol-social.vercel.app${cart.image}`,
      width: "1200",
      height: "900",
      caption: `${cart.name} - Premium mobile bar cart rental`,
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
          name: "Sarah Martinez",
        },
        datePublished: "2024-10-15",
        reviewBody:
          "The cart was perfect for our beach wedding! Setup was seamless and the team was professional. Highly recommend!",
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
          name: "Michael Chen",
        },
        datePublished: "2024-09-22",
        reviewBody:
          "Beautiful cart and great service. Made our backyard party look amazing. Will definitely rent again.",
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
          name: "Emily Rodriguez",
        },
        datePublished: "2024-11-05",
        reviewBody: "Easy booking process and the cart exceeded our expectations. Perfect for our anniversary party!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      price: cart.price,
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
        urlTemplate: `https://v0-sol-social.vercel.app/carts/${cart.id}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
      object: {
        "@type": "Product",
        name: cart.name,
      },
    },
    brand: {
      "@type": "Brand",
      name: "SOL & SOCIAL",
    },
    category: "Mobile Bar Cart Rental",
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${cart.name} - Mobile Bar Cart Rental`,
    description: cart.fullDescription,
    url: `https://v0-sol-social.vercel.app/carts/${cart.id}`,
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
            "@id": "https://v0-sol-social.vercel.app",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "https://v0-sol-social.vercel.app/#cart-options",
            name: "Cart Options",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": `https://v0-sol-social.vercel.app/carts/${cart.id}`,
            name: cart.name,
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div className="min-h-screen bg-background animate-fade-in">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between" aria-label="Product navigation">
              <Button
                variant="ghost"
                onClick={() => router.push("/#cart-options")}
                className="gap-2"
                title="Return to cart options"
                aria-label="Return to cart options page"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Cart Options
              </Button>
              <Button
                onClick={() => router.push("/cart/")}
                variant="outline"
                className="gap-2"
                title="View your shopping cart"
                aria-label="View your shopping cart"
              >
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                View Cart
              </Button>
            </nav>
          </div>
        </header>

        {/* Product Detail */}
        <main className="container mx-auto px-6 py-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cart Options", href: "/#cart-options" },
              { label: cart.name },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={cart.image || "/placeholder.svg"}
                  alt={`${cart.name} - Premium mobile bar cart rental for events in Oceanside - $${cart.price} per day`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <Badge className="bg-black text-white hover:bg-black/90 text-sm px-4 py-1">Mobile Bar Cart</Badge>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{cart.name}</h1>
                <p
                  className="text-2xl md:text-3xl font-bold text-primary mb-6"
                  aria-label={`Price: $${cart.price} per day`}
                >
                  ${cart.price}/day
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{cart.fullDescription}</p>
              </header>

              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold text-base md:text-lg mb-4">Key Features</h2>
                  <ul className="space-y-3" role="list">
                    {cart.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold text-base md:text-lg mb-4">Specifications</h2>
                  <ul className="space-y-2 text-sm" role="list">
                    {cart.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-neutral-400" aria-hidden="true">
                          •
                        </span>
                        <span className="text-muted-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold text-base md:text-lg mb-4">What's Included</h2>
                  <ul className="space-y-3" role="list">
                    {cart.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black text-white border-black">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-neutral-300 mb-1">Starting at</div>
                    <div
                      className="text-2xl md:text-3xl font-bold"
                      aria-label={`Starting price: $${cart.price} per day`}
                    >
                      ${cart.price}/day
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full bg-white text-black hover:bg-neutral-100 h-12 md:h-14 text-base md:text-lg"
                    disabled={addedToCart}
                    title={`Add ${cart.name} to your shopping cart`}
                    aria-label={addedToCart ? "Added to cart successfully" : `Add ${cart.name} to cart`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" aria-hidden="true" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
