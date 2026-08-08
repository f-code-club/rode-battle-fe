import { useScrolled } from '@/hooks/useScrolled';
import { GlassPanel } from './GlassPanel';

interface FloatingGlassNavProps {
  threshold?: number;
  children: React.ReactNode;
}

export function FloatingGlassNav({ threshold = 60, children }: FloatingGlassNavProps) {
  const visible = useScrolled(threshold);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
        visible ? 'top-5 opacity-100' : 'top-0 opacity-0'
      }`}
    >
      <GlassPanel
        className={`pointer-events-auto flex items-center gap-4 rounded-full px-6 py-2.5 transition-all duration-500 ease-in-out ${
          visible ? 'translate-y-0 scale-100' : '-translate-y-4 scale-90'
        }`}
      >
        {children}
      </GlassPanel>
    </div>
  );
}
