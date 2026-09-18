import { cn } from '@/lib/utils';
import { useMotion } from '../hooks/useMotion';

interface PenaltyProps {
  penalty: number;
  className?: string;
}

export default function Penalty({ penalty, className }: PenaltyProps) {
  const isChanged = useMotion(penalty);

  return (
    <span
      className={cn(
        'relative inline-block font-mono text-xs font-semibold text-gray-500 tabular-nums transition-all duration-300',
        isChanged && 'scale-115 font-bold text-rose-600',
        className,
      )}
    >
      {penalty}
    </span>
  );
}
