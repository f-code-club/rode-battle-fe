import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountTable from './components/AccountTable';
import { useAccount } from './hooks/useAccount';

export default function AccountManagement() {
  const accounts = useAccount();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Quản lý tài khoản</h1>
        </div>
        <AccountTable accounts={accounts} />
      </div>
    </DashboardLayout>
  );
}
