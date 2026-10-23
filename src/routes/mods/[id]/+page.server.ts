import { error } from '@sveltejs/kit';
import { loadModsIndex } from '$lib/mods-index';
import type { EntryGenerator, PageServerLoad } from './$types';

declare const process: { env: Record<string, string | undefined> };

export const entries: EntryGenerator = async () => (await loadModsIndex(process.env)).index.mods.map((m) => ({ id: m.id }));

export const load: PageServerLoad = async ({ params }) => {
  const { mods } = (await loadModsIndex(process.env)).index;
  const mod = mods.find((m) => m.id === params.id);
  if (!mod) error(404, 'Not found');
  return { mod, ids: mods.map((m) => m.id) };
};
