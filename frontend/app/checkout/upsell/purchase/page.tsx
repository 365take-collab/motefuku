'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

interface UpsellOffer {
  id: string
  type: 'product' | 'course' | 'consultation'
  title: string
  description: string
  originalPrice: number
  discountPrice: number
  discountRate: number
  benefits: string[]
  url: string
  bonus?: string
}

const upsellOffers: { [key: string]: UpsellOffer } = {
  'course-complete-guide': {
    id: 'course-complete-guide',
    type: 'course',
    title: 'モテるコーディネート完全ガイド（PDF）',
    description: '700人実績ナンパ師が教える、モテるコーディネートの完全ガイド。',
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
    url: '/api/checkout/upsell/course-complete-guide',
    bonus: '今だけ500円（通常3,980円）',
  },
  'consultation-basic': {
    id: 'consultation-basic',
    type: 'consultation',
    title: '個別ファッションコンサルティング（基本プラン）',
    description: '700人実績のナンパ師が、あなた専用のコーディネートを3パターン提案します。',
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
    url: '/api/checkout/upsell/consultation-basic',
    bonus: '初回限定50%オフ + 特典PDF無料',
  },
  'consultation-premium': {
    id: 'consultation-premium',
    type: 'consultation',
    title: '個別ファッションコンサルティング（プレミアムプラン）',
    description: '700人実績のナンパ師が、あなた専用のコーディネートを5パターン提案。',
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
    url: '/api/checkout/upsell/consultation-premium',
    bonus: '初回限定50%オフ + 特典PDF 3点セット無料',
  },
}

export default function UpsellPurchasePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const offerId = searchParams.get('offer_id')
  const [offer, setOffer] = useState<UpsellOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (offerId && upsellOffers[offerId]) {
      setOffer(upsellOffers[offerId])
    }
    setLoading(false)
  }, [offerId])

  const handlePurchase = async () => {
    if (!offer) return

    setSubmitting(true)
    try {
      // メールアドレスを取得（localStorageから）
      const email = localStorage.getItem('user_email') || ''
      const name = localStorage.getItem('user_name') || ''

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/checkout/upsell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offer_id: offer.id,
          type: offer.type,
          email: email || undefined,
          name: name || undefined,
        }),
      })

      if (response.ok) {
        // 購入完了ページに遷移
        router.push(`/checkout/upsell/complete?offer_id=${offer.id}`)
      } else {
        const error = await response.json()
        alert(error.detail || '購入処理に失敗しました')
      }
    } catch (err) {
      console.error('Purchase error', err)
      alert('購入処理に失敗しました')
    } finally {
      setSubmitting(false)
    }
  }

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

  if (!offer) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="container mx-auto px-6 py-24 max-w-7xl">
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm">
              <p className="font-semibold mb-1">エラー</p>
              <p className="text-sm">オファーが見つかりませんでした</p>
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
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="mb-8">
            <Link
              href="/checkout/upsell"
              className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors luxury-text"
            >
              ← アップセルオファーに戻る
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-2 border-[#d4af37] rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
                {offer.title}
              </h1>
              <p className="text-[#9ca3af] luxury-text">
                {offer.description}
              </p>
            </div>

            {/* 価格 */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#9ca3af] luxury-text">通常価格</span>
                <span className="text-xl text-[#9ca3af] line-through">
                  ¥{offer.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#9ca3af] luxury-text">割引</span>
                <span className="text-xl text-red-400 font-semibold">
                  -¥{(offer.originalPrice - offer.discountPrice).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-[#f5f5f5]">合計</span>
                  <span className="text-4xl font-bold text-[#d4af37]">
                    ¥{offer.discountPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 特典リスト */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
              <p className="text-lg font-semibold text-[#f5f5f5] mb-4 luxury-heading">
                含まれる内容
              </p>
              <ul className="space-y-3">
                {offer.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#9ca3af]">
                    <span className="text-[#d4af37] text-xl mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ボーナス */}
            {offer.bonus && (
              <div className="bg-green-900/30 border border-green-800/50 rounded-xl p-4 mb-6">
                <p className="text-green-400 font-semibold text-center">
                  🎁 {offer.bonus}
                </p>
              </div>
            )}

            {/* 購入ボタン */}
            <button
              onClick={handlePurchase}
              disabled={submitting}
              className="w-full luxury-button-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '処理中...' : `¥${offer.discountPrice.toLocaleString()}で購入する`}
            </button>

            <p className="text-xs text-center text-[#9ca3af] mt-4">
              購入後、すぐにダウンロードリンクと詳細をお送りします
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
