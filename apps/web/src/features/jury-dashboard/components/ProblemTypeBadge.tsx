import { cn } from '@/lib/utils';
import type { ProblemType } from '../types';
import { PROBLEM_TYPE_LABELS } from '../utils/problem';

interface ProblemTypeBadgeProps {
  type: ProblemType;
  className?: string;
}

export default function ProblemTypeBadge({ type, className }: ProblemTypeBadgeProps) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold',
        type === 'CSS_BATTLE' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700',
        className,
      )}
    >
      {PROBLEM_TYPE_LABELS[type]}
    </span>
  );
}
