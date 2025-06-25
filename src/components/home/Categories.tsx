import { getCategories } from '@/actions/products';
import { API_URL } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';


const Categories = async () => {
  const categories = await getCategories({page: 1, perPage: 4});
  return (
    <section id="categories" className="bg-main-bg pt-16 pb-4 mb-16">
      <div className="container mx-auto">
        <h3 className="text-center">فئات المنتجات</h3>
        <p className="text-center mt-8 text-cstm-gray">استكشف مجموعتنا الواسعة من فئات المنتجات للعثور على القياسات التي تحتاجها</p>
        <div className="flex items-center justify-center md:justify-between flex-wrap gap-4 mt-15">
          {categories?.data.map((cat) => (
            <Link
              key={cat.name}
              href={`/product-library?category=${cat.id}`}
              className="max-w-[294px] h-[334px] rounded-[16px] card-style block"
            >
              <Image
                src={`${API_URL}/storage/${cat.image}`}
                alt={cat.name}
                width={292}
                height={160}
                className="rounded-t-[16px] w-[292px] h-[160px] object-fill"
              />
              <div className="text-center py-8">
                <h6>{cat.name}</h6>
                <p className="mt-4 text-cstm-gray">{cat.simplified_name} + منتج</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories