import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('phone header: Download stays, the menu holds the rest', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Download', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apps' })).toBeHidden();
  const open = page.getByRole('button', { name: 'Open menu' });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  await expect(dialog.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole('link', { name: 'Server' }).click();
  await expect(page).toHaveURL(/\/server$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Server');
});

test('phone home shows the hero and the task cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get the Patcher' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
