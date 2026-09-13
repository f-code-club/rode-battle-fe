import ContestLobbyPage from '@/features/contest-lobby';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/contest/$contestId/')({
  component: ContestLobbyPage,
});
