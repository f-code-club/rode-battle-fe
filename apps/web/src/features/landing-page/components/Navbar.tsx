import { FloatingGlassNav } from '@/components/ui/FloatingGlassNav';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Rules', href: '#rules' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Contact', href: '#contact' },
];

function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

function NavLink({ href, label, className, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        scrollToSection(href);
      }}
      className={cn('no-underline transition-colors hover:no-underline', className)}
    >
      {label}
    </a>
  );
}

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null!);
  const scrolled = useScrolled();
  const { isAuthReady, isLoggedIn } = useAuthContext();

  useOnClickOutside(mobileMenuRef, () => setMobileOpen(false));

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') setMobileOpen(false);
  });

  return (
    <>
      <FloatingGlassNav className="w-full max-w-[95vw] justify-between gap-6 px-8 py-3.5 md:max-w-4xl lg:max-w-5xl">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline hover:no-underline">
          <img src="/fcode.svg" alt="F-Code logo" className="h-10 w-10 drop-shadow-sm" />
          <span className="text-sm font-bold tracking-widest text-green-700 select-none">F-CODE</span>
        </Link>

        <div className="h-5 w-px bg-slate-300/60" />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-white/50 hover:text-teal-700"
            />
          ))}
        </nav>

        <div className="h-5 w-px bg-slate-300/60" />

        {isAuthReady ? (
          <Link
            to={isLoggedIn ? '/home' : '/login'}
            className="rounded-full bg-green-700 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-green-900 hover:no-underline active:scale-[0.97]"
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
          </Link>
        ) : (
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200/70" />
        )}
      </FloatingGlassNav>

      <header
        className={`sticky top-0 z-40 flex h-16 w-full items-center border-b border-slate-100 bg-white/80 font-sans shadow-sm backdrop-blur-md transition-all duration-500 ease-in-out ${
          scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-6 px-4 md:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline hover:no-underline">
            <img src="/fcode.svg" alt="F-Code logo" className="h-10 w-10" />
            <span className="text-base font-bold tracking-widest text-green-700 select-none">F-CODE</span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                className="relative text-sm font-medium text-slate-600 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-teal-700 after:transition-all hover:text-teal-700 hover:after:w-full"
              />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {isAuthReady ? (
              <Link
                to={isLoggedIn ? '/home' : '/login'}
                className="hidden rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-green-900 hover:no-underline active:scale-[0.97] sm:block"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
              </Link>
            ) : (
              <div className="hidden h-9 w-20 animate-pulse rounded-lg bg-slate-200/70 sm:block" />
            )}

            <button
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className={`fixed top-16 right-0 z-50 flex h-[calc(100vh-4rem)] w-72 flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-100 p-4">
          <Link
            to={isLoggedIn ? '/home' : '/login'}
            onClick={() => setMobileOpen(false)}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-green-700 text-sm font-semibold text-white transition-colors hover:bg-green-900 hover:no-underline"
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
          </Link>
        </div>
      </div>
    </>
  );
}
