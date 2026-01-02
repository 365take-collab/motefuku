'use client'

import { useState } from 'react'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleImageClick = () => {
    setIsZoomOpen(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomOpen) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  return (
    <>
      <div className="space-y-4">
        {/* メイン画像 */}
        <div
          className="relative w-full aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-xl overflow-hidden cursor-zoom-in group"
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-9xl opacity-40">👔</div>
          </div>
          
          {/* ズームインジケーター */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#f5f5f5] text-sm font-medium">
              クリックで拡大
            </div>
          </div>
        </div>

        {/* サムネイル一覧 */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                  selectedImageIndex === index
                    ? 'border-2 border-[#d4af37] ring-2 ring-[#d4af37]/20'
                    : 'border border-[#2a2a2a] hover:border-[#d4af37]'
                }`}
              >
                <div className="text-4xl opacity-30">👔</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 画像ズームモーダル */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-[#f5f5f5] hover:bg-white/20 transition-all flex items-center justify-center z-10"
          >
            ×
          </button>
          
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-9xl opacity-40">👔</div>
              </div>
            </div>
            
            {/* 画像ナビゲーション */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-[#f5f5f5] hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-[#f5f5f5] hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  →
                </button>
                
                {/* 画像インジケーター */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImageIndex === index ? 'bg-[#d4af37] w-6' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
