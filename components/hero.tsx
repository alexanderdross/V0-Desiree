"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/hyper-realistic-oceanside-beach-party-with-elegant.jpg" type="image/jpeg" />
          <img
            src="/hyper-realistic-oceanside-beach-party-with-elegant.jpg"
            alt="Elegant beach party setup with SOL & SOCIAL mobile bar cart on Oceanside beach at sunset with ocean views"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
        </picture>
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">SOL & SOCIAL</h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">Party Rental Oceanside</p>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Elevate your events with our premium mobile bar carts and party rentals. Perfect for beach celebrations,
              backyard gatherings, and special occasions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-white text-black hover:bg-white/90"
                onClick={() => scrollToSection("cart-options")}
                aria-label="Browse mobile bar cart options"
              >
                Browse Carts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent"
                onClick={() => scrollToSection("equipment")}
                aria-label="View rental equipment options"
              >
                View Equipment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
