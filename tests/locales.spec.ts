import { expect, test } from '@playwright/test';
import { kk } from '../src/lib/i18n/kk';
import { ru } from '../src/lib/i18n/ru';
import { tr } from '../src/lib/i18n/tr';

const CASES = [
  ['tr', 'Türkçe', tr],
  ['ru', 'Русский', ru],
  ['kk', 'Қазақша', kk]
] as const;

for (const [code, name, d] of CASES) {
  test(`switches to ${name}, keeps it and opens the ${code} docs`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Language: English' }).first().click();
    await page.getByRole('menuitemradio', { name }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.home.title);
    await page.goto('/server');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.apps.names.server);
    await expect(page.getByText(d.server.tagline)).toBeVisible();
    await page.getByRole('navigation', { name: d.nav.label }).getByRole('link', { name: d.nav.docs }).click();
    await expect(page).toHaveURL(new RegExp('/docs/' + code + '/$'));
    await expect(page.locator('html')).toHaveAttribute('lang', code);
  });
}

test.describe('browser language', () => {
  test.use({ locale: 'kk-KZ' });
  test('a Kazakh browser gets Kazakh without picking it', async ({ page }) => {
    await page.goto('/download');
    await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(kk.download.title);
  });
});

test.describe('Russian browser on a 360px phone', () => {
  test.use({ locale: 'ru-RU', viewport: { width: 360, height: 740 } });
  for (const path of ['/', '/download', '/pc', '/patcher-app', '/server', '/mods', '/contribute', '/about']) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    });
  }
});
