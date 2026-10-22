import { loadReleases } from '$lib/server/releases';

// Runs once per prerendered page at build time; the GitHub data is fetched once and shared (see loadReleases).
export const load = async () => ({ releases: await loadReleases() });
