<script lang="ts">
  import { dict } from '$lib/locale.svelte';
  import Icon from './Icon.svelte';

  /** A command with a copy button. `code` is copied as-is. */
  let { code }: { code: string } = $props();

  const d = $derived(dict().copy);
  let status = $state<'idle' | 'copied' | 'failed'>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(code);
      status = 'copied';
    } catch {
      status = 'failed';
    }
    timer = setTimeout(() => (status = 'idle'), 2000);
  }
</script>

<div class="cmd">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre class="code" tabindex="0">{code}</pre>
  <button type="button" class="btn btn-sm" aria-label={d.command} onclick={copy}>
    <Icon name="copy" size={16} />{status === 'copied' ? d.copied : d.copy}
  </button>
  <span class="sr" role="status">{status === 'copied' ? d.copied : status === 'failed' ? d.failed : ''}</span>
</div>

<style>
  .cmd {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  .btn {
    align-self: flex-start;
  }
</style>
