'use client';

import { cn } from '../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'pending';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/[0.08] text-[#AAB7D1]',
  success: 'bg-semantic-success/20 text-semantic-success',
  warning: 'bg-semantic-warning/20 text-semantic-warning',
  danger: 'bg-semantic-danger/20 text-semantic-danger',
  info: 'bg-[#5E8DFF]/20 text-[#5E8DFF]',
  pending: 'bg-[#9B7CFF]/20 text-[#9B7CFF]',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}