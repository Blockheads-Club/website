<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { DOCS_DIRS } from '$lib/i18n';
  import { dict, preferredLocale } from '$lib/locale.svelte';
  import { redirect } from '$lib/nav';
  import { movedTarget, targetHref, type Target } from '$lib/route';
  import Icon from './Icon.svelte';

  // Prerendered stand-in for an old page: sends visitors to its new home (the docs in their language).
  // Without JavaScript the meta refresh opens the English page.
  const d = $derived(dict().moved);
  const target = $derived(movedTarget(page.url.pathname, base) as Target);
  const fallback = $derived(targetHref(target, base, ''));

  onMount(() => redirect(targetHref(target, base, DOCS_DIRS[preferredLocale()])));
</script>

<svelte:head>
  <meta http-equiv="refresh" content={'2; url=' + fallback} />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap moved">
  <h1>{d.title}</h1>
  <p class="muted">{d.body}</p>
  <a class="btn btn-p" href={fallback} rel="external">{d.link}<Icon name="arrow-r" /></a>
</div>

<style>
  .moved {
    padding-top: 96px;
    padding-bottom: 120px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
  }
  h1 {
    font-size: clamp(30px, 4vw, 40px);
  }
</style>
