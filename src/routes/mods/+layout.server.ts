import { loadModsIndex } from '$lib/mods-index';
import type { LayoutServerLoad } from './$types';

// No @types/node in this project; only the environment is needed here (read at build time, while prerendering).
declare const process: { env: Record<string, string | undefined> };

export const load: LayoutServerLoad = async () => ({ sample: (await loadModsIndex(process.env)).sample });
