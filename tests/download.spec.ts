import { expect, test } from '@playwright/test';

test.describe('on a Mac', () => {
  test.use({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36' });

  test('picks the platform, keeps the choice in the URL and offers one file', async ({ page }) => {
    await page.goto('/download');
    await expect(page.getByText('We think you’re on macOS')).toBeVisible();
    await expect(page.getByRole('radio', { name: 'macOS' })).toBeChecked();
    await expect(page).toHaveURL(/\?task=pc&device=macos$/);
    const result = page.locator('section.result');
    const button = result.getByRole('link', { name: 'Download for macOS' });
    if (await button.count()) await expect(button).toHaveAttribute('href', /\.dmg$/);
    else await expect(page.getByRole('alert')).toContainText('couldn’t load');
    await page.getByRole('radio', { name: /Play with friends/ }).check({ force: true });
    await page.getByRole('radio', { name: 'Docker' }).check({ force: true });
    await expect(page).toHaveURL(/\?task=server&device=docker$/);
    await expect(result.getByRole('heading', { level: 2 })).toHaveText(/Server for Docker|couldn’t load/);
  });
});

test('shared links open the asked task and device', async ({ page }) => {
  await page.goto('/download?task=patcher&device=ios');
  await expect(page.locator('#rt')).toHaveText('Patcher isn’t available here');
  await page.locator('summary').click();
  await expect(page.getByRole('table').getByRole('link', { name: 'Open in your browser' })).toHaveAttribute('href', '/patcher/');
});

test.describe('on an Android phone', () => {
  test.use({ userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36' });

  test('suggests the Patcher APK', async ({ page }) => {
    await page.goto('/download');
    await expect(page.getByRole('radio', { name: /Fix the game on my phone/ })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Android' })).toBeChecked();
    await expect(page.locator('#rt')).toHaveText(/Patcher for Android|couldn’t load/);
  });
});
