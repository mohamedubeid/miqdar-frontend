'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
}

const Pagination = ({ currentPage, lastPage }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center border rounded-full disabled:text-[#D1D5DB] disabled:cursor-default w-[40px] h-[40px]"
      >
        <ChevronRight className="disabled:text-[#D1D5DB]" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center border rounded-full w-[40px] h-[40px] ${page === currentPage ? 'bg-primary text-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className="flex items-center justify-center border rounded-full disabled:text-[#D1D5DB] disabled:cursor-default w-[40px] h-[40px]"
      >
        <ChevronLeft  className="disabled:text-[#D1D5DB]" />
      </button>
    </div>
  );
};

export default Pagination;
