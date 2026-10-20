# CLAUDE.md

Project: Blockheads Club website (see README.md). Part of the Blockheads-Club multi-repo umbrella
(`../AGENTS.md` rules apply).

## Hard rules
- License GPL-3.0-or-later. Package manager **bun**, never npm.
- NEVER commit or ship game files (APKs, assets, decompiled code). Keep the legal notice: not affiliated with
  Majic Jungle / Noodlecake, no game files distributed, patch only what you own.
- 100% coverage thresholds (lines/branches/functions/statements) in `vite.config.ts` must never be lowered.
- Releases: push a signed `vX.Y.Z` tag; `release.yml` attaches the build to a draft GitHub release, published by hand once CI is green. Conventional Commits. Currently push only to `dev`.

## Conventions
- SvelteKit 2, Svelte 5 runes, TypeScript strict, `adapter-static` (prerender, `404.html` fallback).
- `BASE_PATH` env sets the base path (`/website` for GitHub Pages, empty otherwise). Build internal URLs with
  `base` from `$app/paths`.
- UI copy lives only in `src/lib/i18n/<code>.ts` (en default, tr, ru, kk; first visit follows the browser language). Key sets, links, code spans and placeholders must match `en` (test enforces). ru/kk await a native-speaker review.
- Avoid string interpolation in Svelte attributes (`href="#{x}"`): the compiler emits `?? ''` branches that break the
  100% branch threshold; use `{"#" + x}` instead.
- Theme: `data-theme` on `<html>`, set early by the inline script in `src/app.html`; stored in `localStorage` (`bh-theme`, `bh-locale`).
- External links live in `src/lib/config.ts`.
- Design: "Sunlit Blocks" tokens + shared classes (`.btn`, `.card`, `.badge`, ...) live in `src/app.css`; fonts are self-hosted via
  `@fontsource*` (no Google Fonts, CSP unchanged). Inline markup in dictionary strings: `**bold**`, `` `mono` ``, `{{placeholder}}`,
  `[label](linkKey)` (see `src/lib/rich.ts`, `Rich.svelte`). Avoid `{a} {b}` text interpolation (use `{a + ' ' + b}`) for the same branch-coverage reason.
- Routes: `/`, `/server`, `/guides`, `/guides/fix-game-on-phone`, `/faq`, `/legal`. Old `/#faq` etc. anchors redirect client-side.
- Docs: VitePress project in `docs/` (config `docs/.vitepress/config.ts`, locales en root + `tr/`, `ru/`, `kk/` with the same pages),
  served at `<BASE_PATH>/docs/`. `bun run build` runs `vite build` then `vitepress build docs` into `build/docs`; `bun run dev`
  starts both (the SvelteKit dev server proxies `/docs` to :5174). No SvelteKit route may use `/docs`; link to it with
  `rel="external"` (full page load, skipped by the prerender crawler). Theme colours mirror `src/app.css` in `docs/.vitepress/theme/style.css`.
