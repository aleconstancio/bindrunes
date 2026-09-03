import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['urupe-ui'],
  },
  ssr: {
    external: ['urupe-ui'],
  },
  server: {
    port: 5177,
  },
});
