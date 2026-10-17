export type RouteKey = 'home' | 'server' | 'guides' | 'article' | 'faq' | 'legal' | 'other';

/** Maps a pathname (including the base path) to a page key. */
export function routeKey(pathname: string, base: string): RouteKey {
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  path = path.replace(/\/+$/, '');
  switch (path) {
    case '':
      return 'home';
    case '/server':
      return 'server';
    case '/guides':
      return 'guides';
    case '/guides/fix-game-on-phone':
      return 'article';
    case '/faq':
      return 'faq';
    case '/legal':
      return 'legal';
    default:
      return 'other';
  }
}
