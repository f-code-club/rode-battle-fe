import Footer from '@/components/layout/JudgeLayout/components/Footer';
import Header from '@/components/layout/JudgeLayout/components/Header';
import Sidebar from '@/components/layout/JudgeLayout/components/Sidebar';
import React from 'react';

export default function JudgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-70 lg:block">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col lg:ml-70">
        <header className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md">
          <Header />
        </header>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-400">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
