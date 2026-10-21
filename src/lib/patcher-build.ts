// Pure helpers for scripts/build-patcher.ts, which bundles the web Patcher into build/patcher/ (no I/O here).

export type Release = { tag_name: string; draft: boolean; published_at: string | null };

/** The most recently published release tag from the GitHub REST `releases` list (drafts skipped). */
export function latestFromApi(releases: Release[]): string | undefined {
  return releases
    .filter((r) => !r.draft && r.published_at)
    .sort((a, b) => Date.parse(b.published_at as string) - Date.parse(a.published_at as string))[0]?.tag_name;
}

/**
 * Static page routes of a SvelteKit app, from the paths of its `+page.svelte` files relative to `src/routes`
 * (e.g. "+page.svelte", "splash/+page.svelte"). Dynamic segments and (group)s are skipped: those are served by the
 * 404.html fallback. The root route ("") is index.html and is left out.
 */
export function staticRoutes(pageFiles: string[]): string[] {
  return pageFiles
    .map((f) => f.replaceAll('\\', '/'))
    .filter((f) => /(^|\/)\+page\.svelte$/.test(f))
    .map((f) => f.replace(/\/?\+page\.svelte$/, ''))
    .filter((r) => r !== '' && !/[[\]()]/.test(r))
    .sort();
}

type Rule = { path: string; lines: string[] };

function parseRules(text: string): Rule[] {
  const rules: Rule[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    if (/^\s/.test(line)) rules.at(-1)?.lines.push(line.trim());
    else rules.push({ path: line.trim(), lines: [] });
  }
  return rules;
}

const headerName = (line: string) => line.slice(0, line.indexOf(':')).trim().toLowerCase();

/**
 * Appends the Patcher's `_headers` rules to the site's, with every path prefixed by `prefix` (e.g. "/patcher").
 * Workers assets apply every matching rule and join repeated headers with commas, so the site's catch-all "/*" would
 * add a second (more permissive, conflicting) CSP and duplicate the other security headers on /patcher/*. Each
 * prefixed rule therefore first detaches (`! Name`) any header that a site rule matching it also sets.
 */
export function mergeHeaders(site: string, patcher: string, prefix: string): string {
  const siteRules = parseRules(site);
  const out = [site.trimEnd(), '', '# Web Patcher (scripts/build-patcher.ts): its own headers, site headers detached.'];
  for (const rule of parseRules(patcher)) {
    const path = prefix + rule.path;
    const names = new Set(rule.lines.map(headerName));
    const overlapping = siteRules
      .filter((s) => covers(s.path, path))
      .flatMap((s) => s.lines.map(headerName))
      .filter((n, i, all) => names.has(n) && all.indexOf(n) === i);
    out.push(path, ...overlapping.map((n) => '  ! ' + n), ...rule.lines.map((l) => '  ' + l), '');
  }
  return out.join('\n');
}

/** Whether a `_headers` path pattern (literal, or ending in "*") matches every path the pattern `path` matches. */
export function covers(pattern: string, path: string): boolean {
  if (pattern.endsWith('*')) return path.startsWith(pattern.slice(0, -1));
  return pattern === path;
}
