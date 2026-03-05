import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    loader: 'jsx',
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app/index.html'),
      },
    },
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

  // Fix for JSS (used by MUI)
  define: {
    global: {},
    // Expose VITE_DOCS to the Vite bundle for conditional rendering in Footer
    'process.env.VITE_DOCS': JSON.stringify(process.env.VITE_DOCS),
  },

  // Vitest options
  test: {
    include: ['**/*[.-]{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true,
    watch: false,
  },
});
