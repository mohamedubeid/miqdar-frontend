'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/definitions';

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('category');
  const handleCheckboxChange = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selected === id.toString()) {
      params.delete('category');
    } else {
      params.set('category', id.toString());
    }
    params.delete('page');
    router.push(`/product-library?${params}`);
  };

  return (
    <div className="flex flex-col gap-y-2 mt-4">
      <h6 className="mb-2">الفئات</h6>
      {categories.map((cat) => (
        <label key={cat.id} className="flex items-center gap-2">
          <input
            type="radio"
            className="accent-primary w-5 h-5"
            checked={selected === cat.id.toString()}
            onClick={() => handleCheckboxChange(cat.id)}
            readOnly
          />
          <span>{cat.name}</span>
        </label>
      ))}
    </div>
  );
}


