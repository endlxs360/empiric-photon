/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      colors: {
        ink: '#04060B',
        surface: '#0A0E16',
        raised: '#101521',
        cyan: { neon: '#00F2FE' },
        violet: { neon: '#7F00FF' },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
