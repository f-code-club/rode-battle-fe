import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border';

    const variantClasses = {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
      secondary:
        'bg-gray-600 hover:bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-1',
      outline:
        'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
      ghost:
        'border-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-1',
      danger:
        'bg-red-600 hover:bg-red-700 text-white border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-1',
      success:
        'bg-green-600 hover:bg-green-700 text-white border-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-1',
    };

    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-2.5 text-base',
      xl: 'px-8 py-3 text-base',
    };

    const isDisabled = disabled || loading;

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      {
        'w-full': fullWidth,
      },
      className,
    );

    return (
      <button ref={ref} className={buttonClasses} disabled={isDisabled} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
