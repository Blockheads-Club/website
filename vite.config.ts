import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import sirv from 'sirv';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

// No @types/node in this project; only the environment is needed here.
declare const process: { env: Record<string, string | undefined> };

const base = process.env.BASE_PATH ?? '';
const docsPath = base + '/docs';
const patcherPath = base + '/patcher';

/**
 * The VitePress docs (build/docs) and the web Patcher (build/patcher, scripts/build-patcher.ts) are built outside
 * SvelteKit's own output (see package.json "build"), so `vite preview` (and the Playwright tests) would not see them.
 * Serve them like the static hosts do (clean URLs).
 */
function previewDocs(): Plugin {
  return {
    name: 'preview-docs',
    configurePreviewServer(server) {
      server.middlewares.use(docsPath, sirv('build/docs', { extensions: ['html'], dev: true }));
      server.middlewares.use(patcherPath, sirv('build/patcher', { extensions: ['html'], dev: true }));
    }
  };
}

export default defineConfig({
  plugins: [previewDocs(), sveltekit(), svelteTesting()],
  server: {
    // `bun run dev` also starts the VitePress dev server on :5174 (base `<BASE_PATH>/docs/`); serve it under /docs here.
    proxy: { [docsPath]: { target: 'http://localhost:5174', ws: true } }
  },
  // `vite preview` would inherit the dev proxy; previewDocs() serves the built docs instead.
  preview: { proxy: {} },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,svelte}'],
      exclude: ['src/**/*.test.ts', 'src/**/*.d.ts', 'src/test/**'],
      reporter: ['text', 'lcov'],
      thresholds: { lines: 100, branches: 100, functions: 100, statements: 100 }
    }
  }
});
