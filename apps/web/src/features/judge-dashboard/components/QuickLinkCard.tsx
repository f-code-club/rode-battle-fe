import { ArrowRight } from 'lucide-react';
import React from 'react';

interface QuickLinkCardProps {
  icon: React.ReactNode;
  badgeText?: string;
  showPulseDot?: boolean;
  title: string;
  description: string;
  statText: string;
  actionText: string;
}

export function QuickLinkCard({
  icon,
  badgeText,
  showPulseDot = false,
  title,
  description,
  statText,
  actionText,
}: QuickLinkCardProps) {
  return (
    <div className="group flex cursor-pointer flex-col justify-between rounded-md border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-900">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900">{icon}</div>
          {badgeText && (
            <span className="flex items-center gap-1.5 rounded bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 uppercase">
              {showPulseDot && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
              {badgeText}
            </span>
          )}
        </div>
        <h4 className="text-base font-bold text-gray-900">{title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
        <span className="font-mono font-semibold text-gray-500">{statText}</span>
        <span className="flex items-center gap-1 font-semibold text-gray-900 transition-transform group-hover:translate-x-0.5">
          {actionText} <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
