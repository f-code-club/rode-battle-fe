import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option...',
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      disabled = false,
      searchable = false,
      clearable = false,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = searchable
      ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const baseClasses = 'relative transition-all duration-200 focus-within:ring-2';

    const variantClasses = {
      default:
        'border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-blue-500/20',
      filled: 'border-0 bg-gray-100 focus-within:bg-gray-50 focus-within:ring-blue-500/20',
      outlined:
        'border-2 border-gray-300 bg-transparent focus-within:border-blue-500 focus-within:ring-blue-500/20',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const selectClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      'rounded-lg',
      {
        'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20': error,
        'opacity-50 cursor-not-allowed bg-gray-50': disabled,
        'cursor-pointer': !disabled,
        'w-full': fullWidth,
      },
      className,
    );

    const handleOptionClick = (optionValue: string) => {
      if (!disabled) {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) {
        onChange?.('');
        setSearchTerm('');
      }
    };

    const toggleOpen = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (searchable && !isOpen) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
    };

    return (
      <div className={cn({ 'w-full': fullWidth })}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

        <div ref={ref} className="relative">
          <div ref={selectRef} className={selectClasses} onClick={toggleOpen}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {searchable && isOpen ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent border-0 outline-none p-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className={cn(selectedOption ? 'text-gray-900' : 'text-gray-500')}>
                    {selectedOption?.label || placeholder}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {clearable && value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                <svg
                  className={cn('w-5 h-5 text-gray-400 transition-transform duration-200', {
                    'transform rotate-180': isOpen,
                  })}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn('px-4 py-3 cursor-pointer transition-colors duration-150', {
                      'text-gray-400 cursor-not-allowed': option.disabled,
                      'text-gray-900 hover:bg-gray-100': !option.disabled,
                      'bg-blue-50 text-blue-900': option.value === value,
                    })}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{option.label}</span>
                      {option.value === value && (
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('mt-2 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
