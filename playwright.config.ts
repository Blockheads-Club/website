import { defineConfig } from '@playwright/test';

// PW_PORT picks another port when 4173 is taken by another local preview.
const port = Number(process.env.PW_PORT ?? 4173);

export default defineConfig({
  testDir: 'tests',
  webServer: {
    // MODS_INDEX_URL points at a closed local port: the build must not touch the real network and uses the sample index.
    command: 'MODS_INDEX_URL=http://127.0.0.1:9/index.json bun run build && bunx vite preview --strictPort --port ' + port,
    port,
    reuseExistingServer: !process.env.CI
  },
  use: { baseURL: 'http://localhost:' + port }
});
