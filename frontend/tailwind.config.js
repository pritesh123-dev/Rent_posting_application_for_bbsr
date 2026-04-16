/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B1B2F',
        accent: '#10B981',
        'accent-light': '#D1FAE5',
        'accent-dark': '#059669',
        warm: '#F59E0B',
        surface: '#FFFFFF',
        bg: '#F7F8FA',
        'bg-alt': '#F0F1F3',
        muted: '#9CA3AF',
        subtle: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10)',
        float: '0 20px 60px rgba(0,0,0,0.08)',
        btn: '0 4px 14px rgba(16,185,129,0.35)',
      },
    },
  },
  plugins: [],
};
