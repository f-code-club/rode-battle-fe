import { Link } from '@tanstack/react-router';

const NAV_LINKS = [
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
    <nav className="hidden h-full items-stretch gap-1 lg:flex">
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
              {isActive && <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-teal-600" />}
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}
