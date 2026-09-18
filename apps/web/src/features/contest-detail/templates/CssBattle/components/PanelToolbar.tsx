import { cn } from '@/lib/utils';
import { Check, ChevronDown, Code2, Palette, Target } from 'lucide-react';
import { EDITOR_THEMES, type PageColors } from '../config/editorThemes';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../config/stage';

interface PanelToolbarProps {
  themeId: string;
  onThemeIdChange: (id: string) => void;
  compare: boolean;
  onCompareChange: (value: boolean) => void;
  diff: boolean;
  onDiffChange: (value: boolean) => void;
  colors: Pick<PageColors, 'foreground' | 'border' | 'background'>;
}

export default function PanelToolbar({
  themeId,
  onThemeIdChange,
  compare,
  onCompareChange,
  diff,
  onDiffChange,
  colors,
}: PanelToolbarProps) {
  return (
    <div
      style={{
        color: colors.foreground,
        borderColor: colors.border,
        backgroundColor: colors.background,
      }}
      className="grid shrink-0 grid-cols-1 border-b bg-black/25 backdrop-blur-md lg:grid-cols-[1.6fr_1fr_1fr]"
    >
      <div
        style={{ borderColor: colors.border }}
        className="flex items-center justify-between border-b px-4 py-2 sm:px-5 lg:border-r lg:border-b-0"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 border-b-2 border-amber-400 px-2 py-0.5 text-xs font-semibold text-white/95">
            <Code2 size={13} className="text-amber-400" />
            <span>index.html</span>
          </div>
        </div>

        <div className="relative flex items-center">
          <Palette size={13} className="pointer-events-none absolute left-2.5 text-white/50" />
          <select
            value={themeId}
            onChange={(e) => onThemeIdChange(e.target.value)}
            aria-label="Editor color theme"
            style={{
              borderColor: colors.border,
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: colors.foreground,
            }}
            className="cursor-pointer appearance-none rounded-lg border py-1 pr-7 pl-7 text-xs font-medium transition-all outline-none hover:border-white/25 hover:bg-white/8 focus:border-amber-400/60"
          >
            {EDITOR_THEMES.map((option) => (
              <option key={option.id} value={option.id} className="bg-[#161b22] text-white">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2 text-white/50" />
        </div>
      </div>

      <div
        style={{ borderColor: colors.border }}
        className="flex items-center justify-between border-b px-4 py-2 sm:px-5 lg:border-r lg:border-b-0"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase">Live Output</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="group flex cursor-pointer items-center gap-2 select-none">
            <span
              className={cn(
                'flex size-3.5 items-center justify-center rounded border transition-all duration-150',
                compare
                  ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs shadow-amber-400/30'
                  : 'border-white/25 bg-white/5 group-hover:border-white/40 group-hover:bg-white/10',
              )}
            >
              <Check
                size={11}
                strokeWidth={3.5}
                className={cn(
                  'transition-transform duration-150',
                  compare ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
                )}
              />
            </span>
            <input
              type="checkbox"
              checked={compare}
              onChange={(e) => onCompareChange(e.target.checked)}
              className="sr-only"
            />
            <span
              className={cn(
                'text-xs font-medium transition-colors',
                compare ? 'font-semibold text-white' : 'text-white/70 group-hover:text-white',
              )}
            >
              Compare to target
            </span>
          </label>

          <label className="group flex cursor-pointer items-center gap-2 select-none">
            <span
              className={cn(
                'flex size-3.5 items-center justify-center rounded border transition-all duration-150',
                diff
                  ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs shadow-amber-400/30'
                  : 'border-white/25 bg-white/5 group-hover:border-white/40 group-hover:bg-white/10',
              )}
            >
              <Check
                size={11}
                strokeWidth={3.5}
                className={cn(
                  'transition-transform duration-150',
                  diff ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
                )}
              />
            </span>
            <input
              type="checkbox"
              checked={diff}
              onChange={(e) => onDiffChange(e.target.checked)}
              className="sr-only"
            />
            <span
              className={cn(
                'text-xs font-medium transition-colors',
                diff ? 'font-semibold text-white' : 'text-white/70 group-hover:text-white',
              )}
            >
              Diff
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 sm:px-5">
        <div className="flex items-center gap-1.5">
          <Target size={13} className="text-amber-400" />
          <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase">Target</span>
        </div>

        <div
          style={{ borderColor: colors.border }}
          className="flex items-center gap-1 rounded-md border bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70 shadow-xs"
        >
          <span>{STAGE_WIDTH}px</span>
          <span className="text-white/30">×</span>
          <span>{STAGE_HEIGHT}px</span>
        </div>
      </div>
    </div>
  );
}
