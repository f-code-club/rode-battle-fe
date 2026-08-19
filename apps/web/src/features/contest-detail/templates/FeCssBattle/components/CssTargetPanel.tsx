import type { CssBattleTarget } from '../../../types';

interface CssTargetPanelProps {
  target?: CssBattleTarget;
}

export default function CssTargetPanel({ target }: CssTargetPanelProps) {
  const width = target?.width ?? 400;
  const height = target?.height ?? 300;

  return (
    <div className="flex h-130 min-h-0 flex-col overflow-hidden lg:h-full">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-3.5">
        <span className="text-[13px] font-semibold tracking-[0.03em] text-gray-700 uppercase">Target</span>
        <span className="font-mono text-xs text-gray-500">
          {width} × {height}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs border border-gray-300 bg-gray-50">
          {target?.targetImageUrl ? (
            <img src={target.targetImageUrl} alt={target.title ?? 'Target'} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-gray-400">
              No target image
            </div>
          )}
        </div>

        {Boolean(target?.colors?.length) && (
          <div>
            <div className="mb-2 text-[11px] font-semibold tracking-[0.03em] text-gray-500 uppercase">Palette</div>
            <div className="flex flex-wrap gap-2">
              {target?.colors.map((c) => (
                <div key={c.hex} className="flex items-center gap-2 rounded-xs border border-gray-200 px-3 py-1.75">
                  <span className="inline-block h-3 w-3 rounded-xs" style={{ background: c.hex }} />
                  <span className="font-mono text-xs text-gray-600">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {Boolean(target?.sponsor) && (
          <div>
            <div className="mb-2 text-[11px] font-semibold tracking-[0.03em] text-gray-500 uppercase">Presented by</div>
            <div className="flex h-18 w-full items-center justify-center rounded-xs border border-gray-200 bg-white">
              <span className="font-heading text-xs text-gray-400">{target?.sponsor?.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
