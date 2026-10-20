import { expect, test } from '@playwright/test';
import { kk } from '../src/lib/i18n/kk';
import { ru } from '../src/lib/i18n/ru';

const CASES = [
  ['ru', 'Русский', ru],
  ['kk', 'Қазақша', kk]
] as const;

for (const [code, name, d] of CASES) {
  test(`switches to ${name}, opens a guide and the ${code} docs`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Language: English' }).first().click();
    await page.getByRole('menuitemradio', { name }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    const nav = page.getByRole('navigation', { name: d.nav.label });
    await nav.getByRole('link', { name: d.nav.guides }).click();
    await expect(page).toHaveURL(/\/guides$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.guides.title);

    const guide = d.docs['lan-play'];
    await page.getByRole('link', { name: guide.title }).first().click();
    await expect(page).toHaveURL(/\/guides\/lan-play$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(guide.title);
    await expect(page.getByRole('navigation', { name: d.article.toc })).toBeVisible();

    // The language survives a reload, and the docs link opens the matching docs locale.
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await page.getByRole('navigation', { name: d.nav.label }).getByRole('link', { name: d.nav.docs }).click();
    await expect(page).toHaveURL(new RegExp('/docs/' + code + '/$'));
    await expect(page.locator('html')).toHaveAttribute('lang', code);
  });
}

test.describe('browser language', () => {
  test.use({ locale: 'kk-KZ' });
  test('a Kazakh browser gets Kazakh without picking it', async ({ page }) => {
    await page.goto('/faq');
    await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(kk.faq.title);
  });
});

test.describe('Russian browser on a 360px phone', () => {
  test.use({ locale: 'ru-RU', viewport: { width: 360, height: 740 } });
  for (const path of ['/', '/server', '/guides', '/faq', '/guides/docker']) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    });
  }
});
