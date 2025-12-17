"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { getTotalItems } = useCart()
  const router = useRouter()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = ["home", "cart-options", "equipment", "packages", "about", "testimonials", "faq", "contact"]
      const scrollPosition = window.scrollY + 150 // offset for fixed header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, "", `#${sectionId}`)
            }
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Set scroll margin on all sections for proper offset with fixed header
    const sections = document.querySelectorAll(
      '[id^="home"], [id^="cart-options"], [id^="equipment"], [id^="packages"], [id^="about"], [id^="testimonials"], [id^="faq"], [id^="contact"]',
    )
    sections.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.scrollMarginTop = "100px"
      }
    })
  }, [])

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Cart Options", href: "#cart-options" },
    { label: "Equipment", href: "#equipment" },
    { label: "Package Deals", href: "#packages" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="flex flex-col items-start group cursor-pointer"
          title="Go to Home - SOL & SOCIAL Party Rental Oceanside"
          aria-label="SOL & SOCIAL - Return to homepage"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-2xl md:text-3xl font-serif font-bold text-foreground group-hover:text-foreground/70 transition-colors">
            SOL & SOCIAL
          </span>
          <span className="text-xs md:text-sm text-muted-foreground -mt-1">Party Rental Oceanside</span>
        </a>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 flex-nowrap"
          role="navigation"
          aria-label="Main menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs lg:text-sm xl:text-base text-foreground/80 hover:text-foreground transition-colors font-medium cursor-pointer whitespace-nowrap ${
                activeSection === link.href.substring(1) ? "text-foreground border-b-2 border-foreground" : ""
              }`}
              title={`Navigate to ${link.label} section`}
              aria-label={`Go to ${link.label}`}
              aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("[v0] Cart button clicked, navigating to /cart/")
              router.push("/cart/")
            }}
            className="relative cursor-pointer text-xs lg:text-sm xl:text-base whitespace-nowrap flex-shrink-0"
            title="View your shopping cart"
            aria-label={`View shopping cart${totalItems > 0 ? ` with ${totalItems} items` : ""}`}
          >
            <ShoppingCart className="w-4 h-4 mr-1 lg:mr-2" aria-hidden="true" />
            <span className="hidden lg:inline">Cart</span>
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                aria-label={`${totalItems} items in cart`}
              >
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 text-xs lg:text-sm xl:text-base whitespace-nowrap flex-shrink-0"
          >
            <a href="#contact" title="Book your event now" aria-label="Book your event now">
              Book Now
            </a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              console.log("[v0] Mobile cart button clicked, navigating to /cart/")
              router.push("/cart/")
            }}
            className="relative cursor-pointer"
            title="View your shopping cart"
            aria-label={`View shopping cart${totalItems > 0 ? ` with ${totalItems} items` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-foreground text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                aria-label={`${totalItems} items`}
              >
                {totalItems}
              </span>
            )}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" title="Open navigation menu" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] px-6">
              <SheetClose
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                title="Close navigation menu"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </SheetClose>
              <div className="flex flex-col gap-8 mt-12" role="navigation" aria-label="Mobile menu">
                <div className="flex flex-col border-b pb-4">
                  <span className="text-2xl font-serif font-bold text-foreground">SOL & SOCIAL</span>
                  <span className="text-sm text-muted-foreground mt-1">Party Rental Oceanside</span>
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-left text-xl font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1 ${
                        activeSection === link.href.substring(1) ? "font-bold text-foreground" : ""
                      }`}
                      title={`Navigate to ${link.label} section`}
                      aria-label={`Go to ${link.label}`}
                      aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <Button
                  asChild
                  className="mt-4 bg-foreground text-background hover:bg-foreground/90 h-12 text-base"
                  size="lg"
                >
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    title="Book your event now"
                    aria-label="Book your event now"
                  >
                    Book Now
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
