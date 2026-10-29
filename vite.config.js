import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' so the built site works from any folder (GitHub Pages, Netlify…)
export default defineConfig({
  plugins: [react()],
  base: './',
});
