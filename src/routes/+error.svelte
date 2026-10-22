<script lang="ts">
  import { base } from '$app/paths';
  import { docsPath } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';

  const d = $derived(dict().notFound);
</script>

<div class="wrap nf">
  <span class="q" aria-hidden="true">?</span>
  <h1>{d.title}</h1>
  <p class="muted">{d.body}</p>
  <div class="row">
    <a class="btn btn-p" href={base + '/'}>{d.home}</a>
    <a class="btn" href={base + docsPath(i18n.locale)} rel="external">{d.docs + ' ↗'}</a>
  </div>
</div>

<style>
  .nf {
    padding-top: 96px;
    padding-bottom: 120px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
    text-align: center;
  }
  .q {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    border: 3px dashed var(--line-strong);
    display: grid;
    place-items: center;
    transform: rotate(-6deg);
    font: 800 22px var(--f-display);
    color: var(--text-3);
  }
  h1 {
    font-size: 28px;
  }
  .row {
    justify-content: center;
  }
</style>
