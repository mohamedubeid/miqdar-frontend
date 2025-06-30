
import { getCategories, getProducts } from "@/actions/products";
import FavoriteProduct from "@/components/product-library/FavoriteProduct";
import { Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from '@/lib/constants';
import SortSelect from "@/components/product-library/SortSelect";
import CategoryFilter from "@/components/product-library/CategoryFilter";
import ProductSearchInput from "@/components/product-library/ProductSearchInput";
import Pagination from "@/components/product-library/Pagination";
import { normalizeParam } from "@/lib/utils";
import { Product } from "@/lib/definitions";

const Page = async ({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const {
    sort_by = "created_at",
    order = "desc",
    category,
    search,
    page = "1",
  } = await searchParams;

  const [categoriesRes, productsRes] = await Promise.all([
    getCategories({perPage: 100}),
    getProducts({
      sortBy: normalizeParam(sort_by),
      sortType: normalizeParam(order),
      category: normalizeParam(category),
      name: normalizeParam(search),
      page: parseInt(normalizeParam(page) ?? "1"),
      perPage: 12,
    }),
  ]);

  const productsData = Array.isArray(productsRes?.data)
    ? productsRes.data
    : (productsRes?.data && typeof productsRes.data === 'object')
      ? Object.values(productsRes.data) as Product[]
      : [];

  if(!productsRes || !productsRes.data || productsData.length === 0) {
    return <div className="text-center text-gray-500">لا توجد منتجات </div>;
  }
  return (
    <div className="surface-box">
      <div className="container mx-auto py-8 px-4">
        <h3>مكتبة المنتجات والقياسات</h3>
        <p className="text-cstm-gray mt-4">استعرض مجموعتنا الواسعة من المنتجات مع قياساتها الدقيقة لتسريع عملية التصميم الخاصة بك</p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-8">
          <div className="bg-white flex-1 max-w-full md:max-w-[250px] lg:max-w-[306px] p-4 cstm-card-style">
            <ProductSearchInput />
            <hr className="my-4 border-t border-[#E5E7EB]"/>
            <CategoryFilter categories={categoriesRes?.data ?? []} />
            <hr className="my-4 border-t border-[#E5E7EB]"/>
            <Link href="/product-library" className="secondary-button w-full !block !py-2 !px-2 lg:!px-16 text-center">
              إعادة تعيين الفلاتر 
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-8">
              {/* <p className="text-cstm-gray">عرض 120 من 360 منتج </p> */}
              <div className="flex items-center gap-2 mb-4">
                <label htmlFor="order-options" className="font-medium text-gray-700">
                  ترتيب حسب :
                </label>
                <SortSelect />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {productsData.map(product => (
                <div key={product.id} className="relative">
                  <FavoriteProduct product={product} />
                  <Link href={`/product-library/${product.id}`}>
                    <div className="bg-white cstm-card-style mx-auto h-[388px]">
                      <Image src={`${API_URL}/storage/${product.main_image}`} alt={product.name_ar} width={210} height={192} className="rounded-t-[16px] w-[209px] h-[192px] object-fill" />
                      <div className="px-4 py-6">
                        <h6 className="text-lg font-semibold">{product.name_ar}</h6>
                        {product.depth_mm && product.width_mm && product.height_mm && (
                          <div className="flex gap-1 mt-2">
                            <Ruler size={20} strokeWidth={1} className="text-primary" />
                            <p className="text-sm text-gray-500">
                              {`${product.depth_mm ? (product.depth_mm + ' مم ×'): ''} ${product.width_mm ? product.width_mm + 'مم × ' : ''} ${product.height_mm ? product.height_mm + 'مم' : ''} `}
                            </p>
                          </div>
                        )}
                        <p className="mt-3 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full px-3 py-1 inline-block w-fit">
                          {product.category_name}
                        </p>
                        <p className="text-[10px] text-[#6B7280] mt-4">
                          تحديث: {new Date(product.updated_at).toLocaleDateString('ar-EG', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Pagination currentPage={productsRes.current_page} lastPage={productsRes.last_page} />
      </div>
    </div>
  )
}

export default Page;