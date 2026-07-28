import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { loginSchema, registerSchema, type LoginFormValues, type RegisterFormValues } from '../schemas/auth.schema';
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

export const useRegister = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { email: '', displayName: '', password: '', confirmPassword: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.register(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.';
      form.setError('root', { message });
    }
  });

  return { form, onSubmit };
};
