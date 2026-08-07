import { SiWordpress } from '@icons-pack/react-simple-icons';
import { Link } from '@tanstack/react-router';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/80 bg-linear-to-b from-white to-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/fcode.png" alt="F-Code" className="h-9 w-9" />
                <div className="bg-primary/20 absolute inset-0 rounded-full opacity-50 blur-lg"></div>
              </div>
              <span className="text-primary text-2xl font-bold tracking-tight">F-Code</span>
            </div>
            <p className="mt-4 text-justify text-sm leading-relaxed text-gray-600">
              Platform for organizing and managing professional programming contests by F-Code Club. From creative CSS
              Battle rounds to challenging algorithm contests, we build an environment for students to sharpen their
              problem-solving skills and reach the top of their game.
            </p>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wide text-slate-700 uppercase">Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-slate-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Contests
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Standings
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Problem Library
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/WvudrJaYD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Discord Support
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wide text-slate-700 uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Rules & Regulations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Discord Community
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wide text-slate-700 uppercase">Contact</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <SocialIcon
                url="https://www.facebook.com/fcodeclub"
                target="_blank"
                style={{ width: 40, height: 40 }}
                className="rounded-lg shadow-xs transition-all hover:scale-110 hover:opacity-90"
              />
              <SocialIcon
                url="https://www.youtube.com/channel/UCZyrUXSrQ1AdkomxYz1GvCw"
                target="_blank"
                style={{ width: 40, height: 40 }}
                className="rounded-lg shadow-xs transition-all hover:scale-110 hover:opacity-90"
              />
              <a
                href="https://fcodehcm.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#21759b', width: 40, height: 40 }}
                className="flex items-center justify-center rounded-full shadow-xs transition-all hover:scale-110 hover:opacity-90"
              >
                <SiWordpress className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-10 sm:pt-8">
          <p className="text-center text-sm text-gray-500">
            Designed by:{' '}
            <a
              className="text-primary font-medium transition-colors hover:text-slate-700 hover:underline"
              target="_blank"
              href="https://www.facebook.com/fcodeclub"
            >
              CLB F-Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
