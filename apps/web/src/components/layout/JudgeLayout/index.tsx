import Footer from '@/components/layout/JudgeLayout/components/Footer';
import Header from '@/components/layout/JudgeLayout/components/Header';
import Sidebar from '@/components/layout/JudgeLayout/components/Sidebar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function JudgeLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 64rem)', { initializeWithValue: true });
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSidebarOpen = isDesktop ? desktopOpen : mobileOpen;

  const toggleSidebar = () => {
    if (isDesktop) setDesktopOpen((prev) => !prev);
    else setMobileOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-70 transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar />
      </aside>
      <div className={cn('flex flex-1 flex-col transition-all duration-300', isSidebarOpen ? 'lg:ml-70' : 'ml-0')}>
        <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md">
          <Header onMenuClick={toggleSidebar} />
        </header>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-400">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
