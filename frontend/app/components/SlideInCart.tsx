'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

interface SlideInCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SlideInCart({ isOpen, onClose }: SlideInCartProps) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
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

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* スライドインカート */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2a2a2a] shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
            <h2 className="text-xl font-semibold text-[#f5f5f5]">
              カート ({getTotalItems()})
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* カートアイテム一覧 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-40">🛒</div>
                <p className="text-[#9ca3af] text-sm">カートは空です</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* 商品画像 */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl opacity-40">👔</div>
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#f5f5f5] font-medium text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-[#9ca3af] text-xs mb-2">{item.category}</p>

                      {/* 数量選択 */}
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-6 h-6 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs hover:bg-[#3a3a3a] transition-colors"
                        >
                          −
                        </button>
                        <span className="text-[#f5f5f5] text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-6 h-6 bg-[#2a2a2a] text-[#f5f5f5] rounded text-xs hover:bg-[#3a3a3a] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* 価格と削除 */}
                      <div className="flex items-center justify-between">
                        <p className="text-[#d4af37] font-semibold">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* フッター */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#2a2a2a] p-6 space-y-4">
              {/* サマリー */}
              <div className="space-y-2">
                <div className="flex justify-between text-[#9ca3af] text-sm">
                  <span>小計</span>
                  <span>¥{totalPrice.toLocaleString()}</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-green-400 text-sm">
                    <span>数量割引 ({discountRate}%オフ)</span>
                    <span>-¥{(totalPrice - discountedPrice).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#f5f5f5] font-semibold text-lg pt-2 border-t border-[#2a2a2a]">
                  <span>合計</span>
                  <span className="text-[#d4af37]">
                    ¥{Math.round(discountedPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 無料配送の閾値 */}
              {freeShippingRemaining > 0 && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-[#9ca3af] text-xs mb-2">
                    あと <span className="text-[#d4af37] font-bold">¥{Math.round(freeShippingRemaining).toLocaleString()}</span> で無料配送
                  </p>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-1.5">
                    <div
                      className="bg-[#d4af37] h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, ((5000 - freeShippingRemaining) / 5000) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* アクションボタン */}
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full px-6 py-3 bg-[#d4af37] text-[#0a0a0a] rounded-lg text-sm font-semibold hover:bg-[#c9a030] transition-all text-center"
                >
                  カートを見る
                </Link>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] rounded-lg text-sm font-medium hover:border-[#d4af37] transition-all"
                >
                  買い物を続ける
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
