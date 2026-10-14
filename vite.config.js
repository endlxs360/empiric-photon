import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' serves the app (and /promo.mp4) from the domain root.
// For a GitHub Pages project site (user.github.io/repo/) build with: VITE_BASE=/repo/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: { target: 'es2019', sourcemap: false },
});
