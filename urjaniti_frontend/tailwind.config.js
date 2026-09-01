/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#07111F',
          surface: '#0D1B2A',
          raised: '#10243A',
          line: 'rgba(148, 178, 209, 0.14)',
        },
        emerald: {
          DEFAULT: '#22C55E',
          soft: 'rgba(34, 197, 94, 0.14)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          soft: 'rgba(34, 211, 238, 0.14)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          soft: 'rgba(245, 158, 11, 0.14)',
        },
        danger: {
          DEFAULT: '#EF4444',
          soft: 'rgba(239, 68, 68, 0.14)',
        },
        ink: {
          DEFAULT: '#F4F8FB',
          muted: '#8CA3BE',
          faint: '#5D7592',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 12px 30px -12px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgba(34,197,94,0.25), 0 0 24px rgba(34,197,94,0.18)',
        cyanglow: '0 0 0 1px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.18)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(34,197,94,0.08), transparent 60%)',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.45 },
        },
        dash: {
          to: { strokeDashoffset: -40 },
        },
      },
      animation: {
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        dash: 'dash 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
