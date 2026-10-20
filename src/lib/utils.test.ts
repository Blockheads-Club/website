import { describe, expect, it } from 'vitest';
import { COMMANDS, copyText } from './commands';
import { ARTICLE_IDS, GUIDES, WRITTEN, guideById, linkKey, matchesFilter, neighbours } from './guides';
import { qrPattern } from './qr';
import { parseRich } from './rich';
import { guideSlug, routeKey } from './route';

describe('parseRich', () => {
  it('parses all inline kinds', () => {
    expect(parseRich('a **b** `c` {{[D]}} [e](faq) f')).toEqual([
      { kind: 'text', text: 'a ' },
      { kind: 'bold', text: 'b' },
      { kind: 'text', text: ' ' },
      { kind: 'mono', text: 'c' },
      { kind: 'text', text: ' ' },
      { kind: 'ph', text: '[D]' },
      { kind: 'text', text: ' ' },
      { kind: 'link', text: 'e', target: 'faq' },
      { kind: 'text', text: ' f' }
    ]);
    expect(parseRich('')).toEqual([]);
  });
});

describe('routeKey', () => {
  it.each([
    ['/website/', 'home'],
    ['/website', 'home'],
    ['/website/server', 'server'],
    ['/website/guides', 'guides'],
    ['/website/guides/fix-game-on-phone/', 'article'],
    ['/website/guides/docker', 'article'],
    ['/website/guides/nope', 'other'],
    ['/website/faq', 'faq'],
    ['/website/legal', 'legal'],
    ['/website/nope', 'other']
  ])('%s -> %s', (path, key) => {
    expect(routeKey(path, '/website')).toBe(key);
  });
  it('works without the base prefix', () => {
    expect(routeKey('/server', '/website')).toBe('server');
  });
});

describe('qrPattern', () => {
  it('is deterministic 21x21 with finder squares', () => {
    const a = qrPattern();
    expect(a).toHaveLength(441);
    expect(a).toEqual(qrPattern());
    expect(a[0]).toBe(true);
    expect(a[1 * 21 + 1]).toBe(false);
  });
});

describe('commands', () => {
  it('copies only commands', () => {
    expect(copyText(COMMANDS.docker[1]!)).toBe('docker attach blockheads');
    expect(copyText(COMMANDS.mac[0]!)).toBe('tar -xzf blockheads-server-macos-universal.tar.gz\ncd blockheads-server');
  });
});

describe('guides', () => {
  it('filters', () => {
    const fix = guideById('fix-game-on-phone');
    expect(matchesFilter(fix, 'all')).toBe(true);
    expect(matchesFilter(fix, 'android')).toBe(true);
    expect(matchesFilter(fix, 'patcher')).toBe(true);
    expect(matchesFilter(fix, 'server')).toBe(false);
    expect(matchesFilter(fix, 'beginner')).toBe(true);
    expect(matchesFilter(fix, 'advanced')).toBe(false);
    expect(GUIDES.length).toBeGreaterThan(5);
  });

  it('every listed guide is written and has its own path', () => {
    expect(WRITTEN).toEqual(GUIDES);
    for (const g of GUIDES) expect(g.path).toBe('/guides/' + g.id);
    expect(ARTICLE_IDS).toHaveLength(GUIDES.length - 1);
  });

  it('finds neighbours on the same topic', () => {
    expect(neighbours('get-apk')).toEqual({ prev: guideById('backup-worlds'), next: guideById('signing-key') });
    expect(neighbours('fix-game-on-phone').prev).toBeUndefined();
    expect(neighbours('docker').next).toBeUndefined();
  });

  it('derives link keys and slugs', () => {
    expect(linkKey('fix-game-on-phone')).toBe('fixGameOnPhone');
    expect(linkKey('docker')).toBe('docker');
    expect(guideSlug('/website/guides/lan-play/', '/website')).toBe('lan-play');
    expect(guideSlug('/website/guides', '/website')).toBeUndefined();
  });
});
