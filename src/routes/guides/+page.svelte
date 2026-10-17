<script lang="ts">
  import { LINKS } from '$lib/config';
  import Button from '$lib/components/Button.svelte';
  import Chip from '$lib/components/Chip.svelte';
  import GuideCard from '$lib/components/GuideCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { GUIDES, matchesFilter, type Filter } from '$lib/guides';
  import type { IconName } from '$lib/icons';
  import { dict, i18n } from '$lib/locale.svelte';

  const d = $derived(dict());
  const g = $derived(d.guides);
  const filters: { id: Filter; icon?: IconName }[] = [
    { id: 'all' },
    { id: 'patcher', icon: 'patch' },
    { id: 'server', icon: 'server' },
    { id: 'android', icon: 'phone' },
    { id: 'beginner' },
    { id: 'advanced' }
  ];

  let query = $state('');
  let filter = $state<Filter>('all');

  const visible = $derived.by(() => {
    const q = query.trim().toLocaleLowerCase(i18n.locale);
    return GUIDES.filter((guide) => {
      const text = g.items.find((item) => item.id === guide.id)!;
      return (
        matchesFilter(guide, filter) &&
        (q === '' || `${text.title} ${text.summary}`.toLocaleLowerCase(i18n.locale).includes(q))
      );
    });
  });
  const featured = $derived(visible.filter((guide) => guide.featured));
  const patcher = $derived(visible.filter((guide) => !guide.featured && guide.topic === 'patcher'));
  const server = $derived(visible.filter((guide) => !guide.featured && guide.topic === 'server'));

  function clear() {
    query = '';
    filter = 'all';
  }
</script>

<div class="wrap page">
  <div class="intro">
    <span class="eyebrow"><Icon name="book" />{g.eyebrow}</span>
    <h1>{g.title}</h1>
    <p class="muted lead-l">{g.lead}</p>
    <div class="search">
      <label for="g-q" class="sr">{g.searchLabel}</label>
      <Icon name="search" class="si" />
      <input id="g-q" class="inp" type="search" placeholder={g.searchPlaceholder} bind:value={query} />
    </div>
  </div>
  <div role="group" aria-label={g.filterLabel} class="chips">
    {#each filters as f (f.id)}
      <Chip pressed={filter === f.id} icon={f.icon} onclick={() => (filter = f.id)}>{g.filters[f.id]}</Chip>
    {/each}
  </div>
  <p class="sr" role="status">{visible.length + ' ' + g.resultsStatus}</p>

  {#if visible.length === 0}
    <div class="card empty">
      <p class="b">{g.noResults}</p>
      <Button onclick={clear}>{g.clear}</Button>
    </div>
  {/if}

  {#if featured.length}
    <section aria-labelledby="g-start" class="grp">
      <h2 id="g-start">{g.startHere}</h2>
      <div class="grid-f">
        {#each featured as guide (guide.id)}<GuideCard id={guide.id} variant="featured" />{/each}
      </div>
    </section>
  {/if}
  {#if patcher.length}
    <section aria-labelledby="g-p" class="grp">
      <h2 id="g-p">{g.patcherTitle}</h2>
      <div class="grid-g">
        {#each patcher as guide (guide.id)}<GuideCard id={guide.id} variant="list" />{/each}
      </div>
    </section>
  {/if}
  {#if server.length}
    <section aria-labelledby="g-s" class="grp">
      <h2 id="g-s">{g.serverTitle}</h2>
      <div class="grid-g">
        {#each server as guide (guide.id)}<GuideCard id={guide.id} variant="list" />{/each}
      </div>
    </section>
  {/if}

  <div class="card missing">
    <p class="b">{g.missing}</p>
    <Button href={LINKS.websiteIssues} rel="noopener" icon="code">{g.suggest}</Button>
  </div>
</div>

<style>
  .page {
    padding-top: 64px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    gap: 40px;
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
  .grp {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .grp h2 {
    font-size: 26px;
  }
  .grid-f {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr));
    gap: 18px;
  }
  .grid-g {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
    gap: 18px;
  }
  .b {
    font-weight: 700;
  }
  .missing,
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
