import { EDITOR_THEMES, type PageColors } from '../config/editorThemes';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../config/stage';

interface PanelToolbarProps {
  themeId: string;
  onThemeIdChange: (id: string) => void;
  compare: boolean;
  onCompareChange: (value: boolean) => void;
  diff: boolean;
  onDiffChange: (value: boolean) => void;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
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
      style={{ color: colors.foreground, borderColor: colors.border, backgroundColor: colors.surface }}
      className="grid shrink-0 grid-cols-1 border-b lg:grid-cols-[1.6fr_1fr_1fr]"
    >
      <div className="flex items-center justify-between px-5 py-3">
        <span
          style={{ borderColor: colors.border }}
          className="border-b-2 border-b-[#A9812D] pb-1 text-xs font-medium tracking-[0.02em]"
        >
          index.html
        </span>

        <select
          value={themeId}
          onChange={(e) => onThemeIdChange(e.target.value)}
          aria-label="Editor color theme"
          style={{ backgroundColor: colors.surface, color: colors.foreground, borderColor: colors.border }}
          className="cursor-pointer rounded-sm border px-2 py-1 text-xs outline-none"
        >
          {EDITOR_THEMES.map((option) => (
            <option key={option.id} value={option.id} className="bg-[#20242C] text-white">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs font-semibold tracking-[0.03em] uppercase opacity-70">Live output</span>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs opacity-80">
            <input type="checkbox" checked={compare} onChange={(e) => onCompareChange(e.target.checked)} />
            Compare to target
          </label>
          <label className="flex cursor-pointer items-center gap-1.5 text-xs opacity-80">
            <input type="checkbox" checked={diff} onChange={(e) => onDiffChange(e.target.checked)} />
            Diff
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs font-semibold tracking-[0.03em] uppercase opacity-70">Target</span>
        <span className="font-mono text-xs opacity-70">
          {STAGE_WIDTH} × {STAGE_HEIGHT}
        </span>
      </div>
    </div>
  );
}
