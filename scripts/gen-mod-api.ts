// Generates the mod API reference (docs/**/mods/api/*.md and docs/.vitepress/mod-api.json) from the WIT files of the
// mod SDK. The generated files are committed; run this again after the API changes.
//
//   bun scripts/gen-mod-api.ts [--sdk <mod-sdk checkout>] [--check]
//
// The SDK path is --sdk, else MOD_SDK_DIR, else ../mod-sdk (next to this repo). --check writes nothing and exits 1
// when the committed files differ from what would be generated.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, parseWit, renderAll, sidebarData, sortInterfaces } from '../src/lib/wit-docs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const sdk = resolve(root, flag('--sdk') ?? process.env.MOD_SDK_DIR ?? '../mod-sdk');
const check = args.includes('--check');
const witDir = join(sdk, 'wit', 'blockheads-api');
if (!existsSync(witDir)) {
  console.error(`gen-mod-api: ${witDir} not found (pass --sdk <mod-sdk checkout> or set MOD_SDK_DIR)`);
  process.exit(2);
}

const sources = readdirSync(witDir)
  .filter((f) => f.endsWith('.wit'))
  .sort()
  .map((f) => readFileSync(join(witDir, f), 'utf8'));
// Reading order for the sidebar: what a first mod needs first.
const pkg = sortInterfaces(parseWit(sources), [
  'events',
  'commands',
  'players',
  'scheduler',
  'storage',
  'log',
  'host',
  'services',
  'channels',
  'guest',
  'types'
]);

const docs = join(root, 'docs');
const files = renderAll(pkg);
files['.vitepress/mod-api.json'] = JSON.stringify(sidebarData(pkg), null, 2) + '\n';

const apiDirs = LOCALES.map((l) => join(docs, l === 'en' ? '' : l, 'mods', 'api'));
let stale = 0;
if (check) {
  for (const [path, text] of Object.entries(files)) {
    const file = join(docs, path);
    if (!existsSync(file) || readFileSync(file, 'utf8') !== text) {
      console.error('gen-mod-api: out of date: docs/' + path);
      stale++;
    }
  }
  for (const dir of apiDirs.filter(existsSync)) {
    for (const f of readdirSync(dir)) {
      const rel = join(dir, f).slice(docs.length + 1);
      if (!(rel in files)) {
        console.error('gen-mod-api: not generated: docs/' + rel);
        stale++;
      }
    }
  }
  process.exit(stale ? 1 : 0);
}

for (const dir of apiDirs) rmSync(dir, { recursive: true, force: true });
for (const [path, text] of Object.entries(files)) {
  const file = join(docs, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
}
console.log(`gen-mod-api: ${pkg.id}: ${Object.keys(files).length} files from ${witDir}`);
