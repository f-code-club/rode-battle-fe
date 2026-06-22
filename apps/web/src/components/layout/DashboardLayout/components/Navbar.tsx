import { Link } from '@tanstack/react-router';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Catalog', path: '/catalog' },
  { label: 'Contests', path: '/contests' },
  { label: 'Standings', path: '/standings' },
  { label: 'Groups', path: '/groups' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Help', path: '/help' },
];

export default function Navbar() {
  return (
    <nav className="hidden h-full items-stretch gap-1.5 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          to={link.path || '/'}
          className="relative flex items-center px-4 text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
          activeProps={{
            className: 'text-slate-900',
          }}
        >
          {({ isActive }) => (
            <>
              {link.label}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 h-0.75 w-6 -translate-x-1/2 rounded-t-full bg-teal-600" />
              )}
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}
