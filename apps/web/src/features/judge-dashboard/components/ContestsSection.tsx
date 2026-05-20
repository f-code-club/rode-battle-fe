import { Trophy } from 'lucide-react';

interface ContestRowProps {
  title: string;
  badge: string;
  timeInfo: string;
  metaInfo: string;
}

const ContestRow = ({ title, badge, timeInfo, metaInfo }: ContestRowProps) => {
  return (
    <div className="flex cursor-pointer items-start gap-3.5 p-4 transition-colors hover:bg-gray-50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
        <Trophy size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-gray-900">{title}</h4>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
          {badge === 'LIVE' && (
            <span className="flex items-center gap-1 rounded bg-black px-1.5 py-0.5 text-xs font-bold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              LIVE
            </span>
          )}
          <span>{timeInfo}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="truncate">{metaInfo}</span>
        </div>
      </div>
    </div>
  );
};

export default function ContestsSection() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <Trophy size={16} className="text-gray-700" />
        <h3 className="text-sm font-bold text-gray-900">Contests</h3>
      </div>
      <div className="divide-y divide-gray-100">
        <ContestRow
          title="Rode Battle Championship 2026 - Elimination"
          badge="LIVE"
          timeInfo="1h 23m left"
          metaInfo="2,847 in"
        />
        <ContestRow title="F-Code Weekly Round" badge="" timeInfo="starts in 2d 14h" metaInfo="1,420 registered" />
        <ContestRow title="Beginner Warmup Round - May 2026" badge="" timeInfo="May 18" metaInfo="setup in review" />
      </div>
    </div>
  );
}
