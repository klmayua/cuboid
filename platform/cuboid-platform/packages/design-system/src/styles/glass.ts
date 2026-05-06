import { type Config } from 'tailwindcss';
import { cuboidTokens } from '@cuboid/tokens';

export const glassStyles = {
  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '24px',
  },
  elevated: {
    background: 'rgba(255, 255, 255, 0.10)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: '24px',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '14px',
  },
  button: {
    primary: {
      background: 'linear-gradient(135deg, #0A2A66 0%, #123E91 100%)',
      border: '1px solid rgba(94, 141, 255, 0.3)',
      boxShadow: '0 4px 24px rgba(10, 42, 102, 0.3)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.14)',
    },
  },
} as const;

export type GlassVariant = keyof typeof glassStyles;

export function getGlassStyles(variant: GlassVariant) {
  return glassStyles[variant];
}

export default glassStyles;