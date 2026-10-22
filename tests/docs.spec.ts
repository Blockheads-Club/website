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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blockheads Club Dokümanları');
  await page.goto('/docs/tr/server');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sunucu');
});

test('mods docs: sidebar section, guides and the generated API reference', async ({ page }) => {
  await page.goto('/docs/mods');
  const sidebar = page.locator('.VPSidebar');
  await expect(sidebar.getByText('Mods', { exact: true })).toBeVisible();
  await sidebar.getByRole('link', { name: 'For server owners' }).click();
  await expect(page).toHaveURL(/\/docs\/mods\/servers$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mods on your server');
  await expect(page.getByText('mods.toml').first()).toBeVisible();
  await page.goto('/docs/mods/api/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('API reference');
  await page.getByRole('link', { name: 'events', exact: true }).first().click();
  await expect(page).toHaveURL(/\/docs\/mods\/api\/events$/);
  await expect(page.getByRole('heading', { name: /event-kind/ })).toBeVisible();
});

test('translated mods docs keep the generated reference in English', async ({ page }) => {
  await page.goto('/docs/tr/mods/players');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.locator('.VPSidebar').getByText('Modlar', { exact: true })).toBeVisible();
  await page.goto('/docs/tr/mods/api/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('API başvurusu');
  await page.goto('/docs/ru/mods/api/players');
  await expect(page.getByText('Сам справочник на английском')).toBeVisible();
  await expect(page.getByText('Connected players.')).toBeVisible();
});
