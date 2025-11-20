"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDownToLine, CloudUpload, Ruler, X } from "lucide-react";

interface HowItWorksModalProps {
  isAuthenticated: boolean;
}

const STORAGE_KEY = "miqdar-how-it-works-seen";

const HowItWorksModal = ({ isAuthenticated }: HowItWorksModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (typeof window === "undefined") return;

    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, [isAuthenticated]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          aria-label="إغلاق"
          onClick={() => setOpen(false)}
          className="absolute top-4 left-4 rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100"
        >
          <X size={18} />
        </button>
        <section className="p-2 pt-4 pb-10 text-center">
          <h3>كيف يعمل</h3>
          <p className="text-cstm-gray mt-4 text-sm sm:text-base">
            خطوات بسيطة تمكنك من الحصول على القياسات الدقيقة بسرعة وسهولة
          </p>
          <div className="mt-8 flex flex-col gap-8">
            <div className="flex items-center justify-around gap-4">
              <div className="rounded-full bg-[#3B82F61A] p-5">
                <CloudUpload size={28} className="text-primary" />
              </div>
              <div className="rounded-full bg-[#3B82F61A] p-5">
                <Ruler size={28} className="text-primary" />
              </div>
              <div className="rounded-full bg-[#3B82F61A] p-5">
                <ArrowDownToLine size={28} className="text-primary" />
              </div>
            </div>
            <div className="flex w-full items-center">
              <div className="mx-2 h-0.25 flex-[0.8] bg-primary-100" />
              <div className="relative z-10 grid place-items-center rounded-full bg-primary px-4 py-2 text-white">
                1
              </div>
              <div className="mx-2 h-0.25 flex-[2] bg-primary-100" />
              <div className="relative z-10 grid place-items-center rounded-full bg-primary px-4 py-2 text-white">
                2
              </div>
              <div className="mx-2 h-0.25 flex-[2] bg-primary-100" />
              <div className="relative z-10 grid place-items-center rounded-full bg-primary px-4 py-2 text-white">
                3
              </div>
              <div className="mx-2 h-0.25 flex-[0.9] bg-primary-100" />
            </div>
            <div className="flex flex-col items-center justify-around gap-6 text-center md:flex-row">
              <div>
                <h6>حمّل التصميم أو اختر منتج</h6>
                <p className="mt-3 text-cstm-gray">
                  حمّل صورة أو نموذج ثلاثي الأبعاد أو اختر من مكتبتنا
                </p>
              </div>
              <div>
                <h6>تحليل الذكاء الاصطناعي / عرض القياسات</h6>
                <p className="mt-3 text-cstm-gray">
                  يقوم نظامنا بتحليل التصميم وعرض القياسات الدقيقة
                </p>
              </div>
              <div>
                <h6>تنزيل النتائج</h6>
                <p className="mt-3 text-cstm-gray">
                  احصل على القياسات بتنسيقات متعددة جاهزة للاستخدام
                </p>
              </div>
            </div>
            <Link href="/design-analysis" className="primary-button mx-auto w-min">
              <span>ابدأ الآن</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksModal;

