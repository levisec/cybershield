/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#040711', // Deepest background
          900: '#070C1E', // Base dark surface
          850: '#0B122B', // Elevated card surface
          800: '#101B3D', // Hover / interactive card
          750: '#172552', // Border / highlight surface
          700: '#1E316B',
        },
        navy: {
          950: '#040711',
          900: '#070C1E',
          850: '#0B122B',
          800: '#101B3D',
          750: '#172552',
          700: '#1E316B',
        },
        slate: {
          850: '#0F172A',
        },
        emerald: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        risk: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#EF4444',
          unknown: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-top-2': {
          '0%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'scan-line': 'scan-line 3.5s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
        'fade-in': 'fade-in 300ms ease-out',
        'slide-up': 'slide-up 400ms ease-out',
        'slide-in-from-top-2': 'slide-in-from-top-2 200ms ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.08) 35%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(16, 185, 129, 0.15)',
        'glow-md': '0 0 30px rgba(16, 185, 129, 0.2)',
        'glow-lg': '0 0 50px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  plugins: [],
}
