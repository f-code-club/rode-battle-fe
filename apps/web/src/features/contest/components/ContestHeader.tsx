import type { PageColors } from '@/features/contest-detail/templates/CssBattle/config/editorThemes';
import { History } from 'lucide-react';

interface ContestHeaderProps {
  title: string;
  subtitle?: string;
  timeRemaining?: string;
  colors: Pick<PageColors, 'background' | 'foreground' | 'border'>;
  onOpenHistory?: () => void;
}

export default function ContestHeader({ title, subtitle, timeRemaining, colors, onOpenHistory }: ContestHeaderProps) {
  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
        borderBottom: `1px solid color-mix(in srgb, #A9812D 45%, ${colors.background})`,
      }}
      className="flex flex-wrap items-center justify-between gap-y-2 px-7 py-3.5"
    >
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">{title}</span>
        {subtitle && (
          <>
            <span className="hidden h-4 w-px sm:block" style={{ backgroundColor: colors.border }} />
            <span
              className="hidden text-xs tracking-wider whitespace-nowrap uppercase opacity-75 sm:inline"
              style={{ color: colors.foreground }}
            >
              {subtitle}
            </span>
          </>
        )}
      </div>

      {(timeRemaining || onOpenHistory) && (
        <div className="flex items-center gap-4">
          {timeRemaining && (
            <div className="text-right">
              <div className="text-xs tracking-wider uppercase opacity-65" style={{ color: colors.foreground }}>
                Time remaining
              </div>
              <div className="text-sm font-medium">{timeRemaining}</div>
            </div>
          )}
          {onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="flex cursor-pointer items-center gap-1.5 rounded-sm bg-[#D9A441] px-3 py-1.5 text-xs font-semibold text-[#241a03] shadow-sm transition-colors hover:bg-[#e6b75c]"
            >
              <History size={14} />
              Submission History
            </button>
          )}
        </div>
      )}
    </div>
  );
}
