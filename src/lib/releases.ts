// Release data and download picking. The data is fetched from the GitHub REST API when the site is built
// (src/lib/server/releases.ts); everything here is pure, so pages and tests share it.
import type { Device } from './platform';

export type ProductId = 'pc' | 'patcher' | 'server';
export const PRODUCTS: readonly ProductId[] = ['pc', 'patcher', 'server'];

export const REPOS: Record<ProductId, string> = {
  pc: 'Blockheads-Club/blockheads-pc',
  patcher: 'Blockheads-Club/blockheads-patcher',
  server: 'Blockheads-Club/blockheads-server'
};

export const releasesPage = (id: ProductId) => 'https://github.com/' + REPOS[id] + '/releases';

export interface Asset {
  name: string;
  size: number;
  url: string;
}

export interface Release {
  /** Tag without the leading "v". */
  version: string;
  tag: string;
  /** ISO publish date. */
  date: string;
  /** Release page on GitHub (notes and checksums). */
  url: string;
  assets: Asset[];
}

/** Latest release per app, or null when it could not be loaded at build time. */
export type Releases = Record<ProductId, Release | null>;

export const NO_RELEASES: Releases = { pc: null, patcher: null, server: null };

/** Subset of a GitHub REST `releases` entry. */
export interface ApiRelease {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  html_url: string;
  assets: { name: string; size: number; browser_download_url: string }[];
}

/** The newest published release (drafts skipped; a full release wins over a newer pre-release). */
export function fromApi(list: ApiRelease[]): Release | null {
  const published = list
    .filter((r) => !r.draft && r.published_at)
    .sort((a, b) => Date.parse(b.published_at as string) - Date.parse(a.published_at as string));
  const pick = published.find((r) => !r.prerelease) ?? published[0];
  if (!pick) return null;
  return {
    version: pick.tag_name.replace(/^v/, ''),
    tag: pick.tag_name,
    date: pick.published_at as string,
    url: pick.html_url,
    assets: pick.assets.map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url }))
  };
}

/** Labels of the extra files shown under the main download (keys of `download.alts` in the dictionaries). */
export type AltKey = 'winArm' | 'macIntel' | 'macArm' | 'deb' | 'rpm' | 'linuxArm' | 'headless' | 'apk32' | 'piArmv7' | 'winCli';
/** File-type hint shown with the main download (keys of `download.files` in the dictionaries). */
export type FileKey =
  | 'pcWin'
  | 'pcMac'
  | 'pcLinux'
  | 'patcherWin'
  | 'patcherMac'
  | 'patcherLinux'
  | 'patcherAndroid'
  | 'serverWin'
  | 'serverMac'
  | 'serverLinux'
  | 'serverAndroid'
  | 'serverPi'
  | 'serverDocker';
/** Why a device has no download, and where to go instead (keys of `download.none`). */
export type NoneKey =
  | 'pcAndroid'
  | 'pcPi'
  | 'pcDocker'
  | 'pcIos'
  | 'patcherPi'
  | 'patcherDocker'
  | 'patcherIos'
  | 'serverIos';
export type Redirect = 'patcher' | 'server' | 'web';

type Choice =
  | { kind: 'file'; file: FileKey; main: RegExp; alts?: [AltKey, RegExp][]; cmd?: boolean }
  | { kind: 'docker'; file: FileKey }
  | { kind: 'none'; why: NoneKey; go?: Redirect };

const none = (why: NoneKey, go?: Redirect): Choice => ({ kind: 'none', why, go });

/** Which file each app offers per device, matched against the release asset names. */
export const DOWNLOADS: Record<ProductId, Record<Device, Choice>> = {
  pc: {
    windows: { kind: 'file', file: 'pcWin', main: /_x64-setup\.exe$/, alts: [['winArm', /_arm64-setup\.exe$/]] },
    macos: { kind: 'file', file: 'pcMac', main: /_aarch64\.dmg$/, alts: [['macIntel', /_x64\.dmg$/]] },
    linux: {
      kind: 'file',
      file: 'pcLinux',
      main: /_amd64\.AppImage$/,
      alts: [
        ['deb', /_amd64\.deb$/],
        ['rpm', /\.x86_64\.rpm$/],
        ['linuxArm', /_aarch64\.AppImage$/]
      ]
    },
    android: none('pcAndroid', 'patcher'),
    pi: none('pcPi', 'server'),
    docker: none('pcDocker', 'server'),
    ios: none('pcIos')
  },
  patcher: {
    windows: { kind: 'file', file: 'patcherWin', main: /_x64-setup\.exe$/, alts: [['winArm', /_arm64-setup\.exe$/]] },
    macos: { kind: 'file', file: 'patcherMac', main: /_universal\.dmg$/ },
    linux: {
      kind: 'file',
      file: 'patcherLinux',
      main: /_amd64\.AppImage$/,
      alts: [
        ['deb', /_amd64\.deb$/],
        ['rpm', /\.x86_64\.rpm$/],
        ['linuxArm', /_aarch64\.AppImage$/]
      ]
    },
    android: { kind: 'file', file: 'patcherAndroid', main: /-android-arm64\.apk$/, alts: [['apk32', /-android-arm\.apk$/]] },
    pi: none('patcherPi', 'web'),
    docker: none('patcherDocker', 'web'),
    ios: none('patcherIos')
  },
  server: {
    windows: {
      kind: 'file',
      file: 'serverWin',
      main: /_x64-setup\.exe$/,
      alts: [
        ['winArm', /_arm64-setup\.exe$/],
        ['winCli', /-x86_64-pc-windows-msvc\.zip$/]
      ]
    },
    macos: { kind: 'file', file: 'serverMac', main: /_aarch64\.dmg$/, alts: [['macIntel', /_x64\.dmg$/]] },
    linux: {
      kind: 'file',
      file: 'serverLinux',
      main: /_amd64\.AppImage$/,
      alts: [
        ['headless', /-x86_64-unknown-linux-gnu\.tar\.gz$/],
        ['deb', /_amd64\.deb$/],
        ['rpm', /\.x86_64\.rpm$/]
      ]
    },
    android: { kind: 'file', file: 'serverAndroid', main: /-android\.apk$/ },
    pi: {
      kind: 'file',
      file: 'serverPi',
      main: /-aarch64-unknown-linux-gnu\.tar\.gz$/,
      alts: [['piArmv7', /-armv7-unknown-linux-gnueabihf\.tar\.gz$/]],
      cmd: true
    },
    docker: { kind: 'docker', file: 'serverDocker' },
    ios: none('serverIos')
  }
};

export const SERVER_IMAGE = 'ghcr.io/blockheads-club/blockheads-server';

export type Pick =
  | { state: 'file'; file: FileKey; asset: Asset; alts: { key: AltKey; asset: Asset }[]; cmd?: string; release: Release }
  | { state: 'docker'; file: FileKey; cmd: string; release: Release }
  | { state: 'none'; why: NoneKey; go?: Redirect }
  | { state: 'error' };

/** Commands to unpack a headless server archive and start a first world. */
export function piCommand(asset: Asset): string {
  const dir = asset.name.replace(/\.tar\.gz$/, '');
  return ['curl -LO ' + asset.url, 'tar -xzf ' + asset.name, 'cd ' + dir, './blockheads_server --new "Sunny Isle"'].join('\n');
}

export function dockerCommand(version: string): string {
  return [
    'docker run -dit --name blockheads \\',
    '  -p 15151:15151/udp -v bh-data:/data \\',
    '  ' + SERVER_IMAGE + ':' + version + ' --new "Sunny Isle"'
  ].join('\n');
}

/**
 * The download for one app on one device. `error` means the release data is missing (the GitHub API failed at build
 * time) or the expected file is not in the latest release; pages then link to the GitHub releases page instead.
 */
export function pickDownload(product: ProductId, device: Device, releases: Releases): Pick {
  const choice = DOWNLOADS[product][device];
  if (choice.kind === 'none') return { state: 'none', why: choice.why, go: choice.go };
  const release = releases[product];
  if (!release) return { state: 'error' };
  if (choice.kind === 'docker') return { state: 'docker', file: choice.file, cmd: dockerCommand(release.version), release };
  const find = (re: RegExp) => release.assets.find((a) => re.test(a.name));
  const asset = find(choice.main);
  if (!asset) return { state: 'error' };
  const alts = (choice.alts ?? []).flatMap(([key, re]) => {
    const alt = find(re);
    return alt ? [{ key, asset: alt }] : [];
  });
  return { state: 'file', file: choice.file, asset, alts, cmd: choice.cmd ? piCommand(asset) : undefined, release };
}

/** "84 MB", "3.6 MB" in the visitor's number format. */
export function formatSize(bytes: number, locale: string): string {
  const mb = bytes / 1_000_000;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: mb < 10 ? 1 : 0 }).format(mb) + ' MB';
}

/** A release date as "21 October 2026" in the visitor's language. */
export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}

/** Copyable commands for the Server page's "technical hosts" tabs, or null without release data. */
export function serverCommands(releases: Releases): { docker: string; pi: string; linux: string } | null {
  const pi = pickDownload('server', 'pi', releases);
  const linux = pickDownload('server', 'linux', releases);
  const headless = linux.state === 'file' ? linux.alts.find((a) => a.key === 'headless') : undefined;
  if (pi.state !== 'file' || !headless) return null;
  return { docker: dockerCommand(releases.server!.version), pi: pi.cmd!, linux: piCommand(headless.asset) };
}
