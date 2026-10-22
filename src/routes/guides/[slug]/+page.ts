import { OLD_GUIDES } from '$lib/route';

// Every old guide URL is prerendered as a redirect page to docs/guides/<id>.
export const entries = () => OLD_GUIDES.map((slug) => ({ slug }));
