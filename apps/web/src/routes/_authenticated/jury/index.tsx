import JuryDashboardPage from '@/features/jury-dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/jury/')({
  component: JuryDashboardPage,
});
