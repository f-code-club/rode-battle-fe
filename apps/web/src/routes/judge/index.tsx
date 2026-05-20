import JudgeDashboardPage from '@/features/judge-dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/judge/')({
  component: JudgeDashboardPage,
});
