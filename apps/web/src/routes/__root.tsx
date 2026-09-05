import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-bg selection:bg-accent/30 selection:text-text-h min-h-screen">
      <Outlet />
      <Toaster position="bottom-right" richColors />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </div>
  ),
});
