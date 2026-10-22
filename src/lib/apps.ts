import { LINKS } from './config';
import type { Dict } from './i18n/en';
import type { Device } from './platform';
import type { ProductId } from './releases';
import { PATHS } from './route';

export interface AppMeta {
  id: ProductId;
  /** App icon below the base path (static/apps/). */
  icon: string;
  path: string;
  issues: string;
  /** Docs pages (relative to a docs locale root) for the three "Need help?" links. */
  guides: [string, string, string];
  /** Hero tint (light, dark) and ray colour. */
  tint: string;
  tintDark: string;
  ray: string;
  /** Platform chips on the home task card. */
  chips: ('windows' | 'macos' | 'linux' | 'android' | 'pi' | 'docker' | 'web' | 'desktop')[];
}

export const APPS: readonly AppMeta[] = [
  {
    id: 'pc',
    icon: '/apps/pc.svg',
    path: PATHS.pc,
    issues: LINKS.pcIssues,
    guides: ['guides/get-apk', 'pc-port', 'guides/lan-play'],
    tint: '#fdebdf',
    tintDark: '#2a1a12',
    ray: 'rgba(194, 65, 12, 0.1)',
    chips: ['windows', 'macos', 'linux']
  },
  {
    id: 'patcher',
    icon: '/apps/patcher.svg',
    path: PATHS.patcher,
    issues: LINKS.patcherIssues,
    guides: ['guides/fix-game-on-phone', 'guides/backup-worlds', 'guides/get-apk'],
    tint: '#fff0c7',
    tintDark: '#2b2410',
    ray: 'rgba(255, 255, 255, 0.5)',
    chips: ['android', 'web', 'windows', 'macos', 'linux']
  },
  {
    id: 'server',
    icon: '/apps/server.svg',
    path: PATHS.server,
    issues: LINKS.serverIssues,
    guides: ['guides/lan-play', 'guides/open-internet', 'guides/raspberry-pi'],
    tint: '#dff3e7',
    tintDark: '#12261b',
    ray: 'rgba(30, 122, 76, 0.1)',
    chips: ['desktop', 'android', 'pi', 'docker']
  }
];

export function app(id: ProductId): AppMeta {
  return APPS.find((a) => a.id === id) as AppMeta;
}

/** "Blockheads PC" and "Patcher" are never translated; the Server's name is. */
export function appName(id: ProductId, d: Dict): string {
  if (id === 'pc') return 'Blockheads PC';
  return id === 'patcher' ? 'Patcher' : d.apps.names.server;
}

/** Docs page with install steps for an app on a device (relative to a docs locale root). */
export function installGuide(id: ProductId, device: Device): string {
  if (id === 'pc') return 'pc-port';
  if (id === 'patcher') return device === 'android' ? 'guides/fix-game-on-phone' : 'patcher';
  const byDevice: Partial<Record<Device, string>> = {
    android: 'guides/host-android',
    pi: 'guides/raspberry-pi',
    docker: 'guides/docker'
  };
  return byDevice[device] ?? 'server';
}
