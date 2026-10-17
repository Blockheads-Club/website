<script lang="ts" module>
  export interface TabItem {
    id: string;
    label: string;
    icon: import('$lib/icons').IconName;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';

  let {
    tabs,
    selected = $bindable(),
    label,
    idPrefix,
    panel
  }: {
    tabs: TabItem[];
    selected: string;
    label: string;
    idPrefix: string;
    panel: Snippet<[string]>;
  } = $props();

  let buttons = $state<HTMLButtonElement[]>([]);

  function onkeydown(event: KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    let next: number;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    selected = tabs[next].id;
    buttons[next].focus();
  }
</script>

<div class="tabs" role="tablist" aria-label={label}>
  {#each tabs as tab, i (tab.id)}
    <button
      bind:this={buttons[i]}
      type="button"
      class="tab"
      role="tab"
      id={idPrefix + '-tab-' + tab.id}
      aria-selected={selected === tab.id}
      aria-controls={idPrefix + '-panel'}
      tabindex={selected === tab.id ? 0 : -1}
      onclick={() => (selected = tab.id)}
      onkeydown={(e) => onkeydown(e, i)}
    >
      <Icon name={tab.icon} />{tab.label}
    </button>
  {/each}
</div>
<div id={idPrefix + '-panel'} role="tabpanel" aria-labelledby={idPrefix + '-tab-' + selected} class="card panel">
  {@render panel(selected)}
</div>

<style>
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    background: var(--surface-2);
    border: 2px solid var(--line);
    border-radius: 14px;
    align-self: flex-start;
  }
  .tab {
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--text-2);
    font: 700 15px/1 var(--f-body);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color var(--dur-fast);
  }
  .tab:hover {
    color: var(--text);
  }
  .tab[aria-selected='true'] {
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 2px 0 var(--line-strong);
  }
  .panel {
    padding: 8px 28px 28px;
  }
  @media (max-width: 600px) {
    .tabs {
      flex-wrap: nowrap;
      overflow-x: auto;
      align-self: stretch;
    }
    .tab {
      white-space: nowrap;
      padding: 0 14px;
    }
    .panel {
      padding: 4px 16px 20px;
    }
  }
</style>
