"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, ShoppingCart, Plus, Minus } from "lucide-react"
import { equipmentItems } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"
import { Breadcrumb } from "@/components/breadcrumb"

export default function EquipmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [addedToCart, setAddedToCart] = useState(false)

  const equipment = equipmentItems.find((e) => e.id === params.id)

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Equipment not found</h1>
          <Button onClick={() => router.push("/#equipment")} title="Browse all available equipment">
            Back to Equipment
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    console.log("[v0] Add to cart clicked for:", equipment.name)
    console.log("[v0] Selected color:", selectedColor)
    console.log("[v0] Quantity:", quantity)

    if (equipment.colors.length > 0 && !selectedColor) {
      console.log("[v0] No color selected, showing alert")
      alert("Please select a color")
      return
    }

    console.log("[v0] Adding item to cart...")
    addItem({
      id: `${equipment.id}-${selectedColor || "default"}`,
      name: `${equipment.name}${selectedColor ? ` (${selectedColor})` : ""}`,
      price: equipment.price,
      image: equipment.image,
      type: "equipment",
      selectedColor: selectedColor || undefined,
      quantity,
    })
    console.log("[v0] Item added, showing confirmation")
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: equipment.name,
    description: equipment.fullDescription,
    image: {
      "@type": "ImageObject",
      url: `https://v0-sol-social.vercel.app${equipment.image}`,
      width: "1200",
      height: "900",
      caption: `${equipment.name} - ${equipment.category} rental`,
    },
    category: equipment.category,
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
          name: "Jennifer Lee",
        },
        datePublished: "2024-11-10",
        reviewBody: "Perfect addition to our beach setup. Great quality and easy to use!",
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
          name: "David Thompson",
        },
        datePublished: "2024-10-20",
        reviewBody: "Exactly what we needed for our outdoor event. Highly recommended!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      price: equipment.price,
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
        urlTemplate: `https://v0-sol-social.vercel.app/equipment/${equipment.id}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
      object: {
        "@type": "Product",
        name: equipment.name,
      },
    },
    brand: {
      "@type": "Brand",
      name: "SOL & SOCIAL",
    },
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${equipment.name} - Party Equipment Rental`,
    description: equipment.fullDescription,
    url: `https://v0-sol-social.vercel.app/equipment/${equipment.id}`,
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
            "@id": "https://v0-sol-social.vercel.app/#equipment",
            name: "Equipment",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": `https://v0-sol-social.vercel.app/equipment/${equipment.id}`,
            name: equipment.name,
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
                onClick={() => router.push("/#equipment")}
                className="gap-2"
                title="Return to equipment options"
                aria-label="Return to equipment options page"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Equipment
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
              { label: "Equipment", href: "/#equipment" },
              { label: equipment.name },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={equipment.image || "/placeholder.svg"}
                  alt={`${equipment.name} - ${equipment.category} equipment rental for events - $${equipment.price} per day`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <Badge className="bg-black text-white hover:bg-black/90">{equipment.category}</Badge>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{equipment.name}</h1>
                <p
                  className="text-2xl md:text-3xl font-bold text-primary mb-6"
                  aria-label={`Price: $${equipment.price} per day`}
                >
                  ${equipment.price}/day
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {equipment.fullDescription}
                </p>
              </header>

              {/* Color Selection */}
              {equipment.colors.length > 0 && (
                <Card className="bg-neutral-50 border-neutral-200">
                  <CardContent className="p-6">
                    <h2 className="font-bold mb-4 text-base md:text-lg">Select Color</h2>
                    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Color options">
                      {equipment.colors.map((color) => (
                        <Button
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          onClick={() => setSelectedColor(color)}
                          className="min-w-[100px]"
                          title={`Select ${color} color option`}
                          aria-label={`Select ${color} color`}
                          role="radio"
                          aria-checked={selectedColor === color}
                        >
                          {selectedColor === color && <Check className="w-4 h-4 mr-2" aria-hidden="true" />}
                          {color}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quantity Selector */}
              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold mb-4 text-base md:text-lg">Quantity</h2>
                  <div className="flex items-center gap-4" role="group" aria-label="Quantity selector">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      title="Decrease quantity"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <span
                      className="text-xl md:text-2xl font-bold w-16 text-center"
                      aria-live="polite"
                      aria-label={`Quantity: ${quantity}`}
                    >
                      {quantity}
                    </span>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      title="Increase quantity"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold text-base md:text-lg mb-4">Specifications</h2>
                  <ul className="space-y-2 text-sm" role="list">
                    {equipment.specifications.map((spec, index) => (
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

              {/* What's Included */}
              <Card className="bg-neutral-50 border-neutral-200">
                <CardContent className="p-6">
                  <h2 className="font-bold text-base md:text-lg mb-4">What's Included</h2>
                  <ul className="space-y-3" role="list">
                    {equipment.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Add to Cart */}
              <Card className="bg-black text-white border-black">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-base md:text-lg font-semibold">Total:</span>
                    <div className="text-right">
                      <span
                        className="text-2xl md:text-3xl font-bold"
                        aria-label={`Total price: $${equipment.price * quantity} per day`}
                      >
                        ${equipment.price * quantity}
                      </span>
                      <span className="text-neutral-300 ml-2">/day</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full bg-white text-black hover:bg-neutral-100 h-12 md:h-14 text-base md:text-lg"
                    disabled={addedToCart}
                    title={`Add ${equipment.name} to your shopping cart`}
                    aria-label={addedToCart ? "Added to cart successfully" : `Add ${equipment.name} to cart`}
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
