import { expect, test } from '@playwright/test';

test('landing page renders and switches language', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Keep The Blockheads playable.');
  await expect(page.getByRole('link', { name: 'Open the web patcher' }).first()).toHaveAttribute(
    'href',
    'https://blockheads-club.github.io/blockheads-patcher/'
  );
  await page.getByRole('button', { name: 'TR' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('oynanabilir');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('theme toggles', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to (dark|light) theme/ }).click();
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
});

test('unknown route serves the 404 page', async ({ page }) => {
  const res = await page.goto('/nope');
  expect(res?.status()).toBe(404);
});
