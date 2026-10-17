import adapter from '@sveltejs/adapter-static';

// BASE_PATH is "/website" on GitHub Pages and empty on Cloudflare Pages / local dev.
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    paths: { base }
  }
};
