"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    type: string
  }
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
}

export function AddToCartButton({
  item,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("[v0] AddToCartButton clicked for:", item.name)
    addItem({
      ...item,
      quantity: 1,
    })
    console.log("[v0] Item added, navigating to cart")

    router.push("/cart/")
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
      title={`Add ${item.name} to your cart`}
    >
      {showIcon && <ShoppingCart className="w-5 h-5 mr-2" />}
      Add to Cart
    </Button>
  )
}
