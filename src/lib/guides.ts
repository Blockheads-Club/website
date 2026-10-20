export type Topic = 'patcher' | 'server';
export type Level = 'beginner' | 'advanced';

export interface GuideMeta {
  id: string;
  topic: Topic;
  level: Level;
  minutes: number;
  android: boolean;
  featured: boolean;
  /** Path below the base path, or undefined while the guide is not written yet. */
  path?: string;
}

/** Guides listed by the design. Only guides with a `path` have content; the rest show "coming soon". */
export const GUIDES: readonly GuideMeta[] = [
  { id: 'fix-game-on-phone', topic: 'patcher', level: 'beginner', minutes: 6, android: true, featured: true, path: '/guides/fix-game-on-phone' },
  { id: 'lan-play', topic: 'server', level: 'beginner', minutes: 4, android: false, featured: true, path: '/guides/lan-play' },
  { id: 'backup-worlds', topic: 'patcher', level: 'beginner', minutes: 6, android: true, featured: false, path: '/guides/backup-worlds' },
  { id: 'get-apk', topic: 'patcher', level: 'beginner', minutes: 3, android: true, featured: false, path: '/guides/get-apk' },
  { id: 'signing-key', topic: 'patcher', level: 'advanced', minutes: 5, android: false, featured: false, path: '/guides/signing-key' },
  { id: 'raspberry-pi', topic: 'server', level: 'advanced', minutes: 12, android: false, featured: false, path: '/guides/raspberry-pi' },
  { id: 'open-internet', topic: 'server', level: 'advanced', minutes: 8, android: false, featured: false, path: '/guides/open-internet' },
  { id: 'admins-mods', topic: 'server', level: 'beginner', minutes: 5, android: false, featured: false, path: '/guides/admins-mods' },
  { id: 'host-android', topic: 'server', level: 'beginner', minutes: 4, android: true, featured: false, path: '/guides/host-android' },
  { id: 'docker', topic: 'server', level: 'advanced', minutes: 6, android: false, featured: false, path: '/guides/docker' }
];

export const HOME_GUIDES = ['backup-worlds', 'lan-play', 'raspberry-pi'] as const;

export type Filter = 'all' | Topic | 'android' | Level;

export function matchesFilter(guide: GuideMeta, filter: Filter): boolean {
  if (filter === 'all') return true;
  if (filter === 'android') return guide.android;
  return guide.topic === filter || guide.level === filter;
}

export function guideById(id: string): GuideMeta {
  return GUIDES.find((g) => g.id === id) as GuideMeta;
}

/** Guides that have a page, in reading order. */
export const WRITTEN: readonly GuideMeta[] = GUIDES.filter((g) => g.path);

/** Guides rendered by the generic `/guides/[slug]` route (the first guide has its own page). */
export const ARTICLE_IDS: readonly string[] = WRITTEN.map((g) => g.id).filter((id) => id !== 'fix-game-on-phone');

/** Previous and next written guide on the same topic, for the links at the end of an article. */
export function neighbours(id: string): { prev?: GuideMeta; next?: GuideMeta } {
  const same = WRITTEN.filter((g) => g.topic === guideById(id).topic);
  const i = same.findIndex((g) => g.id === id);
  return { prev: same[i - 1], next: same[i + 1] };
}

/** `lan-play` -> `lanPlay`: the link key used for a guide in dictionary strings (`[label](lanPlay)`). */
export function linkKey(id: string): string {
  return id.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}
