import ContestRanking from '@/features/contest-ranking';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contest/$id/rank')({
  component: ContestRanking,
});
