import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import {
  BarChart3,
  LayoutDashboard,
  ListTodo,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  iconClassName?: string;
}

function MenuItem({ icon, label, to, iconClassName }: MenuItemProps) {
  return (
    <Link
      to={to}
      activeProps={{ className: 'bg-white/10 text-white font-bold' }}
      inactiveProps={{ className: 'text-gray-400 hover:bg-white/5 hover:text-white' }}
      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200"
    >
      <span className={cn('transition-colors', iconClassName || 'group-hover:text-white')}>{icon}</span>
      <span className="flex-1 text-sm">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-[#071220] p-5 font-sans">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg">
          <img src="/fcode.png" alt="F-Code Logo" className="h-full w-full object-contain" />
        </div>
        <h1 className="text-3xl font-bold text-emerald-500!">F-Code</h1>
      </div>
      <nav className="flex-1 space-y-7">
        <div>
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Overview</p>
          <div className="space-y-1.5">
            <MenuItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              to="/judge"
              iconClassName="text-orange-500"
            />
            <MenuItem icon={<BarChart3 size={18} />} label="Analytics" to="/judge/analytics" />
          </div>
        </div>

        <div>
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Contests</p>
          <div className="space-y-1.5">
            <MenuItem icon={<Plus size={18} />} label="Create contest" to="/judge/contests/create" />
            <MenuItem icon={<ListTodo size={18} />} label="Manage contests" to="/judge/contests" />
            <MenuItem icon={<ShieldCheck size={18} />} label="Judging queue" to="/judge/queue" />
          </div>
        </div>
        <div>
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Support</p>
          <div className="space-y-1.5">
            <MenuItem icon={<MessageSquare size={18} />} label="Clarifications" to="/judge/clarifications" />
            <MenuItem icon={<Users size={18} />} label="Participants" to="/judge/participants" />
          </div>
        </div>
        <div>
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">General</p>
          <div className="space-y-1.5">
            <MenuItem icon={<Settings size={18} />} label="Settings" to="/judge/settings" />
          </div>
        </div>
      </nav>
      <div className="mt-auto border-t border-white/10 pt-3">
        <div className="group flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white shadow-lg">
            A
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold text-white">Admin</p>
            <p className="truncate text-sm text-gray-500">admin@gmail.com</p>
          </div>
          <Link
            to="/login"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
