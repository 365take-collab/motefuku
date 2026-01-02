'use client'

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-[#1a1a1a] rounded w-3/4" />
        <div className="h-3 bg-[#1a1a1a] rounded w-1/2" />
        <div className="h-5 bg-[#1a1a1a] rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}
