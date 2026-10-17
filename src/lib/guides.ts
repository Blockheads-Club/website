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
  { id: 'lan-play', topic: 'server', level: 'beginner', minutes: 4, android: false, featured: true },
  { id: 'backup-worlds', topic: 'patcher', level: 'beginner', minutes: 6, android: true, featured: false, path: '/guides/fix-game-on-phone#s1' },
  { id: 'get-apk', topic: 'patcher', level: 'beginner', minutes: 3, android: true, featured: false },
  { id: 'signing-key', topic: 'patcher', level: 'advanced', minutes: 5, android: false, featured: false },
  { id: 'raspberry-pi', topic: 'server', level: 'advanced', minutes: 12, android: false, featured: false },
  { id: 'open-internet', topic: 'server', level: 'advanced', minutes: 8, android: false, featured: false },
  { id: 'admins-mods', topic: 'server', level: 'beginner', minutes: 5, android: false, featured: false },
  { id: 'host-android', topic: 'server', level: 'beginner', minutes: 4, android: true, featured: false },
  { id: 'docker', topic: 'server', level: 'advanced', minutes: 6, android: false, featured: false }
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
