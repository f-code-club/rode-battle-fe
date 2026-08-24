import { cn } from '@/lib/utils';
import { Lock, Unlock } from 'lucide-react';
import { type Account, DEFAULT_PAGE_SIZE } from '../types';
import Pagination from './Pagination';

interface AccountTableProps {
  accounts: Account[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export default function AccountTable({
  accounts,
  currentPage = 1,
  totalPages = 1,
  totalItems = accounts.length,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
}: AccountTableProps) {
  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
        <p className="text-sm font-medium text-gray-500">No accounts found</p>
      </div>
    );
  }

  const from = (currentPage - 1) * pageSize + 1;

  return (
    <div className="space-y-3.5">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] table-fixed border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="w-14 px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  #
                </th>
                <th className="w-[34%] px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Candidate / User
                </th>
                <th className="w-[36%] px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Email
                </th>
                <th className="w-28 px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="w-28 px-4 py-3.5 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account, index) => (
                <tr key={account.id} className="transition-colors hover:bg-gray-50/60">
                  <td className="w-14 px-4 py-3.5 text-left text-xs font-medium text-gray-400">{from + index}</td>
                  <td className="w-[34%] px-4 py-3.5 text-left font-medium text-gray-900">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gray-100 to-gray-200 text-xs font-bold text-gray-900 shadow-xs">
                        {account.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{account.name}</span>
                    </div>
                  </td>
                  <td className="w-[36%] truncate px-4 py-3.5 text-left text-gray-600">{account.email}</td>
                  <td className="w-28 px-4 py-3.5 text-center">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        account.is_banned
                          ? 'bg-gray-900 text-white ring-1 ring-gray-900'
                          : 'bg-gray-100 text-gray-600 ring-1 ring-gray-300',
                      )}
                    >
                      {account.is_banned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="w-28 px-4 py-3.5 text-right">
                    <button
                      type="button"
                      className={cn(
                        'inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                        account.is_banned
                          ? 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                          : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50',
                      )}
                    >
                      {account.is_banned ? (
                        <>
                          <Unlock className="h-3 w-3" /> Unban
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3" /> Ban
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

      {onPageChange && (
        <div className="flex justify-end pt-1">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
