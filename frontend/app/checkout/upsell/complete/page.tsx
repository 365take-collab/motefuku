'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const upsellOffers: { [key: string]: { title: string; downloadUrl?: string } } = {
  'course-complete-guide': {
    title: 'モテるコーディネート完全ガイド（PDF）',
    downloadUrl: '/api/checkout/downloads/course-complete-guide',
  },
  'consultation-basic': {
    title: '個別ファッションコンサルティング（基本プラン）',
  },
  'consultation-premium': {
    title: '個別ファッションコンサルティング（プレミアムプラン）',
  },
}

function UpsellCompleteContent() {
  const searchParams = useSearchParams()
  const offerId = searchParams.get('offer_id')
  const [offer, setOffer] = useState<{ title: string; downloadUrl?: string } | null>(null)

  useEffect(() => {
    if (offerId && upsellOffers[offerId]) {
      setOffer(upsellOffers[offerId])
    }
  }, [offerId])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
              ご購入ありがとうございます！
            </h1>
            {offer && (
              <p className="text-[#9ca3af] luxury-text">
                {offer.title} のご購入が完了しました
              </p>
            )}
          </div>

          <div className="bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-2 border-[#d4af37] rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-6 luxury-heading text-center">
              次のステップ
            </h2>

            {offer?.downloadUrl ? (
              <div className="space-y-4">
                <p className="text-[#9ca3af] luxury-text text-center mb-6">
                  購入いただいたPDFのダウンロードリンクをメールでもお送りしました。
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${offer.downloadUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-button-primary w-full text-center block py-4 text-lg font-semibold"
                >
                  PDFを今すぐダウンロードする
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[#9ca3af] luxury-text text-center mb-6">
                  コンサルティングサービスの詳細と、次のステップをメールでお送りしました。
                  24時間以内にご連絡いたします。
                </p>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4 luxury-heading">
                    今後の流れ
                  </h3>
                  <ol className="space-y-3 text-[#9ca3af] luxury-text">
                    <li className="flex items-start gap-3">
                      <span className="text-[#d4af37] font-bold">1.</span>
                      <span>メールでご連絡いたします（24時間以内）</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#d4af37] font-bold">2.</span>
                      <span>お客様の体型・スタイル・シーンをヒアリング</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#d4af37] font-bold">3.</span>
                      <span>あなた専用のコーディネートを提案（3-5パターン）</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#d4af37] font-bold">4.</span>
                      <span>最安値サイトを提案し、購入をサポート</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-[#9ca3af] hover:text-[#f5f5f5] transition-colors luxury-text"
              >
                トップページに戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function UpsellCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#9ca3af]">読み込み中...</div>
      </div>
    }>
      <UpsellCompleteContent />
    </Suspense>
  )
}
