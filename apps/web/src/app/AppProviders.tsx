import { AuthProvider, useAuthContext } from '@/features/auth/context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { queryClient } from './queryClient';
import { router } from './router';

function RouterWithAuth() {
  const auth = useAuthContext();

  useEffect(() => {
    void router.invalidate();
  }, [auth.accessToken, auth.isAuthReady]);

  return <RouterProvider router={router} context={{ auth }} />;
}

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWithAuth />
      </AuthProvider>
    </QueryClientProvider>
  );
}
