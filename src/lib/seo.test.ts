import { describe, expect, it } from 'vitest';
import { SITE_URL } from './config';
import { en } from './i18n/en';
import { tr } from './i18n/tr';
import type { Mod, ModVersion } from './mods';
import {
  DEFAULT_IMAGE,
  OG_HEIGHT,
  OG_PAGES,
  OG_WIDTH,
  canonical,
  isOgPage,
  modFacts,
  modSummary,
  modTitle,
  ogModPath,
  ogPagePath,
  pageMeta,
  pageText,
  truncate
} from './seo';

const version = (over: Partial<ModVersion> = {}): ModVersion => ({
  version: '1.2.0',
  url: 'https://example.com/m.bhmod',
  sha256: 'x',
  sides: ['server'],
  api: '^0.1',
  permissions: {},
  published: '2026-10-21',
  ...over
});
const mod = (over: Partial<Mod> = {}): Mod => ({
  id: 'voice',
  name: 'Voice',
  description: 'Proximity voice chat for servers.',
  owners: ['me'],
  repo: 'https://github.com/me/voice',
  versions: [version()],
  ...over
});

describe('truncate', () => {
  it('keeps short text and collapses whitespace', () => {
    expect(truncate('  a\n b  ')).toBe('a b');
  });
  it('cuts long text at a word boundary with an ellipsis', () => {
    expect(truncate('one two three four, five', 16)).toBe('one two three…');
  });
  it('cuts mid-word when there is no late space', () => {
    expect(truncate('abcdefghijklmnop qr', 10)).toBe('abcdefghi…');
  });
});

describe('urls', () => {
  it('builds canonical URLs below the site URL', () => {
    expect(canonical('/')).toBe(SITE_URL);
    expect(canonical('/pc')).toBe(SITE_URL + 'pc');
    expect(canonical('/mods/voice/')).toBe(SITE_URL + 'mods/voice');
    expect(ogPagePath('pc')).toBe('og/pc.png');
    expect(ogModPath('voice')).toBe('mods/voice/og.png');
  });
  it('knows which pages have their own preview', () => {
    expect(isOgPage('pc')).toBe(true);
    expect(isOgPage('home')).toBe(false);
  });
});

describe('pageText', () => {
  it.each(OG_PAGES)('has a name, title and description for %s', (key) => {
    const text = pageText(key, en);
    expect(text.name).not.toBe('');
    expect(text.title).toBe(en.meta.titles[key]);
    expect(text.description.length).toBeGreaterThan(20);
  });
  it('pitches the apps with tagline + lead', () => {
    expect(pageText('pc', en)).toEqual({ name: 'Blockheads PC', title: en.meta.titles.pc, description: en.pc.tagline + ' ' + en.pc.lead });
  });
});

describe('mod previews', () => {
  it('lists version, sides and vanilla-client support', () => {
    expect(modFacts(mod(), en)).toEqual(['v1.2.0', 'Server', 'works on vanilla clients']);
    expect(modFacts(mod({ versions: [version({ sides: ['server', 'client'], 'client-required': false })] }), en)).toEqual([
      'v1.2.0',
      'Server + client',
      'works on vanilla clients'
    ]);
    expect(modFacts(mod({ versions: [version({ sides: ['server', 'client'], 'client-required': true })] }), en)).toEqual([
      'v1.2.0',
      'Server + client'
    ]);
  });
  it('skips yanked versions and says when nothing is left', () => {
    expect(modFacts(mod({ versions: [version({ version: '2.0.0', yanked: true }), version()] }), en)[0]).toBe('v1.2.0');
    expect(modFacts(mod({ versions: [version({ yanked: true })] }), en)).toEqual([en.mods.allYanked]);
  });
  it('titles and summarises a mod, translated when possible', () => {
    expect(modTitle(mod(), en, 'en')).toBe('Voice — Blockheads mod');
    expect(modTitle(mod({ i18n: { tr: { name: 'Ses' } } }), tr, 'tr')).toBe('Ses — Blockheads modu');
    expect(modSummary(mod(), en, 'en')).toBe('Proximity voice chat for servers. · v1.2.0 · Server · works on vanilla clients');
    expect(modSummary(mod({ description: undefined }), en, 'en')).toBe('No description. · v1.2.0 · Server · works on vanilla clients');
    const long = modSummary(mod({ description: 'word '.repeat(80) }), en, 'en');
    expect(long.length).toBeLessThanOrEqual(200);
    expect(long).toContain('… · v1.2.0');
  });
});

describe('pageMeta', () => {
  it('describes a mod page with its own image', () => {
    const meta = pageMeta('modDetail', '/mods/voice', en, 'en', mod());
    expect(meta).toEqual({
      title: 'Voice — Blockheads mod',
      description: 'Proximity voice chat for servers. · v1.2.0 · Server · works on vanilla clients',
      url: SITE_URL + 'mods/voice',
      image: { url: SITE_URL + 'mods/voice/og.png', width: OG_WIDTH, height: OG_HEIGHT, alt: 'Voice — Blockheads mod' },
      type: 'article',
      locale: 'en_US'
    });
  });
  it('gives app and top-level pages their own preview', () => {
    const meta = pageMeta('pc', '/pc', en, 'en');
    expect(meta.title).toBe('Blockheads PC · Blockheads Club');
    expect(meta.description).toBe(truncate(en.pc.tagline + ' ' + en.pc.lead));
    expect(meta.url).toBe(SITE_URL + 'pc');
    expect(meta.image.url).toBe(SITE_URL + 'og/pc.png');
    expect(meta.type).toBe('website');
    expect(pageMeta('mods', '/mods', tr, 'tr')).toMatchObject({ title: tr.meta.titles.mods, locale: 'tr_TR' });
  });
  it('falls back to the site-wide preview', () => {
    const fallback = { width: DEFAULT_IMAGE.width, height: DEFAULT_IMAGE.height, url: SITE_URL + DEFAULT_IMAGE.path, alt: en.meta.title };
    expect(pageMeta('home', '/', en, 'en')).toMatchObject({ title: en.meta.title, url: SITE_URL, image: fallback });
    expect(pageMeta('moved', '/faq', en, 'en').url).toBe(SITE_URL + 'docs/faq');
    expect(pageMeta('moved', '/legal', en, 'en').url).toBe(SITE_URL + 'about');
    expect(pageMeta('other', '/nope', en, 'en').url).toBe(SITE_URL);
    expect(pageMeta('modDetail', '/mods/gone', en, 'en').image).toEqual(fallback);
  });
});
