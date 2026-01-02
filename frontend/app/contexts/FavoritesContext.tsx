'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Product {
  product_id: string
  name: string
  price: number
  image_url: string
  category: string
  brand: string
}

interface FavoritesContextType {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  toggleFavorite: (product: Product) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  // ローカルストレージからお気に入りを読み込む
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error('Failed to load favorites from localStorage', e)
      }
    }
  }, [])

  // お気に入りが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      if (prev.find((p) => p.product_id === product.product_id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((p) => p.product_id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some((p) => p.product_id === productId)
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.product_id)) {
      removeFromFavorites(product.product_id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
