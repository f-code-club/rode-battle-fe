import ContestManagementPage from '@/features/jury-contest-management';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/jury/contests/')({
  component: ContestManagementPage,
});
