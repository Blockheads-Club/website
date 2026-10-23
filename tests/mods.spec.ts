import { expect, test } from '@playwright/test';

// The e2e build runs with an unreachable MODS_INDEX_URL (playwright.config.ts), so the bundled sample index is shown.
test('mods list: sample notice, search, tag filter and native badge', async ({ page }) => {
  await page.goto('/mods');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mods for The Blockheads');
  await expect(page.getByTestId('sample-notice')).toContainText('Sample data');
  const cards = page.locator('a.mcard');
  await expect(cards).toHaveCount(6);

  await page.getByRole('searchbox', { name: 'Search mods' }).fill('minimap');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Sample Minimap');
  await page.getByRole('searchbox', { name: 'Search mods' }).fill('zzzz');
  await expect(page.getByText('No mods match your search.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(cards).toHaveCount(6);

  await page.getByRole('group', { name: 'Filter by tag' }).getByRole('button', { name: 'example' }).click();
  await expect(cards).toHaveCount(2);
  await page.getByRole('group', { name: 'Filter by tag' }).getByRole('button', { name: 'All tags' }).click();

  const native = page.locator('a.mcard', { hasText: 'Sample Native Tools' });
  await expect(native.locator('.b-bad')).toContainText('Native code');
  await expect(native).toContainText('Runs native code outside the sandbox');
});

test('mod detail shows versions, hash, dependencies and permissions', async ({ page }) => {
  await page.goto('/mods');
  await page.getByRole('link', { name: /Sample Minimap/ }).click();
  await expect(page).toHaveURL(/\/mods\/sample-minimap$/);
  await expect(page).toHaveTitle('Sample Minimap (fake) · Blockheads Club');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sample Minimap');
  await expect(page.getByText('c'.repeat(64))).toBeVisible();
  await expect(page.getByText('World: write. Can change the world')).toBeVisible();
  await page.getByRole('link', { name: 'sample-lib' }).click();
  await expect(page).toHaveURL(/\/mods\/sample-lib$/);
  await expect(page.locator('tr[data-version="1.0.0"]')).toContainText('Yanked');
  await expect(page.locator('tr[data-version="1.1.0"]')).toContainText('Latest');
  await expect(page.getByRole('link', { name: 'Mirror 1.1.0' })).toBeVisible();
});

test('native mods get a red warning box', async ({ page }) => {
  await page.goto('/mods/sample-native-tools');
  await expect(page.locator('.notice.bad')).toContainText('Native code: be careful');
  await expect(page.getByText('api.example.invalid').first()).toBeVisible();
});

test('unknown mods fall back to a not-found page', async ({ page }) => {
  const res = await page.goto('/mods/does-not-exist');
  expect(res?.status()).toBe(404);
});

test('submit page and navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Apps' }).click();
  await page.locator('#apps-panel').getByRole('link', { name: /^Mods/ }).click();
  await expect(page).toHaveURL(/\/mods$/);
  await page.getByRole('link', { name: 'Submit a mod' }).first().click();
  await expect(page).toHaveURL(/\/mods\/submit$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Submit a mod');
  await expect(page.getByText('mods/<first letter>/<id>.toml').first()).toBeVisible();
  await expect(page.getByText('needs-security-review').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open the mod SDK' })).toHaveAttribute('href', 'https://github.com/Blockheads-Club/mod-sdk');
});

test('mods pages and docs page translate', async ({ page }) => {
  await page.goto('/mods');
  await page.getByRole('button', { name: 'Language: English' }).first().click();
  await page.getByRole('menuitemradio', { name: /Türkçe/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('modlar');
  await page.goto('/docs/mods');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Making a mod');
  await page.goto('/docs/tr/mods');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mod yapma');
  await page.getByRole('link', { name: 'Mod gönder' }).first().click();
  await expect(page).toHaveURL(/\/mods\/submit$/);
});

test('no /mods/index.json is served without a published index', async ({ request }) => {
  // The sample index is for the pages only; clients must never receive it as the real index.
  const res = await request.get('/mods/index.json');
  expect(res.ok()).toBe(false);
});
