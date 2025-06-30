'use client';

import { useTransition, useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/lib/definitions";
import { toggleFavorite } from "@/actions/products";
import { toast } from "react-toastify";

interface FavoriteProductProps {
  product: Product
}

const FavoriteProduct = ({ product }: FavoriteProductProps) => {
  const [isFavorite, setIsFavorite] = useState(product.is_favorite);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    startTransition(async () => {
        const res = await toggleFavorite(product.id, newStatus);
        if(res?.message == 'success') {
          toast.success(newStatus ? "تم اضافة المنتج الي مفضلة" : "تم ازالة المنتج من مفضلة");
        } else {
        setIsFavorite(!newStatus);
        toast.error(res?.message || "فشل في تحديث المفضلة");
        }
    });
  };

  return (
    <button
      type="button"
      className="absolute top-3 right-4 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        handleToggle();
      }}
      disabled={isPending}
      aria-label="إضافة للمفضلة"
    >
      <Heart
        size={16}
        className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  )
}

export default FavoriteProduct;


