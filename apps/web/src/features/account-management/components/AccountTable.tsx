import { cn } from '@/lib/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Lock, Unlock } from 'lucide-react';
import type { Account } from '../types';

interface AccountTableProps {
  accounts: Account[];
}

export default function AccountTable({ accounts }: AccountTableProps) {
  const [tbodyRef] = useAutoAnimate<HTMLTableSectionElement>({
    duration: 250,
    easing: 'ease-in-out',
  });

  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
        <p className="text-sm font-medium text-gray-500">Chưa có tài khoản nào trong hệ thống</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">#</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Tên thí sinh / Đội
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-4 py-3.5 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody
            ref={(el) => {
              if (el) tbodyRef(el);
            }}
            className="divide-y divide-gray-100"
          >
            {accounts.map((account, index) => (
              <tr key={account.id} className="transition-colors hover:bg-gray-50/60">
                <td className="px-4 py-3.5 text-left text-xs font-medium text-gray-400">{index + 1}</td>
                <td className="px-4 py-3.5 text-left font-medium text-gray-900">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-xs">
                      {account.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{account.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-left text-gray-600">{account.email}</td>
                <td className="px-4 py-3.5 text-center">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      account.is_banned
                        ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
                        : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
                    )}
                  >
                    {account.is_banned ? 'Đã khóa' : 'Hoạt động'}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                      account.is_banned
                        ? 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        : 'border border-rose-200 bg-rose-50/50 text-rose-700 hover:bg-rose-100/60',
                    )}
                  >
                    {account.is_banned ? (
                      <>
                        <Unlock className="h-3 w-3" /> Mở khóa
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3" /> Khóa
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
