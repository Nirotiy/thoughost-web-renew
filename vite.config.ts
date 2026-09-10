import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.PAGES_BASE_PATH || '/',
  server: { proxy: { '/api': 'http://127.0.0.1:5210' } },
});
