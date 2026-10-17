<script lang="ts">
  let {
    label,
    heading,
    items
  }: { label: string; heading: string; items: { id: string; label: string }[] } = $props();

  let current = $state('');
  const active = $derived(current || items[0].id);
</script>

<nav class="toc" aria-label={label}>
  <p class="hint head">{heading}</p>
  {#each items as item (item.id)}
    <a href={'#' + item.id} aria-current={active === item.id ? 'true' : undefined} onclick={() => (current = item.id)}
      >{item.label}</a
    >
  {/each}
</nav>

<style>
  .toc {
    flex: 1 1 220px;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .head {
    font-weight: 700;
    padding: 0 12px 6px;
  }
  a {
    display: flex;
    gap: 10px;
    align-items: center;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    color: var(--text-2);
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
  }
  a:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  a[aria-current='true'] {
    background: var(--primary-soft);
    color: var(--primary-ink);
  }
  @media (max-width: 900px) {
    .toc {
      max-width: none;
    }
  }
</style>
