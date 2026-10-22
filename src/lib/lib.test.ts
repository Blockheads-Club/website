import { describe, expect, it, vi } from 'vitest';
import { RELEASES } from '../test/fixtures';
import { app, appName, installGuide } from './apps';
import { en } from './i18n/en';
import { DEVICES, detectDevice, isDevice } from './platform';
import {
  NO_RELEASES,
  dockerCommand,
  formatDate,
  formatSize,
  fromApi,
  pickDownload,
  releasesPage,
  serverCommands,
  type ApiRelease
} from './releases';
import { parseRich } from './rich';
import { legacyAnchor, movedTarget, routeKey, targetHref } from './route';
import { ATTEMPTS, fetchReleases, loadReleases, resetReleases } from './server/releases';

describe('parseRich', () => {
  it('parses all inline kinds', () => {
    expect(parseRich('a **b** `c` {{[D]}} [e](org) f')).toEqual([
      { kind: 'text', text: 'a ' },
      { kind: 'bold', text: 'b' },
      { kind: 'text', text: ' ' },
      { kind: 'mono', text: 'c' },
      { kind: 'text', text: ' ' },
      { kind: 'ph', text: '[D]' },
      { kind: 'text', text: ' ' },
      { kind: 'link', text: 'e', target: 'org' },
      { kind: 'text', text: ' f' }
    ]);
    expect(parseRich('')).toEqual([]);
  });
});

describe('routes', () => {
  it.each([
    ['/website/', 'home'],
    ['/website', 'home'],
    ['/website/download', 'download'],
    ['/website/pc/', 'pc'],
    ['/website/patcher-app', 'patcher'],
    ['/website/server', 'server'],
    ['/website/mods', 'mods'],
    ['/website/contribute', 'contribute'],
    ['/website/about', 'about'],
    ['/website/guides', 'moved'],
    ['/website/guides/docker', 'moved'],
    ['/website/faq', 'moved'],
    ['/website/legal', 'moved'],
    ['/website/nope', 'other']
  ])('%s -> %s', (path, key) => {
    expect(routeKey(path, '/website')).toBe(key);
  });

  it('works without the base prefix', () => {
    expect(routeKey('/server', '/website')).toBe('server');
  });

  it('maps old pages and anchors to their new homes', () => {
    expect(movedTarget('/guides/lan-play', '')).toEqual({ docs: 'guides/lan-play' });
    expect(movedTarget('/guides/', '')).toEqual({ docs: 'guides/' });
    expect(movedTarget('/faq', '')).toEqual({ docs: 'faq' });
    expect(movedTarget('/legal', '')).toEqual({ site: '/about#legal' });
    expect(movedTarget('/pc', '')).toBeUndefined();
    expect(legacyAnchor('/website/', '#patcher', '/website')).toEqual({ site: '/patcher-app' });
    expect(legacyAnchor('/server', '#downloads', '')).toEqual({ site: '/download?task=server' });
    expect(legacyAnchor('/', '#nope', '')).toBeUndefined();
    expect(targetHref({ docs: 'faq' }, '/website', 'tr/')).toBe('/website/docs/tr/faq');
    expect(targetHref({ site: '/about#legal' }, '', '')).toBe('/about#legal');
  });
});

describe('platform', () => {
  it.each([
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 0, 'ios'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 5, 'android'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0, 'macos'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5, 'ios'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0, 'windows'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 0, 'linux'],
    ['Mozilla/5.0 (X11; CrOS x86_64 14541.0.0)', 0, 'linux'],
    ['curl/8.0', 0, undefined]
  ])('%s (%i touch points) -> %s', (ua, touch, device) => {
    expect(detectDevice(ua, touch)).toBe(device);
  });

  it('validates device ids', () => {
    expect(DEVICES).toHaveLength(7);
    expect(detectDevice('Windows')).toBe('windows');
    expect(isDevice('pi')).toBe(true);
    expect(isDevice('amiga')).toBe(false);
    expect(isDevice(null)).toBe(false);
  });
});

describe('apps', () => {
  it('names, metadata and install guides', () => {
    expect(appName('pc', en)).toBe('Blockheads PC');
    expect(appName('patcher', en)).toBe('Patcher');
    expect(appName('server', en)).toBe('Server');
    expect(app('server').path).toBe('/server');
    expect(installGuide('pc', 'windows')).toBe('pc-port');
    expect(installGuide('patcher', 'android')).toBe('guides/fix-game-on-phone');
    expect(installGuide('patcher', 'macos')).toBe('patcher');
    expect(installGuide('server', 'pi')).toBe('guides/raspberry-pi');
    expect(installGuide('server', 'windows')).toBe('server');
  });
});

const api = (tag: string, date: string | null, extra: Partial<ApiRelease> = {}): ApiRelease => ({
  tag_name: tag,
  draft: false,
  prerelease: false,
  published_at: date,
  html_url: 'https://github.com/x/releases/tag/' + tag,
  assets: [{ name: 'a.exe', size: 5, browser_download_url: 'https://dl/a.exe' }],
  ...extra
});

describe('releases', () => {
  it('fromApi picks the newest full release, else the newest pre-release', () => {
    const list = [
      api('v0.2.0', '2026-10-25T00:00:00Z', { prerelease: true }),
      api('v0.3.0', '2026-10-26T00:00:00Z', { draft: true }),
      api('v0.1.0', '2026-10-20T00:00:00Z'),
      api('v0.1.1', '2026-10-21T00:00:00Z'),
      api('v9', null)
    ];
    expect(fromApi(list)).toEqual({
      version: '0.1.1',
      tag: 'v0.1.1',
      date: '2026-10-21T00:00:00Z',
      url: 'https://github.com/x/releases/tag/v0.1.1',
      assets: [{ name: 'a.exe', size: 5, url: 'https://dl/a.exe' }]
    });
    expect(fromApi([list[0]])!.version).toBe('0.2.0');
    expect(fromApi([])).toBeNull();
  });

  it('picks the file for every app and device', () => {
    const pc = pickDownload('pc', 'windows', RELEASES);
    expect(pc.state === 'file' && pc.asset.name).toBe('Blockheads.PC_0.1.0_x64-setup.exe');
    expect(pc.state === 'file' && pc.alts.map((a) => a.key)).toEqual(['winArm']);
    const linux = pickDownload('pc', 'linux', RELEASES);
    expect(linux.state === 'file' && linux.alts.map((a) => a.key)).toEqual(['deb', 'rpm', 'linuxArm']);
    const apk = pickDownload('patcher', 'android', RELEASES);
    expect(apk.state === 'file' && apk.asset.name).toBe('blockheads-patcher-0.1.1-android-arm64.apk');
    const mac = pickDownload('patcher', 'macos', RELEASES);
    expect(mac.state === 'file' && mac.alts).toEqual([]);
    const pi = pickDownload('server', 'pi', RELEASES);
    expect(pi.state === 'file' && pi.cmd).toContain('tar -xzf blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz');
    expect(pickDownload('server', 'docker', RELEASES)).toMatchObject({ state: 'docker', cmd: dockerCommand('0.1.1') });
    expect(pickDownload('pc', 'android', RELEASES)).toEqual({ state: 'none', why: 'pcAndroid', go: 'patcher' });
    expect(pickDownload('server', 'ios', RELEASES)).toEqual({ state: 'none', why: 'serverIos', go: undefined });
    expect(pickDownload('pc', 'windows', NO_RELEASES)).toEqual({ state: 'error' });
    const empty = { ...RELEASES, pc: { ...RELEASES.pc!, assets: [] } };
    expect(pickDownload('pc', 'windows', empty)).toEqual({ state: 'error' });
  });

  it('server commands for the technical hosts', () => {
    const cmds = serverCommands(RELEASES)!;
    expect(cmds.docker).toContain('ghcr.io/blockheads-club/blockheads-server:0.1.1');
    expect(cmds.linux).toContain('x86_64-unknown-linux-gnu');
    expect(cmds.pi).toContain('aarch64-unknown-linux-gnu');
    expect(serverCommands(NO_RELEASES)).toBeNull();
    const noHeadless = { ...RELEASES, server: { ...RELEASES.server!, assets: RELEASES.server!.assets.filter((a) => !a.name.includes('x86_64-unknown')) } };
    expect(serverCommands(noHeadless)).toBeNull();
  });

  it('formats sizes, dates and links', () => {
    expect(formatSize(83_470_840, 'en')).toBe('83 MB');
    expect(formatSize(3_636_505, 'en')).toBe('3.6 MB');
    expect(formatSize(3_636_505, 'tr')).toBe('3,6 MB');
    expect(formatDate('2026-10-21T10:44:42Z', 'en')).toBe('October 21, 2026');
    expect(releasesPage('pc')).toBe('https://github.com/Blockheads-Club/blockheads-pc/releases');
  });
});

describe('build-time release fetch', () => {
  const ok = (body: unknown) => Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));
  const noWait = (_ms: number) => Promise.resolve();
  const stable = api('v0.1.0', '2026-10-20T00:00:00Z');

  it('fetches every app, sends the token and survives failures', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetcher = vi.fn((url: string, _init: RequestInit) => {
      if (url.includes('blockheads-pc')) return ok([stable]);
      if (url.includes('patcher')) return Promise.resolve(new Response('limit', { status: 403 }));
      return Promise.reject(new Error('offline'));
    });
    const wait = vi.fn(noWait);
    const r = await fetchReleases(fetcher, 'tok', wait);
    expect(r.pc!.version).toBe('0.1.0');
    expect(r.patcher).toBeNull();
    expect(r.server).toBeNull();
    expect(fetcher.mock.calls[0][1].headers).toMatchObject({ authorization: 'Bearer tok' });
    // pc once; patcher and server six tries each, alternating between the list and /releases/latest.
    expect(fetcher).toHaveBeenCalledTimes(1 + 2 * ATTEMPTS);
    const patcherUrls = fetcher.mock.calls.map((c) => c[0]).filter((u) => u.includes('patcher'));
    expect(patcherUrls).toHaveLength(ATTEMPTS);
    expect(patcherUrls[0]).toMatch(/\/releases\?per_page=10$/);
    expect(patcherUrls[1]).toMatch(/\/releases\/latest$/);
    const pauses = wait.mock.calls.map((c) => c[0]).sort((a, b) => a - b);
    expect(pauses).toEqual([2000, 2000, 4000, 4000, 6000, 6000, 8000, 8000, 10000, 10000]);
    expect(warn.mock.calls.filter((c) => String(c[0]).includes('linking to GitHub releases'))).toHaveLength(2);
    fetcher.mockClear();
    await fetchReleases(fetcher, undefined, noWait);
    expect((fetcher.mock.calls[0][1].headers as Record<string, string>).authorization).toBeUndefined();
    warn.mockRestore();
  });

  it('retries an empty release list until the list answers', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const calls: Record<string, number> = {};
    const fetcher = vi.fn((url: string) => {
      const repo = url.split('/')[5];
      calls[repo] = (calls[repo] ?? 0) + 1;
      // First the list is empty, then /latest finds no stable release (pre-releases only), then the list recovers.
      if (calls[repo] === 1) return ok([]);
      if (calls[repo] === 2) return Promise.resolve(new Response('{"message":"Not Found"}', { status: 404 }));
      return ok([api('v0.2.0-beta.1', '2026-10-21T00:00:00Z', { prerelease: true })]);
    });
    const r = await fetchReleases(fetcher, undefined, noWait);
    expect(r.pc!.version).toBe('0.2.0-beta.1');
    expect(r.server!.version).toBe('0.2.0-beta.1');
    expect(fetcher).toHaveBeenCalledTimes(9);
    expect(warn.mock.calls.every((c) => String(c[0]).endsWith('retrying'))).toBe(true);
    warn.mockRestore();
  });

  it('falls back to /releases/latest when the list stays empty', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetcher = vi.fn((url: string) => (url.endsWith('/latest') ? ok(stable) : ok([])));
    const r = await fetchReleases(fetcher, undefined, noWait);
    expect(r.pc).toMatchObject({ version: '0.1.0', tag: 'v0.1.0' });
    expect(r.patcher!.version).toBe('0.1.0');
    expect(r.server!.version).toBe('0.1.0');
    expect(fetcher).toHaveBeenCalledTimes(6);
    expect(warn.mock.calls[0][0]).toContain('no published release');
    warn.mockRestore();
  });

  it('links to GitHub releases when every attempt fails', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetcher = vi.fn((url: string) => (url.endsWith('/latest') ? Promise.reject(new Error('timeout')) : ok([])));
    expect(await fetchReleases(fetcher, undefined, noWait)).toEqual(NO_RELEASES);
    expect(fetcher).toHaveBeenCalledTimes(3 * ATTEMPTS);
    expect(warn).toHaveBeenCalledTimes(3 * ATTEMPTS);
    warn.mockRestore();
  });

  it('pauses between attempts by default', async () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetcher = vi.fn((url: string) => (url.endsWith('/latest') ? ok(stable) : ok([])));
    const pending = fetchReleases(fetcher);
    await vi.advanceTimersByTimeAsync(1999);
    expect(fetcher).toHaveBeenCalledTimes(3);
    await vi.advanceTimersByTimeAsync(1);
    expect((await pending).pc!.version).toBe('0.1.0');
    vi.useRealTimers();
    warn.mockRestore();
  });

  it('loads once per build, or not at all offline', async () => {
    resetReleases();
    const fetcher = vi.fn(() => ok([stable]));
    expect(await loadReleases({ RELEASES_OFFLINE: '1' }, fetcher)).toEqual(NO_RELEASES);
    expect(fetcher).not.toHaveBeenCalled();
    await loadReleases({}, fetcher);
    await loadReleases({}, fetcher);
    expect(fetcher).toHaveBeenCalledTimes(3);
    resetReleases();
  });
});

describe('redirect', () => {
  it('replaces the location', async () => {
    const { redirect } = await import('./nav');
    redirect('#moved');
    expect(location.hash).toBe('#moved');
  });
});
