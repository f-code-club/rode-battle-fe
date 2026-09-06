import MobileNav from '@/components/layout/DashboardLayout/components/MobileNav';
import Navbar from '@/components/layout/DashboardLayout/components/Navbar';
import { FloatingGlassNav } from '@/components/ui/FloatingGlassNav';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useAuth';
import type { AuthUser } from '@/features/auth/services/auth.service';
import { useScrolled } from '@/hooks/useScrolled';
import { Link } from '@tanstack/react-router';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface UserDropdownContentProps {
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
}

function UserDropdownContent({ user, onClose, onLogout }: UserDropdownContentProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-2xl">
      <div className="border-b border-slate-100/60 px-4 py-3">
        <p className="text-sm font-semibold text-slate-800">{user?.name ?? '...'}</p>
        <p className="text-xs text-slate-500">{user?.email ?? '...'}</p>
      </div>
      <div className="p-1.5">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-teal-600"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-teal-600"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
      <div className="border-t border-slate-100/60 p-1.5">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50/70"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [isStickyOpen, setIsStickyOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const scrolled = useScrolled();
  const floatingRef = useRef<HTMLDivElement>(null!);
  const stickyRef = useRef<HTMLDivElement>(null!);
  const { accessToken, user, isAuthReady } = useAuthContext();
  const isLoggedIn = isAuthReady && Boolean(accessToken);
  const logout = useLogout();

  useOnClickOutside(floatingRef, () => setIsFloatingOpen(false));
  useOnClickOutside(stickyRef, () => setIsStickyOpen(false));
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFloatingOpen(false);
      setIsStickyOpen(false);
      setIsNavOpen(false);
    }
  });

  function handleLogout() {
    setIsFloatingOpen(false);
    setIsStickyOpen(false);
    logout();
  }

  const userInitial = user?.name.charAt(0).toUpperCase() || '?';

  return (
    <>
      <FloatingGlassNav>
        <img src="/fcode.svg" alt="F-Code Logo" className="h-9 w-9 shrink-0 drop-shadow-sm" />

        <div className="h-6 w-px bg-slate-300/60" />

        <Navbar floating />

        <div className="h-6 w-px bg-slate-300/60" />

        {!isAuthReady ? (
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200/70" />
        ) : isLoggedIn ? (
          <div className="flex items-center gap-1.5">
            <button className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white" />
            </button>

            <div className="relative flex items-center" ref={floatingRef}>
              <button
                onClick={() => setIsFloatingOpen((v) => !v)}
                className="flex items-center rounded-full transition-all hover:ring-2 hover:ring-white/60"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-teal-500 to-green-700 text-xs font-bold text-white shadow-sm">
                  {userInitial}
                </div>
              </button>

              <div
                className={`absolute top-full right-0 mt-3 w-48 transition-all duration-200 ${
                  isFloatingOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible translate-y-2 opacity-0'
                }`}
              >
                <UserDropdownContent user={user} onClose={() => setIsFloatingOpen(false)} onLogout={handleLogout} />
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-green-700 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-green-900 hover:no-underline active:scale-[0.97]"
          >
            Sign In
          </Link>
        )}
      </FloatingGlassNav>

      <header
        className={`sticky top-0 z-40 flex h-16 w-full items-center border-b border-slate-100 bg-white/80 font-sans shadow-sm backdrop-blur-md transition-all duration-500 ease-in-out ${scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} `}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-6 px-4 md:px-8">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/fcode.svg" alt="F-Code Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <button
              onClick={() => setIsNavOpen(true)}
              className="flex rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="flex h-full flex-1 items-stretch">
            <Navbar />

            <div className="ml-auto flex items-center gap-2 md:gap-4">
              {!isAuthReady ? (
                <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200/70" />
              ) : isLoggedIn ? (
                <>
                  <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>

                  <div className="relative flex items-center" ref={stickyRef}>
                    <button
                      onClick={() => setIsStickyOpen((v) => !v)}
                      className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-green-900 text-xs font-bold text-white shadow-sm md:h-10 md:w-10">
                        {userInitial}
                      </div>
                    </button>

                    <div
                      className={`absolute top-full right-0 mt-3 w-48 transition-all duration-200 ${
                        isStickyOpen
                          ? 'visible translate-y-0 opacity-100'
                          : 'pointer-events-none invisible translate-y-2 opacity-0'
                      }`}
                    >
                      <UserDropdownContent user={user} onClose={() => setIsStickyOpen(false)} onLogout={handleLogout} />
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-green-900 hover:no-underline active:scale-[0.97]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
