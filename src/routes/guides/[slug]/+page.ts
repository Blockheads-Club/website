import { error } from '@sveltejs/kit';
import { ARTICLE_IDS } from '$lib/guides';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => ARTICLE_IDS.map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  if (!ARTICLE_IDS.includes(params.slug)) error(404, 'Not found');
  return { id: params.slug };
};
