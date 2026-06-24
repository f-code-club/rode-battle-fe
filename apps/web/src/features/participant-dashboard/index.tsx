import DashboardLayout from '@/components/layout/DashboardLayout';
import HeroGreeting from './components/HeroGreeting';
import MainTable from './components/MainTable';
import Sidebar from './components/Sidebar';

function DashboardContent() {
  return (
    <>
      <HeroGreeting />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MainTable />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default function ParticipantDashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
