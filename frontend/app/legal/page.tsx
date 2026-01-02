import Footer from '../components/Footer'

export default function LegalPage() {
  return (
    <>
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-8 luxury-heading">特定商取引法に基づく表記</h1>
        <p className="text-sm text-[#9ca3af] mb-12">最終更新日: 2025年12月31日</p>

        <div className="space-y-8 text-[#f5f5f5]">
          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">事業者情報</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">事業者名:</span> モテ服運営事務局</p>
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">運営責任者:</span> モテ服運営事務局</p>
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">所在地:</span> 東京都（詳細はお問い合わせください）</p>
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">連絡先:</span> メールでのお問い合わせのみ受け付けております</p>
              <p className="text-[#9ca3af] mb-4"><span className="font-semibold text-[#f5f5f5]">メールアドレス:</span> info@motefuku.com</p>
              <p className="text-[#9ca3af] text-sm">
                ※ 個人情報保護のため、詳細な住所や電話番号は非公開とさせていただいております。お問い合わせはメールにてお願いいたします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">商品・サービスの内容</h2>
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
              <p className="text-[#9ca3af] mb-2"><span className="font-semibold text-[#f5f5f5]">商品・サービス名:</span> モテ服（コーディネート提案サービス）</p>
              <p className="text-[#9ca3af] leading-relaxed">
                <span className="font-semibold text-[#f5f5f5]">商品・サービスの内容:</span><br />
                700人実績のナンパ師が監修する「モテる服」を、最安値で購入できるサービスです。
              </p>
              <p className="text-[#9ca3af] mt-4 leading-relaxed">
                当サイトは、商品やサービスの販売を行うものではありません。商品やサービスの取引は、各ECサイト（楽天市場、Amazon、Yahoo!ショッピングなど）との間で直接行われるものであり、当サイトは情報提供のみを行います。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">販売価格</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              当サイトは、商品やサービスの販売を行うものではありません。商品やサービスの価格は、各ECサイトにて表示される価格となります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">支払い方法</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              商品やサービスの支払い方法は、各ECサイトの支払い方法に準じます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">商品の引き渡し時期</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              商品の引き渡し時期は、各ECサイトの配送方法に準じます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">返品・交換について</h2>
            <p className="text-[#9ca3af] leading-relaxed">
              商品の返品・交換については、各ECサイトの返品・交換ポリシーに準じます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 luxury-heading">その他</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">アフィリエイトプログラムについて</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトでは、アフィリエイトプログラム（楽天アフィリエイト、Amazonアソシエイト、バリューコマース）を利用して、商品やサービスを紹介しています。アフィリエイトリンクを含む商品紹介ページには、「広告」表記を明記しています。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">免責事項</h3>
            <p className="text-[#9ca3af] mb-3 leading-relaxed">
              当サイトは、商品やサービスの取引の仲介を行うものではありません。商品やサービスの取引は、各ECサイトとの間で直接行われるものであり、当サイトは一切の責任を負いません。
            </p>
            <p className="text-[#9ca3af] leading-relaxed">
              商品の品質、配送、返品・交換、その他の取引に関する一切の責任は、各ECサイトが負います。
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
