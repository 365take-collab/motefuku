'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

interface BlogPost {
  slug: string
  title: string
  content: string
  category: string
  publishedAt: string
  readTime: number
  imageUrl?: string
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        // データファイルから取得
        const { blogPosts } = await import('../data/posts')
        const post = blogPosts.find(p => p.slug === params.slug)
        
        if (post) {
          setPost(post)
        } else {
          setError('記事が見つかりませんでした')
        }
        setLoading(false)
      } catch (err) {
        // フォールバック: 一時的にローカルデータを使用
        const blogPosts: Record<string, BlogPost> = {
          'date-coordinate-guide': {
            slug: 'date-coordinate-guide',
            title: 'デートでモテるコーディネート完全ガイド',
            category: 'コーディネート',
            publishedAt: '2025-12-31',
            readTime: 8,
            content: `# デートでモテるコーディネート完全ガイド

700人実績のナンパ師が教える、デートで確実にモテるコーディネート術。シーン別の服装選びから、相手に好印象を与える配色まで、実践的なアドバイスを公開します。

## デートでモテるコーディネートの基本原則

デートでモテるコーディネートには、いくつかの基本原則があります。まず第一に、清潔感が最も重要です。どんなに高価な服を着ていても、清潔感がなければ印象は悪くなります。逆に、シンプルな服でも清潔感があれば、好印象を与えることができます。

第二に、相手に合わせた服装選びが重要です。カジュアルなデートならカジュアルな服装、フォーマルなデートならフォーマルな服装を選ぶことが大切です。相手の服装スタイルを事前に確認し、それに合わせたコーディネートを選ぶことで、相手との一体感を演出できます。

第三に、自分らしさを保ちながら、相手に好印象を与える服装を選ぶことが重要です。無理に自分らしさを捨てて、相手に合わせる必要はありません。むしろ、自分らしさを保ちながら、相手に好印象を与える服装を選ぶことで、より魅力的に見えることがあります。

## シーン別のコーディネート術

### 初デートのコーディネート

初デートでは、第一印象が非常に重要です。清潔感があり、上品で、かつ自分らしさを表現できるコーディネートを選ぶことが大切です。

おすすめのコーディネートは、シンプルで上品なスタイルです。例えば、白いシャツにチノパン、スニーカーという組み合わせは、清潔感があり、かつカジュアルすぎない印象を与えます。色は、白、ベージュ、ネイビーなどの落ち着いた色を選ぶことで、上品な印象を与えることができます。

### カジュアルデートのコーディネート

カジュアルなデートでは、リラックスした雰囲気を演出できるコーディネートを選ぶことが大切です。ただし、カジュアルすぎるとだらしない印象を与える可能性があるため、適度なフォーマル感を保つことが重要です。

おすすめのコーディネートは、Tシャツにデニム、スニーカーという組み合わせです。ただし、Tシャツは清潔感のあるものを選び、デニムは破れていないものを選ぶことが大切です。色は、白、グレー、ネイビーなどの落ち着いた色を選ぶことで、上品な印象を与えることができます。

### フォーマルデートのコーディネート

フォーマルなデートでは、上品で洗練されたコーディネートを選ぶことが大切です。スーツやジャケットを着用することで、よりフォーマルな印象を与えることができます。

おすすめのコーディネートは、スーツに革靴という組み合わせです。色は、ネイビーやグレーなどの落ち着いた色を選ぶことで、上品な印象を与えることができます。シャツは、白やライトブルーなどの清潔感のある色を選ぶことが大切です。

## 配色のコツ

デートでモテるコーディネートには、配色も重要です。基本的には、落ち着いた色を選ぶことが大切ですが、アクセントカラーを加えることで、より魅力的に見えることがあります。

おすすめの配色は、ベースカラーに白、ベージュ、ネイビー、グレーなどを選び、アクセントカラーに赤、オレンジ、イエローなどの明るい色を加えることです。ただし、アクセントカラーは、小物や靴など、小さな面積に使うことで、上品な印象を保つことができます。

## 小物の選び方

デートでモテるコーディネートには、小物も重要です。時計、ベルト、バッグなどの小物を選ぶことで、より洗練された印象を与えることができます。

おすすめの小物は、シンプルで上品なデザインのものです。時計は、シンプルなデザインのものを選び、ベルトは、革製のものを選ぶことが大切です。バッグは、トートバッグやショルダーバッグなど、シーンに合わせたものを選ぶことが重要です。

## まとめ

デートでモテるコーディネートには、清潔感、相手に合わせた服装選び、自分らしさを保ちながら好印象を与える服装選びが重要です。シーン別のコーディネート術を参考に、自分に合ったコーディネートを見つけることが大切です。`,
          },
          // 他の記事も同様に追加（簡略化のため、ここでは1記事のみ）
        }

        const post = blogPosts[params.slug]
        if (post) {
          setPost(post)
        } else {
          setError('記事が見つかりませんでした')
        }
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  if (loading) {
    return (
      <>
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="container mx-auto px-6 py-24 max-w-4xl">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#f5f5f5] border-t-transparent"></div>
              <p className="text-[#9ca3af] mt-6 luxury-text">読み込み中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="container mx-auto px-6 py-24 max-w-4xl">
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm">
              <p className="font-semibold mb-1">エラー</p>
              <p className="text-sm">{error || '記事が見つかりませんでした'}</p>
            </div>
            <div className="mt-8">
              <Link href="/blog" className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                ← ブログ一覧に戻る
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
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
                <Link href="/products" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors cursor-pointer font-medium">商品検索</Link>
                <Link href="/products/recommend" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors cursor-pointer font-medium">商品推薦</Link>
                <Link href="/blog" className="text-sm text-[#f5f5f5] hover:text-[#f5f5f5] transition-colors cursor-pointer font-medium">ブログ</Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* 戻るリンク */}
          <div className="mb-6">
            <Link href="/blog" className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors luxury-text">
              ← ブログ一覧に戻る
            </Link>
          </div>

          {/* 記事ヘッダー */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="px-4 py-2 bg-[#2a2a2a] text-[#d4af37] rounded-lg text-sm font-medium border border-[#3a3a3a]">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6 luxury-heading tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#9ca3af]">
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.readTime}分で読める</span>
            </div>
          </div>

          {/* 記事画像 */}
          <div className="w-full h-96 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-2xl flex items-center justify-center mb-12 border border-[#2a2a2a]">
            <div className="text-center">
              <div className="text-9xl mb-4 opacity-40">📝</div>
              <p className="text-sm text-[#9ca3af] font-medium">記事画像</p>
            </div>
          </div>

          {/* 記事本文 */}
          <article className="prose prose-invert max-w-none">
            <div className="text-[#f5f5f5] leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold text-[#f5f5f5] mt-12 mb-6 luxury-heading">
                      {paragraph.replace('# ', '')}
                    </h2>
                  )
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-2xl font-semibold text-[#f5f5f5] mt-8 mb-4 luxury-heading">
                      {paragraph.replace('## ', '')}
                    </h3>
                  )
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={index} className="text-xl font-semibold text-[#f5f5f5] mt-6 mb-3 luxury-heading">
                      {paragraph.replace('### ', '')}
                    </h4>
                  )
                } else if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(item => item.startsWith('- '))
                  return (
                    <ul key={index} className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  )
                } else {
                  return (
                    <p key={index} className="text-[#9ca3af] luxury-text leading-relaxed">
                      {paragraph}
                    </p>
                  )
                }
              })}
            </div>
          </article>

          {/* 広告表記 */}
          <div className="mt-12 pt-8 border-t border-[#2a2a2a]">
            <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-2">広告</p>
            <p className="text-sm text-[#9ca3af]">
              本記事にはアフィリエイトリンクが含まれています。商品の購入は各ECサイトとの間で直接行われるものであり、当サイトは一切の責任を負いません。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
