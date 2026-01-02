import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-8 luxury-heading">利用規約</h1>
        <p className="text-sm text-[#9ca3af] mb-12">最終更新日: 2025年12月31日</p>

        <div className="space-y-8 text-[#f5f5f5]">
          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">1. はじめに</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              本利用規約（以下「本規約」）は、モテ服（以下「当サイト」）の利用条件を定めるものです。当サイトを利用するすべてのお客様（以下「ユーザー」）は、本規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">2. 利用規約の適用</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              本規約は、当サイトの利用に関する一切の事項に適用されます。当サイトを利用することにより、ユーザーは本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">3. サービスの内容</h2>
            <p className="text-[#9ca3af] mb-3">当サイトは、以下のサービスを提供します。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>コーディネート提案</li>
              <li>商品検索・推薦</li>
              <li>最安値比較</li>
              <li>その他、当サイトが提供するサービス</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">4. 利用規約の変更</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              当サイトは、必要に応じて、本規約を変更することがあります。変更後の利用規約は、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">5. 禁止事項</h2>
            <p className="text-[#9ca3af] mb-3">ユーザーは、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセス、クラッキング、その他の不正行為</li>
              <li>その他、当サイトが不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">6. 免責事項</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6-1. 情報の正確性</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトの情報は、可能な限り正確な情報を提供するよう努めていますが、情報の正確性、完全性、有用性について、一切の保証をするものではありません。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6-2. 商品・サービスの取引</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトは、商品やサービスの販売を行うものではありません。商品やサービスの取引は、各ECサイト（楽天市場、Amazon、Yahoo!ショッピングなど）との間で直接行われるものであり、当サイトは一切の責任を負いません。
            </p>
            <p className="text-[#9ca3af] leading-relaxed">
              商品の品質、配送、返品・交換、その他の取引に関する一切の責任は、各ECサイトが負います。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6-3. 損害の免責</h3>
            <p className="text-[#9ca3af] leading-relaxed">
              当サイトの利用により、ユーザーに生じた損害について、当サイトは一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">7. 知的財産権</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              当サイトに掲載されているすべてのコンテンツ（文章、画像、ロゴ、デザインなど）の知的財産権は、当サイトまたは正当な権利者に帰属します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">8. アフィリエイトプログラムについて</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">8-1. アフィリエイトプログラムの利用</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトでは、アフィリエイトプログラム（楽天アフィリエイト、Amazonアソシエイト、バリューコマース）を利用して、商品やサービスを紹介しています。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">8-2. 広告の表示</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトでは、アフィリエイトリンクを含む商品紹介ページに「広告」表記を明記しています。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">8-3. 取引の責任</h3>
            <p className="text-[#9ca3af] leading-relaxed">
              商品やサービスの取引は、各ECサイトとの間で直接行われるものであり、当サイトは一切の責任を負いません。商品の品質、配送、返品・交換、その他の取引に関する一切の責任は、各ECサイトが負います。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">9. お問い合わせ</h2>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              本利用規約に関するお問い合わせは、以下の連絡先までお願いいたします。
            </p>
            <p className="text-[#f5f5f5] font-semibold mb-2">メールアドレス: info@motefuku.com</p>
            <p className="text-[#9ca3af] text-sm">
              ※ お問い合わせの際は、件名に「利用規約に関するお問い合わせ」と記載してください。
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
