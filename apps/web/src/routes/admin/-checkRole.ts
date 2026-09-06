import { redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { RouterContext } from '../__root';

export const checkAdmin = ({ context }: { context: RouterContext }) => {
  const { auth } = context;

  if (!auth.isAuthReady) return;

  if (!auth.accessToken) {
    throw redirect({
      to: '/login',
      search: { redirect: location.href },
    });
  }

  if (auth.user?.role !== 'admin') {
    toast.error('You are not allowed to access this page');
    throw redirect({ to: '/' });
  }
};
