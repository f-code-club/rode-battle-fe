import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { NAV_LINKS } from './Navbar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${isOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-50 px-6">
          <img src="/fcode.svg" alt="F-Code Logo" className="h-10 w-10" />
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path || '/'}
              onClick={onClose}
              className="flex items-center rounded-xl px-4 py-3 text-base font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-teal-600"
              activeProps={{
                className: 'bg-teal-50 text-teal-700',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
