import Link from 'next/link'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-8 luxury-heading">お問い合わせ</h1>
        <p className="text-sm text-[#9ca3af] mb-12">最終更新日: 2025年12月31日</p>

        <div className="space-y-8 text-[#f5f5f5]">
          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">お問い合わせ方法</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-4">
                モテ服に関するお問い合わせは、以下のメールアドレスまでお願いいたします。
              </p>
              <p className="text-[#f5f5f5] font-semibold text-xl mb-4">メールアドレス: info@motefuku.com</p>
              <a 
                href="mailto:info@motefuku.com?subject=お問い合わせ" 
                className="inline-block px-6 py-3 bg-[#d4af37] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#c9a030] transition-colors"
              >
                メールを送信する
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">お問い合わせの際の注意事項</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">件名について</h3>
            <p className="text-[#9ca3af] mb-3">お問い合わせの際は、件名に以下のいずれかを記載してください。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>「お問い合わせ」</li>
              <li>「商品に関するお問い合わせ」</li>
              <li>「サービスに関するお問い合わせ」</li>
              <li>「その他のお問い合わせ」</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">返信について</h3>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>お問い合わせへの返信には、数日かかる場合があります。あらかじめご了承ください。</li>
              <li>お問い合わせの内容によっては、返信できない場合があります。</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">お問い合わせの内容について</h3>
            <p className="text-[#9ca3af] mb-3">
              以下の内容に関するお問い合わせは、各ECサイト（楽天市場、Amazon、Yahoo!ショッピングなど）にお問い合わせください。
            </p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>商品の品質、配送、返品・交換に関するお問い合わせ</li>
              <li>商品の価格に関するお問い合わせ</li>
              <li>商品の在庫に関するお問い合わせ</li>
              <li>その他、商品の取引に関するお問い合わせ</li>
            </ul>
            <p className="text-[#9ca3af] mt-3 leading-relaxed">
              当サイトは、商品やサービスの販売を行うものではありません。商品やサービスの取引は、各ECサイトとの間で直接行われるものであり、当サイトは情報提供のみを行います。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">よくある質問（FAQ）</h2>
            
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#f5f5f5]">Q1. 商品の購入はどこでできますか？</h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  A1. 商品の購入は、各ECサイト（楽天市場、Amazon、Yahoo!ショッピングなど）で行うことができます。当サイトから各ECサイトへのリンクをクリックして、商品を購入してください。
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#f5f5f5]">Q2. 商品の価格は正確ですか？</h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  A2. 当サイトに表示される商品の価格は、各ECサイトに表示される価格を参考にしていますが、実際の価格は各ECサイトにてご確認ください。価格は変動する可能性があります。
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#f5f5f5]">Q3. 返品・交換はできますか？</h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  A3. 商品の返品・交換については、各ECサイトの返品・交換ポリシーに準じます。当サイトでは、返品可能サイトのみを紹介していますが、返品・交換の詳細は各ECサイトにお問い合わせください。
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#f5f5f5]">Q4. アフィリエイトプログラムについて教えてください。</h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  A4. 当サイトでは、アフィリエイトプログラム（楽天アフィリエイト、Amazonアソシエイト、バリューコマース）を利用して、商品やサービスを紹介しています。アフィリエイトリンクを含む商品紹介ページには、「広告」表記を明記しています。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">プライバシーポリシー</h2>
            <p className="text-[#9ca3af] mb-4">
              お問い合わせの際に提供いただいた個人情報は、プライバシーポリシーに基づいて適切に取り扱います。
            </p>
            <Link href="/privacy" className="text-[#d4af37] hover:text-[#f5f5f5] transition-colors underline">
              プライバシーポリシーを確認する →
            </Link>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
