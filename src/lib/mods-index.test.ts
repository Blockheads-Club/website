import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_INDEX_URL, SAMPLE_INDEX, fetchIndex, loadModsIndex, resetModsIndexCache } from './mods-index';

const real = { schema: 1, generated: '2026-01-01T00:00:00Z', api: ['0.1.0'], mods: [SAMPLE_INDEX.mods[0]] };
const json = (body: unknown, status = 200) => Promise.resolve(new Response(JSON.stringify(body), { status }));

describe('fetchIndex', () => {
  it('uses a valid published index', async () => {
    const log = vi.fn();
    const fetchFn = vi.fn(() => json(real));
    const result = await fetchIndex('https://i.invalid/index.json', fetchFn as unknown as typeof fetch, log);
    expect(result).toEqual({ index: real, sample: false });
    expect(fetchFn).toHaveBeenCalledWith('https://i.invalid/index.json', expect.objectContaining({ headers: { accept: 'application/json' } }));
    expect(log).toHaveBeenCalledWith('using https://i.invalid/index.json (1 mods)');
  });
  it.each([
    ['a 404', () => json({}, 404), 'HTTP 404'],
    ['an invalid index', () => json({ schema: 2, mods: [] }), 'not a valid schema 1 index'],
    ['invalid JSON', () => Promise.resolve(new Response('<html>')), 'Unexpected'],
    ['a network error', () => Promise.reject(new Error('offline')), 'offline']
  ])('falls back to the sample on %s', async (_name, impl, why) => {
    const log = vi.fn();
    const result = await fetchIndex('https://i.invalid/index.json', impl as unknown as typeof fetch, log);
    expect(result).toEqual({ index: SAMPLE_INDEX, sample: true });
    expect(log).toHaveBeenCalledWith(expect.stringContaining(why));
    expect(log).toHaveBeenCalledWith(expect.stringContaining('using the bundled sample index'));
  });
});

describe('loadModsIndex', () => {
  beforeEach(resetModsIndexCache);
  afterEach(resetModsIndexCache);

  it('defaults to the published URL and fetches once', async () => {
    const fetchFn = vi.fn(() => json({}, 404));
    const log = vi.fn();
    const a = await loadModsIndex({}, fetchFn as unknown as typeof fetch, log);
    const b = await loadModsIndex({ MODS_INDEX_URL: 'https://other.invalid' }, fetchFn as unknown as typeof fetch, log);
    expect(a).toBe(b);
    expect(a.sample).toBe(true);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(fetchFn.mock.calls[0][0]).toBe(DEFAULT_INDEX_URL);
  });
  it('honours MODS_INDEX_URL', async () => {
    const fetchFn = vi.fn(() => json(real));
    const result = await loadModsIndex({ MODS_INDEX_URL: 'https://mine.invalid/i.json' }, fetchFn as unknown as typeof fetch, () => {});
    expect(result.sample).toBe(false);
    expect(fetchFn.mock.calls[0][0]).toBe('https://mine.invalid/i.json');
  });
  it('logs to the console by default and uses the global fetch', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    try {
      expect((await loadModsIndex({})).sample).toBe(true);
      expect(spy).toHaveBeenCalledWith(expect.stringMatching(/^mods-index: .*no network/));
    } finally {
      vi.unstubAllGlobals();
      spy.mockRestore();
    }
  });
});
