'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  imageUrl?: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // ブログ記事のデータを取得（後でAPIから取得するように変更）
    const fetchPosts = async () => {
      try {
        // データファイルから取得
        const { blogPosts } = await import('./data/posts')
        const postsList = blogPosts.map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          publishedAt: post.publishedAt,
          readTime: post.readTime,
        }))
        setPosts(postsList)
        setLoading(false)
      } catch (err) {
        // フォールバック: 一時的にローカルデータを使用
        const blogPosts: BlogPost[] = [
          {
            slug: 'date-coordinate-guide',
            title: 'デートでモテるコーディネート完全ガイド',
            excerpt: '700人実績のナンパ師が教える、デートで確実にモテるコーディネート術。シーン別の服装選びから、相手に好印象を与える配色まで、実践的なアドバイスを公開します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 8,
          },
          {
            slug: 'business-coordinate-guide',
            title: 'ビジネスシーンで差をつける服装術',
            excerpt: '仕事で信頼を得るための服装選び。スーツの着こなしから、カジュアルビジネスのコーディネートまで、プロフェッショナルな印象を与える方法を解説します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 7,
          },
          {
            slug: 'casual-coordinate-guide',
            title: 'カジュアルでもモテる服の選び方',
            excerpt: '普段着でもモテるコーディネート術。カジュアルなシーンで差をつける、おしゃれで機能的な服装選びのコツを紹介します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 6,
          },
          {
            slug: 'season-coordinate-guide',
            title: '季節別モテるコーディネート術',
            excerpt: '春夏秋冬、それぞれの季節に合わせたモテるコーディネートを解説。季節感のある服装選びで、周囲からの評価を高めます。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 7,
          },
          {
            slug: 'how-to-choose-moteru-clothes',
            title: '700人実績のナンパ師が教えるモテる服の選び方',
            excerpt: '「似合う」ではなく「モテる」を追求する服選びの極意。700人以上の実績を持つナンパ師が、実際に効果があった服装選びのコツを公開します。',
            category: 'ファッション情報',
            publishedAt: '2025-12-31',
            readTime: 10,
          },
          {
            slug: 'scene-dress-code-guide',
            title: 'シーン別の服装マナー完全ガイド',
            excerpt: 'デート、仕事、パーティーなど、シーン別の適切な服装選びを解説。マナーを守りながら、モテるコーディネートを実現する方法を紹介します。',
            category: 'ファッション情報',
            publishedAt: '2025-12-31',
            readTime: 9,
          },
          {
            slug: 'body-type-coordinate-guide',
            title: '体型別のコーディネート術',
            excerpt: '自分の体型に合わせたコーディネートで、最大限の魅力を引き出す方法。細身、がっちり、小柄など、体型別の最適な服装選びを解説します。',
            category: 'ファッション情報',
            publishedAt: '2025-12-31',
            readTime: 8,
          },
          {
            slug: '2025-mens-fashion-trends',
            title: '2025年メンズファッショントレンド',
            excerpt: '2025年に注目すべきメンズファッショントレンドを徹底解説。最新の流行を取り入れながら、モテるコーディネートを実現する方法を紹介します。',
            category: 'ファッション情報',
            publishedAt: '2025-12-31',
            readTime: 8,
          },
          {
            slug: 'popular-brand-review',
            title: '人気ブランドのモテる服レビュー',
            excerpt: '実際にモテる効果が高い人気ブランドの商品をレビュー。価格帯別のおすすめ商品から、コーディネートの組み合わせ方まで、実践的な情報を提供します。',
            category: '商品レビュー',
            publishedAt: '2025-12-31',
            readTime: 9,
          },
          {
            slug: 'price-range-recommendation',
            title: '価格帯別おすすめ商品ガイド',
            excerpt: '予算に合わせた最適な商品選びをサポート。5,000円以下から10万円以上まで、価格帯別のおすすめ商品とコーディネート術を紹介します。',
            category: '商品レビュー',
            publishedAt: '2025-12-31',
            readTime: 7,
          },
          {
            slug: 'returnable-site-guide',
            title: '返品可能サイトの選び方',
            excerpt: '安心して購入できる返品可能サイトの選び方と、返品ポリシーの比較。失敗しない商品選びのために、返品の重要性を解説します。',
            category: '購入ガイド',
            publishedAt: '2025-12-31',
            readTime: 6,
          },
          {
            slug: 'lowest-price-comparison',
            title: '最安値で購入する方法',
            excerpt: '複数サイトから最安値を比較して購入する方法を解説。コーディネート全体の最安値組み合わせを自動計算する方法も紹介します。',
            category: '購入ガイド',
            publishedAt: '2025-12-31',
            readTime: 5,
          },
          {
            slug: 'first-date-coordinate',
            title: '初デートでモテるコーディネート',
            excerpt: '初デートで確実に好印象を与えるコーディネート術。第一印象を左右する服装選びのポイントから、失敗しない配色まで、実践的なアドバイスを公開します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 8,
          },
          {
            slug: 'winter-coordinate-guide',
            title: '冬のモテるコーディネート術',
            excerpt: '寒い季節でもモテるコーディネートを実現する方法。防寒性とおしゃれさを両立させる、冬の服装選びのコツを解説します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 7,
          },
          {
            slug: 'summer-coordinate-guide',
            title: '夏のモテるコーディネート術',
            excerpt: '暑い季節でも清潔感とおしゃれさを保つ、夏のコーディネート術。涼しげでモテる服装選びのポイントを紹介します。',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 6,
          },
        ]
        setPosts(blogPosts)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const categories = ['all', 'コーディネート', 'ファッション情報', '商品レビュー', '購入ガイド']
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a]">
        <Header />

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {/* ヒーローセクション */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-[#f5f5f5] mb-6 luxury-heading tracking-tight">
              モテ服ブログ
            </h1>
            <p className="text-xl md:text-2xl text-[#9ca3af] luxury-text font-light">
              700人実績のナンパ師が教える、モテる服の選び方
            </p>
          </div>

          {/* カテゴリーフィルター */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#d4af37] text-[#0a0a0a]'
                    : 'bg-[#1a1a1a] text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#d4af37]'
                }`}
              >
                {category === 'all' ? 'すべて' : category}
              </button>
            ))}
          </div>

          {/* ローディング */}
          {loading && (
            <div className="text-center py-24">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#f5f5f5] border-t-transparent"></div>
              <p className="text-[#9ca3af] mt-6 luxury-text">読み込み中...</p>
            </div>
          )}

          {/* ブログ記事一覧 */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="luxury-card group cursor-pointer"
                >
                  {/* 画像エリア */}
                  <div className="luxury-image-overlay w-full h-48 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center relative">
                    <div className="text-center z-10">
                      <div className="text-6xl mb-3 opacity-40">📝</div>
                      <p className="text-xs text-[#9ca3af] font-medium">記事画像</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="p-6">
                    {/* カテゴリー */}
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-[#2a2a2a] text-[#d4af37] rounded-lg text-xs font-medium border border-[#3a3a3a]">
                        {post.category}
                      </span>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-xl font-semibold text-[#f5f5f5] mb-3 luxury-heading line-clamp-2 group-hover:text-[#d4af37] transition-colors">
                      {post.title}
                    </h2>

                    {/* 抜粋 */}
                    <p className="text-[#9ca3af] text-sm mb-4 luxury-text line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* メタ情報 */}
                    <div className="flex items-center gap-4 text-xs text-[#9ca3af] pt-4 border-t border-[#2a2a2a]">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}分で読める</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 記事が見つからない場合 */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[#9ca3af] luxury-text">該当する記事が見つかりませんでした。</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
