import { expect, test, type APIRequestContext } from '@playwright/test';

// Link previews are read by crawlers from the prerendered HTML (no JavaScript), so these tests fetch raw files.
const SITE_URL = 'https://blockheads-club.github.io/website/';

/** The `content` of every `<meta property|name="key">` in `html`, in order. */
function metas(html: string, key: string): string[] {
  const re = new RegExp('<meta (?:property|name)="' + key.replace(/[:.]/g, '\\$&') + '" content="([^"]*)"', 'g');
  return [...html.matchAll(re)].map((m) => m[1].replaceAll('&amp;', '&'));
}

/** The canonical image URL as served by the local preview (base path is empty in the e2e build). */
async function expectPng(request: APIRequestContext, url: string) {
  expect(url.startsWith(SITE_URL)).toBe(true);
  const res = await request.get('/' + url.slice(SITE_URL.length));
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/png');
  const png = await res.body();
  expect([...png.subarray(1, 4)]).toEqual([0x50, 0x4e, 0x47]);
  return png;
}

for (const { path, title, image, description } of [
  { path: '/pc', title: 'Blockheads PC · Blockheads Club', image: SITE_URL + 'og/pc.png', description: 'Play your own copy' },
  {
    path: '/mods/hello-lua',
    title: 'Hello (Lua) — Blockheads mod',
    image: SITE_URL + 'mods/hello-lua/og.png',
    description: 'Starter mod written in Lua'
  },
  { path: '/mods', title: 'Mods · Blockheads Club', image: SITE_URL + 'og/mods.png', description: 'Browse community mods' }
]) {
  test('prerendered link preview of ' + path, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(metas(html, 'og:title')).toEqual([title]);
    expect(metas(html, 'twitter:title')).toEqual([title]);
    expect(metas(html, 'og:url')).toEqual([SITE_URL + path.slice(1)]);
    expect(metas(html, 'og:image')).toEqual([image]);
    expect(metas(html, 'og:description')).toHaveLength(1);
    expect(metas(html, 'og:description')[0]).toContain(description);
    expect(metas(html, 'description')).toEqual(metas(html, 'og:description'));
    expect(html.match(/<link rel="canonical"/g)).toHaveLength(1);
    const png = await expectPng(request, image);
    // IHDR width and height.
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  });
}

test('home and docs pages use the site-wide preview', async ({ request }) => {
  const home = await (await request.get('/')).text();
  expect(metas(home, 'og:title')).toEqual(['Blockheads Club']);
  await expectPng(request, metas(home, 'og:image')[0]);
  const docs = await (await request.get('/docs/tr/faq')).text();
  expect(metas(docs, 'og:url')).toEqual([SITE_URL + 'docs/tr/faq']);
  expect(metas(docs, 'og:locale')).toEqual(['tr_TR']);
  expect(metas(docs, 'og:title')).toHaveLength(1);
  await expectPng(request, metas(docs, 'og:image')[0]);
});
