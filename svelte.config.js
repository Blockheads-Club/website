import adapter from '@sveltejs/adapter-static';

// BASE_PATH is "/website" on GitHub Pages and empty on Cloudflare Pages / local dev.
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    paths: { base },
    prerender: {
      // /mods/index.json 404s when no valid published index could be fetched (src/routes/mods/index.json); the build
      // then simply has no such file. Every other prerender error still fails the build.
      handleHttpError: ({ path, status, message }) => {
        if (path === base + '/mods/index.json' && status === 404) {
          console.warn('mods-index: no published index, /mods/index.json is not written');
          return;
        }
        throw new Error(message);
      }
    }
  }
};
