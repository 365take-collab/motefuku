'use client'

import { useState } from 'react'

interface FilterSidebarProps {
  searchParams: {
    category?: string
    min_price?: number
    max_price?: number
    color?: string
    scene?: string
    style?: string
    keyword?: string
    brand?: string
    sort?: string
  }
  onFilterChange: (filters: any) => void
  onClose?: () => void
}

export default function FilterSidebar({ searchParams, onFilterChange, onClose }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState({
    category: searchParams.category || '',
    min_price: searchParams.min_price || '',
    max_price: searchParams.max_price || '',
    color: searchParams.color || '',
    scene: searchParams.scene || '',
    style: searchParams.style || '',
    keyword: searchParams.keyword || '',
    brand: searchParams.brand || '',
    sort: searchParams.sort || 'moteru_score_desc',
  })

  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['brand', 'category', 'price']))

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      min_price: '',
      max_price: '',
      color: '',
      scene: '',
      style: '',
      keyword: '',
      brand: '',
      sort: 'moteru_score_desc',
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value !== '' && value !== 'moteru_score_desc'
  )

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#f5f5f5]">フィルター</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              クリア
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* ブランド */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>ブランド</span>
            <span className="text-[#9ca3af]">
              {openSections.has('brand') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('brand') && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {['UNIQLO', 'ZARA', 'H&M', 'GU', '無印良品', 'コムサ・デ・モード', 'BEAMS', 'UNITED ARROWS', 'SHIPS', 'ナイキ', 'アディダス', 'プーマ', 'リーバイス', 'ラルフローレン', 'トミーヒルフィガー'].map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={localFilters.brand === brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#d4af37] focus:ring-2"
                  />
                  <span className="text-sm text-[#9ca3af] group-hover:text-[#f5f5f5] transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* カテゴリ */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>カテゴリ</span>
            <span className="text-[#9ca3af]">
              {openSections.has('category') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('category') && (
            <div className="space-y-2">
              {['パンツ', 'トップス', '靴', 'アウター', '時計', 'ベルト', 'バッグ', '小物'].map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={localFilters.category === category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#d4af37] focus:ring-2"
                  />
                  <span className="text-sm text-[#9ca3af] group-hover:text-[#f5f5f5] transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 価格帯 */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>価格帯</span>
            <span className="text-[#9ca3af]">
              {openSections.has('price') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('price') && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#9ca3af] mb-2">最小価格</label>
                <input
                  type="number"
                  value={localFilters.min_price}
                  onChange={(e) => handleFilterChange('min_price', e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="¥0"
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9ca3af] mb-2">最大価格</label>
                <input
                  type="number"
                  value={localFilters.max_price}
                  onChange={(e) => handleFilterChange('max_price', e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="¥100,000"
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}
        </div>

        {/* シーン */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('scene')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>シーン</span>
            <span className="text-[#9ca3af]">
              {openSections.has('scene') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('scene') && (
            <div className="space-y-2">
              {['デート', '仕事', 'カジュアル', 'ストリート', 'パーティー'].map((scene) => (
                <label key={scene} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={localFilters.scene === scene}
                    onChange={(e) => handleFilterChange('scene', e.target.checked ? scene : '')}
                    className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#d4af37] focus:ring-2 rounded"
                  />
                  <span className="text-sm text-[#9ca3af] group-hover:text-[#f5f5f5] transition-colors">
                    {scene}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* スタイル */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('style')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>スタイル</span>
            <span className="text-[#9ca3af]">
              {openSections.has('style') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('style') && (
            <div className="space-y-2">
              {['カジュアル', 'ビジネス', 'ストリート', 'ラグジュアリー', 'スポーツ'].map((style) => (
                <label key={style} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={localFilters.style === style}
                    onChange={(e) => handleFilterChange('style', e.target.checked ? style : '')}
                    className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#d4af37] focus:ring-2 rounded"
                  />
                  <span className="text-sm text-[#9ca3af] group-hover:text-[#f5f5f5] transition-colors">
                    {style}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* ソート */}
        <div className="border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => toggleSection('sort')}
            className="w-full flex items-center justify-between text-[#f5f5f5] font-medium mb-3"
          >
            <span>並び順</span>
            <span className="text-[#9ca3af]">
              {openSections.has('sort') ? '−' : '+'}
            </span>
          </button>
          {openSections.has('sort') && (
            <div className="space-y-2">
              {[
                { value: 'moteru_score_desc', label: 'モテる度順' },
                { value: 'price_asc', label: '価格：安い順' },
                { value: 'price_desc', label: '価格：高い順' },
                { value: 'created_at_desc', label: '新着順' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={localFilters.sort === option.value}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#d4af37] focus:ring-2"
                  />
                  <span className="text-sm text-[#9ca3af] group-hover:text-[#f5f5f5] transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
