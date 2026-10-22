import { expect, test } from '@playwright/test';

// Old routes are prerendered redirect pages (they work on every static host); old anchors redirect client-side.
const CASES: [string, RegExp][] = [
  ['/faq', /\/docs\/faq$/],
  ['/guides', /\/docs\/guides\/$/],
  ['/guides/fix-game-on-phone', /\/docs\/guides\/fix-game-on-phone$/],
  ['/guides/docker', /\/docs\/guides\/docker$/],
  ['/legal', /\/about#legal$/],
  ['/#patcher', /\/patcher-app$/],
  ['/#faq', /\/docs\/faq$/],
  ['/server#start', /\/docs\/server$/]
];

for (const [from, to] of CASES) {
  test(`${from} still works`, async ({ page }) => {
    await page.goto(from);
    await expect(page).toHaveURL(to);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });
}

test('a Turkish visitor lands in the Turkish docs', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('bh-locale', 'tr'));
  await page.goto('/guides/lan-play');
  await expect(page).toHaveURL(/\/docs\/tr\/guides\/lan-play$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('without JavaScript the old page still points to its new home', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/faq');
  await expect(page.getByRole('link', { name: 'Open it' })).toHaveAttribute('href', /docs\/faq$/);
  await expect(page).toHaveURL(/\/docs\/faq$/, { timeout: 10_000 });
  await context.close();
});
