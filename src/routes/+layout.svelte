<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { DOCS_DIRS } from '$lib/i18n';
  import { dict, i18n, initLocale, preferredLocale } from '$lib/locale.svelte';
  import { modName, type Mod } from '$lib/mods';
  import { legacyAnchor, routeKey, targetHref } from '$lib/route';
  import { redirect } from '$lib/nav';
  import { pageMeta } from '$lib/seo';
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

  const meta = $derived(
    pageMeta(route, page.url.pathname.slice(base.length), dict(), i18n.locale, page.data.mod as Mod | undefined)
  );

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
</svelte:head>
<Seo {meta} />

<a class="skip" href="#main">{dict().nav.skip}</a>
<Header {route} {onHero} />
<main id="main" tabindex="-1">
  {@render children()}
</main>
<Footer />
