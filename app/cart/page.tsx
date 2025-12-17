"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200">
          <div className="container mx-auto px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="gap-2"
              title="Return to homepage"
              aria-label="Return to homepage"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-24 text-center">
          <ShoppingCart className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-neutral-400" aria-hidden="true" />
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900">Your cart is empty</h1>
          <p className="text-base md:text-lg text-neutral-600 mb-8">
            Start adding items to create your perfect event package
          </p>
          <Button
            onClick={() => router.push("/#cart-options")}
            size="lg"
            title="Browse available cart options"
            aria-label="Browse cart options"
          >
            Browse Cart Options
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between" aria-label="Cart navigation">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="gap-2"
              title="Continue shopping"
              aria-label="Continue shopping"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Continue Shopping
            </Button>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-destructive"
              title="Remove all items from cart"
              aria-label="Clear all items from cart"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Cart Content */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? "item" : "items"})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white border-2 border-neutral-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`${item.name} - ${item.type === "cart" ? "Mobile bar cart" : "Event equipment"} rental`}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="font-bold text-base md:text-lg text-neutral-900">{item.name}</h2>
                          <p className="text-xs md:text-sm text-neutral-600 capitalize">{item.type}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive"
                          title={`Remove ${item.name} from cart`}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div
                          className="flex items-center gap-2 md:gap-3"
                          role="group"
                          aria-label={`Quantity controls for ${item.name}`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                            className="border-2 border-neutral-300"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <span
                            className="w-8 text-center font-bold text-sm md:text-base text-neutral-900"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                            aria-label="Increase quantity"
                            className="border-2 border-neutral-300"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs md:text-sm text-neutral-600">
                            ${item.price} × {item.quantity}
                          </p>
                          <p className="text-lg md:text-xl font-bold text-neutral-900">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-neutral-900 text-white border-2 border-neutral-800 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>

                <div className="space-y-2 py-4 border-y border-neutral-700">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-300">Subtotal</span>
                    <span className="font-semibold text-white">${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-300">Rental Duration</span>
                    <span className="font-semibold text-white">1 day</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-300">Delivery</span>
                    <span className="font-semibold text-white">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-base md:text-lg font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-bold text-white">${getTotalPrice()}</span>
                    <p className="text-xs md:text-sm text-neutral-400">per day</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-12 md:h-14 text-base md:text-lg bg-white text-neutral-900 hover:bg-neutral-100 font-bold cursor-pointer"
                  onClick={() => router.push("/checkout/")}
                  title="Proceed to checkout and complete your booking"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-center text-neutral-400">
                  Final pricing will be confirmed based on event date and location
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
