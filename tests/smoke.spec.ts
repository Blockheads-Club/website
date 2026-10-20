import { expect, test } from '@playwright/test';

test('landing page renders, links are real and language switches to Turkish', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Keep The Blockheads playable');
  await expect(page.getByRole('link', { name: 'Open the web Patcher' })).toHaveAttribute(
    'href',
    'https://blockheads.club/patcher/'
  );
  await page.getByRole('button', { name: 'Language: English' }).first().click();
  await page.getByRole('menuitemradio', { name: /Türkçe/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('oynanabilir');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('theme toggles and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to (dark|light) theme/ }).click();
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});

test('navigation reaches every page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await nav.getByRole('link', { name: 'Server' }).click();
  await expect(page).toHaveURL(/\/server$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Host a world');
  await nav.getByRole('link', { name: 'Guides' }).click();
  await expect(page).toHaveURL(/\/guides$/);
  await page.getByRole('link', { name: /Fix the game on your phone/ }).first().click();
  await expect(page).toHaveURL(/\/guides\/fix-game-on-phone$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fix the game on your phone');
  await nav.getByRole('link', { name: 'FAQ' }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await page.getByRole('link', { name: 'Legal', exact: true }).click();
  await expect(page).toHaveURL(/\/legal$/);
});

test('server quick start tabs switch', async ({ page }) => {
  await page.goto('/server');
  await expect(page.getByRole('tab', { name: 'Linux' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'Windows' }).click();
  await expect(page.getByText('blockheads_server.exe')).toBeVisible();
  await page.getByRole('tab', { name: 'Docker' }).click();
  await expect(page.getByText('docker run')).toBeVisible();
});

test('guides search filters', async ({ page }) => {
  await page.goto('/guides');
  await page.getByRole('searchbox').fill('docker');
  await expect(page.getByText('Docker and Docker Compose')).toBeVisible();
  await expect(page.getByText('Open your server to the internet')).toHaveCount(0);
});

test('mobile menu opens at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'FAQ' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Server' }).click();
  await expect(page).toHaveURL(/\/server$/);
  await expect(dialog).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('unknown route serves the 404 page', async ({ page }) => {
  const res = await page.goto('/nope');
  expect(res?.status()).toBe(404);
});
