import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';
import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="mt-7 flex flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-225 overflow-hidden rounded-2xl shadow-lg">
          <div className="relative hidden w-[45%] shrink-0 lg:block">
            <img
              src="https://i.ibb.co/0VnHwBJt/608846807-1398511675005631-8131168065788372364-n.jpg"
              alt="CLB F-Code"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute right-6 bottom-6 left-6">
              <p className="text-xl font-bold text-white drop-shadow-lg">CLB F-Code!</p>
              {/* <p className="mt-1 text-xs text-white/80">F21 ơi, Đại gia đình F-Code đang chờ đón các bạn đó!</p> */}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-white px-10 py-12">
            <div className="w-full max-w-sm">{children}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
