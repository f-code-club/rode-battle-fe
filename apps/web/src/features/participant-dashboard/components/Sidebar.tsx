import { Share2, Trophy } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-6 overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
        <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
          <h2 className="m-0 text-base font-bold tracking-wide text-white">Top thành viên</h2>
          <Trophy />
        </div>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
        <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
          <h2 className="m-0 text-base font-bold tracking-wide text-white">Top đóng góp</h2>
          <Trophy />
        </div>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
        <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
          <h2 className="m-0 text-base font-bold tracking-wide text-white">Bài mới</h2>
          <Share2 />
        </div>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
}
