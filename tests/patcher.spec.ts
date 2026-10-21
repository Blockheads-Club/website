import { expect, test } from '@playwright/test';

// The web Patcher is bundled as static files under build/patcher/ (scripts/build-patcher.ts).
test('the bundled web Patcher loads at /patcher/ and from a deep link', async ({ page }) => {
  await page.goto('/patcher/');
  await expect(page).toHaveTitle(/Blockheads Patcher/);
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  const res = await page.goto('/patcher/splash');
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/Blockheads Patcher/);
});
