// Build-time release data. Runs while the static site is prerendered; a failed request never fails the build: that
// app's release is null and the pages link to its GitHub releases page instead.
import { NO_RELEASES, PRODUCTS, REPOS, fromApi, type ApiRelease, type Releases } from '$lib/releases';

// No @types/node in this project; only the environment is needed here.
declare const process: { env: Record<string, string | undefined> };

type Fetch = (url: string, init: RequestInit) => Promise<Response>;

export async function fetchReleases(fetcher: Fetch, token?: string): Promise<Releases> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'user-agent': 'blockheads-club-website-build'
  };
  if (token) headers.authorization = 'Bearer ' + token;
  const entries = await Promise.all(
    PRODUCTS.map(async (id) => {
      const url = 'https://api.github.com/repos/' + REPOS[id] + '/releases?per_page=10';
      try {
        const res = await fetcher(url, { headers, signal: AbortSignal.timeout(15_000) });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return [id, fromApi((await res.json()) as ApiRelease[])] as const;
      } catch (e) {
        console.warn('releases: ' + url + ' failed (' + (e as Error).message + '), linking to GitHub releases instead');
        return [id, null] as const;
      }
    })
  );
  return Object.fromEntries(entries) as Releases;
}

let cached: Promise<Releases> | undefined;

/**
 * Release data for the whole build, fetched once (every prerendered page shares it). GITHUB_TOKEN raises the API
 * rate limit; RELEASES_OFFLINE=1 skips the network (pages then show the GitHub releases fallback).
 */
export function loadReleases(env = process.env, fetcher: Fetch = fetch): Promise<Releases> {
  if (env.RELEASES_OFFLINE === '1') return Promise.resolve(NO_RELEASES);
  cached ??= fetchReleases(fetcher, env.GITHUB_TOKEN);
  return cached;
}

/** Test hook: forget the cached data. */
export function resetReleases() {
  cached = undefined;
}
