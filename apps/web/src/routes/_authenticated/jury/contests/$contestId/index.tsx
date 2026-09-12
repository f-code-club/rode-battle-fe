import ContestDetailPage from '@/features/jury-contest-detail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/jury/contests/$contestId/')({
  component: ContestDetailPage,
});
