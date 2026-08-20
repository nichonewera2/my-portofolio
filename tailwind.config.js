/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#05060d',
          soft: '#0a0d1a',
          deep: '#020308',
        },
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
        starlight: '#e6ecff',
      },
      fontFamily: {
        display: ['"Fredoka"', '"Sora"', 'sans-serif'],
        body: ['"Sora"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
      },
    },
  },
  plugins: [],
}
