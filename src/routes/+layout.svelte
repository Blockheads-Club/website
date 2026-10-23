<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { SITE_URL } from '$lib/config';
  import { DOCS_DIRS } from '$lib/i18n';
  import { dict, i18n, initLocale, preferredLocale } from '$lib/locale.svelte';
  import { modName, type Mod } from '$lib/mods';
  import { legacyAnchor, routeKey, targetHref } from '$lib/route';
  import { redirect } from '$lib/nav';
  import { initTheme } from '$lib/theme.svelte';

  let { children } = $props();

  const route = $derived(routeKey(page.url.pathname, base));
  /** Pages whose hero runs under the (transparent) header. */
  const onHero = $derived(route === 'home' || route === 'pc' || route === 'patcher' || route === 'server');
  const title = $derived.by(() => {
    const titles = dict().meta.titles;
    if (route === 'modDetail') {
      const mod = page.data.mod as Mod | undefined;
      return (mod ? modName(mod, i18n.locale) : dict().apps.names.mods) + ' · ' + dict().meta.title;
    }
    return route in titles ? titles[route as keyof typeof titles] : dict().meta.title;
  });

  onMount(() => {
    initLocale();
    initTheme();
    // Old one-page anchors (/#patcher, /server#start ...) moved to their own pages or into the docs.
    const target = legacyAnchor(location.pathname, location.hash, base);
    if (target) redirect(targetHref(target, base, DOCS_DIRS[preferredLocale()]));
  });
</script>

<svelte:head>
  <title>{'' + title}</title>
  <meta name="description" content={dict().meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Blockheads Club" />
  <meta property="og:title" content={dict().meta.title} />
  <meta property="og:description" content={dict().meta.description} />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:image" content={SITE_URL + 'social-preview.png'} />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="640" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={dict().meta.title} />
  <meta name="twitter:description" content={dict().meta.description} />
  <meta name="twitter:image" content={SITE_URL + 'social-preview.png'} />
</svelte:head>

<a class="skip" href="#main">{dict().nav.skip}</a>
<Header {route} {onHero} />
<main id="main" tabindex="-1">
  {@render children()}
</main>
<Footer />
