'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const ProductSearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const updateQuery = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (value.length >= 3) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/product-library?${params.toString()}`);
  }, 400);

  useEffect(() => {
    updateQuery(search);
  }, [search]);

  return (
    <div className="relative space-y-1">
      <div className="relative">
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          id="product_name"
          className="surface-box border border-[#E5E7EB] text-gray-900 text-sm rounded-lg outline-none block w-full !ps-8"
          placeholder="بحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search.length > 0 && search.length < 3 && (
        <p className="text-sm text-gray-500 px-2">أدخل 3 أحرف على الأقل للبحث</p>
      )}
    </div>
  );
};

export default ProductSearchInput;
