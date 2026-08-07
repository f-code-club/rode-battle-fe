import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';
import { AuthLayout } from './AuthLayout';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    onSubmit,
  } = useLogin();

  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center gap-3">
        <img src="/fcode.png" alt="F-Code logo" width={52} height={52} className="object-contain" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#08060d]">Đăng nhập</h1>
          <p className="mt-1 text-sm text-[#6b6375]">CLB F-Code thuộc FPT University</p>
        </div>
      </div>

      {errors.root && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errors.root.message}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-[#08060d]">
            Email
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.email
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-[#22c55e]/30'
            }`}
          >
            <Mail size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="example@fpt.edu.vn"
              {...register('email')}
              className="h-11 flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#b0adb6] focus:outline-none"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-medium text-[#08060d]">
              Mật khẩu
            </label>
            {/* <Link to="/forgot-password" className="text-xs text-[#16a34a] hover:underline">
              Quên mật khẩu?
            </Link> */}
          </div>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.password
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30'
            }`}
          >
            <Lock size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              className="h-11 flex-1 bg-transparent text-sm text-black placeholder:text-[#b0adb6] focus:outline-none"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="p-1 text-[#b0adb6] hover:text-[#6b6375]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <button
          id="login-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-semibold text-white transition-all hover:bg-[#15803d] active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Đang đăng nhập...
            </>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </AuthLayout>
  );
};
