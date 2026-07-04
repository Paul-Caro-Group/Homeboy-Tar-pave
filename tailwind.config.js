/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        asphalt: {
          900: '#0E0C09',
          800: '#17140F',
          700: '#1F1B14',
          600: '#2A241B',
          500: '#3A3228',
        },
        concrete: {
          50: '#F7F4EE',
          100: '#EFEAE0',
          200: '#E8E2D4',
          300: '#D9D2C0',
          400: '#B8B0A0',
          500: '#8E8775',
          600: '#6B6557',
        },
        clay: {
          400: '#D7744F',
          500: '#B5502D',
          600: '#9A4326',
          700: '#7F371F',
        },
        road: {
          300: '#F2C766',
          400: '#E8A93B',
          500: '#D4952A',
          600: '#B07A1E',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
