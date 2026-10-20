<script lang="ts">
  import { base } from '$app/paths';
  import { LINKS } from '$lib/config';
  import { docsPath } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';
  import type { RouteKey } from '$lib/route';
  import { cycleThemePref, theme } from '$lib/theme.svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import LangSwitch from './LangSwitch.svelte';
  import Wordmark from './Wordmark.svelte';

  let { route, rich = false }: { route: RouteKey; rich?: boolean } = $props();

  const d = $derived(dict());
  const themeLabel = $derived(
    { system: d.nav.themeNowSystem, light: d.nav.themeNowLight, dark: d.nav.themeNowDark }[theme.pref]
  );
  const themeIcon = $derived(({ system: 'monitor', light: 'sun', dark: 'moon' } as const)[theme.pref]);
</script>

<footer class="foot">
  {#if rich}
    <div class="wrap rich">
      <div class="cols">
        <div class="brand">
          <Wordmark logo={40} />
          <p class="muted">
            <span>{d.footer.tagline}</span>
            <Icon name="heart" size={15} label={d.footer.love} class="love" />
            <span>{d.footer.taglineEnd}</span>
          </p>
        </div>
        <nav aria-label={d.footer.products}>
          <p>{d.footer.products}</p>
          <a href={base + '/#patcher'}>{d.nav.patcher}</a>
          <a href={base + '/server'}>{d.nav.server}</a>
          <a href={base + '/server#downloads'}>{d.footer.downloads}</a>
        </nav>
        <nav aria-label={d.footer.help}>
          <p>{d.footer.help}</p>
          <a href={base + docsPath(i18n.locale)} rel="external">{d.nav.docs}</a>
          <a href={base + '/guides'}>{d.nav.guides}</a>
          <a href={base + '/faq'}>{d.nav.faq}</a>
          <a href={LINKS.websiteIssues} rel="noopener">{d.footer.reportBug}</a>
        </nav>
        <nav aria-label={d.footer.project}>
          <p>{d.footer.project}</p>
          <a href={LINKS.org} rel="noopener">{d.nav.github}</a>
          <a href={LINKS.websiteRepo} rel="noopener">{d.footer.translate}</a>
          <a href={base + '/legal'} aria-current={route === 'legal' ? 'page' : undefined}>{d.footer.legal}</a>
        </nav>
      </div>
      <div class="bottom">
        <p class="hint">{d.footer.disclaimer}</p>
        <div class="prefs">
          <LangSwitch variant="footer" />
          <Button size="sm" icon={themeIcon} onclick={cycleThemePref}>{themeLabel}</Button>
        </div>
      </div>
    </div>
  {:else}
    <div class="wrap slim">
      <p class="hint">
        <span>{d.footer.short}</span>
        {#if route !== 'legal'}<a href={base + '/legal'}>{d.footer.legal}</a>{/if}
      </p>
      <nav aria-label={d.footer.nav}>
        <a href={base + docsPath(i18n.locale)} rel="external">{d.nav.docs}</a>
        <a href={base + '/guides'}>{d.nav.guides}</a>
        <a href={base + '/faq'}>{d.nav.faq}</a>
        <a href={LINKS.org} rel="noopener">{d.nav.github}</a>
        <a href={base + '/legal'} aria-current={route === 'legal' ? 'page' : undefined}>{d.footer.legalShort}</a>
      </nav>
    </div>
  {/if}
</footer>

<style>
  .foot {
    border-top: 3px solid #1f1a17;
    background: var(--surface-2);
  }
  .foot a {
    color: var(--text-2);
    text-decoration: none;
  }
  .foot a:hover {
    color: var(--text);
    text-decoration: underline;
  }
  .foot a[aria-current='page'] {
    color: var(--text);
    font-weight: 700;
  }
  .rich {
    padding-top: 56px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .cols {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
    gap: 32px;
  }
  .brand {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .brand p {
    font-size: 14.5px;
  }
  .brand :global(.love) {
    width: 15px;
    height: 15px;
    vertical-align: -2px;
    color: var(--primary);
  }
  nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  nav p {
    font-weight: 700;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    border-top: 2px solid var(--line);
    padding-top: 24px;
  }
  .bottom .hint {
    max-width: 720px;
  }
  .prefs {
    display: flex;
    gap: 8px;
  }
  .slim {
    padding-top: 32px;
    padding-bottom: 32px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }
  .slim .hint {
    max-width: 640px;
  }
  .slim nav {
    flex-direction: row;
    gap: 18px;
    flex-wrap: wrap;
  }
  .slim nav a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
</style>
