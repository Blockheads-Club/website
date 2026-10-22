<script lang="ts">
  import { LINKS } from '$lib/config';
  import { parseRich } from '$lib/rich';

  /** Dictionary text with inline markup; `[label](key)` links use the keys of LINKS. */
  let { text }: { text: string } = $props();

  const targets: Record<string, string> = LINKS;
  const tokens = $derived(parseRich(text));
</script>

{#each tokens as token, i (i)}
  {#if token.kind === 'bold'}<strong>{token.text}</strong
    >{:else if token.kind === 'mono'}<span class="mono">{token.text}</span
    >{:else if token.kind === 'ph'}<span class="ph">{token.text}</span
    >{:else if token.kind === 'link'}<a href={targets[token.target]}>{token.text}</a
    >{:else}{token.text}{/if}
{/each}
