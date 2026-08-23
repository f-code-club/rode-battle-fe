import { redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export const checkAdmin = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    throw redirect({
      to: '/login',
      search: { redirect: location.href },
    });
  }

  if (role !== 'admin') {
    toast.error('You are not allowed to access this page');
    throw redirect({ to: '/' });
  }
};
