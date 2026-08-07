import { Radio } from 'lucide-react';

export default function LiveContestSection() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <div className="flex items-center border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <Radio size={18} className="text-red-600" />
          <h3 className="text-base font-bold text-gray-900">Live Contest</h3>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-green-50 px-5 py-2.5 sm:flex-nowrap">
        <div className="inline-flex items-center gap-1.5 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">
          LIVE
        </div>
        <div className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">Round 941 — Educational</div>
        <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-gray-700">
          <span className="text-xs font-medium text-gray-500">ends in</span> 1h 23m
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 p-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-md bg-blue-50 p-3.5">
          <div className="mb-2.5 flex h-6 items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Participants</span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-gray-900">2,847</div>
          <div className="mt-1 text-xs text-gray-500">
            <span className="font-medium text-green-800">● 2,514 online</span>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-orange-50 p-3.5">
          <div className="mb-2.5 flex h-6 items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Teams</span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-gray-900">486</div>
          <div className="mt-1 text-xs text-gray-500">avg 5.9 members</div>
        </div>

        <div className="flex flex-col rounded-md bg-amber-50 p-3.5">
          <div className="mb-2.5 flex h-6 items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Submissions</span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-gray-900">11,294</div>
          <div className="mt-1 text-xs text-gray-500">142/min right now</div>
        </div>

        <div className="flex flex-col rounded-md bg-green-50 p-3.5">
          <div className="mb-2.5 flex h-6 items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">AC rate</span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-gray-900">38%</div>
          <div className="mt-1 text-xs text-gray-500">4,291 accepted</div>
        </div>
      </div>
    </div>
  );
}
