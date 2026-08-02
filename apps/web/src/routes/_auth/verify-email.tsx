import { VerifyEmailPage } from '@/features/auth/components/VerifyEmailPage';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const verifyEmailSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute('/_auth/verify-email')({
  validateSearch: (search) => verifyEmailSearchSchema.parse(search),
  component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
  const { token } = Route.useSearch();
  return <VerifyEmailPage token={token} />;
}
