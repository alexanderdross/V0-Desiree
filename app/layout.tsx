import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const _playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const _inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-sol-social.vercel.app"),
  title: {
    default: "SOL & SOCIAL - Party Rental Oceanside | Premium Mobile Bar Carts",
    template: "%s | SOL & SOCIAL Oceanside",
  },
  description:
    "Elevate your events with premium mobile bar carts and party rentals in Oceanside, CA. Perfect for beach celebrations, weddings, and special occasions.",
  generator: "v0.app",
  keywords: [
    "party rental",
    "mobile bar cart",
    "Oceanside",
    "beach party",
    "wedding rental",
    "event equipment",
    "California party rentals",
  ],
  authors: [{ name: "SOL & SOCIAL" }],
  creator: "SOL & SOCIAL Party Rental Oceanside",
  publisher: "SOL & SOCIAL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://v0-sol-social.vercel.app",
    siteName: "SOL & SOCIAL Party Rental Oceanside",
    title: "SOL & SOCIAL - Premium Mobile Bar Carts & Party Rentals",
    description: "Elevate your events with premium mobile bar carts and party rentals in Oceanside, CA.",
    images: [
      {
        url: "/hyper-realistic-oceanside-beach-party-with-elegant.jpg",
        width: 1200,
        height: 630,
        alt: "SOL & SOCIAL mobile bar cart on Oceanside beach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOL & SOCIAL - Premium Mobile Bar Carts",
    description: "Elevate your events with premium mobile bar carts in Oceanside, CA",
    images: ["/hyper-realistic-oceanside-beach-party-with-elegant.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.jpg",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SOL & SOCIAL - Party Rental Oceanside",
    url: "https://v0-sol-social.vercel.app",
    description: "Premium mobile bar carts and party rentals in Oceanside, California",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://v0-sol-social.vercel.app/#equipment?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "SOL & SOCIAL",
      logo: {
        "@type": "ImageObject",
        url: "https://v0-sol-social.vercel.app/icon-512x512.jpg",
      },
    },
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://v0-sol-social.vercel.app/#business",
    name: "SOL & SOCIAL - Party Rental Oceanside",
    image: "https://v0-sol-social.vercel.app/icon-512x512.jpg",
    logo: "https://v0-sol-social.vercel.app/icon-512x512.jpg",
    url: "https://v0-sol-social.vercel.app",
    telephone: "+1-310-494-1585",
    email: "hello@solandsocial.com",
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
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 33.1959,
        longitude: -117.3795,
      },
      geoRadius: "25 miles",
    },
  }

  return (
    <html lang="en" className={`${_playfair.variable} ${_inter.variable}`}>
      <head>
        <link rel="canonical" href="https://v0-sol-social.vercel.app" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className={`font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    function(registration) {
                      console.log('[SW] Registration successful:', registration.scope);
                    },
                    function(err) {
                      console.log('[SW] Registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
