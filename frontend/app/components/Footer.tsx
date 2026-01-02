import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] mt-24">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div>
            <h3 className="text-xl font-semibold text-[#f5f5f5] mb-4 luxury-heading">モテ服</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              700人実績のナンパ師が監修する「モテる服」を、最安値で購入できるサービス
            </p>
          </div>

          {/* サービス */}
          <div>
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 uppercase tracking-wider">サービス</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  モテ服
                </Link>
              </li>
              <li>
                <Link href="/products/recommend" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  商品推薦
                </Link>
              </li>
              <li>
                <Link href="/brand-style" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  ブランドスタイル
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  商品検索
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  コーディネート
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  ブログ
                </Link>
              </li>
            </ul>
          </div>

          {/* 運営情報 */}
          <div>
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 uppercase tracking-wider">運営情報</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  運営者情報
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 uppercase tracking-wider">法的情報</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
                  特定商取引法
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-[#2a2a2a] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#9ca3af]">
              © 2025 モテ服. All rights reserved.
            </p>
            <p className="text-xs text-[#6b7280] mt-2 md:mt-0">
              本サイトはアフィリエイトプログラムを利用しています
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
