import { expect, test } from '@playwright/test';

test('docs load in English and link back to the site', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL(/\/docs\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads Club Docs');
  await page.getByRole('link', { name: 'Blockheads PC' }).first().click();
  await expect(page).toHaveURL(/\/docs\/pc-port$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads PC');
  await page.getByRole('link', { name: 'Main site' }).first().click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('The Blockheads, kept alive by its players.');
});

test('Turkish docs load', async ({ page }) => {
  await page.goto('/docs/tr/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads Club Dokümanları');
  await page.goto('/docs/tr/server');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sunucu');
});

test('the guides moved into the docs, with their screenshots', async ({ page }) => {
  await page.goto('/docs/guides/fix-game-on-phone');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fix the game on your phone');
  const imgs = page.locator('img[src*="/shots/en/patcher/"]');
  await expect(imgs).toHaveCount(4);
  for (const img of await imgs.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
  }
  await page.goto('/docs/kk/guides/');
  await expect(page.getByRole('link', { name: 'Docker және Docker Compose' }).first()).toBeVisible();
});
