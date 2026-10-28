import { error } from '@sveltejs/kit';
import { loadModsIndex } from '$lib/mods-index';
import { modCard, pngResponse, renderOg } from '$lib/server/og-image';
import type { EntryGenerator, RequestHandler } from './$types';

declare const process: { env: Record<string, string | undefined> };

// Link preview image of a mod page, prerendered to build/mods/<id>/og.png for every mod in this build's index.
export const prerender = true;

export const entries: EntryGenerator = async () => (await loadModsIndex(process.env)).index.mods.map((m) => ({ id: m.id }));

export const GET: RequestHandler = async ({ params }) => {
  const mod = (await loadModsIndex(process.env)).index.mods.find((m) => m.id === params.id);
  if (!mod) error(404, 'Not found');
  return pngResponse(await renderOg(modCard(mod)));
};
