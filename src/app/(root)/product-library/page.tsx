"use client";

import { ORDER_BY_OPTIONS } from "@/lib/constants";
import { Heart, Ruler, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fakeProducts = [
  {
    id: 1,
    name: "طاولة قهوة خشبية",
    image: "/placeholders/pro1.png",
    length: 20,
    width: 10,
    height: 15,
    unit: "سم",
    updatedAt: "12 أبريل 2025",
    category: "أدوات منزلية"
  },
  {
    id: 2,
    name: "كرسي مكتب مريح",
    image: "/placeholders/pro1.png",
    length: 18,
    width: 12,
    height: 30,
    unit: "سم",
    updatedAt: "10 أبريل 2025",
    category: "أدوات منزلية"
  },
  {
    id: 3,
    name: "خزانة ملابس",
    image: "/placeholders/pro1.png",
    length: 50,
    width: 20,
    height: 80,
    unit: "سم",
    updatedAt: "5 أبريل 2025",
    category: "أدوات منزلية"
  },
    {
    id: 4,
    name: "طاولة قهوة خشبية",
    image: "/placeholders/pro1.png",
    length: 20,
    width: 10,
    height: 15,
    unit: "سم",
    updatedAt: "12 أبريل 2025",
    category: "أدوات منزلية"
  },
  {
    id: 5,
    name: "كرسي مكتب مريح",
    image: "/placeholders/pro1.png",
    length: 18,
    width: 12,
    height: 30,
    unit: "سم",
    updatedAt: "10 أبريل 2025",
    category: "أدوات منزلية"
  },
  {
    id: 6,
    name: "خزانة ملابس",
    image: "/placeholders/pro1.png",
    length: 50,
    width: 20,
    height: 80,
    unit: "سم",
    updatedAt: "5 أبريل 2025",
    category: "أدوات منزلية"
  },
];

const Page = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#F9FAFB] p-2">
      <div className="container mx-auto py-8 px-4">
        <h3>مكتبة المنتجات والقياسات</h3>
        <p className="text-cstm-gray mt-4">استعرض مجموعتنا الواسعة من المنتجات مع قياساتها الدقيقة لتسريع عملية التصميم الخاصة بك</p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-8">
          <div className="bg-white flex-1 max-w-full md:max-w-[250px] lg:max-w-[306px] p-4 cstm-card-style">
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                id="product_name"
                className="bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 text-sm rounded-lg outline-none block w-full pr-10 p-2.5"
                placeholder="بحث عن منتج..."
              />
            </div>
            <hr className="my-4 border-t border-[#E5E7EB]"/>
            <div className="flex flex-col gap-y-2 mt-4 ">
              <h6 className="mb-2">الفئات</h6>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>أدوات منزلية (120)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>قطع ميكانيكية (350)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>قطع مخصصة  (70) (95)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>ضيافة (95)</span>
              </label>
            </div>
            <hr className="my-4 border-t border-[#E5E7EB]"/>
            <div className="flex flex-col gap-y-2 mt-4 ">
              <h6 className="mb-2">المواد</h6>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>معدن</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>قطع ميكانيكية (350)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>قطع مخصصة  (70) (95)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary w-5 h-5 rounded-[4px]" />
                <span>ضيافة (95)</span>
              </label>
            </div>
            <hr className="my-4 border-t border-[#E5E7EB]"/>
            <button className="secondary-button w-full !block !py-2 !px-2 lg:!px-16">
              إعادة تعيين الفلاتر 
            </button>
          </div>
          <div className="flex-1">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-8">
              <p className="text-cstm-gray">عرض 120 من 360 منتج </p>
              <div className="flex items-center gap-2 mb-4">
                <label htmlFor="order-options" className="font-medium text-gray-700">
                  ترتيب حسب :
                </label>
                <select
                  id="order-options"
                  className="w-fit bg-white border border-gray-500 text-gray-900 text-m rounded-lg outline-none block px-2.5 py-1 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {ORDER_BY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fakeProducts.map(product => (
                <div key={product.id} className="relative">
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
                  <span
                    className="absolute top-3 left-8 z-10 bg-primary-100 text-primary text-xs font-medium px-3 py-1 rounded-full shadow"
                    style={{ direction: "rtl" }}
                  >
                    {product.category}
                  </span>
                  <Link href="/">
                    <div className="bg-white cstm-card-style w-[210px] mx-auto">
                      <Image src={product.image} alt={product.name} width={210} height={192} className="rounded-t-[16px]" />
                      <div className="px-4 py-6">
                        <h6 className="text-lg font-semibold">{product.name}</h6>
                        <div className="flex gap-1 mt-2">
                          <Ruler size={20} strokeWidth={1} className="text-primary" />
                          <p className="text-sm text-gray-500">
                            {`${product.length} ${product.unit} × ${product.width} ${product.unit} × ${product.height} ${product.unit}`}
                          </p>
                        </div>
                        <p className="text-[10px] text-[#6B7280] mt-4">تحديث: {product.updatedAt}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;