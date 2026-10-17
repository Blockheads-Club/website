<script lang="ts">
  import { base } from '$app/paths';
  import { LOCALES } from '$lib/i18n';
  import { dict, i18n, setLocale } from '$lib/locale.svelte';
  import { theme, toggleTheme } from '$lib/theme.svelte';

  const links = ['patcher', 'server', 'guides', 'faq', 'legal'] as const;
  const d = $derived(dict());
</script>

<header class="site-header">
  <div class="container bar">
    <a class="brand" href={base + "/"}
      ><img src={base + '/favicon.svg'} alt="" width="32" height="32" />Blockheads Club</a
    >
    <nav aria-label={d.nav.label}>
      <ul>
        {#each links as id (id)}
          <li><a href={"#" + id}>{d.nav[id]}</a></li>
        {/each}
      </ul>
    </nav>
    <div class="controls">
      <div role="group" aria-label={d.nav.language}>
        {#each LOCALES as code (code)}
          <button
            type="button"
            lang={code}
            aria-pressed={i18n.locale === code}
            onclick={() => setLocale(code)}>{code.toUpperCase()}</button
          >
        {/each}
      </div>
      <button
        type="button"
        class="theme"
        aria-label={theme.value === 'dark' ? d.nav.themeToLight : d.nav.themeToDark}
        onclick={toggleTheme}>{theme.value === 'dark' ? '☀' : '☾'}</button
      >
    </div>
  </div>
</header>
