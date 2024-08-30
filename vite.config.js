import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  // config options
  plugins: [react()],
});
