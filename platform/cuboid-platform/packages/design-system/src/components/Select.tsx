'use client';

import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#AAB7D1] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10',
              'text-white outline-none appearance-none',
              'focus:border-[#5E8DFF] focus:ring-1 focus:ring-[#5E8DFF]/30',
              'transition-all duration-200',
              error && 'border-red-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-[#0B1020]">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0B1020]">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6] pointer-events-none" />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';