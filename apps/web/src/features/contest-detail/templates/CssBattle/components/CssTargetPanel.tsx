import type { CssBattleTarget } from '../../../types';
import type { PageColors } from '../config/editorThemes';
import { DEFAULT_TARGET_IMAGE_URL } from '../config/target';

interface CssTargetPanelProps {
  target?: CssBattleTarget;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
}

export default function CssTargetPanel({ target, colors }: CssTargetPanelProps) {
  const width = target?.width ?? 400;
  const height = target?.height ?? 300;

  return (
    <div style={{ color: colors.foreground }} className="flex h-130 min-h-0 flex-col overflow-hidden lg:h-full">
      <div
        style={{ borderColor: colors.border }}
        className="flex shrink-0 items-center justify-between border-b px-5 py-3.5"
      >
        <span className="text-xs font-semibold tracking-[0.03em] uppercase opacity-70">Target</span>
        <span className="font-mono text-xs opacity-70">
          {width} × {height}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
          <img
            src={target?.targetImageUrl ?? DEFAULT_TARGET_IMAGE_URL}
            alt={target?.title ?? 'Target'}
            className="h-full w-full object-cover"
          />
        </div>

        {Boolean(target?.colors?.length) && (
          <div>
            <div className="mb-2 text-xs font-semibold tracking-[0.03em] uppercase opacity-70">Palette</div>
            <div className="flex flex-wrap gap-2">
              {target?.colors.map((c) => (
                <div
                  key={c.hex}
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                  className="flex items-center gap-2 rounded-xs border px-3 py-1.75"
                >
                  <span className="inline-block h-3 w-3 rounded-xs" style={{ background: c.hex }} />
                  <span className="font-mono text-xs opacity-80">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {Boolean(target?.sponsor) && (
          <div>
            <div className="mb-2 text-[11px] font-semibold tracking-[0.03em] uppercase opacity-70">Presented by</div>
            <div
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              className="flex h-18 w-full items-center justify-center rounded-xs border"
            >
              <span className="font-heading text-xs opacity-65">{target?.sponsor?.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
