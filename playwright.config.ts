import { defineConfig } from '@playwright/test';

// PW_PORT picks another port when 4173 is taken by another local preview.
const port = Number(process.env.PW_PORT ?? 4173);

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: 'bun run build && bunx vite preview --strictPort --port ' + port,
    port,
    reuseExistingServer: !process.env.CI
  },
  use: { baseURL: 'http://localhost:' + port }
});
