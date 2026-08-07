import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary:
      'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary shadow-lg shadow-brand-primary/20',
    secondary:
      'bg-brand-secondary text-white hover:bg-opacity-90 focus:ring-brand-secondary shadow-lg shadow-brand-secondary/20',
    outline: 'border-2 border-border bg-transparent hover:bg-accent-bg hover:border-accent text-text focus:ring-accent',
    ghost: 'bg-transparent hover:bg-accent-bg text-text focus:ring-accent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-3 -ml-1 h-5 w-5 animate-spin text-current" />}
      {children}
    </button>
  );
};
