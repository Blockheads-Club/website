<script lang="ts">
  import { dict } from '$lib/locale.svelte';
  import { theme, toggleTheme } from '$lib/theme.svelte';
  import Button from './Button.svelte';

  /** `labelled` shows the theme it switches to ("Dark"), as in the footer and the phone menu. */
  let { labelled = false, class: className = '' }: { labelled?: boolean; class?: string } = $props();

  const d = $derived(dict().nav);
  const dark = $derived(theme.value === 'dark');
</script>

{#if labelled}
  <Button size="sm" class={className} icon={dark ? 'sun' : 'moon'} aria-label={dark ? d.themeToLight : d.themeToDark} onclick={toggleTheme}
    >{dark ? d.themeLight : d.themeDark}</Button
  >
{:else}
  <Button
    size="sm"
    variant="ghost"
    iconOnly
    icon={dark ? 'sun' : 'moon'}
    aria-label={dark ? d.themeToLight : d.themeToDark}
    onclick={toggleTheme}
  />
{/if}
