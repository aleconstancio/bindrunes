import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
  ],
  resolve: {
    conditions: ['browser', 'import', 'module'],
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts}'],
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: ['src/test-setup.ts', 'src/test-utils.ts'],
    },
  },
});
