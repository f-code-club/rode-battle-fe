import { cn } from '@/lib/utils';
import { useMotion } from '../hooks/useMotion';

interface ProblemProps {
  score: number;
  submissionCount: number;
}

export default function Problem({ score, submissionCount }: ProblemProps) {
  const isChanged = useMotion(score);

  if (submissionCount === 0) {
    return <span className="text-gray-300">—</span>;
  }

  return (
    <span
      className={cn(
        'relative inline-block text-sm font-semibold transition-all duration-300',
        isChanged && 'scale-130 font-black text-green-600',
      )}
    >
      {isChanged && (
        <span
          className="absolute -left-2.5 font-bold text-green-500"
          style={{ animation: 'modal-fade-in 1s ease-out reverse forwards' }}
        >
          +
        </span>
      )}
      {score}
    </span>
  );
}
