import AdminLayout from '@/components/layout/AdminLayout';
import AccountSection from './components/AccountSection';

export default function AccountManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Account Management</h1>
        </div>
        <AccountSection />
      </div>
    </AdminLayout>
  );
}
