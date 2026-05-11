import { RegisterPage } from '@/features/auth/components/RegisterPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
});
