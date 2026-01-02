'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface UpsellOffer {
  id: string
  type: 'product' | 'course' | 'consultation'
  title: string
  description: string
  originalPrice: number
  discountPrice: number
  discountRate: number
  benefits: string[]
  imageUrl?: string
  url: string
  limitedTime?: boolean
  bonus?: string
}

export default function UpsellPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product_id')
  const [purchasedProduct, setPurchasedProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // アップセルオファー（教材・コンサル）
  const upsellOffers: UpsellOffer[] = [
    {
      id: 'course-complete-guide',
      type: 'course',
      title: 'モテるコーディネート完全ガイド（PDF）',
      description: '700人実績ナンパ師が教える、モテるコーディネートの完全ガイド。シーン別の服装選びから、配色のコツ、小物の選び方まで、すべてを網羅した実践的なガイドです。',
      originalPrice: 3980,
      discountPrice: 500,
      discountRate: 87,
      benefits: [
        'シーン別コーディネート術（デート・仕事・カジュアル）',
        '配色のコツと実践例',
        '小物の選び方と組み合わせ方',
        '体型別のコーディネートアドバイス',
        '失敗しない服選び7つのルール',
      ],
      url: '/checkout/upsell/purchase?offer_id=course-complete-guide',
      limitedTime: true,
      bonus: '今だけ500円（通常3,980円）',
    },
    {
      id: 'consultation-basic',
      type: 'consultation',
      title: '個別ファッションコンサルティング（基本プラン）',
      description: '700人実績のナンパ師が、あなた専用のコーディネートを3パターン提案します。体型・スタイルに合わせた完全オーダーメイドのコーディネート提案です。',
      originalPrice: 98000,
      discountPrice: 49800,
      discountRate: 49,
      benefits: [
        'あなた専用のコーディネート提案（3パターン）',
        'シーン別（デート・仕事・カジュアル）',
        '各アイテムの最安値サイトを提案',
        'コーディネート全体の最安値組み合わせを計算',
        'メールでの質問対応（3ヶ月間）',
      ],
      url: '/checkout/upsell/purchase?offer_id=consultation-basic',
      limitedTime: true,
      bonus: '初回限定50%オフ + 特典PDF無料',
    },
    {
      id: 'consultation-premium',
      type: 'consultation',
      title: '個別ファッションコンサルティング（プレミアムプラン）',
      description: '700人実績のナンパ師が、あなた専用のコーディネートを5パターン提案。さらに、季節に合わせた継続サポート（6ヶ月間）と、優先的な質問対応が含まれます。',
      originalPrice: 198000,
      discountPrice: 98000,
      discountRate: 50,
      benefits: [
        'あなた専用のコーディネート提案（5パターン）',
        'シーン別（デート・仕事・カジュアル・パーティー・旅行）',
        '各アイテムの最安値サイトを提案',
        'コーディネート全体の最安値組み合わせを計算',
        '季節に合わせた継続サポート（6ヶ月間）',
        '優先的な質問対応（24時間以内に返信）',
        '特典PDF 3点セット無料プレゼント',
      ],
      url: '/checkout/upsell/purchase?offer_id=consultation-premium',
      limitedTime: true,
      bonus: '初回限定50%オフ + 特典PDF 3点セット無料',
    },
  ]

  useEffect(() => {
    // 購入した商品情報を取得（localStorageから）
    if (productId) {
      const saved = localStorage.getItem(`purchased_${productId}`)
      if (saved) {
        try {
          setPurchasedProduct(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load purchased product', e)
        }
      }
    }
    setLoading(false)
  }, [productId])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="container mx-auto px-6 py-24 max-w-7xl">
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          {/* 購入完了メッセージ */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
              ご購入ありがとうございます！
            </h1>
            {purchasedProduct && (
              <p className="text-[#9ca3af] luxury-text">
                {purchasedProduct.name} のご購入が完了しました
              </p>
            )}
          </div>

          {/* アップセルオファー */}
          <div className="space-y-6 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-2 luxury-heading">
                この機会に、さらにモテるコーディネートを手に入れませんか？
              </h2>
              <p className="text-[#9ca3af] luxury-text">
                今だけの特別オファーをご用意しました
              </p>
            </div>

            {upsellOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-2 border-[#d4af37] rounded-2xl p-8 hover:border-[#d4af37]/80 transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* アイコン */}
                  <div className="flex-shrink-0">
                    {offer.type === 'course' && (
                      <div className="w-16 h-16 bg-[#d4af37] rounded-xl flex items-center justify-center">
                        <span className="text-3xl">📚</span>
                      </div>
                    )}
                    {offer.type === 'consultation' && (
                      <div className="w-16 h-16 bg-[#d4af37] rounded-xl flex items-center justify-center">
                        <span className="text-3xl">👔</span>
                      </div>
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2 luxury-heading">
                          {offer.title}
                        </h3>
                        <p className="text-[#9ca3af] luxury-text mb-4">
                          {offer.description}
                        </p>
                      </div>
                    </div>

                    {/* 特典リスト */}
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-[#f5f5f5] mb-3">含まれる内容:</p>
                      <ul className="space-y-2">
                        {offer.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                            <span className="text-[#d4af37] mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 価格とCTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <p className="text-3xl font-bold text-[#d4af37]">
                            ¥{offer.discountPrice.toLocaleString()}
                          </p>
                          <p className="text-lg text-[#9ca3af] line-through">
                            ¥{offer.originalPrice.toLocaleString()}
                          </p>
                          <span className="px-3 py-1 bg-red-900/30 border border-red-800/50 text-red-400 text-sm font-semibold rounded">
                            {offer.discountRate}%オフ
                          </span>
                        </div>
                        {offer.bonus && (
                          <p className="text-sm text-[#9ca3af]">
                            {offer.bonus}
                          </p>
                        )}
                      </div>
                      <Link
                        href={offer.url}
                        className="luxury-button-primary px-8 py-4 text-lg font-semibold whitespace-nowrap"
                      >
                        今すぐ追加購入する
                      </Link>
                    </div>

                    {offer.limitedTime && (
                      <div className="mt-4 text-center">
                        <p className="text-xs text-[#9ca3af]">
                          ⚡ このオファーは今だけの限定価格です
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* スキップボタン */}
          <div className="text-center">
            <Link
              href="/"
              className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors luxury-text"
            >
              今は追加購入しない（トップページに戻る）
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
