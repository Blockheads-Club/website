# Blockheads Club website

Landing site for [Blockheads Club](https://github.com/Blockheads-Club): the web patcher, the clean-room
dedicated server, guides, FAQ and the legal notice. SvelteKit 2 + Svelte 5 + TypeScript, prerendered with
`adapter-static`. English by default, Turkish included (`src/lib/i18n/`), light/dark theme, responsive, accessible.

> Not affiliated with Majic Jungle Software or Noodlecake Studios. No game files are distributed here.

## Develop

```sh
bun install
bun run dev        # dev server
bun run check      # svelte-check
bun run test       # vitest, 100% coverage thresholds (lines/branches/functions/statements)
bun run test:e2e   # Playwright smoke (builds and previews the site)
bun run build      # static site in ./build
```

## Adding a language

Create `src/lib/i18n/<code>.ts` typed as `Dict`, register it in `src/lib/i18n/index.ts`. A test enforces that
the key set matches `en`. Also add the code to the allow-list in the inline script of `src/app.html`.

## Deploy

- **GitHub Pages** (`.github/workflows/pages.yml`): built with `BASE_PATH=/website` (configurable; empty means
  site root). Enable Pages with source "GitHub Actions". `.nojekyll` and `404.html` are included.
- **Cloudflare Pages** (`.github/workflows/cloudflare.yml`, `wrangler.toml`, `static/_headers`,
  `static/_redirects`): add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; the job is
  skipped when they are absent. Project name: `blockheads-club`.

## Releases

Push a signed tag `vX.Y.Z` on `dev` (version in `package.json`). `.github/workflows/release.yml` tests, builds and
attaches `website-build.tar.gz` to a **draft** GitHub release for that tag (prerelease for `0.x` and `-pre` tags);
publish the draft once CI is green. The workflows can also be started manually (`workflow_dispatch`).

## License

GPL-3.0-only, see [LICENSE](LICENSE).
