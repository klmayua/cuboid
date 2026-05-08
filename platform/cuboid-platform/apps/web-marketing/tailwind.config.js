/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: '#07111A',
        panel: '#0E1824',
        panel_soft: '#122233',
        text_primary: '#F8FAFC',
        text_secondary: '#CBD5E1',
        text_muted: '#94A3B8',
        premium_green: '#00A86B',
        gold: '#D4AF37',
        gold_soft: '#F2D27B',
        trust_blue: '#1D9BF0',
        danger_red: '#EF4444',
        // Legacy compat
        bg_primary: '#07111A',
        bg_secondary: '#0E1824',
        bg_tertiary: '#122233',
        elevated_card: '#0E1824',
        elevated_card_soft: '#122233',
        cuboid_blue: '#1D9BF0',
        premium_gold: '#D4AF37',
        trust_green: '#00A86B',
      },
      fontFamily: {
        sans: ['Inter Tight', 'Geist', 'Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(44px, 6vw, 76px)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '800' }],
        subhead: ['24px', { lineHeight: '1.45', fontWeight: '400' }],
        'subhead-mob': ['18px', { lineHeight: '1.45', fontWeight: '400' }],
        section: ['clamp(28px, 3.5vw, 48px)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '700' }],
        body: ['17px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-mob': ['16px', { lineHeight: '1.65', fontWeight: '400' }],
      },
      borderRadius: {
        btn: '12px',
        'btn-lg': '14px',
        card: '20px',
        panel: '24px',
        pill: '999px',
      },
      boxShadow: {
        glow_green: '0 0 40px rgba(0,168,107,0.22)',
        glow_gold: '0 0 40px rgba(212,175,55,0.15)',
      },
      spacing: {
        ticker: '60px',
        navbar: '88px',
        'mob-nav': '74px',
        content: '1200px',
        gutter: '48px',
        'gutter-mob': '20px',
      },
      maxWidth: {
        content: '1200px',
      },
      height: {
        ticker: '60px',
        navbar: '88px',
        'mob-nav': '74px',
      },
      animation: {
        'marquee-slow': 'marquee 50s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
