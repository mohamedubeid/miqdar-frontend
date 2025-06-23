'use client';

import { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/lib/definitions";

interface FavoriteProductProps {
  product: Product
}

const FavoriteProduct = ({ product }: FavoriteProductProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <button
      type="button"
      className="absolute top-3 right-8 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(product.id);
      }}
      aria-label="إضافة للمفضلة"
    >
      <Heart
        size={16}
        className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  )
}

export default FavoriteProduct;


