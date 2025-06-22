export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!

export const MEASURE_UNITS = [
  { value: 'mm', label: 'ملم' },
  { value: 'px', label: 'بكسل' },
  { value: 'cm', label: 'سم' },
  { value: 'in', label: 'إنش' },
];

export const ORDER_BY_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "name_asc", label: "الاسم (أ-ي)" },
  { value: "name_desc", label: "الاسم (ي-أ)" },
];