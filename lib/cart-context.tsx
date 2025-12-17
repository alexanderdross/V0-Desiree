"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  type: "cart" | "equipment"
  selectedColor?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sol-social-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log("[v0] Loaded cart from localStorage:", parsedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("[v0] Error loading cart from localStorage:", error)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      console.log("[v0] Saving cart to localStorage:", items)
      localStorage.setItem("sol-social-cart", JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    console.log("[v0] Adding item to cart:", item)
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id && i.selectedColor === item.selectedColor)
      if (existingItem) {
        console.log("[v0] Item already exists, updating quantity")
        return prev.map((i) =>
          i.id === item.id && i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i,
        )
      }
      console.log("[v0] Adding new item to cart")
      const newCart = [...prev, { ...item, quantity: item.quantity || 1 }]
      console.log("[v0] New cart state:", newCart)
      return newCart
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    console.log("[v0] Clearing cart")
    setItems([])
    localStorage.removeItem("sol-social-cart")
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    const total = items.reduce((total, item) => total + item.quantity, 0)
    console.log("[v0] Total items in cart:", total)
    return total
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
