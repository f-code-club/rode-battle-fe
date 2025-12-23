import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'resize'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      resize = 'vertical',
      minRows = 3,
      maxRows,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses = 'transition-all duration-200 focus:outline-none focus:ring-2';

    const variantClasses = {
      default: 'border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500/20',
      filled: 'border-0 bg-gray-100 focus:bg-gray-50 focus:ring-blue-500/20',
      outlined:
        'border-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-500/20',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const textareaClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      resizeClasses[resize],
      'rounded-lg',
      {
        'border-red-500 focus:border-red-500 focus:ring-red-500/20': error,
        'opacity-50 cursor-not-allowed bg-gray-50': disabled,
        'w-full': fullWidth,
      },
      className,
    );

    const rowsStyle = {
      minHeight: `${minRows * 1.5}em`,
      ...(maxRows && { maxHeight: `${maxRows * 1.5}em` }),
    };

    return (
      <div className={cn({ 'w-full': fullWidth })}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          style={rowsStyle}
          rows={minRows}
          {...props}
        />

        {(error || helperText) && (
          <p className={cn('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
