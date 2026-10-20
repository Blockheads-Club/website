// Runs the SvelteKit dev server and the VitePress docs dev server together.
// The SvelteKit dev server proxies /docs to the docs server (see vite.config.ts), so http://localhost:5173/docs/ works.
import { spawn } from 'node:child_process';

const children = ['dev:site', 'dev:docs'].map((script) =>
  spawn('bun', ['run', script], { stdio: 'inherit', shell: process.platform === 'win32' })
);

function stop(code = 0) {
  for (const child of children) if (child.exitCode === null) child.kill();
  process.exit(code);
}

for (const child of children) child.on('exit', (code) => stop(code ?? 0));
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
