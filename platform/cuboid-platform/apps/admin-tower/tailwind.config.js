/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { deepTrust: '#0A2A66', royalTrust: '#123E91', lightTrust: '#5E8DFF' },
        dark: { midnight: '#05070D', surface: '#0B1020', elevated: '#10182B' },
        typography: { primary: '#F5F8FF', secondary: '#AAB7D1', muted: '#7183A6' },
        semantic: { success: '#17C964', warning: '#F5A524', danger: '#F31260', info: '#5E8DFF' },
      },
    },
  },
  plugins: [],
};