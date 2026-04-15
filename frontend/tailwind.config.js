/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          500: '#2f6bff',
          600: '#1f53e0',
          700: '#1841b3',
        },
      },
    },
  },
  plugins: [],
};
