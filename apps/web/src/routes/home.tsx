import { createFileRoute } from '@tanstack/react-router';
import ParticipantDashboard from '../features/participant-dashboard';

export const Route = createFileRoute('/home')({
  component: ParticipantDashboard,
});
