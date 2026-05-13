import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-bg flex min-h-screen flex-col font-sans">
      <Header />
      <main className="relative w-full flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
