import AdminLayout from '@/components/layout/AdminLayout';
import AccountSection from '@/features/account-management/components/AccountSection';
import { type Account, DEFAULT_PAGE_SIZE } from '@/features/account-management/types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';

const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1a2b3c4d-0001-4000-8000-000000000001',
    name: 'Phạm Đức Phúc',
    email: 'ducphucdn2006@gmail.com',
    role: 'admin',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0002-4000-8000-000000000002',
    name: 'Trần Trọng Nghĩa',
    email: 'hs23t2@gmail.com',
    role: 'jury',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0003-4000-8000-000000000003',
    name: 'Võ Nhật Minh',
    email: 'nhatminhvo2311@gmail.com',
    role: 'jury',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0004-4000-8000-000000000004',
    name: 'Đào Thị Út Trinh',
    email: 'uttrinh4115@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0005-4000-8000-000000000005',
    name: 'Nguyễn Tuấn Vinh',
    email: 'tuanvinh2402@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0006-4000-8000-000000000006',
    name: 'Nguyễn Đức Bảo Lâm',
    email: 'lam01662052827@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0007-4000-8000-000000000007',
    name: 'Phạm Hoàng Tuấn',
    email: 'phamhoangtuanqn@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0008-4000-8000-000000000008',
    name: 'Nguyễn Đức Huy',
    email: 'nguyenduchuy23052006@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0009-4000-8000-000000000009',
    name: 'Hoàng Thị Khánh Linh',
    email: 'khanhlinhwork1110@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0010-4000-8000-000000000010',
    name: 'Trương Đoàn Viên',
    email: 'vientruongdoan@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0011-4000-8000-000000000011',
    name: 'Nguyễn Huy Phong',
    email: 'touman876@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0012-4000-8000-000000000012',
    name: 'Nguyễn Đoàn Nhật Đăng',
    email: 'nhatdang23092006@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0013-4000-8000-000000000013',
    name: 'Võ Gia Huy',
    email: 'huyvog6226@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0014-4000-8000-000000000014',
    name: 'Võ Đức Trí',
    email: 'voductri88714@gmail.com',
    role: 'participant',
    is_banned: true,
  },
  {
    id: '1a2b3c4d-0015-4000-8000-000000000015',
    name: 'Phan Chí Thuận',
    email: 'tcp352006@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0016-4000-8000-000000000016',
    name: 'Dương Ngô',
    email: 'duongngo2209@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0017-4000-8000-000000000017',
    name: 'Huỳnh Minh Khang',
    email: 'khanghuynh0245@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0018-4000-8000-000000000018',
    name: 'Huỳnh Hân Đồng',
    email: 'huynhhandong@gmail.com',
    role: 'participant',
    is_banned: true,
  },
  {
    id: '1a2b3c4d-0019-4000-8000-000000000019',
    name: 'Nguyễn Hoàng Minh',
    email: 'nguyenminh150906@gmail.com',
    role: 'participant',
    is_banned: false,
  },
  {
    id: '1a2b3c4d-0020-4000-8000-000000000020',
    name: 'Hoàng Đình Quang',
    email: 'quanghd023@gmail.com',
    role: 'participant',
    is_banned: false,
  },
];

function AccountManagementPageMock({
  accounts,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  accounts: Account[];
  pageSize?: number;
}) {
  return (
    <>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Account Management</h1>
          </div>
          <AccountSection accounts={accounts} pageSize={pageSize} />
        </div>
      </AdminLayout>
      <Toaster position="bottom-right" richColors />
    </>
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
    pageSize: DEFAULT_PAGE_SIZE,
  },
};

export const Empty: Story = {
  name: '2. Empty',
  args: {
    accounts: [],
    pageSize: DEFAULT_PAGE_SIZE,
  },
};
