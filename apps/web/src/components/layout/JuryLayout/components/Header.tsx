import { HelpCircle, Mail, Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="flex h-full items-center justify-between">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100">
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 text-gray-400 sm:gap-4">
        <div className="relative mr-2 hidden md:block">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2" size={15} />
          <input
            type="text"
            placeholder="Search contests..."
            className="w-64 rounded-full bg-gray-100 py-1.5 pr-4 pl-10 text-sm text-black transition-all outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <button className="rounded-full p-2 transition-all hover:bg-gray-100 hover:text-gray-600">
          <HelpCircle size={20} />
        </button>
        <button className="relative rounded-full p-2 transition-all hover:bg-gray-100 hover:text-gray-600">
          <Mail size={20} />
        </button>
        <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 shadow-sm transition-all hover:bg-gray-100">
          <User size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
