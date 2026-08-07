import type { LoginFormValues } from '../schemas/auth.schema';

const BASE_URL = '/api';

async function parseErrorMessage(res: Response, fallback: string): Promise<never> {
  const body = await res.json().catch(() => ({}));
  throw new Error((body as { message?: string }).message ?? fallback);
}

export const authService = {
  login: async (data: LoginFormValues): Promise<void> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) await parseErrorMessage(res, 'Đăng nhập thất bại');
  },
};
