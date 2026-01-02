'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'

interface Product {
  product_id: string
  name: string
  category: string
  brand: string
  price: number
  image_url: string
  images?: string[]
  moteru_score: number
  returnable: boolean
  in_stock: boolean
  url: string
  affiliate_url: string
}

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image_url]

  // ホバー時に画像を切り替え
  useEffect(() => {
    if (hovered && images.length > 1) {
      const timer = setTimeout(() => {
        setImageIndex(1)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setImageIndex(0)
    }
  }, [hovered, images.length])

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickView) {
      onQuickView(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      affiliate_url: product.affiliate_url || product.url,
      url: product.url,
      category: product.category,
    })
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      brand: product.brand,
    })
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setImageIndex(0)
      }}
    >
      <Link href={`/products/${product.product_id}`} className="block">
        {/* 商品画像エリア - 大きな画像 */}
        <div className="relative w-full aspect-square bg-[#1a1a1a] overflow-hidden rounded-lg">
          {/* 画像切り替えアニメーション */}
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-300 ${
                imageIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                <div className="text-7xl opacity-20">👔</div>
              </div>
            </div>
          ))}
          
          {/* 画像切り替えインジケーター */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    imageIndex === idx ? 'bg-white w-6' : 'bg-white/30 w-1'
                  }`}
                />
              ))}
            </div>
          )}

          {/* お気に入りボタン */}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorite(product.product_id)
                ? 'bg-white text-[#0a0a0a]'
                : 'bg-white/90 text-[#0a0a0a] hover:bg-white'
            } shadow-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-all duration-200 ${
                isFavorite(product.product_id) ? 'fill-current' : 'fill-none'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* モテる度バッジ */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#0a0a0a] rounded text-xs font-semibold shadow-sm">
            ⭐ {product.moteru_score}
          </div>

          {/* ホバー時のクイックアクション */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleQuickView}
              className="px-4 py-2 bg-white text-[#0a0a0a] rounded text-sm font-medium hover:bg-gray-100 transition-all shadow-sm"
            >
              クイックビュー
            </button>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-white text-[#0a0a0a] rounded text-sm font-medium hover:bg-gray-100 transition-all shadow-sm"
            >
              カートに追加
            </button>
          </div>
        </div>

        {/* 商品情報 */}
        <div className="mt-3 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[#f5f5f5] font-medium text-sm mb-0.5 line-clamp-2 group-hover:opacity-70 transition-opacity">
                {product.name}
              </h3>
              <p className="text-[#9ca3af] text-xs">
                {product.brand}
              </p>
            </div>
          </div>

          {/* 価格 */}
          <div className="flex items-center justify-between">
            <p className="text-[#f5f5f5] font-semibold text-base">
              ¥{product.price.toLocaleString()}
            </p>
            {product.returnable && (
              <span className="text-[#6b7280] text-xs">返品可</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
