import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className, style, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'border border-white/30 bg-white/20',
        'shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]',
        'backdrop-blur-2xl',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-b before:from-white/40 before:to-transparent',
        className,
      )}
      style={{
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
