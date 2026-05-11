import { LoginPage } from '@/features/auth/components/LoginPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});
