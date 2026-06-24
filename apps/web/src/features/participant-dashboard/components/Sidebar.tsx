import { Share2, Trophy } from 'lucide-react';

function SideCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white font-sans text-slate-700 shadow-sm">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5">
        <h2 className="m-0 text-xs font-bold tracking-widest text-white uppercase">{title}</h2>
        <span className="text-slate-400">{icon}</span>
      </div>
      {children}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-5">
      <SideCard title="Top thành viên" icon={<Trophy size={14} />}>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </SideCard>

      <SideCard title="Top đóng góp" icon={<Trophy size={14} />}>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </SideCard>

      <SideCard title="Bài mới" icon={<Share2 size={14} />}>
        <div className="animate-pulse space-y-3 p-5">
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-100"></div>
        </div>
      </SideCard>
    </div>
  );
}
