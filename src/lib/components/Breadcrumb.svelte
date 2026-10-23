<script lang="ts">
  import Icon from './Icon.svelte';

  let {
    label,
    items
  }: { label: string; items: { label: string; href?: string }[] } = $props();
</script>

<nav aria-label={label} class="crumbs">
  {#each items as item, i (i)}
    {#if i > 0}<Icon name="chev-r" size={16} class="sep" />{/if}
    {#if item.href}<a href={item.href}>{item.label}</a>{:else}<span aria-current="page" class="muted">{item.label}</span>{/if}
  {/each}
</nav>

<style>
  .crumbs {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 15px;
    flex-wrap: wrap;
  }
  .crumbs :global(.sep) {
    color: var(--text-3);
  }
</style>
