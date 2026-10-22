<script lang="ts">
  import { dict } from '$lib/locale.svelte';
  import Icon from './Icon.svelte';

  let { text, label }: { text: string; label: string } = $props();

  const d = $derived(dict().mods.detail);
  let status = $state<'idle' | 'copied' | 'failed'>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(text);
      status = 'copied';
    } catch {
      status = 'failed';
    }
    timer = setTimeout(() => (status = 'idle'), 2000);
  }
</script>

<span class="ct">
  <code class="mono">{text}</code>
  <button type="button" class="btn btn-sm" aria-label={label} onclick={copy}>
    <Icon name="copy" size={16} />{status === 'copied' ? d.copied : d.copy}
  </button>
  <span class="sr" role="status">
    {#if status === 'copied'}{d.copied}{:else if status === 'failed'}{d.copyFailed}{/if}
  </span>
</span>

<style>
  .ct {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  code {
    font-size: 13px;
    overflow-wrap: anywhere;
    background: var(--surface-2);
    border-radius: 8px;
    padding: 4px 8px;
  }
</style>
