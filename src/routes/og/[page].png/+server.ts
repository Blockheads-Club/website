import { error } from '@sveltejs/kit';
import { pageCard, pngResponse, renderOg } from '$lib/server/og-image';
import { OG_PAGES, isOgPage } from '$lib/seo';
import type { EntryGenerator, RequestHandler } from './$types';

// Link preview image of a top-level page, prerendered to build/og/<page>.png (see $lib/seo).
export const prerender = true;

export const entries: EntryGenerator = () => OG_PAGES.map((page) => ({ page }));

export const GET: RequestHandler = async ({ params }) => {
  if (!isOgPage(params.page)) error(404, 'Not found');
  return pngResponse(await renderOg(pageCard(params.page)));
};
