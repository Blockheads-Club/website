/**
 * Request routing of the Cloudflare Worker (src/worker.ts). Kept out of the entry module because a Worker's main
 * module may only export handlers.
 *
 * /patcher/* is the web Patcher, a separate assets-only Worker (`blockheads-patcher-web`, deployed from the
 * blockheads-patcher repo) reached through the PATCHER service binding; the request is forwarded unchanged, so the
 * Patcher sees the full /patcher/... path and its own headers (CSP, caching) apply. Everything else is served from
 * the site's assets (ASSETS binding).
 */

/** The subset of the Workers `Fetcher` type used here (no @cloudflare/workers-types dependency). */
export interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

export interface Env {
  ASSETS: Fetcher;
  /** Absent when the patcher Worker is not bound (e.g. a local `wrangler dev` of the site alone). */
  PATCHER?: Fetcher;
}

export const PATCHER_PREFIX = '/patcher';

export function isPatcherPath(pathname: string): boolean {
  return pathname === PATCHER_PREFIX || pathname.startsWith(PATCHER_PREFIX + '/');
}

export async function route(request: Request, env: Env): Promise<Response> {
  if (!isPatcherPath(new URL(request.url).pathname)) return env.ASSETS.fetch(request);
  if (!env.PATCHER) {
    return new Response('The web Patcher is not available here.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
    });
  }
  return env.PATCHER.fetch(request);
}
