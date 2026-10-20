# Development notes: deployment

Maintainer notes (excluded from the VitePress build, see `srcExclude` in `docs/.vitepress/config.ts`).

## Cloudflare (blockheads.club)

The site is the Worker `blockheads-club-website` (`wrangler.toml`), deployed by Cloudflare Workers Builds from this
repo, with blockheads.club attached as a custom domain:

- Build command `bun run build`, deploy command `npx wrangler deploy`, non-production branches `npx wrangler versions upload`.
- Static assets come from `build/` (`not_found_handling = "404-page"`). They are served directly, without running any
  script, except for the paths in `assets.run_worker_first`.
- `src/worker.ts` (routing in `src/lib/patcher-route.ts`, unit-tested) runs for `/patcher` and `/patcher/*` and
  forwards those requests unchanged through the `PATCHER` service binding to the Worker `blockheads-patcher-web`.
  That Worker is built and deployed from Blockheads-Club/blockheads-patcher (assets only, built with
  `BASE_PATH=/patcher`); its own `_headers` (CSP, caching) apply to its responses. Without the binding,
  `/patcher` answers 503.

Why a service binding and not a Worker route on `blockheads.club/patcher*`: the site keeps ownership of its URL space
in its own config, the patcher deploys independently (its Worker has no route or domain), and there is no reliance on
how routes and custom domains on the same hostname interact.

### Dashboard steps (once)

1. Create the patcher Worker first (steps in blockheads-patcher's `docs/development.md`: Workers & Pages → Create →
   Import a repository → `Blockheads-Club/blockheads-patcher`, name `blockheads-patcher-web`, build command
   `bun run build:worker`, deploy command `npx wrangler deploy`, root directory `/`). A service binding to a Worker that
   does not exist makes this Worker's deploy fail.
2. Then let this Worker's build run (push, or **Retry build** on the latest one). The binding comes from `wrangler.toml`
   (`[[services]] binding = "PATCHER", service = "blockheads-patcher-web"`); nothing else to set in the dashboard. Its
   Settings → Bindings should then list `PATCHER → blockheads-patcher-web`.
3. No route is needed; the custom domain blockheads.club stays as it is.
4. Check https://blockheads.club/, https://blockheads.club/docs/, https://blockheads.club/patcher/ and a deep link such
   as https://blockheads.club/patcher/splash.

### Local check

With both repos built (`bun run build` here, `bun run build:worker` in blockheads-patcher):

```sh
npx wrangler dev -c wrangler.toml -c ../blockheads-patcher/wrangler.toml   # http://localhost:8787
```

The first config is the site; the second runs the patcher Worker locally so the service binding resolves.
`npx wrangler deploy --dry-run` validates the config without deploying.
