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
        'relative inline-block text-gray-500 transition-all duration-300',
        isChanged && 'scale-115 font-bold text-red-500',
        className,
      )}
    >
      {isChanged && (
        <span
          className="absolute -left-3 font-bold text-red-400"
          style={{ animation: 'modal-fade-in 1s ease-out reverse forwards' }}
        >
          +
        </span>
      )}
      {penalty}
    </span>
  );
}
