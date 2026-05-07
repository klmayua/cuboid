/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: { primary: '#060D20', secondary: '#0B1326', tertiary: '#131B2E' },
        accent: { primary: '#6B8CFF', cyan: '#71F8E4', gold: '#E9C349', red: '#FFB4AB' },
        text: { primary: 'rgba(255,255,255,0.96)', secondary: 'rgba(255,255,255,0.82)', muted: 'rgba(255,255,255,0.62)' },
        border: { subtle: 'rgba(255,255,255,0.08)', medium: 'rgba(255,255,255,0.12)' },
      },
      fontFamily: { primary: ['Inter', 'Geist', 'IBM Plex Sans', 'sans-serif'], display: ['Inter', 'Geist', 'sans-serif'], mono: ['IBM Plex Mono', 'monospace'] },
      fontSize: { hero: 'clamp(72px, 9vw, 140px)', 'section-heading': '40px', 'dashboard-metric': '48px', body: '18px', label: '12px' },
      fontWeight: { hero: 800, section: 700, metric: 700, label: 600 },
      lineHeight: { hero: '0.9', section: '1.05', body: '1.7' },
      letterSpacing: { hero: '-0.05em', label: '0.12em' },
      borderRadius: { card: '24px', button: '18px', input: '14px' },
      boxShadow: { card: '0 10px 30px rgba(0,0,0,0.35)', 'card-hover': '0 14px 40px rgba(0,0,0,0.45)', focus: '0 0 0 3px rgba(107,140,255,0.3)' },
      backdropBlur: { glass: '20px', navbar: '24px' },
      spacing: { container: '1600px', desktop: '80px', section: '140px', grid: '32px', navbar: '96px', button: '60px' },
      maxWidth: { container: '1600px' },
      height: { navbar: '96px', button: '60px' },
    },
  },
  plugins: [],
};