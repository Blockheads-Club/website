import { describe, expect, it, vi } from 'vitest';
import worker from '../worker';
import { isPatcherPath, route, type Env } from './patcher-route';

function env(withPatcher = true): Env & { ASSETS: { fetch: ReturnType<typeof vi.fn> } } {
  return {
    ASSETS: { fetch: vi.fn(async () => new Response('site')) },
    ...(withPatcher ? { PATCHER: { fetch: vi.fn(async () => new Response('patcher')) } } : {})
  } as never;
}

describe('isPatcherPath', () => {
  it.each([
    ['/patcher', true],
    ['/patcher/', true],
    ['/patcher/_app/immutable/entry/start.js', true],
    ['/patcher/splash', true],
    ['/', false],
    ['/docs/patcher', false],
    ['/patchers', false],
    ['/patcher-old/', false],
    ['/server', false]
  ])('%s -> %s', (path, want) => expect(isPatcherPath(path)).toBe(want));
});

describe('fetch', () => {
  it('forwards /patcher requests unchanged to the patcher Worker', async () => {
    const e = env();
    const req = new Request('https://blockheads.club/patcher/splash?x=1', { headers: { 'sec-fetch-mode': 'navigate' } });
    const res = await worker.fetch(req, e);
    expect(await res.text()).toBe('patcher');
    expect(e.PATCHER!.fetch).toHaveBeenCalledWith(req);
    expect(e.ASSETS.fetch).not.toHaveBeenCalled();
  });

  it('serves everything else from the site assets', async () => {
    const e = env();
    for (const url of ['https://blockheads.club/', 'https://blockheads.club/docs/', 'https://blockheads.club/nope']) {
      const res = await worker.fetch(new Request(url), e);
      expect(await res.text()).toBe('site');
    }
    expect(e.ASSETS.fetch).toHaveBeenCalledTimes(3);
    expect(e.PATCHER!.fetch).not.toHaveBeenCalled();
  });

  it('answers 503 for /patcher when the binding is missing', async () => {
    const e = env(false);
    const res = await worker.fetch(new Request('https://blockheads.club/patcher/'), e);
    expect(res.status).toBe(503);
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(await res.text()).toContain('not available');
    expect(e.ASSETS.fetch).not.toHaveBeenCalled();
  });
});

describe('worker entry', () => {
  it('exports only the fetch handler, which is route()', () => {
    expect(Object.keys(worker)).toEqual(['fetch']);
    expect(worker.fetch).toBe(route);
  });
});
