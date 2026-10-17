<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { IconName } from '$lib/icons';
  import Icon from './Icon.svelte';

  let {
    tone = 'neutral',
    icon,
    dot = false,
    class: className = '',
    children
  }: {
    tone?: 'neutral' | 'ok' | 'primary' | 'info';
    icon?: IconName;
    dot?: boolean;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<span class={['badge', tone === 'ok' && 'b-ok', tone === 'primary' && 'b-p', tone === 'info' && 'b-info', className]}>
  {#if dot}<span class="dot"></span>{/if}
  {#if icon}<Icon name={icon} size={14} />{/if}
  {@render children()}
</span>
