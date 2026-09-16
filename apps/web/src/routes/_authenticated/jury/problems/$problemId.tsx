import ProblemDetailPage from '@/features/jury-problem-detail';
import { createFileRoute, useParams } from '@tanstack/react-router';

function ProblemDetailRouteComponent() {
  const { problemId } = useParams({ from: '/_authenticated/jury/problems/$problemId' });
  return <ProblemDetailPage problemId={problemId} />;
}

export const Route = createFileRoute('/_authenticated/jury/problems/$problemId')({
  component: ProblemDetailRouteComponent,
});
