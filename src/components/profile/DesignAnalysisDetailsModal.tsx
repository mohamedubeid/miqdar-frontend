'use client';
import { useCallback, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { ArrowDownToLine, Check, Clock, Copy, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DesignAnalysisDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    image: string;
    name: string;
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

const COLORS = ['#4205A5', '#432234', '#F9FAFB', '#D1D5DB', '#9CA3AF'];

const DesignAnalysisDetailsModal = ({ open, onOpenChange, product }: DesignAnalysisDetailsModalProps) => {

  const [copied, setCopied] = useState(false);
  const copyColors = () => { 
    navigator.clipboard.writeText(COLORS.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const downloadColors = () => {
    const colorsText = COLORS.join(', ');
    const blob = new Blob([colorsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colors.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("تم نسخ الرابط إلى الحافظة!");
  }, []);

  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)] xl:max-w-6xl w-full rounded-[38px] p-11 max-h-[calc(100vh-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-20 w-full max-h-[calc(100vh-10rem)] overflow-y-auto py-4">
          <div className="flex-1">
            <Image src={product.image} alt={product.name} width={500} height={462} className=" object-cover rounded-[30px]" />
            <div className="flex items-center gap-4 mt-6">
              <Clock size={32} className="text-[#6B7280]" />
              <p className="text-[#9CA3AF]">23 أبريل 2025</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-[#D9D9D936] rounded-3xl p-10">
              <h5 className="text-center">المواصفات والقياسات</h5>
              <div className="flex gap-4 mt-6">
                <p className="text-[18px] font-[500] text-cstm-gray me-auto">الطول </p>
                <p className="text-xl font-[500]">{product.height} {product.unit}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <p className="text-[18px] font-[500] text-cstm-gray me-auto">العرض</p>
                <p className="text-xl font-[500]">{product.width} {product.unit}</p>
              </div>
              <div className="mt-6">
                <p className="text-[18px] font-[500] text-cstm-gray me-auto">تحليل الألوان</p>
                <div className="flex flex-wrap gap-8 mt-6">
                  {COLORS.map((color, idx) => (
                    <div
                      key={color + idx}
                      className={`
                        w-[55px] h-[55px] rounded-[16px] transition
                        border border-[#0000004D] shadow-lg
                        cursor-pointer ring-0 hover:ring-4 hover:ring-primary/40 hover:scale-105 relative
                      `}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        navigator.clipboard.writeText(color);
                        setCopiedColor(color);
                        setTimeout(() => setCopiedColor(null), 1200);
                      }}
                    >
                      {copiedColor === color && (
                        <span
                          className="
                            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            bg-white/600 text-primary flex items-center gap-1
                            text-xs px-3 py-1 rounded-lg shadow-lg
                            transition-all duration-300
                            opacity-100 scale-100
                            pointer-events-none
                            z-10
                          "
                          style={{ minWidth: 50 }}
                        >
                          <Check size={14} className="text-green-600" />
                          <span className="font-bold">تم النسخ!</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col md:flex-row items-center gap-y-4 gap-x-11">
                  <button
                    className={`flex items-center gap-2 rounded-[10px] py-2 px-4 border text-[#4B5563] hover:bg-cstm-gray hover:text-white hover:border-cstm-gray transition-colors duration-200 ${copied ? "border-green-600" : "border-[#0000004D]"}`}
                    onClick={copyColors}
                  >
                    {copied ? <Check className="text-green-600" /> : <Copy size={16} />}
                    {copied ? <span className="text-green-600">تم نسخ الألوان!</span> : <span>نسخ جميع الألوان </span>}
                  </button>
                  <button onClick={downloadColors} className="flex items-center gap-2 rounded-[10px] py-2 px-4 border border-[#0000004D] text-[#4B5563] hover:bg-cstm-gray hover:text-white hover:border-cstm-gray transition-colors duration-200">
                    <ArrowDownToLine size={16} />
                    <span>تنزيل لوحة الألوان </span>
                  </button>
                </div>
              </div>
            </div>
            <button onClick={handleShare} className="secondary-button mt-10 w-full mx-auto justify-center">
              <Share2 />
              <span>مشاركة</span> 
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignAnalysisDetailsModal;