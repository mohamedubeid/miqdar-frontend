'use client';
import { useState } from 'react'
import { Heart } from 'lucide-react'

const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button
      type="button"
      className="p-4 border border-[#D1D5DB] rounded-full transition-colors hover:border-red-500 group"
      onClick={() => setIsFavorite((prev) => !prev)}
    >
      <Heart 
        size={16}
        className={
        isFavorite
          ? "fill-red-500 text-red-500 transition-colors"
          : "text-gray-500 group-hover:text-red-500 transition-colors"
        }
      />
    </button>
  )
}

export default FavoriteButton