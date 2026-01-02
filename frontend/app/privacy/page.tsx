import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-8 luxury-heading">プライバシーポリシー</h1>
        <p className="text-sm text-[#9ca3af] mb-12">最終更新日: 2025年12月31日</p>

        <div className="space-y-8 text-[#f5f5f5]">
          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">1. 個人情報の取り扱いについて</h2>
            <p className="text-[#9ca3af] mb-4 leading-relaxed">
              モテ服（以下「当サイト」）は、お客様の個人情報の保護を重要視し、個人情報の保護に関する法律（個人情報保護法）に基づき、適切に取り扱います。
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">1-1. 個人情報の取得</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">当サイトでは、以下の場合に個人情報を取得することがあります。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>お問い合わせフォームからのお問い合わせ</li>
              <li>メールでのお問い合わせ</li>
              <li>その他、お客様が自ら提供する情報</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1-2. 個人情報の利用目的</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">当サイトで取得した個人情報は、以下の目的で利用します。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>お問い合わせへの対応</li>
              <li>サービス改善のための分析</li>
              <li>法令に基づく対応</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">1-3. 個人情報の第三者への提供</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">当サイトは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>お客様の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">2. Cookie（クッキー）の使用について</h2>
            <p className="text-[#9ca3af] mb-4 leading-relaxed">
              当サイトでは、お客様により良いサービスを提供するため、Cookieを使用することがあります。
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2-1. Cookieとは</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              Cookieとは、ウェブサイトを訪問した際に、ブラウザに保存される小さなテキストファイルです。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2-2. Cookieの使用目的</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">当サイトでは、以下の目的でCookieを使用します。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>サイトの利用状況の分析</li>
              <li>お客様の利便性向上</li>
              <li>広告配信の最適化</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2-3. Cookieの無効化</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              お客様は、ブラウザの設定により、Cookieを無効にすることができます。ただし、Cookieを無効にした場合、一部の機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">3. アフィリエイトプログラムについて</h2>
            <p className="text-[#9ca3af] mb-4 leading-relaxed">
              当サイトでは、アフィリエイトプログラムを利用して、商品やサービスを紹介しています。
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">3-1. アフィリエイトプログラムとは</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              アフィリエイトプログラムとは、商品やサービスを紹介し、その紹介により発生した売上に対して報酬を受け取るプログラムです。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3-2. アフィリエイトリンクの使用</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">当サイトでは、以下のアフィリエイトプログラムを利用しています。</p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>楽天アフィリエイト</li>
              <li>Amazonアソシエイト</li>
              <li>バリューコマース</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3-3. 広告の表示</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトでは、商品やサービスの紹介記事に「広告」表記を明記しています。アフィリエイトリンクを含む商品紹介ページには、ページ上部または商品情報の近くに「広告」表記を表示しています。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">4. アクセス解析ツールについて</h2>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトでは、お客様の利用状況を分析するため、以下のアクセス解析ツールを使用しています。
            </p>
            <ul className="list-disc list-inside text-[#9ca3af] space-y-2 ml-4">
              <li>Google Analytics</li>
            </ul>
            <p className="text-[#9ca3af] mt-3 leading-relaxed">
              これらのツールは、Cookieを使用して、お客様の利用状況を収集します。収集されたデータは、匿名化されており、個人を特定する情報は含まれません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">5. 免責事項</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">5-1. 情報の正確性</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトの情報は、可能な限り正確な情報を提供するよう努めていますが、情報の正確性、完全性、有用性について、一切の保証をするものではありません。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5-2. 商品・サービスの取引</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトは、商品やサービスの販売を行うものではありません。商品やサービスの取引は、各ECサイト（楽天市場、Amazon、Yahoo!ショッピングなど）との間で直接行われるものであり、当サイトは一切の責任を負いません。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5-3. 価格情報</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトに表示される商品の価格は、各ECサイトに表示される価格を参考にしていますが、実際の価格は各ECサイトにてご確認ください。価格は変動する可能性があります。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5-4. 損害の免責</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトの利用により、お客様に生じた損害について、当サイトは一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">6. プライバシーポリシーの変更</h2>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトは、必要に応じて、本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">7. お問い合わせ</h2>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
            </p>
            <p className="text-[#f5f5f5] font-semibold mb-2">メールアドレス: info@motefuku.com</p>
            <p className="text-[#9ca3af] text-sm">
              ※ お問い合わせの際は、件名に「プライバシーポリシーに関するお問い合わせ」と記載してください。
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
