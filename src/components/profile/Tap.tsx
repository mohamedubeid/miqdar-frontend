
import { Ruler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteProduct from '../product-library/FavoriteProduct';
import { getProducts } from '@/actions/products';
import { API_URL } from '@/lib/constants';
import { Product } from '@/lib/definitions';
import Pagination from '../product-library/Pagination';
import { normalizeParam } from '@/lib/utils'; 
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

export default async function Tabs({ page }: { page?: string | string[] }) {
  // const [activeTab, setActiveTab] = use
  const productsRes = await getProducts({
    is_favorite: true,
    page: parseInt(normalizeParam(page) ?? "1"),
    perPage: 12,
    sortBy: normalizeParam("created_at"),
    sortType: normalizeParam("desc"),
    });
  const productsData = Array.isArray(productsRes?.data)
    ? productsRes.data
    : (productsRes?.data && typeof productsRes.data === 'object')
      ? Object.values(productsRes.data) as Product[]
      : [];
  if(!productsRes || !productsRes.data || productsData.length === 0) {
    return <div className="text-center text-gray-500">لا توجد منتجات مفضلة</div>;
  }
  return (
    <div className="w-full">

      <div className="flex gap-8 mb-6">
        {/* <button
          onClick={() => setActiveTab('modern')}
          className={`px-4 py-2 text-xl font-semibold rounded-none transition-all bg-transparent ${
            activeTab === 'modern'
              ? 'text-primary border-b-2 border-primary !font-bold'
              : 'text-black hover:text-primary'
          }`}
        >
          التصاميم الحديثة
        </button> */}
        <button
          // onClick={() => setActiveTab('favorite')}
          className={`px-4 py-2 text-xl font-semibold rounded-none transition-all bg-transparent ${
            // activeTab === 'favorite'
              true ? 'text-primary border-b-2 border-primary !font-bold'
              : 'text-black hover:text-primary'
          }`}
        >
          التصاميم المفضلة
        </button>
      </div>
      <div className="mt-12">
        {/* <DesignAnalysisDetailsModal
          open={DesignAnalysisDetailsModalOpen}
          onOpenChange={setDesignAnalysisDetailsModalOpen}
          product={selectedProduct}
        /> */}
        {
        // activeTab === 'modern' 
        false? (

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {fakeProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  // setSelectedProduct(product);
                  // setDesignAnalysisDetailsModalOpen(true);
                }} 
                className="relative w-[308px] h-[419px] mx-auto cursor-pointer"
              >
                <div className="bg-white cstm-card-style w-[308px] h-[419px] mx-auto">
                  <Image src={product.image} alt={product.name} width={308} height={192} className="rounded-t-[16px] w-[308px] h-[192px] object-fill" />
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
            {productsData.map(product => (
              <div key={product.id} className="relative w-[308px] h-[419px] mx-auto">
                <FavoriteProduct product={product} />
                <Link href={`/product-library/${product.id}`}>
                  <div className="bg-white cstm-card-style  mx-auto">
                    <Image src={`${API_URL}/storage/${product.main_image}`} alt={product.name_ar} width={308} height={192} className="rounded-t-[16px] w-[308px] h-[192px] object-fill" />
                    <div className="px-4 py-6">
                      <h6 className="text-lg font-semibold">{product.name_ar}</h6>
                      <div className="flex gap-1 mt-2">
                        <Ruler size={20} strokeWidth={1} className="text-primary" />
                        <p className="text-sm text-gray-500">
                          {`${product.depth_mm} مم × ${product.width_mm} مم × ${product.height_mm} مم`}
                        </p>
                      </div>
                      <p className="text-[10px] text-[#6B7280] mt-4">تحديث: {product.updated_at}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination currentPage={productsRes.current_page} lastPage={productsRes.last_page} />
    </div>
  );
}
