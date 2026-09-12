import CreateContestPage from '@/features/jury-contest-create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/jury/contests/create')({
  component: CreateContestPage,
});
