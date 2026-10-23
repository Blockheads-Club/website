<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { IconName } from '$lib/icons';
  import Icon from './Icon.svelte';

  let {
    pressed,
    icon,
    onclick,
    children
  }: { pressed: boolean; icon?: IconName; onclick: () => void; children: Snippet } = $props();
</script>

<button type="button" class="chip" aria-pressed={pressed} {onclick}>
  {#if icon}<Icon name={icon} />{/if}
  {@render children()}
</button>

<style>
  .chip {
    min-height: 44px;
    padding: 0 16px;
    border-radius: 999px;
    border: 2px solid var(--line-strong);
    background: var(--surface);
    color: var(--text);
    font: 700 15px var(--f-body);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .chip:hover {
    background: var(--surface-2);
  }
  .chip[aria-pressed='true'] {
    background: #1f1a17;
    color: #ffd27a;
    border-color: #1f1a17;
  }
  :global(:root[data-theme='dark']) .chip[aria-pressed='true'] {
    background: #ffd27a;
    color: #1f1a17;
    border-color: #ffd27a;
  }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light']):not([data-theme='dark'])) .chip[aria-pressed='true'] {
      background: #ffd27a;
      color: #1f1a17;
      border-color: #ffd27a;
    }
  }
</style>
