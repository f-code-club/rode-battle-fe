import AccountManagement from '@/features/account-management';
import { createFileRoute } from '@tanstack/react-router';
import { checkAdmin } from './-checkRole';

export const Route = createFileRoute('/admin/account')({
  beforeLoad: checkAdmin,
  component: AccountManagement,
});
