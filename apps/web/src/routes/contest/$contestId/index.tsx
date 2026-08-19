import ContestLobbyPage from '@/features/contest-lobby';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contest/$contestId/')({
  component: ContestLobbyRoute,
});

function ContestLobbyRoute() {
  const { contestId } = Route.useParams();
  return <ContestLobbyPage contestId={contestId} />;
}
