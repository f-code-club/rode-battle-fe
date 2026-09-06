import ContestRanking from '@/features/contest-ranking';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/contest/$id/rank')({
  component: ContestRanking,
});
