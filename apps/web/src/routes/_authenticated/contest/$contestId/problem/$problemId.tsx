import ContestProblemPage from '@/features/contest-detail/ContestProblemPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/contest/$contestId/problem/$problemId')({
  component: ContestProblemPage,
});
