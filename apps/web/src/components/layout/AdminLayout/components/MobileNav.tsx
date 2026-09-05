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
        className={`absolute inset-0 bg-gray-900/20 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
          <img src="/fcode.svg" alt="F-Code Logo" className="h-8 w-8" />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={onClose}
              className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 hover:no-underline"
              activeProps={{
                className: 'bg-gray-100 font-semibold text-gray-900',
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
