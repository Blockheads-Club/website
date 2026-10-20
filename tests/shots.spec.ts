import { expect, test, type Page } from '@playwright/test';

/** Scrolls every screenshot into view (they are lazy) and checks that each one actually loaded. */
async function expectShotsLoaded(page: Page, count: number) {
  const imgs = page.locator('img[src*="/shots/"]');
  await expect(imgs).toHaveCount(count);
  for (const img of await imgs.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
    expect(await img.getAttribute('alt')).toBeTruthy();
  }
}

test('the phone guide shows Patcher screenshots, in Turkish too', async ({ page }) => {
  await page.goto('/guides/fix-game-on-phone');
  await expectShotsLoaded(page, 4);
  await expect(page.locator('img[src*="/shots/en/patcher/phone-choose.webp"]')).toBeVisible();
  await page.evaluate(() => localStorage.setItem('bh-locale', 'tr'));
  await page.reload();
  await expect(page.locator('img[src*="/shots/tr/patcher/phone-choose.webp"]')).toHaveCount(1);
  await expectShotsLoaded(page, 4);
});

test('guides and docs show app screenshots', async ({ page }) => {
  await page.goto('/guides/lan-play');
  await expectShotsLoaded(page, 2);
  await page.goto('/docs/server');
  await expectShotsLoaded(page, 5);
  await page.goto('/docs/ru/patcher');
  await expect(page.locator('img[src*="/shots/ru/patcher/"]')).toHaveCount(6);
  await expectShotsLoaded(page, 6);
});
