import React from 'react';
import { cn } from '../utils/cn';
import { glassStyles } from '../styles/glass';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'elevated' | 'solid';
  size?: 'default' | 'compact';
  children: React.ReactNode;
}

export function Card({ className, variant = 'glass', size = 'default', children, ...props }: CardProps) {
  const baseStyles = 'transition-all duration-200';
  
  const variantStyles = {
    glass: 'bg-white/[0.06] backdrop-blur-xl border border-white/12 shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
    elevated: 'bg-white/[0.10] backdrop-blur-xl border border-white/14 shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
    solid: 'bg-[#0B1020] border border-white/7',
  };

  const sizeStyles = {
    default: 'p-6 rounded-3xl',
    compact: 'p-4 rounded-2xl',
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
      {children}
    </div>
  );
}

export default Card;