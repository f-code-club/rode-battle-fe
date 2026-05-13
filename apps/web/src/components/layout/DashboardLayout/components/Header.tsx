import Navbar from '@/components/layout/DashboardLayout/components/Navbar';
import { LogOut } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-6 border-b border-slate-100 bg-white px-8 font-sans">
      <div className="flex items-center gap-2.5">
        <img src="/fcode.svg" alt="F-Code Logo" className="h-12 w-12" />
      </div>

      <div className="flex h-full flex-1 items-stretch gap-1">
        <Navbar />
        <div className="ml-auto flex items-center gap-4 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-green-900 text-xs font-bold text-white shadow-sm">
            A
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
            <LogOut className="h-4 w-4 text-slate-400" />
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
