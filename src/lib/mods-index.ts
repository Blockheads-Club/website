// Build-time loader for the mod index. Mirrors how the patcher build treats the network: it must never fail the build.
// The index is fetched from MODS_INDEX_URL (default: the `index` release of Blockheads-Club/mods, replaced by its
// publish workflow on every push to dev). A valid index is also served unchanged at /mods/index.json
// (src/routes/mods/index.json/+server.ts). When it is unreachable, invalid or not published yet, the pages use the
// bundled sample (src/lib/data/mods-sample.json) with a "sample data" notice, and /mods/index.json is not written.
// The index is not signed: it travels over HTTPS and every package version carries its sha256 and size.
import sample from './data/mods-sample.json';
import { isModsIndex, type ModsIndex } from './mods';

export const DEFAULT_INDEX_URL = 'https://github.com/Blockheads-Club/mods/releases/download/index/index.json';

export interface LoadedIndex {
  index: ModsIndex;
  /** True when the bundled sample is shown instead of a published index. */
  sample: boolean;
  /** The fetched file, byte for byte, when it is a valid published index (served at /mods/index.json). */
  raw?: string;
}

export const SAMPLE_INDEX = sample as ModsIndex;

/** Fetches and validates the index at `url`; returns the bundled sample (and logs why) on any problem. */
export async function fetchIndex(
  url: string,
  fetchFn: typeof fetch,
  log: (message: string) => void
): Promise<LoadedIndex> {
  try {
    const res = await fetchFn(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.text();
    const json: unknown = JSON.parse(raw);
    if (!isModsIndex(json)) throw new Error('not a valid schema 1 index');
    log(`using ${url} (${json.mods.length} mods)`);
    return { index: json, sample: false, raw };
  } catch (e) {
    log(`${url} unavailable (${(e as Error).message}), using the bundled sample index`);
    return { index: SAMPLE_INDEX, sample: true };
  }
}

let cached: Promise<LoadedIndex> | undefined;

/** The index for this build, fetched once per process. Env: MODS_INDEX_URL. */
export function loadModsIndex(
  env: Record<string, string | undefined>,
  fetchFn: typeof fetch = fetch,
  log: (message: string) => void = (m) => console.log('mods-index: ' + m)
): Promise<LoadedIndex> {
  cached ??= fetchIndex(env.MODS_INDEX_URL || DEFAULT_INDEX_URL, fetchFn, log);
  return cached;
}

/** Test hook: forget the cached index. */
export function resetModsIndexCache(): void {
  cached = undefined;
}
