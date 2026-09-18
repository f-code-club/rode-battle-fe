import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { GlassPanel } from './GlassPanel';

interface FloatingGlassNavProps {
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

export function FloatingGlassNav({ threshold = 60, children, className }: FloatingGlassNavProps) {
  const visible = useScrolled(threshold);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out',
          visible && isCollapsed
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0',
        )}
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          title="Mở lại thanh điều hướng"
          className="group flex h-6 cursor-pointer items-center gap-1 rounded-b-xl border border-t-0 border-slate-200/90 bg-white/90 px-3.5 shadow-md backdrop-blur-md transition-all duration-200 hover:h-7 hover:bg-white hover:text-emerald-700"
        >
          <ChevronDown
            size={14}
            className="text-slate-600 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-emerald-700"
          />
          <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-hover:text-emerald-700">
            Menu
          </span>
        </button>
      </div>

      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-in-out',
          visible && !isCollapsed
            ? 'top-5 translate-y-0 opacity-100'
            : visible && isCollapsed
              ? 'pointer-events-none top-0 -translate-y-24 opacity-0'
              : 'pointer-events-none top-0 -translate-y-4 opacity-0',
        )}
      >
        <div className="relative flex flex-col items-center">
          <GlassPanel
            className={cn(
              'pointer-events-auto flex items-center gap-4 rounded-full px-6 py-2.5 transition-all duration-500 ease-in-out',
              visible && !isCollapsed ? 'scale-100' : 'scale-90',
              className,
            )}
          >
            {children}
          </GlassPanel>

          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            title="Thu gọn thanh điều hướng lên trên"
            className="group pointer-events-auto absolute -bottom-3.5 left-1/2 flex h-5 w-9 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-200 hover:-bottom-4 hover:h-5.5 hover:w-10 hover:bg-white hover:text-emerald-700 hover:shadow-md"
          >
            <ChevronUp
              size={14}
              className="text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-emerald-700"
            />
          </button>
        </div>
      </div>
    </>
  );
}
