import DashboardLayout from '@/components/layout/DashboardLayout';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: Partial<ErrorComponentProps>) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <DashboardLayout>
      <title>500 — Đã có lỗi xảy ra</title>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <span className="font-mono text-6xl font-bold tracking-tight text-gray-300 sm:text-7xl">500</span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Đã có lỗi xảy ra</h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {reset && (
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95"
            >
              <RotateCcw size={14} />
              Thử lại
            </button>
          )}

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95"
          >
            <ArrowLeft size={14} />
            Quay lại
          </button>

          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-green-800 hover:no-underline active:scale-95"
          >
            <Home size={14} />
            Về trang chủ
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
