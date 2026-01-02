'use client'

import { useState } from 'react'
import { useCart } from '../contexts/CartContext'

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
  description?: string
  sizes?: string[]
  colors?: string[]
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const { addToCart } = useCart()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addToCart({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      affiliate_url: product.affiliate_url || product.url,
      url: product.url,
      category: product.category,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] rounded-2xl border border-[#2a2a2a] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* 左側: 商品画像 */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-[#f5f5f5] hover:bg-white/20 transition-all flex items-center justify-center"
            >
              ×
            </button>
            <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-xl flex items-center justify-center">
              <div className="text-9xl opacity-40">👔</div>
            </div>
          </div>

          {/* 右側: 商品情報 */}
          <div className="space-y-6">
            <div>
              <p className="text-[#9ca3af] text-sm uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-4">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#d4af37] text-[#0a0a0a] rounded-lg text-sm font-bold">
                  ⭐ {product.moteru_score}
                </span>
                <span className="text-[#9ca3af] text-sm">モテる度</span>
              </div>
            </div>

            {/* 価格 */}
            <div>
              <p className="text-3xl font-bold text-[#f5f5f5] mb-2">
                ¥{product.price.toLocaleString()}
              </p>
              {product.returnable && (
                <p className="text-green-400 text-sm">✓ 返品可能</p>
              )}
            </div>

            {/* サイズ選択 */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-[#f5f5f5] text-sm font-medium mb-3">
                  サイズ
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#d4af37] text-[#0a0a0a]'
                          : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#d4af37]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* カラー選択 */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-[#f5f5f5] text-sm font-medium mb-3">
                  カラー
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-[#d4af37] text-[#0a0a0a]'
                          : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#d4af37]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg text-sm font-semibold hover:bg-[#c9a030] transition-all"
              >
                カートに追加
              </button>
              <a
                href={product.affiliate_url || product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-semibold hover:border-[#d4af37] transition-all text-center"
              >
                商品詳細を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
