import { error } from '@sveltejs/kit';
import { loadModsIndex } from '$lib/mods-index';
import type { RequestHandler } from './$types';

declare const process: { env: Record<string, string | undefined> };

// Prerendered to build/mods/index.json: the published index, byte for byte. Without one (fetch failed or the file is
// invalid) this 404s and svelte.config.js skips the file, so the bundled sample is never served as the real index.
export const prerender = true;

export const GET: RequestHandler = async () => {
  const { raw } = await loadModsIndex(process.env);
  if (raw === undefined) error(404, 'no published mod index');
  return new Response(raw, { headers: { 'content-type': 'application/json; charset=utf-8' } });
};
