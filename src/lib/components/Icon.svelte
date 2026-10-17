<script lang="ts">
  import { ICONS, type IconName } from '$lib/icons';

  let {
    name,
    size,
    label,
    class: className = ''
  }: { name: IconName; size?: number; label?: string; class?: string } = $props();
</script>

<svg
  class={['ico', className]}
  viewBox="0 0 24 24"
  width={size}
  height={size}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  {@html ICONS[name]}
</svg>
