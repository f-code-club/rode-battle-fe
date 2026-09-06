import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ChevronDown, LogOut, Menu, Settings } from 'lucide-react';
import { useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import MobileNav from './MobileNav';
import Navbar from './Navbar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { user } = useAuthContext();
  const logout = useLogout();
  const userInitial = user?.name.charAt(0).toUpperCase() || '?';

  useOnClickOutside(containerRef, () => setIsOpen(false));
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setIsNavOpen(false);
    }
  });

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <>
      <div className="sticky top-3 z-50 px-4 sm:px-6 lg:px-8">
        <header className="mx-auto flex max-w-7xl items-center gap-3 rounded-lg border border-gray-200/70 bg-white/95 px-3 py-2.5 shadow-xs backdrop-blur-xl sm:px-5">
          <Link to="/admin" className="flex shrink-0 items-center gap-2.5 hover:no-underline">
            <img src="/fcode.svg" alt="F-Code Logo" className="h-8 w-8" />
            <span className="text-base font-bold tracking-tight text-gray-900">F-Code</span>
            <span className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:inline">
              Admin
            </span>
          </Link>

          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsNavOpen(true)}
            className="flex cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center lg:ml-6">
            <Navbar />
          </div>

          <div ref={containerRef} className="relative flex shrink-0 items-center">
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors hover:bg-gray-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                {userInitial}
              </div>
              <span className="hidden text-sm font-semibold text-gray-900 sm:inline">{user?.name ?? '...'}</span>
              <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
            </button>

            <div
              className={cn(
                'absolute top-full right-0 mt-2 w-52 transition-all duration-200',
                isOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-1 opacity-0',
              )}
            >
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{user?.name ?? '...'}</p>
                  <p className="truncate text-xs text-gray-500">{user?.email ?? '...'}</p>
                </div>
                <div className="p-1.5">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 hover:no-underline"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-gray-100 p-1.5">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
