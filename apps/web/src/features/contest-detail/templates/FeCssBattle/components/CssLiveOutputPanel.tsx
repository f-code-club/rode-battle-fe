import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import type { CssBattleTarget } from '../../../types';

const DEFAULT_STAGE_WIDTH = 400;
const DEFAULT_STAGE_HEIGHT = 300;
const PREVIEW_DEBOUNCE_MS = 180;

const MOCK_STATS = {
  yours: { primaryLabel: 'Last score', primaryValue: '–', secondaryLabel: 'High score', secondaryValue: '–' },
  global: { primaryLabel: 'Top score', primaryValue: '972', secondaryLabel: 'Avg score', secondaryValue: '640' },
} as const;

interface CssLiveOutputPanelProps {
  html: string;
  css: string;
  target?: CssBattleTarget;
}

export default function CssLiveOutputPanel({ html, css, target }: CssLiveOutputPanelProps) {
  const [compare, setCompare] = useState(false);
  const [compareX, setCompareX] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [tab, setTab] = useState<'yours' | 'global'>('yours');
  const [scale, setScale] = useState(1);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  const stageWidth = target?.width ?? DEFAULT_STAGE_WIDTH;
  const stageHeight = target?.height ?? DEFAULT_STAGE_HEIGHT;

  const [debouncedHtml] = useDebounceValue(html, PREVIEW_DEBOUNCE_MS);
  const [debouncedCss] = useDebounceValue(css, PREVIEW_DEBOUNCE_MS);
  const previewDoc = `<style>html,body{width:${stageWidth}px;height:${stageHeight}px;overflow:hidden;box-sizing:border-box;margin:0}*{box-sizing:border-box}</style><style>${debouncedCss}</style>${debouncedHtml}`;

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

  const stats = MOCK_STATS[tab];

  return (
    <div className="flex h-130 min-h-0 flex-col overflow-hidden border-b border-gray-200 lg:h-full lg:border-r lg:border-b-0">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Live output</span>
        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-gray-600">
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
          Compare to target
        </label>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div
          onMouseMove={handleCompareMove}
          onMouseLeave={handleCompareLeave}
          className={`relative -m-4 p-4 ${compare ? 'cursor-ew-resize' : 'cursor-default'}`}
        >
          <div
            ref={stageWrapperRef}
            style={{ aspectRatio: `${stageWidth} / ${stageHeight}` }}
            className="relative w-full overflow-hidden rounded-sm border border-gray-300 bg-white"
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
            {compare && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${compareX}%)`,
                    transition: dragging ? 'none' : 'clip-path 0.25s ease',
                  }}
                >
                  {target?.targetImageUrl ? (
                    <img
                      src={target.targetImageUrl}
                      alt={target.title ?? 'Target'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 font-mono text-xs text-gray-400">
                      No target image
                    </div>
                  )}
                </div>
                <div
                  className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#A9812D]"
                  style={{ left: `${compareX}%` }}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setTab('yours')}
            className={`mr-5 cursor-pointer border-b-2 px-1 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors ${
              tab === 'yours'
                ? 'border-[#A9812D] text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Your stats
          </button>
          <button
            type="button"
            onClick={() => setTab('global')}
            className={`cursor-pointer border-b-2 px-1 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors ${
              tab === 'global'
                ? 'border-[#A9812D] text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Global stats
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 rounded-xs border border-gray-200 px-3.5 py-3">
            <div className="text-[10px] font-semibold tracking-[0.04em] text-gray-500 uppercase">
              {stats.primaryLabel}
            </div>
            <div className="mt-1 font-mono text-xl font-semibold text-gray-800">{stats.primaryValue}</div>
          </div>
          <div className="flex-1 rounded-xs border border-gray-200 px-3.5 py-3">
            <div className="text-[10px] font-semibold tracking-[0.04em] text-gray-500 uppercase">
              {stats.secondaryLabel}
            </div>
            <div className="mt-1 font-mono text-xl font-semibold text-gray-800">{stats.secondaryValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
