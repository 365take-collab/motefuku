'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Product {
  product_id: string
  name: string
  price: number
  image_url: string
  affiliate_url: string
  url: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getDiscountRate: () => number
  getDiscountedPrice: () => number
  getFreeShippingRemaining: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const FREE_SHIPPING_THRESHOLD = 5000

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // ローカルストレージからカートを読み込む
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
  }, [])

  // カートが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product_id === product.product_id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getDiscountRate = () => {
    const itemCount = getTotalItems()
    if (itemCount >= 5) return 20
    if (itemCount >= 3) return 15
    if (itemCount >= 2) return 10
    return 0
  }

  const getDiscountedPrice = () => {
    const total = getTotalPrice()
    const discountRate = getDiscountRate()
    return total * (1 - discountRate / 100)
  }

  const getFreeShippingRemaining = () => {
    const total = getDiscountedPrice()
    return Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        getDiscountRate,
        getDiscountedPrice,
        getFreeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
