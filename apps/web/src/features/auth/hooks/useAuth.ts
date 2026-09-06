import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthContext } from '../context/AuthContext';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';

export const useLogin = () => {
  const navigate = useNavigate();
  const { completeLogin, accessToken } = useAuthContext();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => authService.login(data),
    onSuccess: completeLogin,
    onError: (err: Error) => {
      form.setError('root', { message: err.message });
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (loginMutation.isSuccess && accessToken) {
      toast.success('Signed in successfully');
      void navigate({ to: '/home' });
    }
  }, [loginMutation.isSuccess, accessToken, navigate]);

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return { form, onSubmit, isSubmitting: loginMutation.isPending };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthContext();

  return useCallback(() => {
    void authService.logout().finally(() => {
      setAccessToken(null);
      toast.success('Signed out successfully');
      void navigate({ to: '/login' });
    });
  }, [navigate, setAccessToken]);
};
