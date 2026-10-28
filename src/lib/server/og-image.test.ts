// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { en } from '$lib/i18n/en';
import type { Mod } from '$lib/mods';
import { SAMPLE_INDEX, resetModsIndexCache } from '$lib/mods-index';
import { OG_PAGES } from '$lib/seo';
import { GET as modGet, entries as modEntries, prerender as modPrerender } from '../../routes/mods/[id]/og.png/+server';
import { GET as pageGet, entries as pageEntries, prerender as pagePrerender } from '../../routes/og/[page].png/+server';
import { cardTree, dataUrlBytes, modCard, pageCard, pngResponse, renderOg, svgDataUrl, titleSize } from './og-image';

/** Width and height from a PNG's IHDR chunk. */
function pngSize(png: Uint8Array): [number, number] {
  expect([...png.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  const view = new DataView(png.buffer, png.byteOffset);
  return [view.getUint32(16), view.getUint32(20)];
}

const mod = (over: Partial<Mod> = {}): Mod => ({
  id: 'voice',
  name: 'Voice',
  owners: ['me'],
  repo: 'https://github.com/me/voice',
  versions: [{ version: '1.0.0', url: 'u', sha256: 's', sides: ['server', 'client'], 'client-required': true, api: '^0.1', permissions: {}, published: 'p' }],
  ...over
});

describe('helpers', () => {
  it('decodes data URLs and encodes UTF-8 SVG', () => {
    expect([...dataUrlBytes('data:font/woff;base64,AQID')]).toEqual([1, 2, 3]);
    const url = svgDataUrl('<svg>ü</svg>');
    expect(new TextDecoder().decode(dataUrlBytes(url))).toBe('<svg>ü</svg>');
  });
  it('shrinks long titles', () => {
    expect(titleSize('Voice')).toBe(76);
    expect(titleSize('A somewhat longer name')).toBe(60);
    expect(titleSize('Blockheads Club is made by people like you.')).toBe(48);
  });
  it('builds at most five chips', () => {
    const tree = cardTree({ eyebrow: 'e', title: 't', description: 'd', chips: ['1', '2', '3', '4', '5', '6'], icon: 'logo' });
    expect(JSON.stringify(tree)).toContain('"5"');
    expect(JSON.stringify(tree)).not.toContain('"6"');
  });
});

describe('cards', () => {
  it('uses the app icon, pitch and platforms for app pages', () => {
    expect(pageCard('server')).toEqual({ eyebrow: 'Blockheads Club', title: 'Server', description: en.server.tagline, chips: en.server.platforms, icon: 'server' });
    expect(pageCard('about')).toEqual({ eyebrow: 'Blockheads Club', title: en.about.title, description: en.about.lead, chips: [], icon: 'logo' });
  });
  it('shows a mod with its facts and tags', () => {
    expect(modCard(mod({ description: 'Talk.', tags: ['chat'] }))).toEqual({
      eyebrow: en.mods.title,
      title: 'Voice',
      description: 'Talk.',
      chips: ['v1.0.0', 'Server + client', 'chat'],
      icon: 'logo'
    });
    expect(modCard(mod())).toMatchObject({ description: en.mods.detail.noDescription, chips: ['v1.0.0', 'Server + client'] });
  });
  it('renders a 1200x630 PNG', async () => {
    const png = await renderOg(pageCard('pc'));
    expect(pngSize(png)).toEqual([1200, 630]);
    const res = pngResponse(png);
    expect(res.headers.get('content-type')).toBe('image/png');
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(png);
  }, 30_000);
});

describe('endpoints', () => {
  beforeEach(() => {
    resetModsIndexCache();
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetModsIndexCache();
  });

  it('prerender one image per page', async () => {
    expect(pagePrerender).toBe(true);
    expect(await (pageEntries as () => unknown)()).toEqual(OG_PAGES.map((page) => ({ page })));
    const res = await pageGet({ params: { page: 'mods' } } as never);
    expect(pngSize(new Uint8Array(await res.arrayBuffer()))).toEqual([1200, 630]);
    await expect(pageGet({ params: { page: 'home' } } as never)).rejects.toMatchObject({ status: 404 });
  }, 30_000);

  it('prerender one image per mod in the index', async () => {
    expect(modPrerender).toBe(true);
    expect(await (modEntries as () => Promise<unknown>)()).toEqual(SAMPLE_INDEX.mods.map((m) => ({ id: m.id })));
    const res = await modGet({ params: { id: 'hello-lua' } } as never);
    expect(res.headers.get('content-type')).toBe('image/png');
    await expect(modGet({ params: { id: 'gone' } } as never)).rejects.toMatchObject({ status: 404 });
  }, 30_000);
});
