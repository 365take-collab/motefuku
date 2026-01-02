import Link from 'next/link'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-8 luxury-heading">運営者情報</h1>
        <p className="text-sm text-[#9ca3af] mb-12">最終更新日: 2025年12月31日</p>

        <div className="space-y-8 text-[#f5f5f5]">
          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">サイト情報</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">サイト名:</span> モテ服</p>
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">URL:</span> https://motefuku.com</p>
              <p className="text-[#9ca3af]"><span className="font-semibold text-[#f5f5f5]">運営開始日:</span> 2025年12月</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">運営者情報</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">運営者名:</span> モテ服運営事務局</p>
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">連絡先:</span> info@motefuku.com</p>
              <p className="text-[#9ca3af] mb-4"><span className="font-semibold text-[#f5f5f5]">所在地:</span> 東京都（詳細はお問い合わせください）</p>
              <p className="text-[#9ca3af] text-sm">
              ※ 個人情報保護のため、詳細な住所は非公開とさせていただいております。お問い合わせはメールにてお願いいたします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">サイトの目的</h2>
            <p className="text-[#9ca3af] mb-6 leading-relaxed">
              モテ服は、700人実績のナンパ師が監修する「モテる服」を、最安値で購入できるサービスです。
            </p>
            
            <h3 className="text-xl font-semibold mb-4">主な機能</h3>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-3 ml-4">
              <li><span className="font-semibold text-[#f5f5f5]">コーディネート提案:</span> シーンや予算に合わせたコーディネートを提案</li>
              <li><span className="font-semibold text-[#f5f5f5]">最安値比較:</span> 複数サイトから最安値を自動で比較</li>
              <li><span className="font-semibold text-[#f5f5f5]">返品可能サイトのみ:</span> 返品不可サイトを標準で除外</li>
              <li><span className="font-semibold text-[#f5f5f5]">コーディネート全体の最安値:</span> 各アイテムだけでなく、コーディネート全体の最安値組み合わせを自動計算</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-6">サービス理念</h3>
            <p className="text-[#9ca3af] leading-relaxed">
              当サイトは、ユーザーが「モテる服」を最安値で購入できるよう、700人実績のナンパ師が監修するコーディネートを提供しています。商品の取引は各ECサイトとの間で直接行われるものであり、当サイトは情報提供のみを行います。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">お問い合わせ</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-4">
                お問い合わせは、以下の連絡先までお願いいたします。
              </p>
              <p className="text-[#f5f5f5] font-semibold mb-2">メールアドレス: info@motefuku.com</p>
              <p className="text-[#9ca3af] text-sm">
                ※ お問い合わせの際は、件名に「お問い合わせ」と記載してください。<br />
                ※ お問い合わせへの返信には、数日かかる場合があります。あらかじめご了承ください。
              </p>
              <div className="mt-4">
                <Link href="/contact" className="text-[#d4af37] hover:text-[#f5f5f5] transition-colors underline">
                  お問い合わせページへ →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
