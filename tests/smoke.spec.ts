import { expect, test } from '@playwright/test';

test('home says what we are and routes to the apps', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Blockheads, kept alive by its players.');
  await expect(page.getByRole('link', { name: 'Get the right download' })).toHaveAttribute('href', '/download');
  await expect(page.getByRole('link', { name: 'Get the Server' })).toHaveAttribute('href', '/download?task=server');
  await expect(page.getByText('Unofficial fan project. Not affiliated with Majic Jungle Software or Noodlecake.').first()).toBeVisible();
  // Release rows are filled at build time: a version, or a link to GitHub when the API was unavailable.
  const rows = page.locator('li.rel');
  await expect(rows).toHaveCount(3);
  for (const row of await rows.all()) await expect(row.getByRole('link')).toHaveAttribute('href', /^https:\/\/github\.com\/Blockheads-Club\//);
});

test('the Apps menu reaches every app page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const [name, path, h1] of [
    ['Blockheads PC', '/pc', 'Blockheads PC'],
    ['Patcher', '/patcher-app', 'Patcher'],
    ['Server', '/server', 'Server'],
    ['Mods', '/mods', 'Mods for The Blockheads']
  ]) {
    await nav.getByRole('button', { name: 'Apps' }).click();
    await page.locator('#apps-panel').getByRole('link', { name: new RegExp('^' + name) }).click();
    await expect(page).toHaveURL(new RegExp(path + '$'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1);
  }
  await nav.getByRole('link', { name: 'Get involved' }).click();
  await expect(page).toHaveURL(/\/contribute$/);
  await page.getByRole('contentinfo').getByRole('link', { name: 'About & legal' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('#legal')).toContainText('Majic Jungle Software');
});

test('app pages offer a real download and link into the docs', async ({ page }) => {
  await page.goto('/server');
  const primary = page.getByRole('link', { name: /^Download for / });
  await expect(primary).toHaveAttribute('href', /^https:\/\/github\.com\/Blockheads-Club\/blockheads-server\/releases/);
  await expect(page.getByRole('link', { name: 'Play with friends on the same Wi-Fi' })).toHaveAttribute('href', '/docs/guides/lan-play');
  await page.goto('/patcher-app');
  await expect(page.getByRole('link', { name: 'Open the web Patcher' })).toHaveAttribute('href', '/patcher/');
});

test('theme toggles and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to (dark|light) theme/ }).first().click();
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});

test('unknown route serves the 404 page', async ({ page }) => {
  const res = await page.goto('/nope');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This block is missing.');
});
