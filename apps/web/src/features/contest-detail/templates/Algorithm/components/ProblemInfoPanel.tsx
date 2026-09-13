import type { BeAlgorithmMeta } from '../../../types';

interface ProblemInfoPanelProps {
  meta?: BeAlgorithmMeta;
}

export default function ProblemInfoPanel({ meta }: ProblemInfoPanelProps) {
  const rows = [
    { label: 'Time limit', value: meta?.timeLimitMs != null ? `${(meta.timeLimitMs / 1000).toFixed(1)}s` : '—' },
    { label: 'Memory limit', value: meta?.memoryLimitMb != null ? `${meta.memoryLimitMb} MB` : '—' },
  ];

  return (
    <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Problem Info</span>
      </div>
      <div className="flex flex-col gap-2.5 p-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-mono text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
