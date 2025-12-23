import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses = 'transition-colors duration-150 focus:outline-none border';

    const variantClasses = {
      default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      filled:
        'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      outlined: 'border-2 border-gray-300 bg-white focus:border-blue-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
    };

    const inputClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      {
        'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': error,
        'opacity-50 cursor-not-allowed bg-gray-100': disabled,
        'w-full': fullWidth,
        'pl-10': startIcon,
        'pr-10': endIcon,
      },
      className,
    );

    return (
      <div className={cn({ 'w-full': fullWidth })}>
        {label && <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{startIcon}</span>
            </div>
          )}

          <input ref={ref} className={inputClasses} disabled={disabled} {...props} />

          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{endIcon}</span>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('mt-1 text-xs', error ? 'text-red-600' : 'text-gray-600')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
