import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage, '...', totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-2xs">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-gray-400 select-none"
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={cn(
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition-all',
              isActive
                ? 'scale-105 bg-black font-bold text-white shadow-xs'
                : 'font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
}
