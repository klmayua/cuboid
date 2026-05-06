'use client';

import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#AAB7D1] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7183A6]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10',
              'text-white placeholder-[#7183A6] outline-none',
              'focus:border-[#5E8DFF] focus:ring-1 focus:ring-[#5E8DFF]/30',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7183A6]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {helper && !error && <p className="mt-2 text-sm text-[#7183A6]">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';