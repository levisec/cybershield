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
          950: '#06080F', // Luxurious deep obsidian canvas
          900: '#0B0F19', // Primary dark card & surface
          850: '#111726', // Elevated card surface
          800: '#182135', // Hover / interactive card surface
          750: '#202C45', // Highlight surface / subtle border
          700: '#2A3958', // Focus / active element border
        },
        navy: {
          950: '#06080F',
          900: '#0B0F19',
          850: '#111726',
          800: '#182135',
          750: '#202C45',
          700: '#2A3958',
        },
        slate: {
          850: '#0E1422',
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
