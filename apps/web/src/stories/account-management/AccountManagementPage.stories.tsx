import AdminLayout from '@/components/layout/AdminLayout';
import AccountSection from '@/features/account-management/components/AccountSection';
import type { Account } from '@/features/account-management/types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';

const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1a2b3c4d-0001-4000-8000-000000000001',
    name: 'F-Code Alpha Team',
    email: 'team.alpha@fcode.club',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0002-4000-8000-000000000002',
    name: 'Cyber Knight',
    email: 'cyber.knight@fcode.club',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0003-4000-8000-000000000003',
    name: 'Shadow Coders',
    email: 'shadow.coders@fcode.club',
    is_banned: true,
  },
  {
    id: '1a2b3c4d-0004-4000-8000-000000000004',
    name: 'Bit Hunters',
    email: 'bithunters.dev@gmail.com',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0005-4000-8000-000000000005',
    name: 'Quantum Leapers',
    email: 'quantum.leapers@fcode.club',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0006-4000-8000-000000000006',
    name: 'Spam Account Test',
    email: 'spammer.bot@trashmail.com',
    is_banned: true,
  },
  {
    id: '1a2b3c4d-0007-4000-8000-000000000007',
    name: 'Phạm Đức Phúc',
    email: 'phuc.pd@fcode.club',
    is_banned: false,
  },
];

function AccountManagementPageMock({ accounts }: { accounts: Account[] }) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Account Management</h1>
        </div>
        <AccountSection accounts={accounts} />
      </div>
    </AdminLayout>
  );
}

const meta: Meta<typeof AccountManagementPageMock> = {
  title: 'Pages/AccountManagement',
  component: AccountManagementPageMock,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: () => <Story />,
      });
      const router = createRouter({
        routeTree: rootRoute,
        history: createMemoryHistory({ initialEntries: ['/admin/account'] }),
      });
      return <RouterProvider router={router} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AccountManagementPageMock>;

export const Default: Story = {
  name: '1. Default Accounts',
  args: {
    accounts: MOCK_ACCOUNTS,
  },
};

export const Empty: Story = {
  name: '2. Empty',
  args: {
    accounts: [],
  },
};
