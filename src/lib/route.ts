import { WRITTEN } from './guides';

export type RouteKey = 'home' | 'server' | 'guides' | 'article' | 'faq' | 'legal' | 'mods' | 'modsSubmit' | 'modDetail' | 'other';

function strip(pathname: string, base: string): string {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path.replace(/\/+$/, '');
}

/** The id of the written guide a pathname shows, if any. */
export function guideSlug(pathname: string, base: string): string | undefined {
  const path = strip(pathname, base);
  return WRITTEN.find((g) => g.path === path)?.id;
}

/** Maps a pathname (including the base path) to a page key. */
export function routeKey(pathname: string, base: string): RouteKey {
  const path = strip(pathname, base);
  switch (path) {
    case '':
      return 'home';
    case '/server':
      return 'server';
    case '/guides':
      return 'guides';
    case '/faq':
      return 'faq';
    case '/legal':
      return 'legal';
    case '/mods':
      return 'mods';
    case '/mods/submit':
      return 'modsSubmit';
    default:
      if (path.startsWith('/mods/')) return 'modDetail';
      return guideSlug(pathname, base) ? 'article' : 'other';
  }
}
