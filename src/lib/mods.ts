// Types and pure helpers for the mod index (schema 1, published by Blockheads-Club/mods as index.json).

export type Side = 'server' | 'client';
export type World = 'none' | 'read' | 'write';
export type PlayerPerm = 'chat' | 'teleport' | 'kick' | 'ban' | 'inventory' | 'health';

export interface Permissions {
  world?: World;
  players?: PlayerPerm[];
  'net-http'?: string[];
  channels?: boolean;
  native?: boolean;
}

export interface ModVersion {
  version: string;
  url: string;
  mirror?: string;
  sha256: string;
  size?: number;
  sides: Side[];
  'client-required'?: boolean;
  api: string;
  loader?: string;
  depends?: Record<string, string>;
  'soft-depends'?: Record<string, string>;
  permissions: Permissions;
  published: string;
  yanked?: boolean;
}

/** A translation of a mod's name and/or description; a missing field falls back to English. */
export interface Translation {
  name?: string;
  description?: string;
}

export interface Mod {
  id: string;
  name: string;
  description?: string;
  /** Optional translations by language code (`tr`, `ru`, `kk` ...). */
  i18n?: Record<string, Translation>;
  owners: string[];
  repo: string;
  tags?: string[];
  /** Placeholder entry: the real published index never contains drafts, the bundled sample may. */
  draft?: boolean;
  versions: ModVersion[];
}

export interface ModsIndex {
  schema: 1;
  generated: string;
  api: string[];
  mods: Mod[];
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isStrings = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === 'string');

function validVersion(v: unknown): boolean {
  return (
    isObject(v) &&
    typeof v.version === 'string' &&
    typeof v.url === 'string' &&
    typeof v.sha256 === 'string' &&
    typeof v.published === 'string' &&
    isStrings(v.sides) &&
    v.sides.length > 0 &&
    isObject(v.permissions)
  );
}

const optionalString = (v: unknown): boolean => v === undefined || typeof v === 'string';

function validI18n(v: unknown): boolean {
  return v === undefined || (isObject(v) && Object.values(v).every((t) => isObject(t) && optionalString(t.name) && optionalString(t.description)));
}

function validMod(m: unknown): boolean {
  return (
    isObject(m) &&
    validI18n(m.i18n) &&
    typeof m.id === 'string' &&
    typeof m.name === 'string' &&
    isStrings(m.owners) &&
    typeof m.repo === 'string' &&
    Array.isArray(m.versions) &&
    m.versions.length > 0 &&
    m.versions.every(validVersion)
  );
}

/** Minimal shape check of a fetched index: `schema === 1` and a list of well-formed mods. */
export function isModsIndex(value: unknown): value is ModsIndex {
  return isObject(value) && value.schema === 1 && Array.isArray(value.mods) && value.mods.every(validMod);
}

function splitVersion(v: string): [string, string] {
  const m = /^([^-+]*)(?:-([^+]*))?/.exec(v) as RegExpExecArray;
  return [m[1], m[2] ?? ''];
}

/** Compares semantic versions; a release is newer than its own pre-releases. */
export function compareVersions(a: string, b: string): number {
  const [coreA, preA] = splitVersion(a);
  const [coreB, preB] = splitVersion(b);
  const pa = coreA.split('.').map(Number);
  const pb = coreB.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  if (preA === preB) return 0;
  if (preA === '') return 1;
  if (preB === '') return -1;
  return preA < preB ? -1 : 1;
}

/** Versions, newest first. */
export function sortedVersions(mod: Mod): ModVersion[] {
  return [...mod.versions].sort((a, b) => compareVersions(b.version, a.version));
}

/** The newest version that is not yanked. */
export function latestVersion(mod: Mod): ModVersion | undefined {
  return sortedVersions(mod).find((v) => !v.yanked);
}

export type SidesLabel = 'server' | 'client' | 'both';

export function sidesLabel(sides: readonly Side[]): SidesLabel {
  if (sides.includes('server') && sides.includes('client')) return 'both';
  return sides[0];
}

export const WORLD_ORDER: readonly World[] = ['none', 'read', 'write'];
export const PLAYER_PERMS: readonly PlayerPerm[] = ['chat', 'teleport', 'kick', 'ban', 'inventory', 'health'];

/** Ordered permission keys that apply to a version, for badges and the plain-words list. */
export type PermKey =
  | { kind: 'world'; value: 'read' | 'write' }
  | { kind: 'player'; value: PlayerPerm }
  | { kind: 'http'; value: string[] }
  | { kind: 'channels' };

export function permissionKeys(p: Permissions): PermKey[] {
  const out: PermKey[] = [];
  if (p.world === 'read' || p.world === 'write') out.push({ kind: 'world', value: p.world });
  for (const player of p.players ?? []) out.push({ kind: 'player', value: player });
  if (p['net-http']?.length) out.push({ kind: 'http', value: p['net-http'] });
  if (p.channels) out.push({ kind: 'channels' });
  return out;
}

export const isNative = (v: ModVersion | undefined): boolean => v?.permissions.native === true;

/** The mod's name in `locale`, English when it has no translation. */
export function modName(mod: Mod, locale: string): string {
  return mod.i18n?.[locale]?.name ?? mod.name;
}

/** The mod's description in `locale`, English (or none) when it has no translation. */
export function modDescription(mod: Mod, locale: string): string | undefined {
  return mod.i18n?.[locale]?.description ?? mod.description;
}

/** Every tag used in the index, sorted. */
export function allTags(mods: readonly Mod[]): string[] {
  return [...new Set(mods.flatMap((m) => m.tags ?? []))].sort();
}

/** Mods matching a free-text query (name, id, description, tags) and an optional tag. */
export function filterMods(mods: readonly Mod[], query: string, tag: string, locale: string): Mod[] {
  const q = query.trim().toLocaleLowerCase(locale);
  return mods.filter((m) => {
    if (tag !== '' && !m.tags?.includes(tag)) return false;
    const text = [m.name, modName(m, locale), m.id, m.description ?? '', modDescription(m, locale) ?? '', ...(m.tags ?? [])]
      .join(' ')
      .toLocaleLowerCase(locale);
    return text.includes(q);
  });
}

/** `1532` -> `1.5 KiB`. */
export function formatSize(bytes: number | undefined): string {
  if (bytes === undefined) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KiB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MiB';
}
