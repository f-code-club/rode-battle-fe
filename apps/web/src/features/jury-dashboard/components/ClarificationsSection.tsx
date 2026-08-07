import { cn } from '@/lib/utils';
import { AlertCircle, HelpCircle, MessageSquare } from 'lucide-react';

interface ClarificationRowProps {
  title: string;
  priority: 'HIGH' | 'MED' | 'LOW';
  time: string;
  author: string;
}

const PRIORITY_CONFIG = {
  HIGH: { icon: AlertCircle, className: 'bg-red-100 text-red-600' },
  MED: { icon: HelpCircle, className: 'bg-orange-100 text-orange-600' },
  LOW: { icon: MessageSquare, className: 'bg-gray-100 text-gray-500' },
};

const ClarificationRow = ({ title, priority, time, author }: ClarificationRowProps) => {
  const { icon: Icon, className } = PRIORITY_CONFIG[priority];
  return (
    <div className="flex cursor-pointer items-start gap-3.5 p-4 transition-colors hover:bg-gray-50">
      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', className)}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-gray-900">{title}</h4>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <span>{time}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="truncate">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default function ClarificationsSection() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <MessageSquare size={16} className="text-gray-700" />
        <h3 className="text-sm font-bold text-gray-900">Clarifications</h3>
      </div>
      <div className="divide-y divide-gray-100">
        <ClarificationRow
          title="Problem C: Sample output 2 explanation unclear?"
          priority="HIGH"
          time="5m ago"
          author="@tourist"
        />
        <ClarificationRow
          title="Time limit in B seems too tight for Java"
          priority="MED"
          time="14m ago"
          author="@petr"
        />
        <ClarificationRow title="Memory limit exceeded on test 1?" priority="LOW" time="1h ago" author="@jiangly" />
      </div>
    </div>
  );
}
