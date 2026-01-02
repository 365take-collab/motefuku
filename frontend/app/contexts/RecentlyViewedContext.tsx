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

interface RecentlyViewedContextType {
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

const MAX_RECENTLY_VIEWED = 10

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])

  // ローカルストレージから最近閲覧した商品を読み込む
  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed')
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load recently viewed from localStorage', e)
      }
    }
  }, [])

  // 最近閲覧した商品が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      // 既に存在する場合は削除してから先頭に追加
      const filtered = prev.filter((p) => p.product_id !== product.product_id)
      return [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}
