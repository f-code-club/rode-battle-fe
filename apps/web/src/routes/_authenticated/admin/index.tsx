import { createFileRoute } from '@tanstack/react-router';
import { checkAdmin } from './-checkRole';

export const Route = createFileRoute('/_authenticated/admin/')({
  beforeLoad: checkAdmin,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
