import { loadModsIndex } from '$lib/mods-index';
import type { PageServerLoad } from './$types';

declare const process: { env: Record<string, string | undefined> };

export const load: PageServerLoad = async () => ({ mods: (await loadModsIndex(process.env)).index.mods });
