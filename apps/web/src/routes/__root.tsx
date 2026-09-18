import ErrorPage from '@/components/ui/ErrorPage';
import NotFoundPage from '@/components/ui/NotFoundPage';
import type { AuthContextValue } from '@/features/auth/context/AuthContext';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';

export interface RouterContext {
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
  component: () => (
    <div className="bg-bg selection:bg-accent/30 selection:text-text-h min-h-screen">
      <Outlet />
      <Toaster position="bottom-right" richColors />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </div>
  ),
});
