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
    alias: {
      bindrunes: new URL('./src/bindrunes-stub.ts', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', '.svelte-kit', '**/__package__/**'],
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/test-setup.ts',
        'src/test-utils.ts',
        'src/helpers/**',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.d.ts',
      ],
      thresholds: {
        lines: 0,
        functions: 0,
        statements: 0,
        branches: 0,
      },
    },
  },
});
