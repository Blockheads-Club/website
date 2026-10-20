<script lang="ts">
  import { base } from '$app/paths';
  import { LINKS } from '$lib/config';
  import { WRITTEN, linkKey } from '$lib/guides';
  import { parseRich } from '$lib/rich';

  let { text }: { text: string } = $props();

  const targets: Record<string, string> = {
    ...LINKS,
    guides: base + '/guides',
    faq: base + '/faq',
    server: base + '/server',
    ...Object.fromEntries(WRITTEN.map((g) => [linkKey(g.id), base + g.path]))
  };

  const tokens = $derived(parseRich(text));
</script>

{#each tokens as token, i (i)}
  {#if token.kind === 'bold'}<strong>{token.text}</strong
    >{:else if token.kind === 'mono'}<span class="mono">{token.text}</span
    >{:else if token.kind === 'ph'}<span class="ph">{token.text}</span
    >{:else if token.kind === 'link'}<a href={targets[token.target]}>{token.text}</a
    >{:else}{token.text}{/if}
{/each}
