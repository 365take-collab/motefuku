'use client'

import { useFavorites } from '../contexts/FavoritesContext'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#f5f5f5] luxury-heading mb-2">
              お気に入り
            </h1>
            <p className="text-[#9ca3af] luxury-text">
              {favorites.length} 件の商品
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-6 opacity-40">❤️</div>
              <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-4 luxury-heading">
                お気に入りはまだありません
              </h2>
              <p className="text-[#9ca3af] mb-8 luxury-text">
                気になる商品をお気に入りに追加しましょう
              </p>
              <Link
                href="/products"
                className="luxury-button-primary inline-block px-8 py-3 text-lg font-semibold"
              >
                商品を探す
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <ProductCard
                  key={product.product_id}
                  product={{
                    ...product,
                    moteru_score: 0,
                    returnable: true,
                    in_stock: true,
                    url: '',
                    affiliate_url: '',
                    images: [product.image_url],
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
