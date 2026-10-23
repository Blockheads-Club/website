<script lang="ts">
  import { base } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Chip from '$lib/components/Chip.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ModCard from '$lib/components/ModCard.svelte';
  import { docsPath, plural } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';
  import { allTags, filterMods } from '$lib/mods';
  import type { Mod } from '$lib/mods';
  import { PATHS } from '$lib/route';

  let { data }: { data: { mods: Mod[]; sample: boolean } } = $props();

  const m = $derived(dict().mods);
  const tags = $derived(allTags(data.mods));
  let query = $state('');
  let tag = $state('');
  const visible = $derived(filterMods(data.mods, query, tag, i18n.locale));

  function clear() {
    query = '';
    tag = '';
  }
</script>

<div class="page-hero plain">
  <div class="wrap">
    <span class="eyebrow"><Icon name="puzzle" size={16} />{m.eyebrow}</span>
    <h1>{m.title}</h1>
    <p class="muted lead">{m.lead}</p>
    <div class="row">
      <Button variant="primary" size="lg" href={base + PATHS.modsSubmit} icon="code">{m.submitButton}</Button>
      <Button size="lg" href={base + docsPath(i18n.locale, 'mods')} rel="external" icon="book">{m.makeButton}</Button>
    </div>
  </div>
</div>

<div class="wrap body">
  {#if data.sample}
    <Callout tone="info" icon="info"><span data-testid="sample-notice">{m.sample}</span></Callout>
  {/if}
  <div class="search">
    <label for="m-q" class="sr">{m.searchLabel}</label>
    <Icon name="search" class="si" />
    <input id="m-q" class="inp" type="search" placeholder={m.searchPlaceholder} bind:value={query} />
  </div>
  <div role="group" aria-label={m.tagsLabel} class="chips">
    <Chip pressed={tag === ''} onclick={() => (tag = '')}>{m.allTags}</Chip>
    {#each tags as t (t)}
      <Chip pressed={tag === t} onclick={() => (tag = t)}>{t}</Chip>
    {/each}
  </div>
  <p class="sr" role="status">{visible.length + ' ' + plural(m.resultsStatus, visible.length, i18n.locale)}</p>

  {#if visible.length === 0}
    <div class="card empty">
      <p class="b700">{m.noResults}</p>
      <Button onclick={clear}>{m.clear}</Button>
    </div>
  {:else}
    <div class="grid">
      {#each visible as mod (mod.id)}<ModCard {mod} />{/each}
    </div>
  {/if}

  <section class="card safe" aria-labelledby="safe">
    <div class="stack">
      <h2 id="safe">{m.safeTitle}</h2>
      <p class="muted">{m.safeBody}</p>
    </div>
    <div class="stack">
      <div class="chiprow">
        <span class="badge b-ok"><Icon name="eye" size={14} />{m.permRead}</span>
        <span class="badge b-warn"><Icon name="pencil" size={14} />{m.permChange}</span>
        <span class="badge b-warn"><Icon name="globe" size={14} />{m.permNet}</span>
      </div>
      <div class="native">
        <p class="stripe"><Icon name="octagon" size={16} />{m.nativeTitle}</p>
        <p class="nb">{m.nativeBody}</p>
      </div>
    </div>
  </section>
</div>

<style>
  .plain {
    background: var(--bg);
  }
  .body {
    padding-top: 40px;
    padding-bottom: 88px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .search {
    position: relative;
  }
  .search :global(.si) {
    position: absolute;
    left: 16px;
    top: 16px;
    color: var(--text-3);
    pointer-events: none;
  }
  .inp {
    width: 100%;
    min-height: 52px;
    padding: 0 16px 0 48px;
    border: 2px solid var(--line-strong);
    border-radius: 12px;
    background: var(--surface);
    color: var(--text);
    font: 17px/1.4 var(--f-body);
  }
  .inp::placeholder {
    color: var(--text-3);
  }
  .chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
    gap: 18px;
  }
  .empty {
    padding: 22px 24px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    background: var(--surface-2);
  }
  .safe {
    margin-top: 24px;
    padding: 24px 26px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
    gap: 28px;
    align-items: center;
  }
  .safe h2 {
    font-size: 28px;
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .native {
    border: 2px solid #7a1710;
    border-radius: 12px;
    overflow: hidden;
  }
  .stripe {
    padding: 8px 12px;
    color: #fff;
    font: 800 13px var(--f-body);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: repeating-linear-gradient(-45deg, #b42318 0 10px, #9a1d13 10px 20px);
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .nb {
    padding: 10px 12px;
    font-size: 14.5px;
    background: var(--bad-soft);
  }
</style>
