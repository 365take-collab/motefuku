'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import QuickViewModal from '../components/QuickViewModal'
import FilterSidebar from '../components/FilterSidebar'

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
  sizes?: string[]
  colors?: string[]
  description?: string
}

interface SearchParams {
  category?: string
  min_price?: number
  max_price?: number
  color?: string
  scene?: string
  style?: string
  keyword?: string
  brand?: string
  sort?: 'price_asc' | 'price_desc' | 'moteru_score_desc' | 'created_at_desc'
  page?: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    sort: 'moteru_score_desc'
  })
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const params = new URLSearchParams()
        
        if (searchParams.category) params.append('category', searchParams.category)
        if (searchParams.min_price) params.append('min_price', searchParams.min_price.toString())
        if (searchParams.max_price) params.append('max_price', searchParams.max_price.toString())
        if (searchParams.color) params.append('color', searchParams.color)
        if (searchParams.scene) params.append('scene', searchParams.scene)
        if (searchParams.style) params.append('style', searchParams.style)
        if (searchParams.keyword) params.append('keyword', searchParams.keyword)
        if (searchParams.brand) params.append('brand', searchParams.brand)
        if (searchParams.sort) params.append('sort', searchParams.sort)
        params.append('page', page.toString())
        params.append('limit', '20')

        const response = await fetch(`${apiUrl}/api/products/search?${params.toString()}`)
        if (!response.ok) {
          throw new Error('APIの取得に失敗しました')
        }
        const data = await response.json()
        setProducts(data.products || [])
        setCount(data.count || 0)
        setTotalPages(data.total_pages || 1)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams, page])

  const handleFilterChange = (filters: any) => {
    setSearchParams({
      category: filters.category || undefined,
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      color: filters.color || undefined,
      scene: filters.scene || undefined,
      style: filters.style || undefined,
      keyword: filters.keyword || undefined,
      brand: filters.brand || undefined,
      sort: (filters.sort as SearchParams['sort']) || 'moteru_score_desc'
    })
    setPage(1)
  }

  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* モバイル用フィルターボタン */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium hover:border-[#d4af37] transition-colors"
          >
            フィルター
          </button>
        </div>

        {/* モバイル用フィルターサイドバー（ドロワー） */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsFilterOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-[#0a0a0a] border-r border-[#2a2a2a] overflow-y-auto p-6">
              <FilterSidebar searchParams={searchParams} onFilterChange={handleFilterChange} onClose={() => setIsFilterOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* デスクトップ用フィルターサイドバー（左側固定） */}
          <div className="hidden md:block">
            <FilterSidebar searchParams={searchParams} onFilterChange={handleFilterChange} />
          </div>

          {/* メインコンテンツエリア */}
          <div className="flex-1 min-w-0">

            {/* ローディング（初回のみ） */}
            {loading && products.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg mb-4" />
                    <div className="h-4 bg-[#1a1a1a] rounded mb-2" />
                    <div className="h-4 bg-[#1a1a1a] rounded w-2/3" />
                  </div>
                ))}
              </div>
            )}

        {/* エラー */}
        {error && (
          <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
            <p className="font-semibold mb-1">エラー</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

            {/* 商品一覧 */}
            {!error && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-2 luxury-heading tracking-tight">
                    {products.length > 0 ? '商品一覧' : '商品を検索'}
                  </h2>
                  {count > 0 && (
                    <p className="text-[#9ca3af] luxury-text text-sm">
                      全 <span className="font-semibold text-[#f5f5f5]">{count}</span> 件
                    </p>
                  )}
                </div>

                {products.length === 0 && !loading ? (
                  <div className="text-center py-24">
                    <p className="text-[#9ca3af] luxury-text">商品が見つかりませんでした</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <ProductCard
                          key={product.product_id}
                          product={product}
                          onQuickView={(product) => {
                            setQuickViewProduct(product)
                            setIsQuickViewOpen(true)
                          }}
                        />
                      ))}
                    </div>

            {/* 無限スクロール用のローディングインジケーター */}
            {hasMore && (
              <div ref={loadingRef} className="py-8 text-center">
                {loading && (
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#f5f5f5] border-t-transparent"></div>
                )}
              </div>
            )}

            {/* すべて読み込み完了 */}
            {!hasMore && products.length > 0 && (
              <div className="py-8 text-center text-[#9ca3af] text-sm">
                すべての商品を表示しました
              </div>
            )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <QuickViewModal
      product={quickViewProduct}
      isOpen={isQuickViewOpen}
      onClose={() => {
        setIsQuickViewOpen(false)
        setQuickViewProduct(null)
      }}
    />
    </>
  )
}
