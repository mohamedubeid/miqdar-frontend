'use client';
import { useCallback } from "react";
import { Share2 } from "lucide-react";
import { toast } from "react-toastify";

const ShareButton = () => {
    const handleShare = useCallback(() => {
      navigator.clipboard.writeText(window.location.href);
      toast.info("تم نسخ الرابط إلى الحافظة!");
  }, []);

  return (
    <button
      className="p-4 border border-[#D1D5DB] rounded-full transition-colors hover:border-primary group"
      onClick={handleShare}
      type="button"
    >
      <Share2 size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
    </button>
  )
}

export default ShareButton;