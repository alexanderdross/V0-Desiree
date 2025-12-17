"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
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
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">SOL & SOCIAL</h3>
            <p className="text-white/70 mb-4 leading-relaxed">
              Premium mobile bar carts and party rentals for unforgettable events in Oceanside.
            </p>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-black transition-colors bg-transparent"
                asChild
                title="Visit our Instagram page"
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-black transition-colors bg-transparent"
                asChild
                title="Visit our Facebook page"
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Navigate to home section"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cart-options")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Browse cart options"
                >
                  Cart Options
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("equipment")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Browse equipment and accessories"
                >
                  Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="View package deals"
                >
                  Package Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Learn about us"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Contact us"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3 text-white/70">
              <li>Mobile Bar Cart Rentals</li>
              <li>Event Equipment</li>
              <li>Party Decorations</li>
              <li>Beach Event Packages</li>
              <li>Wedding Rentals</li>
              <li>Corporate Events</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Oceanside, CA 92054</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <a href="tel:+13104941585" className="text-white/70 hover:text-white transition-colors">
                  +1 (310) 494-1585
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@solandsocial.com" className="text-white/70 hover:text-white transition-colors">
                  hello@solandsocial.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm font-semibold mb-2">Business Hours</p>
              <p className="text-xs text-white/70">Monday - Sunday</p>
              <p className="text-xs text-white/70">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} SOL & SOCIAL Party Rental. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-white/50">
              <Link href="/imprint/" className="hover:text-white transition-colors" title="View imprint information">
                Imprint
              </Link>
              <Link href="/privacy/" className="hover:text-white transition-colors" title="View privacy policy">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="hover:text-white transition-colors" title="View terms of use">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
