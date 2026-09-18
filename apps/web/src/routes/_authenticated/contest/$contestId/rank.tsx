import { isStaffRole } from '@/features/auth/utils';
import ContestRanking from '@/features/contest-ranking';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/contest/$contestId/rank')({
  beforeLoad: ({ context, params }) => {
    if (!context.auth.isAuthReady) return;

    if (!isStaffRole(context.auth.user?.role)) {
      toast.error('Bảng xếp hạng chỉ dành cho Quản trị viên (Admin) và Ban giám khảo (Jury).');
      throw redirect({
        to: '/contest/$contestId',
        params: { contestId: params.contestId },
      });
    }
  },
  component: ContestRanking,
});
