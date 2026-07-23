import MobileNav from '@/components/layout/DashboardLayout/components/MobileNav';
import Navbar from '@/components/layout/DashboardLayout/components/Navbar';
import { Link } from '@tanstack/react-router';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(containerRef, () => setIsOpen(false));
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setIsNavOpen(false);
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${scrolled ? 'top-5 opacity-100' : 'top-0 opacity-0'} `}
      >
        <div
          className={`pointer-events-auto flex items-center gap-4 px-6 py-2.5 transition-all duration-500 ease-in-out ${scrolled ? 'translate-y-0 scale-100' : '-translate-y-4 scale-90'} relative overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-white/40 before:to-transparent`}
          style={{
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <img src="/fcode.svg" alt="F-Code Logo" className="h-9 w-9 shrink-0 drop-shadow-sm" />

          <div className="h-6 w-px bg-slate-300/60" />

          <Navbar floating />

          <div className="h-6 w-px bg-slate-300/60" />

          <div className="flex items-center gap-1.5">
            <button className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white" />
            </button>

            <div className="relative flex items-center" ref={containerRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center rounded-full transition-all hover:ring-2 hover:ring-white/60"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-teal-500 to-green-700 text-xs font-bold text-white shadow-sm">
                  A
                </div>
              </button>

              <div
                className={`absolute top-full right-0 mt-3 w-48 transition-all duration-200 ${
                  isOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/70 shadow-2xl backdrop-blur-2xl">
                  <div className="border-b border-slate-100/60 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">Admin User</p>
                    <p className="text-xs text-slate-500">admin@fcode.com</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-teal-600"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-teal-600"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-slate-100/60 p-1.5">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50/70">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <div className="relative flex items-center">
                <button className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-slate-50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-green-900 text-xs font-bold text-white shadow-sm md:h-10 md:w-10">
                    A
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
