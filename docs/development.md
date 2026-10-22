# Development notes: deployment

Maintainer notes (excluded from the VitePress build, see `srcExclude` in `docs/.vitepress/config.ts`).

## Cloudflare (blockheads.club)

The site is the assets-only Worker `blockheads-club-website` (`wrangler.toml`: no `main`, no bindings), deployed by
Cloudflare Workers Builds from this repo, with blockheads.club attached as a custom domain:

- Build command `bun run build`, deploy command `npx wrangler deploy`, non-production branches `npx wrangler versions upload`.
- Everything is a static asset from `build/`: the site, the docs (`build/docs/`) and the web Patcher (`build/patcher/`).
  No script runs, so requests do not count against the Workers free plan's 100k requests/day (static asset requests
  are free and unlimited).
- `not_found_handling = "404-page"`: an unknown path gets the **nearest** `404.html` walking up the directories, with
  status 404. Under `/patcher/` that is `build/patcher/404.html` (the Patcher's app shell), elsewhere the site's
  `build/404.html`.

## Web Patcher at /patcher/

`bun run build` runs `vite build`, `vitepress build docs`, then `scripts/build-patcher.ts` (pure helpers in
`src/lib/patcher-build.ts`, unit-tested). The script:

1. Picks the version: the **latest published release** of Blockheads-Club/blockheads-patcher, i.e. the non-draft release
   with the newest `published_at` from the GitHub REST API (prereleases count; drafts never do). `PATCHER_REF=<tag or
   branch>` overrides it, `PATCHER_REPO=<git URL or local path>` clones from elsewhere (e.g. a local checkout).
   The releases Atom feed is not used as a fallback because it also lists bare tags (a tag whose release is still a
   draft). Unauthenticated API calls allow 60/hour per IP; the GitHub workflows pass `GITHUB_TOKEN`. If the API
   fails three times the build fails and the previous deployment stays live (retry the build).
2. Shallow-clones that ref, runs `bun install --frozen-lockfile` and the patcher's `build:web` with
   `BASE_PATH=<site base>/patcher` (so `/patcher` on Cloudflare, `/website/patcher` on GitHub Pages). The result is
   cached per commit and base in `node_modules/.cache/blockheads-patcher/` (local re-runs and e2e are instant;
   Workers Builds only caches bun's package cache, so there the clone + build takes about 15–30 s).
3. Copies the build to `build/patcher/` without `_redirects` (its Pages SPA rule would apply site-wide), `_headers`
   and `.nojekyll`; writes `build/patcher/patcher-version.txt` (`<ref> <commit>`).
4. **Deep links**: for every static route of the patcher (`app/src/routes/**/+page.svelte` without `[params]`, today
   `splash`) it copies `index.html` to `<route>.html`, so `/patcher/splash` is served with 200 by Workers assets
   (`html_handling` auto-trailing-slash; `/patcher/splash.html` redirects to it) and by GitHub Pages. Any other
   `/patcher/*` path gets `build/patcher/404.html` (the same app shell) with status 404 on Cloudflare, so the app still
   boots (its client router handles the path). GitHub Pages only knows the root `404.html` (the site's).
   Per-path `not_found_handling` does not exist, and `single-page-application` mode would turn every unknown site
   path into a 200 with the site shell, so it is not used.
5. **Headers**: appends the patcher's `_headers` rules to `build/_headers` with `/patcher` prefixed. Workers assets
   apply every matching rule and join repeated headers with commas, so the site's `/*` CSP (and its other security
   headers) would be combined with the patcher's strict CSP. The prefixed rules first detach (`! Header-Name`) every
   header that a site rule matching them also sets, then set the patcher's values (CSP with the inline script
   hashes, COOP/CORP, HSTS, `immutable` caching for `/patcher/_app/immutable/*`). GitHub Pages ignores `_headers`.

The site itself must never add a SvelteKit route under `/patcher`.

### Auto-refresh on a new Patcher release (deploy hook)

Workers Builds has deploy hooks (a per-branch URL; a POST starts a build, no auth header). The patcher repo's
`.github/workflows/website-rebuild.yml` POSTs to it when a release is published, and the rebuilt site picks up the new
release. Set up once:

1. Cloudflare dashboard → **Workers & Pages** → `blockheads-club-website` → **Settings** → **Builds** →
   **Deploy Hooks** → name `patcher-release`, branch: the production branch (`dev` for now) → **Create** → copy
   the URL (`https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/<id>`). Treat it as a secret.
2. GitHub → Blockheads-Club/blockheads-patcher → **Settings** → **Secrets and variables** → **Actions** →
   **New repository secret**: name `WEBSITE_DEPLOY_HOOK`, value: the URL.
3. Test: in the patcher repo, **Actions** → *website-rebuild* → **Run workflow**; a build labelled `patcher-release`
   appears in the Worker's build history. If the URL leaks, delete the hook and create a new one.

Hook limits: 10 builds/minute per Worker; repeated calls before a build starts are deduplicated.
Optional: add a `GITHUB_TOKEN` build variable (a fine-grained token with public read-only access) under the Worker's
Settings → Builds → Variables to avoid the shared-IP API rate limit.

### Mod index (`/mods/index.json`, deploy hook)

The `/mods` pages and `/mods/index.json` come from the mod index that Blockheads-Club/mods publishes on every push to
its `dev` branch as the asset `index.json` of the fixed release `index`
(`https://github.com/Blockheads-Club/mods/releases/download/index/index.json`; `MODS_INDEX_URL` overrides it).
`src/lib/mods-index.ts` fetches it once per build and checks it against schema 1. A valid file is copied byte for byte
to `build/mods/index.json` (prerendered by `src/routes/mods/index.json/+server.ts`, served with
`Access-Control-Allow-Origin: *` and a 5-minute cache). When the fetch fails or the file is invalid, the pages show
the bundled sample with a notice and `/mods/index.json` is not written (the build still succeeds); the sample is never
served as the real index. The index is not signed: integrity comes from HTTPS and the `sha256` and `size` of every
package version.

To rebuild the site when the index changes, the mods repo's `publish.yml` POSTs to its `WEBSITE_DEPLOY_HOOK` secret
(skipped with a notice when unset). Set up once like the Patcher hook above: create a deploy hook named
`mods-index` for the production branch, and add its URL as the secret `WEBSITE_DEPLOY_HOOK` in
Blockheads-Club/mods → Settings → Secrets and variables → Actions.

### Local check

```sh
bun run build                                   # or PATCHER_REF=v0.1.1 / PATCHER_REPO=../blockheads-patcher
npx wrangler deploy --dry-run                   # "No bindings found", assets only
npx wrangler dev --port 8787                    # http://localhost:8787/, /docs/, /patcher/, /patcher/splash
```

The patcher's own e2e suite (at a tag that supports `BASE_PATH`, v0.1.1 or later) runs against that server from a
checkout of the same tag: `BASE_PATH=/patcher E2E_PORT=8787 bunx playwright test` in its `app/` (it reuses the running
server). `bun run test:e2e` here also checks `/patcher/` and `/patcher/splash` (`tests/patcher.spec.ts`).
