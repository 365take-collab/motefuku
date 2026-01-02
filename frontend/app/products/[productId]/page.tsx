'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Footer from '../../components/Footer'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContext'
import ProductImageGallery from '../../components/ProductImageGallery'

interface Product {
  product_id: string
  name: string
  category: string
  subcategory: string
  brand: string
  price: number
  original_price?: number
  currency: string
  url: string
  affiliate_url: string
  image_url: string
  images: string[]
  colors: string[]
  sizes: string[]
  materials: string[]
  returnable: boolean
  in_stock: boolean
  evaluation: {
    moteru_score: number
    uniqueness: number
    silhouette: number
    street_luxury_fusion: number
    reaction_score: number
    confidence_score: number
    oversize_lower_body?: boolean
    luxury_atmosphere: number
    quality_focus: boolean
  }
  attributes: {
    scene: string[]
    style: string[]
    season: string[]
    fit: string
    design: string[]
    cleanliness: string
    trendiness: string
  }
  description: string
  created_at: string
  updated_at: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.productId as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddOnModal, setShowAddOnModal] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loadingRelated, setLoadingRelated] = useState(false)
  const [bundleOffers, setBundleOffers] = useState<any[]>([])
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] = useState<any[]>([])
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(5000)
  const { addToCart, getTotalItems } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [scrollPosition, setScrollPosition] = useState(0)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  // スクロール位置と滞在時間を追跡
  useEffect(() => {
    if (!product) return

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setScrollPosition(scrollPercent)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) return
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 滞在時間を追跡
    const interval = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [product])

  // モーダルを自動表示する条件をチェック
  useEffect(() => {
    if (!product || showAddOnModal) return

    // Cookieで24時間以内に表示したかチェック
    const modalShown = localStorage.getItem(`modal_shown_${productId}`)
    if (modalShown) {
      const shownTime = parseInt(modalShown, 10)
      const now = Date.now()
      if (now - shownTime < 24 * 60 * 60 * 1000) {
        return // 24時間以内に表示済み
      }
    }

    // 条件: スクロール80%以上 OR 滞在時間30秒以上
    if (scrollPosition >= 80 || timeOnPage >= 30) {
      // 購入ボタンが表示されていることを確認
      const purchaseButton = document.querySelector('.luxury-button-primary')
      if (purchaseButton) {
        // 少し遅延してからモーダルを表示
        const timer = setTimeout(async () => {
          // Cookieに表示時刻を保存
          localStorage.setItem(`modal_shown_${productId}`, Date.now().toString())

          setLoadingRelated(true)
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
            const response = await fetch(`${apiUrl}/api/products/${productId}/related?limit=5`)
            if (response.ok) {
              const data = await response.json()
              setRelatedProducts(data.related_products || [])
              setBundleOffers(data.bundle_offers || [])
              setFrequentlyBoughtTogether(data.frequently_bought_together || [])
              setFreeShippingThreshold(data.free_shipping_threshold || 5000)
              setShowAddOnModal(true)
            }
          } catch (err) {
            console.error('Failed to fetch related products', err)
          } finally {
            setLoadingRelated(false)
          }
        }, 2000)
        return () => clearTimeout(timer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition, timeOnPage, product, showAddOnModal, productId])

  const handleShowModal = async () => {
    // Cookieで24時間以内に表示したかチェック
    const modalShown = localStorage.getItem(`modal_shown_${productId}`)
    if (modalShown) {
      const shownTime = parseInt(modalShown, 10)
      const now = Date.now()
      if (now - shownTime < 24 * 60 * 60 * 1000) {
        return // 24時間以内に表示済み
      }
    }

    // Cookieに表示時刻を保存
    localStorage.setItem(`modal_shown_${productId}`, Date.now().toString())

    setLoadingRelated(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/products/${productId}/related?limit=5`)
      if (response.ok) {
        const data = await response.json()
        setRelatedProducts(data.related_products || [])
        setBundleOffers(data.bundle_offers || [])
        setFrequentlyBoughtTogether(data.frequently_bought_together || [])
        setFreeShippingThreshold(data.free_shipping_threshold || 5000)
        setShowAddOnModal(true)
      }
    } catch (err) {
      console.error('Failed to fetch related products', err)
    } finally {
      setLoadingRelated(false)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/products/${productId}`)
        if (!response.ok) {
          throw new Error('商品の取得に失敗しました')
        }
        const data = await response.json()
        setProduct(data)
        // 最近閲覧した商品に追加
        if (data) {
          addToRecentlyViewed({
            product_id: data.product_id,
            name: data.name,
            price: data.price,
            image_url: data.image_url,
            category: data.category,
            brand: data.brand,
          })
        }
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-24 max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#f5f5f5] border-t-transparent"></div>
            <p className="text-[#9ca3af] mt-6 luxury-text">読み込み中...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-24 max-w-7xl">
          <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm">
            <p className="font-semibold mb-1">エラー</p>
            <p className="text-sm">{error || '商品が見つかりませんでした'}</p>
          </div>
          <div className="mt-8">
            <Link href="/products" className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              ← 商品一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* ヘッダー */}
      <header className="bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a] sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-5 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-semibold text-[#f5f5f5] tracking-tight luxury-heading">
              モテ服
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors cursor-pointer font-medium">コーディネート</Link>
              <Link href="/products" className="text-sm text-[#f5f5f5] hover:text-[#f5f5f5] transition-colors cursor-pointer font-medium">商品検索</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-6">
          <Link href="/products" className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors luxury-text">
            ← 商品一覧に戻る
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側: 商品画像 */}
          <div>
            <ProductImageGallery
              images={product.images && product.images.length > 0 ? product.images : [product.image_url]}
              productName={product.name}
            />
          </div>

          {/* 右側: 商品情報 */}
          <div className="space-y-8">
            {/* 広告表記 */}
            <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2">
              <p className="text-xs text-[#9ca3af] uppercase tracking-wider">広告</p>
            </div>

            {/* 商品名 */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-semibold text-[#f5f5f5] mb-4 luxury-heading tracking-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a]">
                      {product.category}
                    </span>
                    <span className="px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a]">
                      {product.brand}
                    </span>
                  </div>
                </div>
                {/* お気に入りボタン */}
                <button
                  onClick={() => toggleFavorite({
                    product_id: product.product_id,
                    name: product.name,
                    price: product.price,
                    image_url: product.image_url,
                    category: product.category,
                    brand: product.brand,
                  })}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isFavorite(product.product_id)
                      ? 'bg-[#d4af37] text-[#0a0a0a]'
                      : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#d4af37]'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-all duration-300 ${
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
              </div>
            </div>

            {/* モテる度 */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] text-3xl">⭐</span>
                  <div>
                    <p className="text-3xl font-semibold text-[#f5f5f5] luxury-heading">{product.evaluation.moteru_score}</p>
                    <p className="text-sm text-[#9ca3af] luxury-text">モテる度</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2a2a2a]">
                <div>
                  <p className="text-xs text-[#9ca3af] luxury-text mb-1">独自性</p>
                  <p className="text-lg font-semibold text-[#f5f5f5]">{product.evaluation.uniqueness}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] luxury-text mb-1">シルエット</p>
                  <p className="text-lg font-semibold text-[#f5f5f5]">{product.evaluation.silhouette}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] luxury-text mb-1">ラグジュアリー融合</p>
                  <p className="text-lg font-semibold text-[#f5f5f5]">{product.evaluation.street_luxury_fusion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] luxury-text mb-1">反応度</p>
                  <p className="text-lg font-semibold text-[#f5f5f5]">{product.evaluation.reaction_score}</p>
                </div>
              </div>
            </div>

            {/* 価格 */}
            <div className="border-t border-b border-[#2a2a2a] py-6">
              <p className="text-xs text-[#9ca3af] luxury-text uppercase tracking-wider mb-2">価格</p>
              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-semibold text-[#f5f5f5] luxury-heading">
                  ¥{product.price.toLocaleString()}
                </p>
                {product.original_price && product.original_price > product.price && (
                  <p className="text-xl text-[#9ca3af] line-through">
                    ¥{product.original_price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* サイズ選択 */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#f5f5f5] luxury-heading">サイズ</p>
                  <button className="text-xs text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                    サイズガイド
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-[#d4af37] text-[#0a0a0a] border-2 border-[#d4af37]'
                          : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#d4af37]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* カラー選択（カラースウォッチ） */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[#f5f5f5] mb-3 luxury-heading">カラー</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    // カラー名から色を推測（簡易版）
                    const getColorValue = (colorName: string) => {
                      const colorMap: { [key: string]: string } = {
                        '黒': '#000000',
                        '白': '#FFFFFF',
                        'ネイビー': '#000080',
                        'カーキ': '#4B5320',
                        'グレー': '#808080',
                        'ベージュ': '#F5F5DC',
                        'ブラウン': '#8B4513',
                      }
                      return colorMap[colorName] || '#808080'
                    }
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30 scale-110'
                            : 'border-[#2a2a2a] hover:border-[#d4af37]'
                        }`}
                        style={{ backgroundColor: getColorValue(color) }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-[#0a0a0a]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                {selectedColor && (
                  <p className="text-sm text-[#9ca3af] mt-2">選択中: {selectedColor}</p>
                )}
              </div>
            )}

            {/* 購入ボタン */}
            <div className="space-y-4">
              <button
                onClick={async () => {
                  // 購入した商品情報をlocalStorageに保存
                  localStorage.setItem(`purchased_${product.product_id}`, JSON.stringify({
                    product_id: product.product_id,
                    name: product.name,
                    price: product.price,
                    image_url: product.image_url,
                    category: product.category,
                    brand: product.brand,
                  }))
                  
                  // アフィリエイトリンクを新しいタブで開く
                  window.open(product.affiliate_url || product.url, '_blank')
                  
                  // 購入完了ページ（アップセルページ）に遷移
                  window.location.href = `/checkout/upsell?product_id=${product.product_id}`
                }}
                className="luxury-button-primary w-full text-center block py-4 text-lg font-semibold"
              >
                今すぐ最安値で購入する（返品保証付き）
              </button>
              <div className="flex items-center gap-4 text-sm text-[#9ca3af]">
                {product.returnable && (
                  <span className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    返品可能
                  </span>
                )}
                {product.in_stock && (
                  <span className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    在庫あり
                  </span>
                )}
              </div>
            </div>

            {/* 購入直後のアップセル（Phase 3） */}
            <div className="bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-2 border-[#d4af37] rounded-2xl p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#d4af37] text-2xl">🎁</span>
                <h3 className="text-xl font-bold text-[#f5f5f5] luxury-heading">
                  このコーディネートと合わせて購入する特典
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-[#f5f5f5] font-semibold mb-1">モテるコーディネート完全ガイド（PDF）</h4>
                      <p className="text-[#9ca3af] text-sm">700人実績ナンパ師が教える完全ガイド</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] font-bold text-lg">今だけ500円</p>
                      <p className="text-[#9ca3af] text-xs line-through">通常3,980円</p>
                    </div>
                  </div>
                  <Link
                    href="/checkout/upsell/purchase?offer_id=course-complete-guide"
                    className="block w-full px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] transition-colors text-center"
                  >
                    PDFガイドも購入する
                  </Link>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-[#f5f5f5] font-semibold mb-1">個別ファッションコンサルティング（基本プラン）</h4>
                      <p className="text-[#9ca3af] text-sm">あなた専用のコーディネートを3パターン提案</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] font-bold text-lg">初回限定49,800円</p>
                      <p className="text-[#9ca3af] text-xs line-through">通常98,000円</p>
                    </div>
                  </div>
                  <Link
                    href="/checkout/upsell/purchase?offer_id=consultation-basic"
                    className="block w-full px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] transition-colors text-center"
                  >
                    個別コンサルを申し込む
                  </Link>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-[#f5f5f5] font-semibold mb-1">個別ファッションコンサルティング（プレミアムプラン）</h4>
                      <p className="text-[#9ca3af] text-sm">あなた専用のコーディネートを5パターン提案 + 6ヶ月間サポート</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] font-bold text-lg">初回限定98,000円</p>
                      <p className="text-[#9ca3af] text-xs line-through">通常198,000円</p>
                    </div>
                  </div>
                  <Link
                    href="/checkout/upsell/purchase?offer_id=consultation-premium"
                    className="block w-full px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] transition-colors text-center"
                  >
                    プレミアムコンサルを申し込む
                  </Link>
                </div>
              </div>
              <p className="text-xs text-center text-[#9ca3af] mt-4">
                ⚡ 購入と同時に追加購入すると、さらにお得です
              </p>
            </div>

            {/* 商品説明 */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4 luxury-heading">商品説明</h2>
              <p className="text-[#9ca3af] luxury-text leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 属性情報 */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#f5f5f5] mb-4 luxury-heading">商品情報</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af] luxury-text">シーン</span>
                  <div className="flex gap-2">
                    {product.attributes.scene.map((scene) => (
                      <span key={scene} className="px-3 py-1 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                        {scene}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af] luxury-text">スタイル</span>
                  <div className="flex gap-2">
                    {product.attributes.style.map((style) => (
                      <span key={style} className="px-3 py-1 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af] luxury-text">季節</span>
                  <div className="flex gap-2">
                    {product.attributes.season.map((season) => (
                      <span key={season} className="px-3 py-1 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
                {product.materials && product.materials.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#9ca3af] luxury-text">素材</span>
                    <span className="text-[#f5f5f5] luxury-text">{product.materials.join(', ')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af] luxury-text">フィット</span>
                  <span className="text-[#f5f5f5] luxury-text">{product.attributes.fit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />

    {/* 追加商品提案モーダル（フードデリバリー風） */}
    {showAddOnModal && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] rounded-2xl border-2 border-[#d4af37] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#f5f5f5] luxury-heading">
                  これも一緒にいかがですか？
                </h2>
                <p className="text-[#9ca3af] text-sm mt-1">
                  この商品と合わせて購入すると、さらにお得です
                </p>
              </div>
              <button
                onClick={() => setShowAddOnModal(false)}
                className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            {/* 関連商品リスト */}
            {relatedProducts.length > 0 ? (
              <div className="space-y-4 mb-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.product_id}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#d4af37] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* 商品画像 */}
                      <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-4xl opacity-40">👔</div>
                      </div>
                      
                      {/* 商品情報 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#f5f5f5] font-semibold mb-1 line-clamp-1 luxury-heading">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-[#9ca3af] text-sm mb-2 line-clamp-2">
                          {relatedProduct.category} | モテる度: {relatedProduct.evaluation?.moteru_score || 'N/A'}
                        </p>
                        
                        {/* レビュー表示 */}
                        {relatedProduct.reviews && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(relatedProduct.reviews.average_rating)
                                      ? 'text-[#d4af37]'
                                      : 'text-[#2a2a2a]'
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-[#9ca3af] text-xs">
                              {relatedProduct.reviews.average_rating} ({relatedProduct.reviews.count}件)
                            </span>
                          </div>
                        )}

                        {/* 在庫情報 */}
                        {relatedProduct.stock_quantity !== undefined && (
                          <div className="mb-2">
                            {relatedProduct.stock_quantity <= 10 ? (
                              <span className="inline-block px-2 py-1 bg-red-900/30 border border-red-800/50 text-red-400 text-xs font-semibold rounded">
                                残り{relatedProduct.stock_quantity}点
                              </span>
                            ) : relatedProduct.stock_quantity <= 20 ? (
                              <span className="inline-block px-2 py-1 bg-yellow-900/30 border border-yellow-800/50 text-yellow-400 text-xs font-semibold rounded">
                                在庫わずか
                              </span>
                            ) : null}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#d4af37] font-bold text-lg">
                              ¥{relatedProduct.price.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {relatedProduct.returnable && (
                                <p className="text-green-400 text-xs">✓ 返品可能</p>
                              )}
                              {relatedProduct.frequently_bought_together && (
                                <p className="text-[#9ca3af] text-xs">
                                  {relatedProduct.frequently_bought_together.percentage}%の人が一緒に購入
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                addToCart({
                                  product_id: relatedProduct.product_id,
                                  name: relatedProduct.name,
                                  price: relatedProduct.price,
                                  image_url: relatedProduct.image_url || '',
                                  affiliate_url: relatedProduct.affiliate_url || relatedProduct.url,
                                  url: relatedProduct.url,
                                  category: relatedProduct.category,
                                })
                                setSelectedProducts(new Set([...selectedProducts, relatedProduct.product_id]))
                              }}
                              className="px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] transition-colors"
                            >
                              {selectedProducts.has(relatedProduct.product_id) ? '✓ 追加済み' : 'カートに追加'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#9ca3af]">関連商品が見つかりませんでした</p>
              </div>
            )}

            {/* 数量割引表示 */}
            {selectedProducts.size > 0 && (
              <div className="bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border border-[#d4af37] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#f5f5f5] font-semibold mb-1">
                      選択した商品: {selectedProducts.size + 1}点
                    </p>
                    {selectedProducts.size === 1 && (
                      <p className="text-[#9ca3af] text-sm">あと1点で15%オフ</p>
                    )}
                    {selectedProducts.size >= 2 && selectedProducts.size < 4 && (
                      <p className="text-[#9ca3af] text-sm">
                        あと{5 - (selectedProducts.size + 1)}点で20%オフ
                      </p>
                    )}
                    {selectedProducts.size >= 4 && (
                      <p className="text-green-400 text-sm font-semibold">20%オフが適用されます！</p>
                    )}
                  </div>
                  <div className="text-right">
                    {selectedProducts.size === 1 && (
                      <p className="text-[#d4af37] font-bold text-lg">10%オフ</p>
                    )}
                    {selectedProducts.size >= 2 && selectedProducts.size < 4 && (
                      <p className="text-[#d4af37] font-bold text-lg">15%オフ</p>
                    )}
                    {selectedProducts.size >= 4 && (
                      <p className="text-[#d4af37] font-bold text-lg">20%オフ</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* カートに追加済みの商品数表示 */}
            {getTotalItems() > 0 && (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-[#9ca3af] text-sm">
                    カートに {getTotalItems()} 点の商品が入っています
                  </p>
                  <Link
                    href="/cart"
                    className="text-[#d4af37] hover:text-[#f5f5f5] text-sm font-semibold transition-colors"
                  >
                    カートを見る →
                  </Link>
                </div>
              </div>
            )}

            {/* フッター */}
            <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowAddOnModal(false)
                    window.open(product.affiliate_url || product.url, '_blank')
                  }}
                  className="flex-1 px-4 py-3 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] transition-colors"
                >
                  追加せずに購入する
                </button>
                {getTotalItems() > 0 && (
                  <Link
                    href="/cart"
                    className="flex-1 luxury-button-primary py-3 text-sm font-semibold text-center"
                  >
                    カートで購入する
                  </Link>
                )}
              </div>
              <button
                onClick={() => setShowAddOnModal(false)}
                className="w-full px-4 py-3 bg-[#2a2a2a] text-[#9ca3af] rounded-lg text-sm font-medium border border-[#3a3a3a] hover:border-[#d4af37] hover:text-[#f5f5f5] transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
