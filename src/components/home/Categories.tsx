import { getCategories } from '@/actions/products';
import { API_URL } from '@/lib/constants';
import Image from 'next/image';


const Categories = async () => {
  const categories = await getCategories();
  console.log('categoriescategoriescategoriescategories', categories);
  return (
    <section id="categories" className="bg-main-bg pt-16 pb-4 mb-16">
      <div className="container mx-auto">
        <h3 className="text-center">فئات المنتجات</h3>
        <p className="text-center mt-8 text-cstm-gray">استكشف مجموعتنا الواسعة من فئات المنتجات للعثور على القياسات التي تحتاجها</p>
        <div className="flex items-center justify-center md:justify-between flex-wrap gap-4 mt-15">
          {categories?.map((cat) => (
            <div key={cat.name} className="max-w-[294px] rounded-[16px] card-style">
              <Image src={`${API_URL}/storage/${cat.image}`} alt={cat.name} width={292} height={160} className="rounded-t-[16px]" />
              <div className="text-center py-8">
                <h6>{cat.name}</h6>
                <p className="mt-4 text-cstm-gray">{cat.simplified_name} + منتج</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories