import { Link } from '@tanstack/react-router';

export const NAV_LINKS = [
  { label: 'Accounts', path: '/admin/account' },
  { label: 'Contests', path: '/admin/contests' },
  { label: 'Problems', path: '/admin/problems' },
  { label: 'Submissions', path: '/admin/submissions' },
];

export default function Navbar() {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 hover:no-underline"
          activeProps={{
            className: 'bg-gray-100 font-semibold text-gray-900',
          }}
        >
          {({ isActive }) => (
            <>
              {link.label}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gray-900" />
              )}
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}
