'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split(',');
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort_by', sortBy);
    newParams.set('order', order);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const current = `${searchParams.get('sort_by') ?? 'created_at'},${searchParams.get('order') ?? 'desc'}`;

  return (
    <select
      className="w-fit bg-white border border-gray-500 text-gray-900 text-m rounded-lg outline-none block px-2.5 py-1"
      onChange={handleChange}
      value={current}
    >
      <option value="name_ar,asc">الاسم (تصاعدي)</option>
      <option value="name_ar,desc">الاسم (تنازلي)</option>
      <option value="created_at,desc">الأحدث أولاً</option>
      <option value="created_at,asc">الأقدم أولاً</option>
    </select>
  );
};

export default SortSelect;