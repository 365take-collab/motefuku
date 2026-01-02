'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface BrandStyle {
  key: string
  name: string
  description: string
  is_recommended: boolean
  keywords: string[]
  design_features: string[]
  similar_brands: string[]
}

interface MatchedProduct {
  product_id: string
  name: string
  category: string
  brand: string
  price: number
  image_url: string
  moteru_score: number
  style_score: number
  recommendation_reason: string
  returnable: boolean
  in_stock: boolean
  url: string
  affiliate_url: string
}

export default function BrandStylePage() {
  const [styles, setStyles] = useState<BrandStyle[]>([])
  const [products, setProducts] = useState<MatchedProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingStyles, setLoadingStyles] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  
  // フォーム状態
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [minScore, setMinScore] = useState<string>('0.5')

  useEffect(() => {
    // 利用可能なブランドスタイルを取得
    const fetchStyles = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/brand-style/styles`)
        if (!response.ok) {
          throw new Error('スタイルの取得に失敗しました')
        }
        const data = await response.json()
        setStyles(data.styles || [])
        setLoadingStyles(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
        setLoadingStyles(false)
      }
    }

    fetchStyles()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStyle) {
      setError('ブランドスタイルを選択してください')
      return
    }

    setLoading(true)
    setError(null)
    setSearched(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const params = new URLSearchParams()
      
      params.append('brand_style', selectedStyle)
      if (maxPrice) params.append('max_price', maxPrice)
      if (category) params.append('category', category)
      if (minScore) params.append('min_score', minScore)
      params.append('limit', '20')

      const response = await fetch(`${apiUrl}/api/brand-style/match?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('マッチングの取得に失敗しました')
      }
      
      const data = await response.json()
      setProducts(data.products || [])
      setSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const selectedStyleInfo = styles.find(s => s.key === selectedStyle)

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a]">
        <Header />

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {/* ページタイトル */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f5f5] mb-4 luxury-heading tracking-tight">
              憧れのスタイルを、お手頃価格で
            </h1>
            <p className="text-xl md:text-2xl text-[#9ca3af] mb-8 luxury-text font-light">
              高級感のあるデザインで、かつ安い服を自動で見つけます
            </p>
          </div>

          {/* 検索フォーム */}
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#d4af37] shadow-2xl p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ブランドスタイル選択 */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-3 luxury-heading">
                  お好みのスタイル <span className="text-red-400">*</span>
                </label>
                {loadingStyles ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#f5f5f5] border-t-transparent"></div>
                    <p className="text-[#9ca3af] mt-4 luxury-text">読み込み中...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {styles.map((style) => (
                      <button
                        key={style.key}
                        type="button"
                        onClick={() => setSelectedStyle(style.key)}
                        className={`p-5 rounded-xl border-2 transition-all text-left relative ${
                          selectedStyle === style.key
                            ? 'border-[#d4af37] bg-[#d4af37]/10'
                            : style.is_recommended
                            ? 'border-[#d4af37]/50 bg-[#d4af37]/5'
                            : 'border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#d4af37]/50'
                        }`}
                      >
                        {/* 迷ったらこれがおすすめバッジ */}
                        {style.is_recommended && (
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1.5 bg-[#d4af37] text-[#0a0a0a] rounded-full text-xs font-bold shadow-lg">
                              迷ったらこれがおすすめ
                            </span>
                          </div>
                        )}
                        <div className="font-semibold text-[#f5f5f5] mb-2 luxury-heading text-lg">
                          {style.name}
                        </div>
                        <div className="text-sm text-[#9ca3af] luxury-text mb-2">
                          {style.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 最大価格 */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    予算上限
                  </label>
                  <input
                    type="number"
                    placeholder="例: 20000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all font-medium text-sm"
                  />
                  <p className="text-xs text-[#9ca3af] mt-2 luxury-text">円（未指定でもOK）</p>
                </div>

                {/* カテゴリ */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    カテゴリ
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all font-medium text-sm"
                  >
                    <option value="">指定しない</option>
                    <option value="パンツ">パンツ</option>
                    <option value="トップス">トップス</option>
                    <option value="靴">靴</option>
                    <option value="アウター">アウター</option>
                    <option value="アクセサリー">アクセサリー</option>
                  </select>
                </div>

                {/* 最小マッチングスコア */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    マッチング精度
                  </label>
                  <select
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all font-medium text-sm"
                  >
                    <option value="0.3">幅広く探す（緩め）</option>
                    <option value="0.5">バランス重視（推奨）</option>
                    <option value="0.7">厳選して探す（厳しめ）</option>
                    <option value="0.8">最高精度で探す（非常に厳しめ）</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full luxury-button-primary py-4 text-lg font-semibold"
                disabled={loading || !selectedStyle}
              >
                {loading ? '検索中...' : 'おすすめ商品を探す'}
              </button>
            </form>
          </div>

          {/* 選択されたスタイルの説明 */}
          {selectedStyleInfo && (
            <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#d4af37] p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    {selectedStyleInfo.name}
                  </h3>
                  {selectedStyleInfo.is_recommended && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a0a0a] rounded-full text-sm font-bold">
                      ⭐ 迷ったらこれがおすすめ
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[#9ca3af] mb-4 luxury-text leading-relaxed">
                {selectedStyleInfo.description}
              </p>
              <div>
                <p className="text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">特徴キーワード:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStyleInfo.keywords.slice(0, 10).map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-[#2a2a2a] text-[#9ca3af] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ローディング */}
          {loading && (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#f5f5f5] border-t-transparent"></div>
              <p className="text-[#9ca3af] mt-6 luxury-text">あなたにぴったりの商品を探しています...</p>
            </div>
          )}

          {/* エラー */}
          {error && (
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
              <p className="font-semibold mb-1">エラー</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* 検索結果 */}
          {!loading && !error && searched && (
            <>
              {products.length === 0 ? (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-12 text-center">
                    <p className="text-[#9ca3af] luxury-text text-lg">
                    条件に合う商品が見つかりませんでした。
                    <br />
                    予算やマッチング精度を調整して、もう一度お試しください。
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                      {selectedStyleInfo?.name}スタイルの商品
                    </h3>
                    <p className="text-[#9ca3af] luxury-text">
                      <span className="font-semibold text-[#f5f5f5]">{products.length}</span> 件のおすすめ商品が見つかりました
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                      <Link href={`/products/${product.product_id}`} key={product.product_id}>
                        <div className="luxury-card cursor-pointer group relative">
                          {/* マッチングスコアバッジ */}
                          <div className="absolute top-4 right-4 z-10 bg-[#d4af37] text-[#0a0a0a] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            マッチ度 {Math.round(product.style_score * 100)}%
                          </div>

                          {/* 写真エリア */}
                          <div className="luxury-image-overlay w-full h-64 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center relative">
                            <div className="text-center z-10">
                              <div className="text-7xl mb-3 opacity-40">👔</div>
                              <p className="text-xs text-[#9ca3af] font-medium">商品写真</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* コンテンツエリア */}
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-[#f5f5f5] mb-3 line-clamp-1 luxury-heading">
                              {product.name}
                            </h3>
                            
                            {/* 推薦理由 */}
                            <div className="mb-4 p-3 bg-[#2a2a2a]/50 rounded-lg border border-[#3a3a3a]">
                              <p className="text-xs text-[#9ca3af] mb-1 luxury-text uppercase tracking-wider">
                                推薦理由
                              </p>
                              <p className="text-sm text-[#f5f5f5] luxury-text leading-relaxed">
                                {product.recommendation_reason}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <span className="px-3 py-1.5 bg-[#2a2a2a] text-[#9ca3af] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                                {product.category}
                              </span>
                              <span className="px-3 py-1.5 bg-[#2a2a2a] text-[#9ca3af] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                                {product.brand}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#2a2a2a]">
                              <div className="flex items-center gap-2">
                                <span className="text-[#d4af37] text-lg">⭐</span>
                                <span className="text-[#f5f5f5] font-semibold text-lg luxury-heading">{product.moteru_score}</span>
                              </div>
                              <span className="text-xs text-[#9ca3af] luxury-text">モテる度</span>
                              <div className="ml-auto">
                                <span className="text-xs text-[#9ca3af] luxury-text">スタイル一致度</span>
                                <span className="text-sm text-[#d4af37] font-semibold ml-2">{Math.round(product.style_score * 100)}%</span>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <p className="text-xs text-[#9ca3af] mb-2 luxury-text uppercase tracking-wider">価格</p>
                              <p className="text-2xl font-semibold text-[#f5f5f5] luxury-heading">
                                ¥{product.price.toLocaleString()}
                              </p>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                              {product.returnable && (
                                <span className="inline-flex items-center px-4 py-2 bg-[#2a2a2a] text-green-400 rounded-lg text-xs font-semibold border border-green-800/50">
                                  ✓ 返品可能
                                </span>
                              )}
                              {/* 明確なCTAボタン */}
                              <button className="w-full luxury-button-primary py-3 text-sm font-semibold">
                                今すぐ購入する
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* 初期状態の説明 */}
          {!loading && !error && !searched && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-12 text-center">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-4 luxury-heading">
                あなたにぴったりのスタイルを見つけましょう
              </h3>
              <p className="text-[#9ca3af] luxury-text text-lg max-w-2xl mx-auto">
                高級感のあるデザインで、かつお手頃価格の服を自動で見つけます。
                <br />
                上のフォームでお好みのスタイルを選択し、「おすすめ商品を探す」ボタンをクリックしてください。
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
