# CLAUDE.md

Project: Blockheads Club website (see README.md). Part of the Blockheads-Club multi-repo umbrella
(`../AGENTS.md` rules apply).

## Hard rules
- License GPL-3.0-only. Package manager **bun**, never npm.
- NEVER commit or ship game files (APKs, assets, decompiled code). Keep the legal notice: not affiliated with
  Majic Jungle / Noodlecake, no game files distributed, patch only what you own.
- 100% coverage thresholds (lines/branches/functions/statements) in `vite.config.ts` must never be lowered.
- Releases: semantic-release; `main` = stable, `dev` = prerelease channel `dev`. Conventional Commits. Currently push only to `dev`.

## Conventions
- SvelteKit 2, Svelte 5 runes, TypeScript strict, `adapter-static` (prerender, `404.html` fallback).
- `BASE_PATH` env sets the base path (`/website` for GitHub Pages, empty otherwise). Build internal URLs with
  `base` from `$app/paths`.
- UI copy lives only in `src/lib/i18n/<code>.ts` (en default, tr). Key sets must match `en` (test enforces).
- Avoid string interpolation in Svelte attributes (`href="#{x}"`): the compiler emits `?? ''` branches that break the
  100% branch threshold; use `{"#" + x}` instead.
- Theme: `data-theme` on `<html>`, set early by the inline script in `src/app.html`; stored in `localStorage` (`bh-theme`, `bh-locale`).
- External links live in `src/lib/config.ts`.
