/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // void / starlight / hairline / surface read from CSS variables so the
        // whole site can flip between dark-space and day-sky themes by toggling
        // one `data-theme` attribute on <html> — see index.css for the values.
        void: {
          DEFAULT: 'rgb(var(--c-void) / <alpha-value>)',
          soft: 'rgb(var(--c-void-soft) / <alpha-value>)',
          deep: 'rgb(var(--c-void-deep) / <alpha-value>)',
        },
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        navy: {
          DEFAULT: '#0d1226',
          light: '#141b36',
        },
        cyan: {
          glow: '#5eead4',
          bright: '#22d3ee',
        },
        violet: {
          glow: '#a78bfa',
          deep: '#7c3aed',
        },
        amber: {
          glow: '#fbbf7d',
        },
        planet: {
          mercury: '#9a958c',
          venus: '#e0b872',
          earth: '#4fa8e0',
          mars: '#e0693f',
          jupiter: '#d9a06b',
          uranus: '#8fd8d0',
          neptune: '#5470e0',
        },
        starlight: 'rgb(var(--c-starlight) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Unbounded"', '"Outfit"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        starbim: ['"Starbim"', 'cursive'],
        chewy: ['"Chewy Inside"', 'cursive'],
        bubble1: ['"Bubble 1"', 'cursive'],
        'super-bubble': ['"Super Bubble"', 'cursive'],
      },
      borderRadius: {
        bubble: '2rem',
        'bubble-lg': '2.75rem',
      },
      backgroundImage: {
        'nebula-1':
          'radial-gradient(45% 45% at 30% 20%, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0) 70%)',
        'nebula-2':
          'radial-gradient(50% 50% at 75% 60%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 70%)',
        'grid-overlay':
          'linear-gradient(rgba(94,234,212,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.045) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(94,234,212,0.35)',
        'glow-violet': '0 0 40px -8px rgba(167,139,250,0.35)',
        panel: '0 8px 32px rgba(0,0,0,0.45)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slower': 'spin 90s linear infinite',
        'spin-reverse': 'spin-reverse 60s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-astro': 'float-astro 7s ease-in-out infinite',
        'bob-rotate': 'bob-rotate 8s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        drift: 'drift 30s linear infinite',
        shoot: 'shoot 5.5s linear infinite',
        'galaxy-spin': 'spin 120s linear infinite',
        'blackhole-pulse': 'blackhole-pulse 4s ease-in-out infinite',
        'orbit-cw': 'spin 22s linear infinite',
        'orbit-ccw': 'spin-reverse 28s linear infinite',
        'glow-pulse-lg': 'glow-pulse-lg 5s ease-in-out infinite',
        rise: 'rise 0.8s ease-out both',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-astro': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-4deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'bob-rotate': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(2deg)' },
          '66%': { transform: 'translateY(6px) rotate(-2deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        drift: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shoot: {
          '0%': { transform: 'translate(0, 0)', opacity: 0 },
          '4%': { opacity: 1 },
          '18%': { transform: 'translate(-320px, 180px)', opacity: 0 },
          '100%': { transform: 'translate(-320px, 180px)', opacity: 0 },
        },
        'blackhole-pulse': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        },
        'glow-pulse-lg': {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 0.75 },
        },
        rise: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
