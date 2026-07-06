import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        // Real estate brand: deep navy + gold accents
        primary: {
          50: '#e8f0f5',
          100: '#c5d9e6',
          200: '#9fc0d5',
          300: '#78a6c4',
          400: '#5b93b7',
          500: '#3e80aa',
          600: '#36789d',
          700: '#2c6d8b',
          800: '#22637a',
          900: '#1a3a4a',   // Brand navy
          950: '#0f2530',
        },
        accent: {
          50: '#fdf8e8',
          100: '#faedc5',
          200: '#f7e29e',
          300: '#f4d777',
          400: '#f1cc5a',
          500: '#efc23d',
          600: '#edb437',
          700: '#eaa32f',
          800: '#e79427',
          900: '#c67a1a',   // Gold accent
          950: '#8a520d',
        },
        surface: {
          light: '#fafbfc',
          DEFAULT: '#f1f4f6',
          dark: '#e2e6ea',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
