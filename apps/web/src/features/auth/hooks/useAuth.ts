import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';

export const useLogin = () => {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.login(data);
      void navigate({ to: '/' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã có lỗi xảy ra, vui lòng thử lại';
      form.setError('root', { message });
    }
  });

  return { form, onSubmit };
};
