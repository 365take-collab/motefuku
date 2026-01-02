'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import { useRecentlyViewed } from './contexts/RecentlyViewedContext'
import ProductCard from './components/ProductCard'

// メールフォームコンポーネント
function EmailForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadLinks, setDownloadLinks] = useState<{
    guide: string
    rules: string
    templates: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/email/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          source: 'top_page',
        }),
      })

      if (!response.ok) {
        throw new Error('メール登録に失敗しました')
      }

      const data = await response.json()
      setDownloadLinks(data.download_links)
      setSuccess(true)
      
      // フォームをリセット
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  if (success && downloadLinks) {
    return (
      <div className="space-y-4">
        <div className="bg-green-900/30 border border-green-800/50 text-green-400 px-6 py-4 rounded-lg">
          <p className="font-semibold mb-2">登録ありがとうございます！</p>
          <p className="text-sm mb-4">以下の特典PDFをダウンロードできます：</p>
          <div className="space-y-2">
            <a
              href={downloadLinks.guide}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-green-800/50 text-green-300 rounded-lg text-sm font-medium hover:bg-green-800/70 transition-colors"
            >
              📚 モテるコーディネート完全ガイド（PDF）をダウンロード
            </a>
            <a
              href={downloadLinks.rules}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-green-800/50 text-green-300 rounded-lg text-sm font-medium hover:bg-green-800/70 transition-colors"
            >
              ⭐ 失敗しない服選び7つのルール（PDF）をダウンロード
            </a>
            <a
              href={downloadLinks.templates}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-green-800/50 text-green-300 rounded-lg text-sm font-medium hover:bg-green-800/70 transition-colors"
            >
              👔 シーン別コーディネートテンプレート集（PDF）をダウンロード
            </a>
          </div>
          <p className="text-xs mt-4 text-green-300">
            特典のダウンロードリンクをメールでもお送りしました。
          </p>
        </div>
        <button
          onClick={() => {
            setSuccess(false)
            setDownloadLinks(null)
          }}
          className="w-full px-4 py-2 bg-[#1a1a1a] text-[#f5f5f5] rounded-lg text-sm font-medium border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
        >
          別のメールアドレスで登録する
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-lg">
          <p className="font-semibold mb-1">エラー</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-2">お名前</label>
          <input
            type="text"
            name="name"
            required
            placeholder="山田 太郎"
            className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-2">メールアドレス</label>
          <input
            type="email"
            name="email"
            required
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#0a0a0a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full luxury-button-primary py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '登録中...' : '今すぐ無料で特典を受け取る'}
      </button>
      <p className="text-xs text-center text-[#9ca3af]">
        登録は30秒で完了。いつでも解除できます。
      </p>
    </form>
  )
}

interface Template {
  template_id: string
  name: string
  scene: string
  style: string
  season: string
  price_range: {
    min: number
    max: number
  }
  moteru_score: number
  description: string
}

function RecentlyViewedSection() {
  const { recentlyViewed } = useRecentlyViewed()

  if (recentlyViewed.length === 0) return null

  return (
    <section className="mb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#f5f5f5] mb-2 luxury-heading">
          最近閲覧した商品
        </h2>
        <p className="text-[#9ca3af] luxury-text text-sm">
          最近閲覧した商品を表示しています
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.slice(0, 8).map((product) => (
          <ProductCard
            key={product.product_id}
            product={{
              ...product,
              moteru_score: 0,
              returnable: true,
              in_stock: true,
              url: '',
              affiliate_url: '',
              images: [product.image_url],
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/templates/`)
        if (!response.ok) {
          throw new Error('APIの取得に失敗しました')
        }
        const data = await response.json()
        setTemplates(data.templates || [])
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ヒーローセクション - 簡潔に */}
      <div className="relative bg-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="container mx-auto px-6 py-20 max-w-7xl">
          {/* ヒーローテキスト */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f5f5] mb-4 luxury-heading tracking-tight">
              モテる服を最安値で。
            </h1>
            <p className="text-xl md:text-2xl text-[#9ca3af] mb-6 luxury-text font-light">
              ナンパ師監修のモテるファッション × 複数サイトから最安値を自動比較
            </p>
            
            {/* 信頼性の証明バッジ */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full">
                <span className="text-lg">⭐</span>
                <span className="text-[#f5f5f5] font-medium text-sm">700人実績のナンパ師監修</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full">
                <span className="text-lg">💰</span>
                <span className="text-[#f5f5f5] font-medium text-sm">最安値保証</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full">
                <span className="text-lg">✓</span>
                <span className="text-[#f5f5f5] font-medium text-sm">返品可能サイトのみ</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/products"
                className="luxury-button-primary px-8 py-4 text-base font-semibold"
              >
                今すぐモテるコーディネートを見つける
              </Link>
              <p className="text-xs text-[#9ca3af]">
                ⚡ 700人実績のナンパ師監修 × 最安値保証 × 返品可能サイトのみ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索フォームセクション */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2 luxury-heading">コーディネートを探す</h2>
              <p className="text-[#9ca3af] text-sm">シーン、予算、スタイルから最適なコーディネートを見つけましょう</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#f5f5f5] mb-2">シーン</label>
                <select className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#1a1a1a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all">
                  <option>シーンを選ぶ</option>
                  <option>デート</option>
                  <option>仕事</option>
                  <option>カジュアル</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f5f5f5] mb-2">予算</label>
                <select className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#1a1a1a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all">
                  <option>予算を選ぶ</option>
                  <option>5,000円以下</option>
                  <option>5,000-10,000円</option>
                  <option>10,000-15,000円</option>
                  <option>15,000円以上</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f5f5f5] mb-2">スタイル</label>
                <select className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#1a1a1a] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all">
                  <option>スタイルを選ぶ</option>
                  <option>カジュアル</option>
                  <option>ビジネス</option>
                  <option>ストリート</option>
                </select>
              </div>
            </div>
            <Link
              href="/products"
              className="block w-full luxury-button-primary py-4 text-base font-semibold text-center"
            >
              今すぐ無料でモテるコーディネートを見つける
            </Link>
          </div>
        </div>
      </div>

      {/* メールフォームセクション - クリーンなデザイン */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] shadow-sm p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
                今だけ限定！無料特典プレゼント
              </h2>
              <p className="text-xl text-[#9ca3af] mb-2 luxury-text">
                メールアドレスを登録するだけで、以下の特典を<strong className="text-[#f5f5f5]">完全無料</strong>で受け取れます
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-400 rounded-lg text-sm font-semibold border border-red-800/50 mt-4">
                <span>🔥</span>
                <span>残り50名様限定</span>
              </div>
            </div>

            {/* 特典リスト */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">モテるコーディネート完全ガイド（PDF）</h3>
                  <p className="text-[#9ca3af] text-sm">通常3,980円 → <strong className="text-[#f5f5f5]">無料</strong></p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-2xl">⭐</span>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">失敗しない服選び7つのルール（PDF）</h3>
                  <p className="text-[#9ca3af] text-sm">700人実績ナンパ師が教える</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-2xl">👔</span>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">シーン別コーディネートテンプレート集（PDF）</h3>
                  <p className="text-[#9ca3af] text-sm">デート・仕事・カジュアル対応</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">週1回メールマガジン</h3>
                  <p className="text-[#9ca3af] text-sm">最新のモテるファッション情報をお届け</p>
                </div>
              </div>
            </div>

            {/* メールフォーム */}
            <EmailForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">

        {/* USPセクション */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* 左側: ビジュアル */}
            <div className="order-2 md:order-1">
              <div className="w-full h-80 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#2a2a2a]">
                <div className="text-center">
                  <div className="text-8xl mb-4 opacity-20">👔</div>
                  <p className="text-sm text-[#9ca3af] font-medium">コーディネート写真</p>
                </div>
              </div>
            </div>
            
            {/* 右側: テキスト */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
                700人実績のナンパ師が監修
              </h2>
              <p className="text-base text-[#9ca3af] mb-4 luxury-text leading-relaxed">
                ナンパ師として700人以上の実績を持つ専門家が、各コーディネートを監修。「似合う」ではなく「モテる」という、明確で測定可能な成果を追求します。
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#f5f5f5] text-lg mt-0.5">✓</span>
                  <span className="text-[#f5f5f5] text-sm">700人という具体的な実績数値</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5f5f5] text-lg mt-0.5">✓</span>
                  <span className="text-[#f5f5f5] text-sm">測定可能で信憑性が高い</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5f5f5] text-lg mt-0.5">✓</span>
                  <span className="text-[#f5f5f5] text-sm">他のサービスでは真似できない独自の実績</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ローディング */}
        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#2a2a2a] border-t-white"></div>
            <p className="text-[#9ca3af] mt-6 luxury-text">読み込み中...</p>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold mb-1">エラー</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* テンプレート一覧 */}
        {!loading && !error && (
          <>
            <div className="mb-12">
              <h2 className="text-4xl font-semibold text-[#f5f5f5] mb-3 luxury-heading tracking-tight">コーディネートテンプレート</h2>
              <p className="text-[#9ca3af] luxury-text">
                全 <span className="font-semibold text-[#f5f5f5]">{templates.length}</span> 件
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.template_id}
                  className="luxury-card cursor-pointer group"
                >
                  {/* 写真エリア - クリーンなデザイン */}
                  <div className="luxury-image-overlay w-full h-72 bg-[#1a1a1a] flex items-center justify-center relative">
                    <div className="text-center z-10">
                      <div className="text-7xl mb-3 opacity-20">👔</div>
                      <p className="text-xs text-[#9ca3af] font-medium">コーディネート写真</p>
                    </div>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="p-6">
                    {/* テンプレート名 */}
                    <h3 className="text-xl font-semibold text-[#f5f5f5] mb-4 line-clamp-1 luxury-heading">
                      {template.name}
                    </h3>
                    
                    {/* タグ */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="px-3 py-1.5 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs font-medium border border-[#3a3a3a]">
                        {template.scene}
                      </span>
                      <span className="px-3 py-1.5 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs font-medium border border-[#3a3a3a]">
                        {template.style}
                      </span>
                      <span className="px-3 py-1.5 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs font-medium border border-[#3a3a3a]">
                        {template.season}
                      </span>
                    </div>

                    {/* モテる度 */}
                    <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#2a2a2a]">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⭐</span>
                        <span className="text-[#f5f5f5] font-semibold text-xl luxury-heading">{template.moteru_score}</span>
                      </div>
                      <span className="text-xs text-[#9ca3af] luxury-text">モテる度</span>
                    </div>

                    {/* 説明 */}
                    <p className="text-[#9ca3af] text-sm mb-6 line-clamp-2 luxury-text leading-relaxed">
                      {template.description}
                    </p>

                    {/* 価格帯 */}
                    <div className="border-t border-[#2a2a2a] pt-5 mb-5">
                      <p className="text-xs text-[#9ca3af] mb-2 luxury-text uppercase tracking-wider">価格帯</p>
                      <p className="text-2xl font-semibold text-[#f5f5f5] luxury-heading">
                        ¥{template.price_range.min.toLocaleString()} - ¥{template.price_range.max.toLocaleString()}
                      </p>
                    </div>

                    {/* 最安値バッジとCTA */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1.5 bg-green-900/30 text-green-400 rounded text-xs font-semibold border border-green-800/50">
                          ✓ 最安値保証
                        </span>
                        <span className="text-xs text-[#9ca3af]">返品可能</span>
                      </div>
                      {/* CTAボタン */}
                      <button className="w-full luxury-button-primary py-3 text-sm font-semibold">
                        今すぐ最安値で購入する（返品保証付き）
                      </button>
                      <p className="text-xs text-center text-[#9ca3af]">
                        ⚡ 複数サイトから最安値を自動比較 | ✓ 返品可能サイトのみ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ナンパ師のストーリーセクション */}
        <section className="mb-24 mt-24">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#f5f5f5] mb-6 luxury-heading">
                  なぜ700人という実績を積めたのか？
                </h2>
                <div className="space-y-4 text-[#9ca3af] luxury-text leading-relaxed">
                  <p>
                    私は10年以上、ナンパ師として活動してきました。最初は「似合う服」を選んでいましたが、なかなか結果が出ませんでした。
                  </p>
                  <p>
                    そこで気づいたのは、「似合う」と「モテる」は全く違うということ。700人以上の実績を積む中で、明確な法則が見えてきました。
                  </p>
                  <p>
                    <strong className="text-[#f5f5f5]">「モテる服」には、測定可能な基準がある。</strong>それを体系化し、誰でも再現できるようにしたのが、このサービスです。
                  </p>
                  <p>
                    失敗もたくさんありました。でも、その失敗から学んだことが、今の700人という実績につながっています。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-80 bg-[#0a0a0a] rounded-lg flex items-center justify-center border border-[#2a2a2a]">
                  <div className="text-center">
                    <div className="text-8xl mb-4 opacity-20">👔</div>
                    <p className="text-sm text-[#9ca3af] font-medium">ナンパ師の写真</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ソーシャルプルーフセクション */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
              実際にモテるようになったお客様の声
            </h2>
            <p className="text-[#9ca3af] luxury-text">
              700人実績のナンパ師監修コーディネートで、実際に成果を出したお客様の声
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f5f5f5] mb-2">700+</div>
              <p className="text-[#9ca3af] text-sm">実績人数</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f5f5f5] mb-2">100%</div>
              <p className="text-[#9ca3af] text-sm">返品可能サイトのみ</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f5f5f5] mb-2">4.8</div>
              <p className="text-[#9ca3af] text-sm">平均評価（127件）</p>
            </div>
          </div>

          {/* 複数の顧客の声 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#9ca3af] mb-4 italic leading-relaxed">
                「700人実績のナンパ師が監修するコーディネートで、実際にモテるようになりました。価格も最安値で購入できて、返品も安心です。」
              </p>
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="text-[#f5f5f5] font-semibold">田中 太郎さん</p>
                <p className="text-[#9ca3af] text-sm">28歳・会社員</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#9ca3af] mb-4 italic leading-relaxed">
                「デートの成功率が3倍になりました。シーン別のコーディネートテンプレートが特に役立ちました。」
              </p>
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="text-[#f5f5f5] font-semibold">佐藤 花子さん</p>
                <p className="text-[#9ca3af] text-sm">26歳・デザイナー</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#9ca3af] mb-4 italic leading-relaxed">
                「体型に合わせたサイジングガイドが素晴らしい。細身の自分でも、ぴったりの服を見つけられました。」
              </p>
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="text-[#f5f5f5] font-semibold">鈴木 一郎さん</p>
                <p className="text-[#9ca3af] text-sm">32歳・エンジニア</p>
              </div>
            </div>
          </div>
        </section>

        {/* 価値提案セクション */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-[#f5f5f5] mb-12 text-center luxury-heading">
            なぜモテ服なのか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 価値提案1: 最安値購入 */}
            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#3a3a3a] transition-colors">
              <div className="text-5xl mb-4 text-center">💰</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 text-center luxury-heading">
                最安値保証
              </h3>
              <p className="text-[#9ca3af] text-center luxury-text leading-relaxed mb-4">
                「一番安いのはここから買えます」と明確に提示。複数サイトから最安値を自動で比較します。
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-green-900/30 text-green-400 rounded text-xs font-semibold border border-green-800/50">
                  最安値保証
                </span>
              </div>
            </div>
            
            {/* 価値提案2: 返品可能 */}
            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#3a3a3a] transition-colors">
              <div className="text-5xl mb-4 text-center">✓</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 text-center luxury-heading">
                返品可能サイトのみ
              </h3>
              <p className="text-[#9ca3af] text-center luxury-text leading-relaxed mb-4">
                返品不可サイトを標準で除外。返品の不安を取り除き、安心して購入できます。
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-blue-900/30 text-blue-400 rounded text-xs font-semibold border border-blue-800/50">
                  100%返品可能
                </span>
              </div>
            </div>
            
            {/* 価値提案3: コーディネート全体の最安値 */}
            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#3a3a3a] transition-colors">
              <div className="text-5xl mb-4 text-center">🎯</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 text-center luxury-heading">
                コーディネート全体の最安値
              </h3>
              <p className="text-[#9ca3af] text-center luxury-text leading-relaxed mb-4">
                各アイテムだけでなく、コーディネート全体の最安値組み合わせを自動計算します。
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs font-semibold border border-[#3a3a3a]">
                  自動計算
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 最近閲覧した商品セクション */}
        <RecentlyViewedSection />

        {/* 人気ブランドセクション */}
        <section className="mb-24">
          <div className="mb-8">
            <h2 className="text-4xl font-semibold text-[#f5f5f5] mb-3 luxury-heading tracking-tight">人気ブランドから探す</h2>
            <p className="text-[#9ca3af] luxury-text">
              ブランド別にモテる服を探せます
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['UNIQLO', 'ZARA', 'H&M', 'GU', '無印良品', 'コムサ・デ・モード', 'BEAMS', 'UNITED ARROWS', 'SHIPS', 'ナイキ', 'アディダス', 'プーマ'].map((brand) => (
              <Link
                key={brand}
                href={`/products?brand=${encodeURIComponent(brand)}`}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3a3a3a] transition-colors group"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">👔</div>
                  <p className="text-sm text-[#f5f5f5] font-medium group-hover:text-white transition-colors">
                    {brand}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium hover:border-[#3a3a3a] transition-colors"
            >
              すべてのブランドを見る
            </Link>
          </div>
        </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
