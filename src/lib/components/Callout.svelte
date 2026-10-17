<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { IconName } from '$lib/icons';
  import Icon from './Icon.svelte';

  let {
    tone,
    icon,
    children
  }: { tone: 'info' | 'warn'; icon: IconName; children: Snippet } = $props();
</script>

<div class={['call', tone === 'info' ? 'call-info' : 'call-warn']} role="note">
  <Icon name={icon} />
  <div>{@render children()}</div>
</div>
