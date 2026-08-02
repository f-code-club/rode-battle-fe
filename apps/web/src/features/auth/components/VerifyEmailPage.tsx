import { Link } from '@tanstack/react-router';
import { CheckCircle2, Loader2, XCircle, type LucideIcon } from 'lucide-react';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { AuthLayout } from './AuthLayout';

type VerifyEmailStatus = 'loading' | 'success' | 'error';

interface StatusConfig {
  icon: LucideIcon;
  iconWrapperClass: string;
  iconClass: string;
  title: string;
  titleClass: string;
}

const STATUS_CONFIG: Record<VerifyEmailStatus, StatusConfig> = {
  loading: {
    icon: Loader2,
    iconWrapperClass: 'rounded-full bg-green-50 p-4',
    iconClass: 'h-10 w-10 animate-spin text-[#16a34a]',
    title: 'Đang xác thực...',
    titleClass: 'text-base font-semibold text-[#08060d]',
  },
  success: {
    icon: CheckCircle2,
    iconWrapperClass: 'rounded-full bg-green-100 p-4 animate-bounce',
    iconClass: 'h-10 w-10 text-green-600',
    title: 'Thành công!',
    titleClass: 'text-lg font-bold text-green-600',
  },
  error: {
    icon: XCircle,
    iconWrapperClass: 'rounded-full bg-red-100 p-4',
    iconClass: 'h-10 w-10 text-red-600',
    title: 'Xác thực thất bại',
    titleClass: 'text-lg font-bold text-red-600',
  },
};

interface VerifyEmailPageProps {
  token: string | undefined;
}

export const VerifyEmailPage = ({ token }: VerifyEmailPageProps) => {
  const { status, errorMessage } = useVerifyEmail(token);
  const { icon: Icon, iconWrapperClass, iconClass, title, titleClass } = STATUS_CONFIG[status];

  return (
    <AuthLayout>
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <img src="/fcode.png" alt="F-Code logo" width={52} height={52} className="object-contain" />
        <div>
          <h1 className="text-2xl font-bold text-black">Xác thực tài khoản</h1>
          <p className="mt-1 text-sm text-gray-500">Hệ thống xác thực thành viên CLB F-Code</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center py-6 text-center">
        <div className={iconWrapperClass}>
          <Icon className={iconClass} />
        </div>

        <div className="mt-4">
          <h2 className={titleClass}>{title}</h2>

          {status === 'loading' && (
            <p className="mt-1 text-xs text-gray-400">Vui lòng giữ kết nối, quá trình này mất vài giây.</p>
          )}

          {status === 'success' && (
            <p className="mt-1 text-sm text-gray-500">
              Email của bạn đã được xác thực thành công. Tài khoản của bạn đã sẵn sàng sử dụng.
            </p>
          )}

          {status === 'error' && (
            <p className="mt-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="mt-6 flex w-full flex-col gap-2">
          <Link
            to="/login"
            className="flex h-11 w-full items-center justify-center rounded-lg bg-green-700 text-sm font-semibold text-white transition-all hover:bg-green-800 active:scale-[0.98]"
          >
            {status === 'success' ? 'Đăng nhập ngay' : 'Quay lại Đăng nhập'}
          </Link>

          {status === 'error' && (
            <a
              href="https://discord.gg/fcode"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-full items-center justify-center rounded-lg border border-green-700 text-sm font-medium text-green-700 hover:bg-green-50"
            >
              Hỗ trợ qua Discord
            </a>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};
