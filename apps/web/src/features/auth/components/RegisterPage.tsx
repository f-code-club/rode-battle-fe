import { Link, useNavigate } from '@tanstack/react-router';
import { CheckCircle, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useRegister } from '../hooks/useAuth';
import { AuthLayout } from './AuthLayout';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    form: {
      register,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      getValues,
    },
    onSubmit,
  } = useRegister();

  if (isSubmitSuccessful) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[#08060d]">Đăng ký thành công!</h2>
          <p className="text-sm text-[#6b6375]">
            Chúng tôi đã gửi email xác minh đến <span className="font-medium text-[#08060d]">{getValues('email')}</span>
            .<br />
            Vui lòng kiểm tra hộp thư và xác minh tài khoản.
          </p>
          <button
            id="register-go-login-btn"
            onClick={() => void navigate({ to: '/login' })}
            className="mt-2 h-11 w-full rounded-lg bg-[#16a34a] text-sm font-semibold text-white transition-all hover:bg-[#15803d] active:scale-[0.98]"
          >
            Về trang đăng nhập
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="mb-6 flex flex-col items-center gap-3">
        <img src="/fcode.png" alt="F-Code logo" width={56} height={56} className="object-contain" />
        <div className="text-center">
          <h1 className="text-[22px] font-bold text-[#08060d]">Tạo tài khoản</h1>
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
          <label htmlFor="register-email" className="mb-1.5 block text-sm font-medium text-[#08060d]">
            Email
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.email
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30'
            }`}
          >
            <Mail size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="register-email"
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
          <label htmlFor="register-displayname" className="mb-1.5 block text-sm font-medium text-[#08060d]">
            Tên hiển thị
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.displayName
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30'
            }`}
          >
            <User size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="register-displayname"
              type="text"
              autoComplete="name"
              placeholder="Nguyễn Văn A"
              {...register('displayName')}
              className="h-11 flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#b0adb6] focus:outline-none"
            />
          </div>
          {errors.displayName && <p className="mt-1.5 text-xs text-red-500">{errors.displayName.message}</p>}
        </div>

        <div>
          <label htmlFor="register-password" className="mb-1.5 block text-sm font-medium text-[#08060d]">
            Mật khẩu
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.password
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30'
            }`}
          >
            <Lock size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register('password')}
              className="h-11 flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#b0adb6] focus:outline-none"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((p) => !p)}
              className="p-1 text-[#b0adb6] hover:text-[#6b6375]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="register-confirm-password" className="mb-1.5 block text-sm font-medium text-[#08060d]">
            Xác nhận mật khẩu
          </label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 transition-colors ${
              errors.confirmPassword
                ? 'border-red-400 ring-1 ring-red-300'
                : 'border-[#e5e4e7] focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/30'
            }`}
          >
            <Lock size={16} stroke="#b0adb6" className="shrink-0" />
            <input
              id="register-confirm-password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className="h-11 flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#b0adb6] focus:outline-none"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm((p) => !p)}
              className="p-1 text-[#b0adb6] hover:text-[#6b6375]"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <button
          id="register-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-semibold text-white transition-all hover:bg-[#15803d] active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Đang đăng ký...
            </>
          ) : (
            'Đăng ký'
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <hr className="flex-1 border-[#e5e4e7]" />
        <span className="text-xs text-[#b0adb6]">hoặc</span>
        <hr className="flex-1 border-[#e5e4e7]" />
      </div>

      <p className="text-center text-sm text-[#6b6375]">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-semibold text-green-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </AuthLayout>
  );
};
