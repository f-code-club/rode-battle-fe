import type { LoginFormValues, RegisterFormValues } from '../schemas/auth.schema';

const BASE_URL = '/api';

export const authService = {
  login: async (data: LoginFormValues): Promise<void> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { message?: string }).message ?? 'Đăng nhập thất bại');
    }
  },

  register: async (data: RegisterFormValues): Promise<void> => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { message?: string }).message ?? 'Đăng ký thất bại');
    }
  },
};
