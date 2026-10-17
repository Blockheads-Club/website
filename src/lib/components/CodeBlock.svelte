<script lang="ts">
  import { copyText, type Line } from '$lib/commands';
  import { dict } from '$lib/locale.svelte';
  import Badge from './Badge.svelte';
  import Icon from './Icon.svelte';

  let { lines, copyable = true }: { lines: readonly Line[]; copyable?: boolean } = $props();

  const d = $derived(dict().server.quick);
  let status = $state<'idle' | 'copied' | 'failed'>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(copyText(lines));
      status = 'copied';
    } catch {
      status = 'failed';
    }
    timer = setTimeout(() => (status = 'idle'), 2000);
  }
</script>

<div class="cmd">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre tabindex="0" class:plain={!copyable}>{#each lines as line, i (i)}{#each line as [kind, text], j (j)}{#if kind === 'plain'}{text}{:else}<span class={kind}>{text}</span>{/if}{/each}{i < lines.length - 1 ? '\n' : ''}{/each}</pre>
  {#if copyable}
    <button type="button" class="btn btn-sm cp" aria-label={d.copyLabel} onclick={copy}>
      <Icon name="copy" size={16} />{status === 'copied' ? d.copied : d.copy}
    </button>
    <span class="sr" role="status">
      {#if status === 'copied'}{d.copied}{:else if status === 'failed'}{d.copyFailed}{/if}
    </span>
  {/if}
</div>

<style>
  .cmd {
    position: relative;
    min-width: 0;
  }
  pre {
    background: var(--code-bg);
    color: var(--code-text);
    border-radius: 12px;
    font: 14.5px/1.7 var(--f-mono);
    padding: 16px 110px 16px 18px;
    overflow-x: auto;
    white-space: pre;
    margin: 0;
  }
  pre.plain {
    padding-right: 18px;
  }
  .pr {
    color: #ffb08c;
  }
  .cm {
    color: #b9aa9c;
  }
  .ok {
    color: #56c990;
  }
  .info {
    color: #86b9ff;
  }
  .cp {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #3a312b;
    border-color: #54483f;
    color: #f5ede5;
    box-shadow: 0 2px 0 #000;
  }
  .cp:hover {
    background: #4a3f38;
    color: #fff;
  }
  @media (max-width: 600px) {
    pre {
      padding: 14px;
      font-size: 13.5px;
    }
    .cp {
      position: static;
      margin-top: 10px;
    }
  }
</style>
