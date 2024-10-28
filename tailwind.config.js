/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
            textShadow: '0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0',
          },
          '50%': {
            opacity: .5,
            textShadow: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};