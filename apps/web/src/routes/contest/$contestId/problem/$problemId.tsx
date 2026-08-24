import ContestProblemPage from '@/features/contest-detail/ContestProblemPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contest/$contestId/problem/$problemId')({
  component: ContestProblemPage,
});
