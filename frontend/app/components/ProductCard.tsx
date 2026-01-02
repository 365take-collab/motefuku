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
        {/* 商品画像エリア */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden">
          {/* 画像切り替えアニメーション */}
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                imageIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-7xl opacity-40">👔</div>
              </div>
            </div>
          ))}
          
          {/* 画像切り替えインジケーター */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    imageIndex === idx ? 'bg-[#d4af37] w-4' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* ホバー時のオーバーレイ */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* クイックアクションボタン（ホバー時表示） */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleQuickView}
              className="px-6 py-3 bg-white/95 text-[#0a0a0a] rounded-lg text-sm font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg"
            >
              クイックビュー
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-[#d4af37] text-[#0a0a0a] rounded-lg text-sm font-semibold hover:bg-[#c9a030] transition-all transform hover:scale-105 shadow-lg"
            >
              カートに追加
            </button>
          </div>

          {/* お気に入りボタン */}
          <button
            onClick={handleFavorite}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite(product.product_id)
                ? 'bg-[#d4af37] text-[#0a0a0a]'
                : 'bg-white/90 text-[#0a0a0a] hover:bg-white'
            } shadow-lg transform hover:scale-110`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-all duration-300 ${
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
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#d4af37]/95 backdrop-blur-sm text-[#0a0a0a] rounded-lg text-xs font-bold shadow-lg">
            ⭐ {product.moteru_score}
          </div>
        </div>

        {/* 商品情報 */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[#f5f5f5] font-medium text-sm mb-1 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                {product.name}
              </h3>
              <p className="text-[#9ca3af] text-xs uppercase tracking-wider">
                {product.brand}
              </p>
            </div>
          </div>

          {/* 価格 */}
          <div className="flex items-center justify-between">
            <p className="text-[#f5f5f5] font-semibold text-lg">
              ¥{product.price.toLocaleString()}
            </p>
            {product.returnable && (
              <span className="text-[#9ca3af] text-xs">返品可</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
