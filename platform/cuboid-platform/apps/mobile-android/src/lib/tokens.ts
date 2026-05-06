export const colors = {
  brand: {
    deepTrust: '#0A2A66',
    royalTrust: '#123E91',
    lightTrust: '#5E8DFF',
  },
  dark: {
    midnight: '#05070D',
    surface: '#0B1020',
    elevated: '#10182B',
  },
  typography: {
    primary: '#F5F8FF',
    secondary: '#AAB7D1',
    muted: '#7183A6',
    disabled: '#51617D',
  },
  semantic: {
    success: '#17C964',
    warning: '#F5A524',
    danger: '#F31260',
    info: '#5E8DFF',
    neutral: '#7C8AA5',
    pending: '#9B7CFF',
    escrow: '#00B8D9',
    verified: '#16D67A',
    fraud: '#FF4D6D',
  },
  glass: {
    surface: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.12)',
    highlight: 'rgba(255, 255, 255, 0.04)',
  },
};

export const typography = {
  fontFamily: {
    primary: 'System',
    secondary: 'System',
    display: 'System',
    mono: 'monospace',
  },
  weights: {
    elegant: '300' as const,
    body: '400' as const,
    section: '500' as const,
    label: '600' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 14,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
};

export default { colors, typography, spacing, borderRadius, shadows };