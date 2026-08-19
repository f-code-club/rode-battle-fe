import { cn } from '@/lib/utils';
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
        'relative inline-block font-bold text-gray-900 transition-all duration-300',
        isChanged && 'scale-125 font-black text-green-600',
        className,
      )}
    >
      {isChanged && (
        <span
          className="absolute -left-3 font-bold text-green-500"
          style={{ animation: 'modal-fade-in 1s ease-out reverse forwards' }}
        >
          +
        </span>
      )}
      {score}
    </span>
  );
}
