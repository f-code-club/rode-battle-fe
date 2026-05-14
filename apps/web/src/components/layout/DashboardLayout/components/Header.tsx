import Navbar from '@/components/layout/DashboardLayout/components/Navbar';
import { Link } from '@tanstack/react-router';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-6 border-b border-slate-100 bg-white px-8 font-sans">
      <div className="flex items-center gap-3">
        <img src="/fcode.svg" alt="F-Code Logo" className="h-12 w-12" />
      </div>

      <div className="flex h-full flex-1 items-stretch gap-1">
        <Navbar />
        <div className="ml-auto flex items-center gap-4 pl-4">
          <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="group relative">
            <button className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-slate-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-green-900 text-xs font-bold text-white shadow-sm">
                A
              </div>
            </button>

            <div className="invisible absolute top-full right-0 w-48 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mt-2 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500">admin@fcode.com</p>
                </div>

                <div className="p-1.5">
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-teal-600"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-teal-600"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>

                <div className="border-t border-slate-50 p-1.5">
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
