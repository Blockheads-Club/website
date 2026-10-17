<script lang="ts">
  import { base } from '$app/paths';
  import { guideById } from '$lib/guides';
  import { dict } from '$lib/locale.svelte';
  import Badge from './Badge.svelte';
  import Icon from './Icon.svelte';

  let { id, variant }: { id: string; variant: 'home' | 'list' | 'featured' } = $props();

  const d = $derived(dict());
  const meta = $derived(guideById(id));
  const text = $derived(d.guides.items.find((item) => item.id === id)!);
  const level = $derived(d.guides.filters[meta.level]);
  const topic = $derived(d.guides.filters[meta.topic]);
  const href = $derived(meta.path ? base + meta.path : undefined);
  const topicTone = $derived(meta.topic === 'patcher' ? 'primary' : 'info');
  const topicLevel = $derived(topic + ' · ' + level);
  const minRead = $derived(meta.minutes + ' ' + d.home.guides.minRead);
  const levelTime = $derived(`${level} · ${meta.minutes} ${d.guides.min}`);
</script>

{#snippet body()}
  {#if variant === 'featured'}
    <span class={['tile', meta.topic === 'server' && 'dark']}>
      <Icon name={meta.topic === 'patcher' ? 'patch' : 'server'} size={30} />
    </span>
  {/if}
  <span class="col">
    {#if variant === 'home'}
      <Badge tone={meta.level === 'advanced' ? 'neutral' : topicTone} class="self">{topicLevel}</Badge>
      <span class="t t-home">{text.title}</span>
      <span class="muted s">{text.summary}</span>
      <span class="hint">{minRead}</span>
    {:else if variant === 'list'}
      <Badge class="self">{levelTime}</Badge>
      <span class="t t-list">{text.title}</span>
      <span class="muted s">{text.summary}</span>
    {:else}
      <span class="row">
        <Badge tone={topicTone}>{topic}</Badge><Badge>{levelTime}</Badge>
      </span>
      <span class="t t-feat">{text.title}</span>
      <span class="muted s">{text.summary}</span>
    {/if}
    {#if !href}<Badge class="self soon" icon="clock">{d.guides.comingSoon}</Badge>{/if}
  </span>
{/snippet}

{#if href}
  <a class={['card', 'gcard', variant === 'featured' && 'feat']} {href}>{@render body()}</a>
{:else}
  <div class={['card', 'gcard', 'inert', variant === 'featured' && 'feat']}>{@render body()}</div>
{/if}

<style>
  .gcard {
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-decoration: none;
    color: var(--text);
  }
  .feat {
    flex-direction: row;
    gap: 20px;
    padding: 26px;
    border-color: var(--line-strong);
    box-shadow: 0 3px 0 var(--line-strong);
  }
  .inert {
    background: var(--surface);
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  .row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .col :global(.self) {
    align-self: flex-start;
  }
  .t {
    font-family: var(--f-display);
    font-weight: 750;
  }
  .t-home {
    font-size: 21px;
    line-height: 1.12;
  }
  .t-list {
    font-size: 19px;
    line-height: 1.25;
  }
  .t-feat {
    font-size: 22px;
    line-height: 1.2;
  }
  .s {
    font-size: 15px;
  }
  .feat .s {
    font-size: 15.5px;
  }
  .tile {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: var(--sun);
    color: #1f1a17;
    display: grid;
    place-items: center;
    flex: none;
    transform: rotate(-6deg);
    box-shadow: 0 3px 0 #c98a2e;
  }
  .tile.dark {
    background: #1f1a17;
    color: #ffd27a;
    box-shadow: 0 3px 0 #000;
  }
</style>
