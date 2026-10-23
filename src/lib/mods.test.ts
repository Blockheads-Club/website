import { describe, expect, it } from 'vitest';
import sample from './data/mods-sample.json';
import {
  allTags,
  compareVersions,
  filterMods,
  formatSize,
  isModsIndex,
  isNative,
  latestVersion,
  modDescription,
  modName,
  permissionKeys,
  sidesLabel,
  sortedVersions,
  type Mod,
  type ModVersion
} from './mods';

const ver = (version: string, extra: Partial<ModVersion> = {}): ModVersion => ({
  version,
  url: 'https://x.invalid/a.bhmod',
  sha256: '0'.repeat(64),
  sides: ['server'],
  api: '^0.1',
  permissions: {},
  published: '2026-01-01',
  ...extra
});
const mod = (id: string, versions: ModVersion[], extra: Partial<Mod> = {}): Mod => ({
  id,
  name: id.toUpperCase(),
  owners: ['me'],
  repo: 'https://x.invalid',
  versions,
  ...extra
});

describe('isModsIndex', () => {
  it('accepts the bundled sample', () => {
    expect(isModsIndex(sample)).toBe(true);
  });
  it('rejects wrong shapes', () => {
    const good = mod('a', [ver('1.0.0')]);
    expect(isModsIndex({ schema: 1, mods: [good] })).toBe(true);
    expect(isModsIndex({ schema: 1, mods: [{ ...good, i18n: { tr: { name: 'A' }, ru: { description: 'B' }, kk: {} } }] })).toBe(true);
    for (const bad of [
      null,
      [],
      'x',
      { schema: 2, mods: [] },
      { schema: 1 },
      { schema: 1, mods: [null] },
      { schema: 1, mods: [{ ...good, id: 1 }] },
      { schema: 1, mods: [{ ...good, versions: [] }] },
      { schema: 1, mods: [{ ...good, owners: [1] }] },
      { schema: 1, mods: [{ ...good, versions: [{ ...ver('1.0.0'), sides: [] }] }] },
      { schema: 1, mods: [{ ...good, versions: [{ ...ver('1.0.0'), permissions: null }] }] },
      { schema: 1, mods: [{ ...good, versions: [{ ...ver('1.0.0'), sha256: 5 }] }] },
      { schema: 1, mods: [{ ...good, i18n: 'tr' }] },
      { schema: 1, mods: [{ ...good, i18n: { tr: 'x' } }] },
      { schema: 1, mods: [{ ...good, i18n: { tr: { name: 1 } } }] },
      { schema: 1, mods: [{ ...good, i18n: { tr: { description: 1 } } }] }
    ]) {
      expect(isModsIndex(bad)).toBe(false);
    }
  });
});

describe('versions', () => {
  it('compares semver with pre-releases', () => {
    expect(compareVersions('1.2.0', '1.10.0')).toBeLessThan(0);
    expect(compareVersions('2.0.0', '1.9.9')).toBeGreaterThan(0);
    expect(compareVersions('1.0.0', '1.0.0+build')).toBe(0);
    expect(compareVersions('1.0.0', '1.0.0-rc.1')).toBeGreaterThan(0);
    expect(compareVersions('1.0.0-rc.1', '1.0.0')).toBeLessThan(0);
    expect(compareVersions('1.0.0-rc.1', '1.0.0-rc.1')).toBe(0);
    expect(compareVersions('1.0.0-alpha', '1.0.0-beta')).toBeLessThan(0);
    expect(compareVersions('1.0.0-beta', '1.0.0-alpha')).toBeGreaterThan(0);
    expect(compareVersions('1.0', '1.0.0')).toBe(0);
  });
  it('sorts newest first and picks the newest non-yanked', () => {
    const m = mod('a', [ver('1.0.0'), ver('1.2.0', { yanked: true }), ver('1.1.0')]);
    expect(sortedVersions(m).map((v) => v.version)).toEqual(['1.2.0', '1.1.0', '1.0.0']);
    expect(latestVersion(m)?.version).toBe('1.1.0');
    expect(latestVersion(mod('b', [ver('1.0.0', { yanked: true })]))).toBeUndefined();
  });
});

describe('labels and permissions', () => {
  it('names the sides', () => {
    expect(sidesLabel(['server'])).toBe('server');
    expect(sidesLabel(['client'])).toBe('client');
    expect(sidesLabel(['client', 'server'])).toBe('both');
  });
  it('lists the permissions that apply', () => {
    expect(permissionKeys({})).toEqual([]);
    expect(permissionKeys({ world: 'none', players: [], 'net-http': [] })).toEqual([]);
    expect(permissionKeys({ world: 'write', players: ['chat', 'ban'], 'net-http': ['a.invalid'], channels: true })).toEqual([
      { kind: 'world', value: 'write' },
      { kind: 'player', value: 'chat' },
      { kind: 'player', value: 'ban' },
      { kind: 'http', value: ['a.invalid'] },
      { kind: 'channels' }
    ]);
    expect(permissionKeys({ world: 'read' })).toEqual([{ kind: 'world', value: 'read' }]);
  });
  it('detects native', () => {
    expect(isNative(ver('1.0.0', { permissions: { native: true } }))).toBe(true);
    expect(isNative(ver('1.0.0'))).toBe(false);
    expect(isNative(undefined)).toBe(false);
  });
});

describe('search', () => {
  const mods = [
    mod('hello-lua', [ver('1.0.0')], { description: 'Greets players', tags: ['lua', 'example'] }),
    mod('map-tool', [ver('1.0.0')], { tags: ['example'] })
  ];
  it('collects sorted tags', () => {
    expect(allTags(mods)).toEqual(['example', 'lua']);
    expect(allTags([mod('x', [ver('1.0.0')])])).toEqual([]);
  });
  it('filters by name, id, description, tag and the tag filter', () => {
    expect(filterMods(mods, '', '', 'en')).toHaveLength(2);
    expect(filterMods(mods, ' HELLO ', '', 'en').map((m) => m.id)).toEqual(['hello-lua']);
    expect(filterMods(mods, 'greets', '', 'en')).toHaveLength(1);
    expect(filterMods(mods, 'MAP-TOOL', '', 'en')).toHaveLength(1);
    expect(filterMods(mods, 'lua', '', 'en')).toHaveLength(1);
    expect(filterMods(mods, '', 'example', 'en')).toHaveLength(2);
    expect(filterMods(mods, '', 'lua', 'en').map((m) => m.id)).toEqual(['hello-lua']);
    expect(filterMods(mods, 'zzz', '', 'en')).toEqual([]);
    expect(filterMods([mod('bare', [ver('1.0.0')])], 'bare', '', 'en')).toHaveLength(1);
  });
});

describe('translations', () => {
  const m = mod('hello', [ver('1.0.0')], {
    name: 'Hello',
    description: 'Greets players',
    i18n: { tr: { name: 'Merhaba', description: 'Oyuncuları selamlar' }, ru: { name: 'Привет' } }
  });
  it('falls back to English for a missing language or field', () => {
    expect(modName(m, 'tr')).toBe('Merhaba');
    expect(modDescription(m, 'tr')).toBe('Oyuncuları selamlar');
    expect(modName(m, 'ru')).toBe('Привет');
    expect(modDescription(m, 'ru')).toBe('Greets players');
    expect(modName(m, 'kk')).toBe('Hello');
    expect(modDescription(m, 'en')).toBe('Greets players');
    expect(modDescription(mod('bare', [ver('1.0.0')]), 'tr')).toBeUndefined();
  });
  it('searches the translated and the English text', () => {
    expect(filterMods([m], 'selamlar', '', 'tr')).toHaveLength(1);
    expect(filterMods([m], 'greets', '', 'tr')).toHaveLength(1);
    expect(filterMods([m], 'merhaba', '', 'tr')).toHaveLength(1);
    expect(filterMods([m], 'merhaba', '', 'en')).toEqual([]);
  });
});

describe('formatSize', () => {
  it('formats bytes', () => {
    expect(formatSize(undefined)).toBe('');
    expect(formatSize(512)).toBe('512 B');
    expect(formatSize(1532)).toBe('1.5 KiB');
    expect(formatSize(3 * 1024 * 1024)).toBe('3.0 MiB');
  });
});
