<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Chip from '$lib/components/Chip.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ModCard from '$lib/components/ModCard.svelte';
  import { base } from '$app/paths';
  import { docsPath, plural } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';
  import { allTags, filterMods } from '$lib/mods';
  import type { Mod } from '$lib/mods';

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

<div class="wrap page">
  <div class="intro">
    <span class="eyebrow"><Icon name="box" />{m.eyebrow}</span>
    <h1>{m.title}</h1>
    <p class="muted lead-l">{m.lead}</p>
    <div class="actions">
      <Button variant="primary" href={base + '/mods/submit'} icon="code">{m.submitButton}</Button>
      <Button href={base + docsPath(i18n.locale) + 'mods'} rel="external" icon="book">{m.makeButton}</Button>
    </div>
    {#if data.sample}
      <Callout tone="info" icon="info"><span data-testid="sample-notice">{m.sample}</span></Callout>
    {/if}
    <div class="search">
      <label for="m-q" class="sr">{m.searchLabel}</label>
      <Icon name="search" class="si" />
      <input id="m-q" class="inp" type="search" placeholder={m.searchPlaceholder} bind:value={query} />
    </div>
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
      <p class="b">{m.noResults}</p>
      <Button onclick={clear}>{m.clear}</Button>
    </div>
  {:else}
    <div class="grid">
      {#each visible as mod (mod.id)}<ModCard {mod} />{/each}
    </div>
  {/if}
</div>

<style>
  .page {
    padding-top: 64px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .intro {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 760px;
  }
  h1 {
    font-size: clamp(38px, 5vw, 58px);
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .search {
    position: relative;
    margin-top: 6px;
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
  .b {
    font-weight: 700;
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
</style>
