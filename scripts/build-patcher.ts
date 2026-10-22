// Bundles the web Patcher (Blockheads-Club/blockheads-patcher) into build/patcher/ as plain static files, so
// blockheads.club serves it at /patcher/ from the same assets-only Worker as the site (no script, no binding).
// Run by `bun run build` after the site and docs builds. See docs/development.md ("Web Patcher").
//
// Which version: the latest PUBLISHED release of the patcher (by publish date, drafts skipped; GitHub REST API),
// unless PATCHER_REF names a tag or branch. The source is shallow-cloned at that ref and built with
// `build:web` and BASE_PATH=<site base>/patcher. Builds are cached per commit and base in
// node_modules/.cache/blockheads-patcher/. Env:
//   PATCHER_REF   tag or branch to build instead of the latest release
//   PATCHER_REPO  git URL or local path to clone from (default: the GitHub repo)
//   GITHUB_TOKEN  optional, raises the GitHub API rate limit (set in GitHub Actions)
import { execFileSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { latestFromApi, mergeHeaders, staticRoutes, type Release } from '../src/lib/patcher-build';

const GH = 'Blockheads-Club/blockheads-patcher';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'build');
const out = join(site, 'patcher');
const cache = join(root, 'node_modules', '.cache', 'blockheads-patcher');
const base = (process.env.BASE_PATH ?? '').replace(/\/+$/, '');
const patcherBase = base + '/patcher';
const repo = process.env.PATCHER_REPO || `https://github.com/${GH}.git`;
const bun = process.versions.bun ? process.execPath : 'bun';

const log = (msg: string) => console.log('build-patcher: ' + msg);
const run = (cmd: string, args: string[], cwd: string, env: Record<string, string> = {}) =>
  execFileSync(cmd, args, { cwd, stdio: ['ignore', 'inherit', 'inherit'], env: { ...process.env, ...env } });

async function get(url: string, accept: string): Promise<Response> {
  const headers: Record<string, string> = { accept, 'user-agent': 'blockheads-club-website-build' };
  if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com/')) headers.authorization = 'Bearer ' + process.env.GITHUB_TOKEN;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res;
}

// Only the REST API tells published releases from drafts (the releases.atom feed also lists bare tags, e.g. a tag
// whose release is still a draft), so there is no unauthenticated fallback: after retries the build fails and the
// previous deployment stays live. Unauthenticated calls allow 60 requests/hour per IP; GITHUB_TOKEN lifts that.
// The release list sometimes comes back empty for a while (seen 2026-10-22 from Cloudflare builds and locally), so
// attempts alternate between the list and /releases/latest, which reports the newest published stable release.
async function latestRelease(): Promise<string> {
  const api = `https://api.github.com/repos/${GH}/releases`;
  for (let attempt = 1; ; attempt++) {
    try {
      const latest = attempt % 2 === 0;
      const res = await get(latest ? `${api}/latest` : `${api}?per_page=30&attempt=${attempt}`, 'application/vnd.github+json');
      const body = (await res.json()) as Release | Release[];
      const tag = latestFromApi(Array.isArray(body) ? body : [body]);
      if (!tag) throw new Error('no published patcher release found');
      return tag;
    } catch (e) {
      if (attempt === 6) throw e;
      log(`GitHub API attempt ${attempt} failed (${(e as Error).message}), retrying`);
      await new Promise((r) => setTimeout(r, 5000 * attempt));
    }
  }
}

/** Commit the ref points at (peeled for annotated tags), so the cache key changes when a branch moves. */
function resolveCommit(ref: string): string {
  const lines = execFileSync('git', ['ls-remote', repo, `refs/tags/${ref}^{}`, `refs/tags/${ref}`, `refs/heads/${ref}`], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
  const pick = lines.find((l) => l.endsWith('^{}')) ?? lines[0];
  if (!pick) throw new Error(`patcher ref "${ref}" not found in ${repo}`);
  return pick.split('\t')[0];
}

function listPages(dir: string, prefix = ''): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listPages(join(dir, e.name), prefix + e.name + '/') : [prefix + e.name]
  );
}

/** Clones and builds the patcher at `ref` into `<cache>/<commit>-<base>/`, unless that build is cached already. */
function buildPatcher(ref: string, commit: string): string {
  const key = `${commit}${patcherBase.replaceAll('/', '_')}`;
  const done = join(cache, key);
  if (existsSync(join(done, 'build', 'index.html'))) {
    log(`using cached build ${relative(root, done)}`);
    return done;
  }
  const src = join(cache, 'src-' + commit);
  rmSync(src, { recursive: true, force: true });
  mkdirSync(cache, { recursive: true });
  run('git', ['-c', 'advice.detachedHead=false', 'clone', '--quiet', '--depth', '1', '--branch', ref, repo, src], cache);
  run(bun, ['install', '--frozen-lockfile'], src);
  run(bun, ['run', '--filter', '@bh-patcher/app', 'build:web'], src, { BASE_PATH: patcherBase });
  const tmp = done + '.tmp';
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  cpSync(join(src, 'app', 'build'), join(tmp, 'build'), { recursive: true });
  writeFileSync(join(tmp, 'routes.json'), JSON.stringify(staticRoutes(listPages(join(src, 'app', 'src', 'routes')))));
  rmSync(done, { recursive: true, force: true });
  renameSync(tmp, done);
  rmSync(src, { recursive: true, force: true });
  return done;
}

if (!existsSync(join(site, 'index.html'))) throw new Error('run the site build first (build/index.html missing)');
const ref = process.env.PATCHER_REF || (await latestRelease());
const commit = resolveCommit(ref);
log(`patcher ${ref} (${commit.slice(0, 12)}) at ${patcherBase}/`);
const built = buildPatcher(ref, commit);

rmSync(out, { recursive: true, force: true });
cpSync(join(built, 'build'), out, { recursive: true });
// Cloudflare Pages / GitHub Pages leftovers: the SPA rewrite would apply to the whole site, and Jekyll is not used.
for (const f of ['_redirects', '_headers', '.nojekyll']) rmSync(join(out, f), { force: true });
// Deep links: each static route gets a copy of the app shell (Workers assets and GitHub Pages serve /patcher/splash
// from splash.html with 200). 404.html (also the shell) stays: Workers' "404-page" handling serves the nearest
// 404.html, so any other /patcher/* path still boots the app (with status 404).
const routes = JSON.parse(readFileSync(join(built, 'routes.json'), 'utf8')) as string[];
for (const r of routes) {
  mkdirSync(dirname(join(out, r)), { recursive: true });
  copyFileSync(join(out, 'index.html'), join(out, r + '.html'));
}
writeFileSync(
  join(site, '_headers'),
  mergeHeaders(readFileSync(join(site, '_headers'), 'utf8'), readFileSync(join(built, 'build', '_headers'), 'utf8'), patcherBase)
);
writeFileSync(join(out, 'patcher-version.txt'), `${ref} ${commit}\n`);
log(`done: ${routes.length} route copies (${routes.join(', ') || 'none'}), _headers merged`);
