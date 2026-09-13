import { Link, type LinkProps } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface QuickLinkCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText: string;
  to: LinkProps['to'];
  stat?: string;
}

export default function QuickLinkCard({ icon, title, description, actionText, to, stat }: QuickLinkCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-md border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-900"
    >
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
          {icon}
        </div>
        <h4 className="text-base font-bold text-gray-900">{title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
        <span className="font-semibold text-gray-500">{stat}</span>
        <span className="flex items-center gap-1 font-semibold text-gray-900 transition-transform group-hover:translate-x-0.5">
          {actionText} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
