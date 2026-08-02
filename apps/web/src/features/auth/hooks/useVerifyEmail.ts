import { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';

type VerifyEmailStatus = 'loading' | 'success' | 'error';

export const useVerifyEmail = (token: string | undefined) => {
  const [status, setStatus] = useState<VerifyEmailStatus>(() => (token ? 'loading' : 'error'));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    token ? null : 'Mã xác thực (token) không tồn tại trên URL.',
  );

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    authService
      .verifyEmail(token)
      .then(() => {
        if (isMounted) setStatus('success');
      })
      .catch((err) => {
        if (isMounted) {
          setStatus('error');
          setErrorMessage(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  return { status, errorMessage };
};
