import { expect, test } from '@playwright/test';

const GUIDES: [string, string][] = [
  ['lan-play', 'Play with friends on the same Wi-Fi'],
  ['backup-worlds', 'Back up your worlds before patching'],
  ['get-apk', 'Get the APK of the game you own'],
  ['signing-key', 'Keep your signing key safe'],
  ['raspberry-pi', 'Run a 24/7 server on a Raspberry Pi'],
  ['open-internet', 'Open your server to the internet'],
  ['admins-mods', 'Admins, mods and bans explained'],
  ['host-android', 'Host from an Android phone'],
  ['docker', 'Docker and Docker Compose']
];

for (const [slug, title] of GUIDES) {
  test(`guide ${slug} is prerendered and readable`, async ({ page }) => {
    const res = await page.goto('/guides/' + slug);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page).toHaveTitle(title + ' · Blockheads Club');
    await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
    await expect(page.locator('#help li').first()).toBeVisible();
  });
}

test('every guide card on the index opens its guide', async ({ page }) => {
  await page.goto('/guides');
  await expect(page.getByText('Coming soon')).toHaveCount(0);
  await page.getByRole('link', { name: /Docker and Docker Compose/ }).click();
  await expect(page).toHaveURL(/\/guides\/docker$/);
  await page.getByRole('link', { name: /Previous.*Host from an Android phone/ }).click();
  await expect(page).toHaveURL(/\/guides\/host-android$/);
});

test('guide content switches to Turkish', async ({ page }) => {
  await page.goto('/guides/lan-play');
  await page.getByRole('button', { name: 'Language: English' }).first().click();
  await page.getByRole('menuitemradio', { name: /Türkçe/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aynı Wi-Fi ağındaki arkadaşlarınızla oynayın');
});

test('copy button copies a guide command', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/guides/docker');
  await page.getByRole('button', { name: 'Copy command' }).first().click();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain('docker run -it --rm -p 15151:15151/udp');
});
