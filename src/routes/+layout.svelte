<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Footer from '$lib/components/Footer.svelte';
  import { SITE_URL } from '$lib/config';
  import Header from '$lib/components/Header.svelte';
  import { dict, initLocale } from '$lib/locale.svelte';
  import { guideSlug, routeKey } from '$lib/route';
  import { initTheme } from '$lib/theme.svelte';

  let { children } = $props();

  const route = $derived(routeKey(page.url.pathname, base));
  const home = $derived(route === 'home');
  const slug = $derived(guideSlug(page.url.pathname, base));
  const title = $derived.by(() => {
    const d = dict();
    if (route === 'article') return d.guides.items.find((item) => item.id === slug)!.title + ' · ' + d.meta.title;
    return route === 'other' ? d.meta.title : d.meta.titles[route];
  });

  onMount(() => {
    initLocale();
    initTheme();
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
<Header {route} hero={home} />
<main id="main">
  {@render children()}
</main>
<Footer {route} rich={home} />
