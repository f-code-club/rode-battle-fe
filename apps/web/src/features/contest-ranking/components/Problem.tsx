import { cn, formatScore } from '@/lib/utils';
import { useMotion } from '../hooks/useMotion';

interface ProblemProps {
  score: number;
  submissionCount: number;
  lastSubmit?: string;
}

export default function Problem({ score, submissionCount, lastSubmit }: ProblemProps) {
  const isChanged = useMotion(score);

  if (submissionCount === 0) {
    return <span className="font-mono text-sm text-gray-300 select-none">—</span>;
  }

  const isSolved = score > 0;
  const formattedTime = lastSubmit
    ? new Date(lastSubmit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : undefined;

  if (isSolved) {
    return (
      <div
        title={`Đã giải được! Điểm: ${formatScore(score)}${formattedTime ? ` lúc ${formattedTime}` : ''} (${submissionCount} lần nộp)`}
        className={cn(
          'relative inline-flex min-w-12.5 items-center justify-center rounded-lg border border-emerald-300/80 bg-emerald-50 px-2.5 py-1.5 font-mono text-emerald-800 transition-all duration-300 hover:border-emerald-400',
          isChanged && 'scale-115 ring-2 ring-emerald-500',
        )}
      >
        <span className="text-xs font-black tracking-tight">{formatScore(score)}</span>
      </div>
    );
  }

  return (
    <div
      title={`Đã nộp ${submissionCount} lần (chưa qua)`}
      className={cn(
        'inline-flex min-w-12.5 items-center justify-center rounded-lg border border-rose-200 bg-rose-50/80 px-2.5 py-1.5 font-mono text-rose-700 transition-all duration-200',
        isChanged && 'scale-110 ring-2 ring-rose-400',
      )}
    >
      <span className="text-xs font-bold tracking-tight">{formatScore(score)}</span>
    </div>
  );
}
