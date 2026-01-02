'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getDiscountRate,
    getDiscountedPrice,
    getFreeShippingRemaining,
  } = useCart()

  const totalPrice = getTotalPrice()
  const discountRate = getDiscountRate()
  const discountedPrice = getDiscountedPrice()
  const freeShippingRemaining = getFreeShippingRemaining()

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="container mx-auto px-6 py-24 max-w-7xl">
            <div className="text-center">
              <div className="text-6xl mb-6 opacity-40">🛒</div>
              <h1 className="text-3xl font-bold text-[#f5f5f5] mb-4 luxury-heading">
                カートは空です
              </h1>
              <p className="text-[#9ca3af] mb-8 luxury-text">
                商品を追加して、モテるコーディネートを完成させましょう
              </p>
              <Link
                href="/products"
                className="luxury-button-primary inline-block px-8 py-3 text-lg font-semibold"
              >
                商品を探す
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
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#f5f5f5] luxury-heading mb-2">
              カート
            </h1>
            <p className="text-[#9ca3af] luxury-text">
              {getTotalItems()}点の商品がカートに入っています
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カートアイテム一覧 */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#d4af37] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* 商品画像 */}
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-4xl opacity-40">👔</div>
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#f5f5f5] font-semibold mb-2 luxury-heading">
                        {item.name}
                      </h3>
                      <p className="text-[#9ca3af] text-sm mb-4 luxury-text">
                        {item.category}
                      </p>

                      {/* 数量選択 */}
                      <div className="flex items-center gap-4 mb-4">
                        <label className="text-[#9ca3af] text-sm">数量:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-8 h-8 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg border border-[#3a3a3a] hover:border-[#d4af37] transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[#f5f5f5] font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-8 h-8 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg border border-[#3a3a3a] hover:border-[#d4af37] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* 価格と削除ボタン */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#d4af37] font-bold text-lg">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[#9ca3af] text-xs">
                              単価: ¥{item.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* カートを空にするボタン */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[#9ca3af] hover:text-red-400 text-sm font-medium transition-colors"
                >
                  カートを空にする
                </button>
              </div>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 luxury-heading">
                  注文サマリー
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#9ca3af] luxury-text">
                    <span>小計 ({getTotalItems()}点)</span>
                    <span>¥{totalPrice.toLocaleString()}</span>
                  </div>

                  {discountRate > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>数量割引 ({discountRate}%オフ)</span>
                      <span>-¥{(totalPrice - discountedPrice).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-[#2a2a2a] pt-4">
                    <div className="flex justify-between text-[#f5f5f5] font-bold text-lg">
                      <span>合計</span>
                      <span className="text-[#d4af37]">
                        ¥{Math.round(discountedPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 無料配送の閾値表示 */}
                {freeShippingRemaining > 0 && (
                  <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 mb-6">
                    <p className="text-[#9ca3af] text-sm mb-2">
                      あと <span className="text-[#d4af37] font-bold">¥{Math.round(freeShippingRemaining).toLocaleString()}</span> で無料配送
                    </p>
                    <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                      <div
                        className="bg-[#d4af37] h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, ((5000 - freeShippingRemaining) / 5000) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {freeShippingRemaining === 0 && (
                  <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 mb-6">
                    <p className="text-green-400 text-sm font-semibold">
                      ✓ 無料配送の条件を満たしています
                    </p>
                  </div>
                )}

                {/* バンドルオファー表示 */}
                {getTotalItems() < 5 && (
                  <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 mb-6">
                    <p className="text-[#9ca3af] text-sm mb-2">
                      {getTotalItems() === 1 && 'あと1点で10%オフ'}
                      {getTotalItems() === 2 && 'あと1点で15%オフ'}
                      {getTotalItems() >= 3 && getTotalItems() < 5 && 'あと' + (5 - getTotalItems()) + '点で20%オフ'}
                    </p>
                  </div>
                )}

                {/* 購入ボタン */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <a
                      key={item.product_id}
                      href={item.affiliate_url || item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="luxury-button-primary w-full text-center block py-3 text-sm font-semibold"
                    >
                      {item.name}を購入する
                    </a>
                  ))}
                </div>

                <p className="text-xs text-center text-[#9ca3af] mt-4">
                  ※ 各商品の購入ページに遷移します
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
