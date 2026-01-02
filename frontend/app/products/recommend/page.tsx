'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface RecommendedProduct {
  product_id: string
  name: string
  category: string
  brand: string
  price: number
  image_url: string
  moteru_score: number
  recommendation_score: number
  recommendation_reason: string
  returnable: boolean
  in_stock: boolean
  url: string
  affiliate_url: string
}

export default function RecommendPage() {
  const [products, setProducts] = useState<RecommendedProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  
  // フォーム状態
  const [purpose, setPurpose] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [category, setCategory] = useState('')
  const [scene, setScene] = useState('')
  const [style, setStyle] = useState('')
  const [season, setSeason] = useState('')
  const [minMoteruScore, setMinMoteruScore] = useState('3.5')
  
  // 体型・サイズ情報
  const [bodyType, setBodyType] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [size, setSize] = useState('')
  const [fit, setFit] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSearched(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const params = new URLSearchParams()
      
      if (purpose) params.append('purpose', purpose)
      if (maxPrice) params.append('max_price', maxPrice)
      if (category) params.append('category', category)
      if (scene) params.append('scene', scene)
      if (style) params.append('style', style)
      if (season) params.append('season', season)
      if (minMoteruScore) params.append('min_moteru_score', minMoteruScore)
      if (bodyType) params.append('body_type', bodyType)
      if (height) params.append('height', height)
      if (weight) params.append('weight', weight)
      if (size) params.append('size', size)
      if (fit) params.append('fit', fit)
      params.append('limit', '10')

      const response = await fetch(`${apiUrl}/api/products/recommend?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('推薦の取得に失敗しました')
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

  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <Header />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* ページタイトル */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-[#f5f5f5] mb-4 luxury-heading tracking-tight">
            あなたにぴったりの商品を推薦
          </h2>
          <p className="text-[#9ca3af] luxury-text text-lg">
            トップナンパ師が監修。あなたの要望に合わせて最適な商品をご提案します
          </p>
        </div>

        {/* 推薦フォーム */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] shadow-lg p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 用途・要望 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  用途・要望
                </label>
                <input
                  type="text"
                  placeholder="例: デート用の服、仕事用のパンツ、カジュアルなトップスなど"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                />
                <p className="text-xs text-[#9ca3af] mt-2 luxury-text">
                  どんな服が欲しいか、自由に入力してください
                </p>
              </div>

              {/* 最大価格 */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  最大価格（予算上限）
                </label>
                <input
                  type="number"
                  placeholder="例: 10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                />
                <p className="text-xs text-[#9ca3af] mt-2 luxury-text">円</p>
              </div>

              {/* カテゴリ */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  カテゴリ
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="">指定しない</option>
                  <option value="パンツ">パンツ</option>
                  <option value="トップス">トップス</option>
                  <option value="靴">靴</option>
                  <option value="アウター">アウター</option>
                  <option value="アクセサリー">アクセサリー</option>
                </select>
              </div>

              {/* シーン */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  シーン
                </label>
                <select
                  value={scene}
                  onChange={(e) => setScene(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="">指定しない</option>
                  <option value="デート">デート</option>
                  <option value="仕事">仕事</option>
                  <option value="カジュアル">カジュアル</option>
                  <option value="ストリート">ストリート</option>
                  <option value="ビジネス">ビジネス</option>
                </select>
              </div>

              {/* スタイル */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  スタイル
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="">指定しない</option>
                  <option value="カジュアル">カジュアル</option>
                  <option value="ストリート">ストリート</option>
                  <option value="ビジネス">ビジネス</option>
                  <option value="高級感">高級感</option>
                </select>
              </div>

              {/* 季節 */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  季節
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="">指定しない</option>
                  <option value="春">春</option>
                  <option value="夏">夏</option>
                  <option value="秋">秋</option>
                  <option value="冬">冬</option>
                </select>
              </div>

              {/* 最小モテる度 */}
              <div>
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  最小モテる度
                </label>
                <select
                  value={minMoteruScore}
                  onChange={(e) => setMinMoteruScore(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="3.0">3.0以上</option>
                  <option value="3.5">3.5以上（推奨）</option>
                  <option value="4.0">4.0以上</option>
                  <option value="4.5">4.5以上</option>
                </select>
              </div>
            </div>

            {/* 体型・サイズ情報セクション */}
            <div className="border-t border-[#2a2a2a] pt-6 mt-6">
              <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4 luxury-heading">
                体型・サイズ情報（オプション）
              </h3>
              <p className="text-xs text-[#9ca3af] mb-4 luxury-text">
                体型やサイズを入力すると、よりあなたに合った商品を推薦します
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 体型 */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    体型
                  </label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                  >
                    <option value="">指定しない</option>
                    <option value="細身">細身</option>
                    <option value="標準">標準</option>
                    <option value="がっちり">がっちり</option>
                    <option value="小柄">小柄</option>
                  </select>
                </div>

                {/* 身長 */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    身長
                  </label>
                  <input
                    type="number"
                    placeholder="例: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                  />
                  <p className="text-xs text-[#9ca3af] mt-2 luxury-text">cm（未指定可）</p>
                </div>

                {/* 体重 */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    体重
                  </label>
                  <input
                    type="number"
                    placeholder="例: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                  />
                  <p className="text-xs text-[#9ca3af] mt-2 luxury-text">kg（未指定可）</p>
                </div>

                {/* サイズ */}
                <div>
                  <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    サイズ
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                  >
                    <option value="">指定しない</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>

              {/* フィット */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                  フィット感
                </label>
                <select
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  className="w-full px-5 py-4 border border-[#2a2a2a] rounded-xl bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all font-medium text-sm"
                >
                  <option value="">指定しない</option>
                  <option value="スリム">スリムフィット</option>
                  <option value="レギュラー">レギュラーフィット</option>
                  <option value="オーバーサイズ">オーバーサイズ</option>
                  <option value="ルーズ">ルーズフィット</option>
                </select>
                <p className="text-xs text-[#9ca3af] mt-2 luxury-text">
                  希望するフィット感を選択してください
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="luxury-button-primary w-full md:w-auto px-12 py-4 text-lg"
              disabled={loading}
            >
              {loading ? '推薦中...' : 'おすすめ商品を探す'}
            </button>
          </form>
        </div>

        {/* ローディング */}
        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#f5f5f5] border-t-transparent"></div>
            <p className="text-[#9ca3af] mt-6 luxury-text">おすすめ商品を検索中...</p>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
            <p className="font-semibold mb-1">エラー</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* 推薦結果 */}
        {!loading && !error && searched && (
          <>
            {products.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-12 text-center">
                <p className="text-[#9ca3af] luxury-text text-lg">
                  条件に合う商品が見つかりませんでした。
                  <br />
                  条件を変更して再度検索してください。
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                    あなたにおすすめの商品
                  </h3>
                  <p className="text-[#9ca3af] luxury-text">
                    <span className="font-semibold text-[#f5f5f5]">{products.length}</span> 件の商品が見つかりました
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                    <Link href={`/products/${product.product_id}`} key={product.product_id}>
                      <div className="luxury-card cursor-pointer group relative">
                        {/* 推薦順位バッジ */}
                        {index < 3 && (
                          <div className="absolute top-4 right-4 z-10 bg-[#d4af37] text-[#0a0a0a] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            {index === 0 ? '🥇 1位' : index === 1 ? '🥈 2位' : '🥉 3位'}
                          </div>
                        )}

                        {/* 写真エリア */}
                        <div className="luxury-image-overlay w-full h-64 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center relative">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="object-cover w-full h-full absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <div className="text-center z-10">
                            <div className="text-7xl mb-3 opacity-60">👕</div>
                            <p className="text-xs text-[#9ca3af] font-medium">商品写真</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                              <span className="text-xs text-[#9ca3af] luxury-text">推薦スコア</span>
                              <span className="text-sm text-[#d4af37] font-semibold ml-2">{product.recommendation_score}</span>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <p className="text-xs text-[#9ca3af] mb-2 luxury-text uppercase tracking-wider">価格</p>
                            <p className="text-2xl font-semibold text-[#f5f5f5] luxury-heading">
                              ¥{product.price.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="mt-4">
                            {product.returnable && (
                              <span className="inline-flex items-center px-4 py-2 bg-[#2a2a2a] text-[#9ca3af] rounded-lg text-xs font-semibold border border-[#3a3a3a]">
                                ✓ 返品可能
                              </span>
                            )}
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
              あなたにぴったりの商品を探しましょう
            </h3>
            <p className="text-[#9ca3af] luxury-text text-lg max-w-2xl mx-auto">
              上のフォームに希望する条件を入力して、「おすすめ商品を探す」ボタンをクリックしてください。
              <br />
              トップナンパ師が監修したモテる商品を、あなたの条件に合わせて推薦します。
            </p>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  )
}
