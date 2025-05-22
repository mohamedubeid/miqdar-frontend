import Image from 'next/image'
import React from 'react'

const CATEGORIES = [
  {
    id: 1,
    image: '/placeholders/cat1.jpg',
    title: 'قطع مخصصة',
    count: '60',
  },
  {
    id: 2,
    image: '/placeholders/cat2.jpg',
    title: 'منتجات ضيافة',
    count: '95',
  },
    {
    id: 1,
    image: '/placeholders/cat3.jpg',
    title: 'قطع ميكانيكية',
    count: '77',
  },
    {
    id: 1,
    image: '/placeholders/cat4.jpg',
    title: 'أدوات منزلية',
    count: '23',
  }
]

const Categories = () => {
  return (
    <section id="categories" className="bg-[#F9FAFB] pt-16 pb-4 mb-16">
      <div className="container mx-auto">
        <h3 className="text-center">فئات المنتجات</h3>
        <p className="text-center mt-8 text-cstm-gray">استكشف مجموعتنا الواسعة من فئات المنتجات للعثور على القياسات التي تحتاجها</p>
        <div className="flex items-center justify-center md:justify-between flex-wrap gap-4 mt-15">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="max-w-[294px] rounded-[16px] card-style">
              <Image src={cat.image} alt={cat.title} width={292} height={160} className="rounded-t-[16px]" />
              <div className="text-center py-8">
                <h6>{cat.title}</h6>
                <p className="mt-4 text-cstm-gray">{cat.count} + منتج</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories