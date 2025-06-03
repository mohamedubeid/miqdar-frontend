'use client';
import { useState } from 'react';
import { Heart, Ruler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DesignAnalysisDetailsModal from '@/components/profile/DesignAnalysisDetailsModal';

const fakeProducts = [
  {
    id: 1,
    name: "طاولة قهوة خشبية",
    slug: "wooden-coffee-table",
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
    slug: "comfortable-office-chair",
    image: "/placeholders/pro2.jpg",
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
    slug: "wardrobe",
    image: "/placeholders/pro3.jpg",
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
    slug: "wooden-coffee-table-2",
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
    slug: "comfortable-office-chair-2",
    image: "/placeholders/pro4.jpg",
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
    slug: "wardrobe-2",
    image: "/placeholders/pro2.jpg",
    length: 50,
    width: 20,
    height: 80,
    unit: "سم",
    updatedAt: "5 أبريل 2025",
    category: "أدوات منزلية"
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<'modern' | 'favorite'>('modern');

  const [favorites, setFavorites] = useState<number[]>([]);
  const [DesignAnalysisDetailsModalOpen, setDesignAnalysisDetailsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<
    { image: string; name: string; length: number; width: number; height: number; unit: string } | undefined
  >(undefined);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };



  return (
    <div className="w-full">

      <div className="flex gap-8 mb-6">
        <button
          onClick={() => setActiveTab('modern')}
          className={`px-4 py-2 text-xl font-semibold rounded-none transition-all bg-transparent ${
            activeTab === 'modern'
              ? 'text-primary border-b-2 border-primary !font-bold'
              : 'text-black hover:text-primary'
          }`}
        >
          التصاميم الحديثة
        </button>
        <button
          onClick={() => setActiveTab('favorite')}
          className={`px-4 py-2 text-xl font-semibold rounded-none transition-all bg-transparent ${
            activeTab === 'favorite'
              ? 'text-primary border-b-2 border-primary !font-bold'
              : 'text-black hover:text-primary'
          }`}
        >
          التصاميم المفضلة
        </button>
      </div>
      <div className="mt-12">
        <DesignAnalysisDetailsModal
          open={DesignAnalysisDetailsModalOpen}
          onOpenChange={setDesignAnalysisDetailsModalOpen}
          product={selectedProduct}
        />
        {activeTab === 'modern' ? (

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {fakeProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setDesignAnalysisDetailsModalOpen(true);
                }} 
                className="relative w-full max-w-[308px] h-[419px] mx-auto cursor-pointer"
              >
                <div className="bg-white cstm-card-style w-full max-w-[308px] h-[419px] mx-auto">
                  <Image src={product.image} alt={product.name} width={308} height={192} className="rounded-t-[16px] w-full max-w-[308px]" />
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
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {fakeProducts.map(product => (
              <div key={product.id} className="relative w-full max-w-[308px] h-[419px] mx-auto">
                <button
                  type="button"
                  className="absolute top-3 right-4 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
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
                <Link href={`/product-library/${product.slug}`}>
                  <div className="bg-white cstm-card-style w-full max-w-[308px] h-[419px] mx-auto">
                    <Image src={product.image} alt={product.name} width={308} height={192} className="rounded-t-[16px] w-full max-w-[308px]" />
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
        )}
      </div>
    </div>
  );
}
