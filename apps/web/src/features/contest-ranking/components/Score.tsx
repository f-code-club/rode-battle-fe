import { cn, formatScore } from '@/lib/utils';
import { useMotion } from '../hooks/useMotion';

interface ScoreProps {
  score: number;
  className?: string;
}

export default function Score({ score, className }: ScoreProps) {
  const isChanged = useMotion(score);

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-md bg-gray-100/80 px-2.5 py-1 font-mono text-xs font-black text-gray-900 transition-all duration-300',
        score > 0 && 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-300/60',
        isChanged && 'scale-125 bg-emerald-500 text-white shadow-md ring-2 ring-emerald-400',
        className,
      )}
    >
      {isChanged && (
        <span className="absolute -top-2 -left-1.5 animate-bounce text-[10px] font-black text-emerald-600">▲</span>
      )}
      {formatScore(score)}
    </span>
  );
}
