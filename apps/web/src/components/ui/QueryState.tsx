import { cn } from '@/lib/utils';

interface QueryStateProps {
  message: string;
  size?: 'screen' | 'section' | 'inline';
  tone?: 'muted' | 'error';
}

export default function QueryState({ message, size = 'section', tone = 'muted' }: QueryStateProps) {
  const toneClass = tone === 'error' ? 'text-red-500' : 'text-gray-500';

  if (size === 'inline') {
    return <div className={cn('p-4 text-sm', toneClass)}>{message}</div>;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center text-sm',
        toneClass,
        size === 'screen' ? 'min-h-screen' : 'min-h-[50vh]',
      )}
    >
      {message}
    </div>
  );
}
