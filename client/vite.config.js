import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://devjourney-0i4t.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Ensuring the polyfill is used for Buffer
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Defining globalThis to support global variables
      define: {
        global: 'globalThis',
      },
      plugins: [
        // Polyfills for Node.js globals and modules
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true, // Polyfill Buffer
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});

