import { expect, test } from '@playwright/test';

test('docs load in English and link back to the site', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL(/\/docs\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads Club Docs');
  await page.getByRole('link', { name: 'PC Port' }).first().click();
  await expect(page).toHaveURL(/\/docs\/pc-port$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('PC Port');
  await page.getByRole('link', { name: 'Main site' }).first().click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Keep The Blockheads playable');
});

test('Turkish docs load', async ({ page }) => {
  await page.goto('/docs/tr/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads Club Belgeleri');
  await page.goto('/docs/tr/server');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sunucu');
});
