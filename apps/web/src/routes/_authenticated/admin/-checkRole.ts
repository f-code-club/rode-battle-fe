import { redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { RouterContext } from '../../__root';

export const checkAdmin = ({ context }: { context: RouterContext }) => {
  if (!context.auth.isAuthReady) return;

  if (context.auth.user?.role !== 'admin') {
    toast.error('You are not allowed to access this page');
    throw redirect({ to: '/' });
  }
};
