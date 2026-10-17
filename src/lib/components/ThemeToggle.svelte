<script lang="ts">
  import { dict } from '$lib/locale.svelte';
  import { theme, toggleTheme } from '$lib/theme.svelte';
  import Button from './Button.svelte';
</script>

<Button
  size="sm"
  iconOnly
  icon={theme.value === 'dark' ? 'sun' : 'moon'}
  aria-label={theme.value === 'dark' ? dict().nav.themeToLight : dict().nav.themeToDark}
  onclick={toggleTheme}
/>
