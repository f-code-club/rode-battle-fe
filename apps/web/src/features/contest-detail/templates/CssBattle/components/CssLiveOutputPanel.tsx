import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import type { CssBattleTarget } from '../../../types';
import type { PageColors } from '../config/editorThemes';
import { DEFAULT_TARGET_IMAGE_URL } from '../config/target';

const DEFAULT_STAGE_WIDTH = 400;
const DEFAULT_STAGE_HEIGHT = 300;
const PREVIEW_DEBOUNCE_MS = 180;

const STATS = {
  primaryLabel: 'Last score',
  primaryValue: '–',
  secondaryLabel: 'High score',
  secondaryValue: '–',
} as const;

interface CssLiveOutputPanelProps {
  code: string;
  target?: CssBattleTarget;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
}

function TargetImage({ target, className }: { target?: CssBattleTarget; className?: string }) {
  return (
    <img
      src={target?.targetImageUrl ?? DEFAULT_TARGET_IMAGE_URL}
      alt={target?.title ?? 'Target'}
      className={className ?? 'h-full w-full object-cover'}
    />
  );
}

export default function CssLiveOutputPanel({ code, target, colors }: CssLiveOutputPanelProps) {
  const [compare, setCompare] = useState(false);
  const [diff, setDiff] = useState(false);
  const [compareX, setCompareX] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  const stageWidth = target?.width ?? DEFAULT_STAGE_WIDTH;
  const stageHeight = target?.height ?? DEFAULT_STAGE_HEIGHT;

  const [debouncedCode] = useDebounceValue(code, PREVIEW_DEBOUNCE_MS);
  const previewDoc = `<style>html,body{width:${stageWidth}px;height:${stageHeight}px;overflow:hidden;box-sizing:border-box;margin:0}*{box-sizing:border-box}</style>${debouncedCode}`;

  useEffect(() => {
    const wrapper = stageWrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => setScale(wrapper.clientWidth / stageWidth);
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [stageWidth]);

  const handleCompareMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!compare) return;
    const PAD = 16;
    const outer = e.currentTarget.getBoundingClientRect();
    const left = outer.left + PAD;
    const width = outer.width - PAD * 2;
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    setCompareX(x);
    setDragging(true);
  };

  const handleCompareLeave = () => {
    setCompareX(100);
    setDragging(false);
  };

  return (
    <div
      style={{ color: colors.foreground, borderColor: colors.border }}
      className="flex h-130 min-h-0 flex-col overflow-hidden border-b lg:h-full lg:border-r lg:border-b-0"
    >
      <div
        style={{ borderColor: colors.border }}
        className="flex shrink-0 items-center justify-between border-b px-5 py-3.5"
      >
        <span className="text-xs font-semibold tracking-[0.03em] uppercase opacity-70">Live output</span>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs opacity-80">
            <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
            Compare to target
          </label>
          <label className="flex cursor-pointer items-center gap-1.5 text-xs opacity-80">
            <input type="checkbox" checked={diff} onChange={(e) => setDiff(e.target.checked)} />
            Diff
          </label>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div
          onMouseMove={handleCompareMove}
          onMouseLeave={handleCompareLeave}
          className={`relative -m-4 p-4 ${compare ? 'cursor-ew-resize' : 'cursor-default'}`}
        >
          <div
            ref={stageWrapperRef}
            style={{ aspectRatio: `${stageWidth} / ${stageHeight}`, isolation: 'isolate' }}
            className="relative w-full overflow-hidden bg-white"
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: stageWidth,
                height: stageHeight,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              <iframe
                title="live output"
                srcDoc={previewDoc}
                sandbox=""
                width={stageWidth}
                height={stageHeight}
                className="pointer-events-none border-none"
              />
            </div>
            {diff && (
              <div className="pointer-events-none absolute inset-0 mix-blend-difference">
                <TargetImage target={target} />
              </div>
            )}
            {compare && (
              <>
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                  <TargetImage target={target} />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${compareX}%)`,
                    transition: dragging ? 'none' : 'clip-path 0.25s ease',
                  }}
                >
                  <TargetImage target={target} />
                </div>
                <div
                  className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#A9812D]"
                  style={{ left: `${compareX}%` }}
                />
              </>
            )}
          </div>
        </div>

        <div style={{ borderColor: colors.border }} className="flex border-b">
          <span className="border-b-2 border-[#A9812D] px-1 py-2 text-[13px] font-semibold whitespace-nowrap">
            Your stats
          </span>
        </div>

        <div className="flex gap-3">
          <div
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            className="flex-1 rounded-xs border px-3.5 py-3"
          >
            <div className="text-[10px] font-semibold tracking-[0.04em] uppercase opacity-70">{STATS.primaryLabel}</div>
            <div className="mt-1 font-mono text-xl font-semibold">{STATS.primaryValue}</div>
          </div>
          <div
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            className="flex-1 rounded-xs border px-3.5 py-3"
          >
            <div className="text-[10px] font-semibold tracking-[0.04em] uppercase opacity-70">
              {STATS.secondaryLabel}
            </div>
            <div className="mt-1 font-mono text-xl font-semibold">{STATS.secondaryValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
