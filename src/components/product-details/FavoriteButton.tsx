'use client';
import { useTransition, useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/actions/products";
import { toast } from "react-toastify";
import { Product } from "@/lib/definitions";

interface FavoriteButtonProps {
  product: Product
}
const FavoriteButton = ({ product }: FavoriteButtonProps) => {
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
      className="p-4 border border-[#D1D5DB] rounded-full transition-colors hover:border-red-500 group"
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
        className={
        isFavorite
          ? "fill-red-500 text-red-500 transition-colors"
          : "text-gray-500 group-hover:text-red-500 transition-colors"
        }
      />
    </button>
  )
}

export default FavoriteButton;