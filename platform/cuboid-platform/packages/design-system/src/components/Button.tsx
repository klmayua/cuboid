import React from 'react';
import { cn } from '../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-br from-[#0A2A66] to-[#123E91] border border-[#5E8DFF]/30 shadow-[0_4px_24px_rgba(10,42,102,0.3)] hover:shadow-[0_8px_32px_rgba(10,42,102,0.4)] hover:border-[#5E8DFF]/40',
  secondary: 'bg-white/[0.08] border border-white/14 hover:bg-white/[0.12] hover:border-white/18',
  danger: 'bg-[#F31260]/10 border border-[#F31260]/30 text-[#F31260] hover:bg-[#F31260]/20',
  success: 'bg-[#17C964]/10 border border-[#17C964]/30 text-[#17C964] hover:bg-[#17C964]/20',
  ghost: 'bg-transparent border border-transparent hover:bg-white/[0.06]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-2xl',
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-6 py-3 text-lg rounded-2xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'text-white disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-[#5E8DFF]/30 focus:ring-offset-2 focus:ring-offset-[#05070D]',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

export default Button;