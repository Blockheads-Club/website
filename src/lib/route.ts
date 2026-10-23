import type { ProductId } from './releases';

export type RouteKey = 'home' | 'download' | ProductId | 'mods' | 'modsSubmit' | 'modDetail' | 'contribute' | 'about' | 'moved' | 'other';

/** Site pages below the base path. `/patcher` itself is the bundled web Patcher, so its app page lives elsewhere. */
export const PATHS = {
  home: '/',
  download: '/download',
  pc: '/pc',
  patcher: '/patcher-app',
  server: '/server',
  mods: '/mods',
  modsSubmit: '/mods/submit',
  contribute: '/contribute',
  about: '/about'
} as const;

/** The web Patcher (static files from scripts/build-patcher.ts), below the base path. */
export const WEB_PATCHER = '/patcher/';

/** Where an old page or anchor now lives: a docs page (relative to the docs root of a locale) or a site path. */
export type Target = { docs: string } | { site: string };

/** Old routes, kept as prerendered redirect pages so no link breaks. `/guides/<id>` is handled in movedTarget. */
export const MOVED: Record<string, Target> = {
  '/guides': { docs: 'guides/' },
  '/faq': { docs: 'faq' },
  '/legal': { site: '/about#legal' }
};

/** Old guide pages; each one is now docs/guides/<id>.md. */
export const OLD_GUIDES = [
  'fix-game-on-phone',
  'lan-play',
  'backup-worlds',
  'get-apk',
  'signing-key',
  'raspberry-pi',
  'open-internet',
  'admins-mods',
  'host-android',
  'docker'
] as const;

/** Old in-page anchors (`path#hash`), redirected client-side. */
export const LEGACY_ANCHORS: Record<string, Target> = {
  '/#patcher': { site: PATHS.patcher },
  '/#server': { site: PATHS.server },
  '/#guides': { docs: 'guides/' },
  '/#faq': { docs: 'faq' },
  '/#legal': { site: '/about#legal' },
  '/server#start': { docs: 'server' },
  '/server#cn': { docs: 'guides/lan-play' },
  '/server#downloads': { site: '/download?task=server' }
};

function strip(pathname: string, base: string): string {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path.replace(/\/+$/, '') || '/';
}

/** The redirect target of an old path, if it is one. */
export function movedTarget(pathname: string, base: string): Target | undefined {
  const path = strip(pathname, base);
  const guide = path.startsWith('/guides/') ? path.slice('/guides/'.length) : undefined;
  if (guide) return { docs: 'guides/' + guide };
  return MOVED[path];
}

/** Maps a pathname (including the base path) to a page key. */
export function routeKey(pathname: string, base: string): RouteKey {
  const path = strip(pathname, base);
  if (movedTarget(pathname, base)) return 'moved';
  const hit = (Object.entries(PATHS) as [RouteKey, string][]).find(([, p]) => p === path);
  if (hit) return hit[0];
  return path.startsWith('/mods/') ? 'modDetail' : 'other';
}

/** The new home of an old `path#hash` link, if any. */
export function legacyAnchor(pathname: string, hash: string, base: string): Target | undefined {
  return LEGACY_ANCHORS[strip(pathname, base) + hash];
}

/** URL of a target below the base path, for a docs locale folder ('' for English, 'tr/' ...). */
export function targetHref(target: Target, base: string, docsDir: string): string {
  return 'docs' in target ? base + '/docs/' + docsDir + target.docs : base + target.site;
}
