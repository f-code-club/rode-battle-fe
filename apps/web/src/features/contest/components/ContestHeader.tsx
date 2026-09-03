import type { PageColors } from '@/features/contest-detail/templates/CssBattle/config/editorThemes';

interface ContestHeaderProps {
  title: string;
  subtitle?: string;
  timeRemaining?: string;
  colors: Pick<PageColors, 'background' | 'foreground' | 'border'>;
}

export default function ContestHeader({ title, subtitle, timeRemaining, colors }: ContestHeaderProps) {
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

      {timeRemaining && (
        <div className="flex items-center gap-7">
          <div className="text-right">
            <div className="text-xs tracking-wider uppercase opacity-65" style={{ color: colors.foreground }}>
              Time remaining
            </div>
            <div className="text-sm font-medium">{timeRemaining}</div>
          </div>
        </div>
      )}
    </div>
  );
}
