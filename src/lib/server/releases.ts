// Build-time release data. Runs while the static site is prerendered; a failed request never fails the build: that
// app's release is null and the pages link to its GitHub releases page instead.
import { NO_RELEASES, PRODUCTS, REPOS, fromApi, type ApiRelease, type ProductId, type Releases } from '$lib/releases';

// No @types/node in this project; only the environment is needed here.
declare const process: { env: Record<string, string | undefined> };

type Fetch = (url: string, init: RequestInit) => Promise<Response>;
type Wait = (ms: number) => Promise<void>;

const sleep: Wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Tries per app before falling back to the GitHub releases link. */
export const ATTEMPTS = 6;

// The release list sometimes answers 200 with [] for a while (seen 2026-10-22 from Cloudflare builds and locally)
// while /releases/latest still works, so attempts alternate between the list (odd) and /releases/latest (even, the
// newest published stable release), with a growing pause between them.
async function fetchOne(id: ProductId, fetcher: Fetch, headers: Record<string, string>, wait: Wait) {
  const api = 'https://api.github.com/repos/' + REPOS[id] + '/releases';
  let why = '';
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) {
      console.warn('releases: ' + why + ', retrying');
      await wait(2000 * (attempt - 1));
    }
    const url = attempt % 2 === 0 ? api + '/latest' : api + '?per_page=10';
    try {
      const res = await fetcher(url, { headers, signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const body = (await res.json()) as ApiRelease | ApiRelease[];
      const release = fromApi(Array.isArray(body) ? body : [body]);
      if (!release) throw new Error('no published release in the response');
      return release;
    } catch (e) {
      why = url + ' failed (' + (e as Error).message + ')';
    }
  }
  console.warn('releases: ' + why + ', linking to GitHub releases instead');
  return null;
}

export async function fetchReleases(fetcher: Fetch, token?: string, wait: Wait = sleep): Promise<Releases> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'user-agent': 'blockheads-club-website-build'
  };
  if (token) headers.authorization = 'Bearer ' + token;
  const entries = await Promise.all(PRODUCTS.map(async (id) => [id, await fetchOne(id, fetcher, headers, wait)] as const));
  return Object.fromEntries(entries) as Releases;
}

let cached: Promise<Releases> | undefined;

/**
 * Release data for the whole build, fetched once (every prerendered page shares it). GITHUB_TOKEN raises the API
 * rate limit; RELEASES_OFFLINE=1 skips the network (pages then show the GitHub releases fallback).
 */
export function loadReleases(env = process.env, fetcher: Fetch = fetch, wait: Wait = sleep): Promise<Releases> {
  if (env.RELEASES_OFFLINE === '1') return Promise.resolve(NO_RELEASES);
  cached ??= fetchReleases(fetcher, env.GITHUB_TOKEN, wait);
  return cached;
}

/** Test hook: forget the cached data. */
export function resetReleases() {
  cached = undefined;
}
