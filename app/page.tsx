import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CartOptions } from "@/components/cart-options"
import { Equipment } from "@/components/equipment"
import { Packages } from "@/components/packages"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SOL & SOCIAL - Premium Party Rental Oceanside | Mobile Bar Carts & Event Equipment",
  description:
    "Elevate your events with SOL & SOCIAL's premium mobile bar carts and party rentals in Oceanside. Perfect for beach celebrations, weddings, and backyard gatherings. Book your cart today!",
  keywords:
    "party rental oceanside, mobile bar cart, beach party rental, event equipment, wedding bar cart, oceanside events, party supplies",
  openGraph: {
    title: "SOL & SOCIAL - Premium Party Rental Oceanside",
    description: "Premium mobile bar carts and event equipment for beach celebrations and special occasions",
    type: "website",
  },
}

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SOL & SOCIAL - Party Rental Oceanside",
    image: "https://v0-sol-social.vercel.app/hyper-realistic-oceanside-beach-party-with-elegant.jpg",
    "@id": "https://v0-sol-social.vercel.app",
    url: "https://v0-sol-social.vercel.app",
    telephone: "(760) 555-0123",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Pacific Coast Highway",
      addressLocality: "Oceanside",
      addressRegion: "CA",
      postalCode: "92054",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.1959,
      longitude: -117.3795,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/solsocial",
      "https://www.instagram.com/solsocial",
      "https://www.pinterest.com/solsocial",
    ],
    description:
      "Premium mobile bar cart rentals and event equipment in Oceanside. Perfect for beach weddings, parties, and special occasions.",
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Party Equipment Rental",
    provider: {
      "@type": "LocalBusiness",
      name: "SOL & SOCIAL - Party Rental Oceanside",
    },
    areaServed: {
      "@type": "City",
      name: "Oceanside",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Party Rental Equipment",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Mobile Bar Carts",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Classic White Mobile Bar Cart",
                description: "Timeless elegance with a pristine white finish",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Event Equipment",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Beach Umbrella",
                description: "Large 7ft beach umbrella with tilt function",
              },
            },
          ],
        },
      ],
    },
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SOL & SOCIAL - Premium Party Rental Oceanside | Mobile Bar Carts & Event Equipment",
    description:
      "Elevate your events with SOL & SOCIAL's premium mobile bar carts and party rentals in Oceanside. Perfect for beach celebrations, weddings, and backyard gatherings.",
    url: "https://v0-sol-social.vercel.app",
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
      ],
    },
  }

  const cartItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Bar Cart Options",
    description: "Premium mobile bar cart designs available for rental",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Classic White Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/classic-white",
          image: "https://v0-sol-social.vercel.app/white-mobile-bar-cart-with-wooden-top-beach-setup-.jpg",
          offers: {
            "@type": "Offer",
            price: "150",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Coastal Blue Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/coastal-blue",
          offers: {
            "@type": "Offer",
            price: "165",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Boho Chic Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/boho-chic",
          offers: {
            "@type": "Offer",
            price: "175",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Tropical Paradise Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/tropical-paradise",
          offers: {
            "@type": "Offer",
            price: "180",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Product",
          name: "Modern Noir Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/modern-noir",
          offers: {
            "@type": "Offer",
            price: "185",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Product",
          name: "Vintage Romance Mobile Bar Cart",
          url: "https://v0-sol-social.vercel.app/carts/vintage-romance",
          offers: {
            "@type": "Offer",
            price: "195",
            priceCurrency: "USD",
          },
        },
      },
    ],
  }

  const equipmentItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Party Equipment & Accessories",
    description: "Event equipment and accessories available for rental",
    numberOfItems: 9,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Beach Umbrella",
          url: "https://v0-sol-social.vercel.app/equipment/beach-umbrella",
          offers: {
            "@type": "Offer",
            price: "25",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Tiki Umbrella",
          url: "https://v0-sol-social.vercel.app/equipment/tiki-umbrella",
          offers: {
            "@type": "Offer",
            price: "35",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Market Umbrella",
          url: "https://v0-sol-social.vercel.app/equipment/market-umbrella",
          offers: {
            "@type": "Offer",
            price: "30",
            priceCurrency: "USD",
          },
        },
      },
    ],
  }

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    hasPart: [
      {
        "@type": "WebPage",
        name: "Home",
        url: "https://v0-sol-social.vercel.app/#home",
      },
      {
        "@type": "WebPage",
        name: "Cart Options",
        url: "https://v0-sol-social.vercel.app/#cart-options",
      },
      {
        "@type": "WebPage",
        name: "Equipment",
        url: "https://v0-sol-social.vercel.app/#equipment",
      },
      {
        "@type": "WebPage",
        name: "Package Deals",
        url: "https://v0-sol-social.vercel.app/#packages",
      },
      {
        "@type": "WebPage",
        name: "About",
        url: "https://v0-sol-social.vercel.app/#about",
      },
      {
        "@type": "WebPage",
        name: "Contact",
        url: "https://v0-sol-social.vercel.app/#contact",
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cartItemListSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(equipmentItemListSchema) }}
      />
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <CartOptions />
        <Equipment />
        <Packages />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
