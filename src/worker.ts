/**
 * Cloudflare Worker entry (wrangler.toml `main`). The site itself is static assets; this script only runs for the
 * paths in `assets.run_worker_first` (/patcher, /patcher/*) and for requests no asset matched. Routing: lib/patcher-route.ts.
 */
import { route } from './lib/patcher-route';

export default { fetch: route };
