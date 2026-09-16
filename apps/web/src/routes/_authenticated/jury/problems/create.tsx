import ProblemCreatePage from '@/features/jury-problem-create';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/jury/problems/create')({
  component: ProblemCreatePage,
});
