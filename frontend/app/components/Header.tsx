'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import SlideInCart from './SlideInCart'

export default function Header() {
  const pathname = usePathname()
  const { getTotalItems } = useCart()
  const { favorites } = useFavorites()
  const cartItemCount = getTotalItems()
  const favoriteCount = favorites.length
  const [isCartOpen, setIsCartOpen] = useState(false)

  // マーケティング的に最適化されたナビゲーション順序
  // 1. 商品推薦 - コンバージョンに直結、パーソナライズされた体験（最重要）
  // 2. ブランドスタイル - 差別化ポイント、独自価値
  // 3. 商品検索 - 能動的な検索ニーズに対応
  // 4. コーディネート - 情報コンテンツ、教育コンテンツ（トップページへのリンク）
  // 5. ブログ - SEO、コンテンツマーケティング
  const navItems = [
    { href: '/products/recommend', label: '商品推薦' },
    { href: '/brand-style', label: 'ブランドスタイル' },
    { href: '/products', label: '商品検索' },
    { href: '/', label: 'コーディネート' }, // トップページへのリンク（コーディネート機能）
    { href: '/blog', label: 'ブログ' },
  ]

  const isActive = (href: string, label: string) => {
    if (!pathname) return false
    
    // トップページ（/）の場合は完全一致のみ
    if (href === '/') {
      return pathname === '/'
    }
    
    // その他のパスの場合は、より厳密にマッチング
    // 例: /products は /products/recommend ではマッチしない
    if (pathname === href) {
      return true
    }
    
    // /products/recommend のようなサブパスの場合は、そのパスで始まる場合のみ
    // ただし、/products は /products/recommend ではマッチしないようにする
    if (pathname.startsWith(href + '/')) {
      return true
    }
    
    return false
  }

  return (
    <header className="bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-5 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-[#f5f5f5] tracking-tight luxury-heading hover:text-[#d4af37] transition-colors cursor-pointer">
              モテ服
            </h1>
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const active = isActive(item.href, item.label)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors cursor-pointer font-medium ${
                    active
                      ? 'text-[#d4af37] hover:text-[#d4af37]'
                      : 'text-[#9ca3af] hover:text-[#f5f5f5]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/favorites"
              className="relative text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0a0a0a] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount > 9 ? '9+' : favoriteCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0a0a0a] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
      <SlideInCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
