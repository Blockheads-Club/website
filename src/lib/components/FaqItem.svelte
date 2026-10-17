<script lang="ts">
  import Icon from './Icon.svelte';
  import Rich from './Rich.svelte';

  let { q, a, open = false, large = false }: { q: string; a: string; open?: boolean; large?: boolean } = $props();
</script>

<details class={['faq', large && 'faq-l']} {open}>
  <summary>{q}<Icon name="chev-d" class="chev" /></summary>
  <p class="ans"><Rich text={a} /></p>
</details>

<style>
  .faq {
    border: 2px solid var(--line);
    border-radius: 14px;
    background: var(--surface);
  }
  .faq[open] {
    border-color: var(--line-strong);
  }
  summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    font-weight: 700;
    font-size: 17px;
    min-height: 44px;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  .faq-l summary {
    font-size: 17.5px;
  }
  .faq[open] summary :global(.chev) {
    transform: rotate(180deg);
  }
  .ans {
    padding: 0 20px 20px;
    color: var(--text-2);
  }
  .faq-l .ans {
    font-size: 16.5px;
    line-height: 1.65;
  }
</style>
