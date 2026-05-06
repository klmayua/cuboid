/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
        glass: {
          surface: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.14)',
          hairline: 'rgba(255, 255, 255, 0.07)',
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
        },
      },
      fontFamily: {
        primary: ['Inter Tight', 'system-ui', 'sans-serif'],
        secondary: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        card: '24px',
        button: '16px',
        input: '14px',
        modal: '28px',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0, 0, 0, 0.08)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        modal: '0 16px 48px rgba(0, 0, 0, 0.16)',
        focus: '0 0 0 3px rgba(94, 141, 255, 0.3)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
};