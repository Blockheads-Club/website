<script lang="ts">
  import { tick } from 'svelte';
  import { base } from '$app/paths';
  import { LINKS } from '$lib/config';
  import { LOCALES, LOCALE_NAMES, docsPath, isLocale } from '$lib/i18n';
  import { dict, i18n, setLocale } from '$lib/locale.svelte';
  import type { RouteKey } from '$lib/route';
  import { theme, setThemePref, type ThemePref } from '$lib/theme.svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import LangSwitch from './LangSwitch.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Wordmark from './Wordmark.svelte';

  let { route, hero = false }: { route: RouteKey; hero?: boolean } = $props();

  const d = $derived(dict());
  const links = $derived([
    { id: 'patcher', label: d.nav.patcher, href: base + '/#patcher', current: false },
    { id: 'server', label: d.nav.server, href: base + '/server', current: route === 'server' },
    { id: 'guides', label: d.nav.guides, href: base + '/guides', current: route === 'guides' || route === 'article' },
    { id: 'mods', label: d.nav.mods, href: base + '/mods', current: route === 'mods' || route === 'modsSubmit' || route === 'modDetail' },
    { id: 'faq', label: d.nav.faq, href: base + '/faq', current: route === 'faq' },
    // The docs are a separate VitePress site: full page load (rel=external), and the prerender crawler skips it.
    // It opens in the docs locale matching the site language (/docs/ru/, /docs/kk/, ...).
    { id: 'docs', label: d.nav.docs, href: base + docsPath(i18n.locale), current: false, external: true }
  ]);
  const themes: { id: ThemePref; label: () => string }[] = [
    { id: 'light', label: () => dict().nav.themeLight },
    { id: 'dark', label: () => dict().nav.themeDark },
    { id: 'system', label: () => dict().nav.themeSystem }
  ];

  let menuOpen = $state(false);
  let openButton = $state<HTMLElement | undefined>();
  let closeButton = $state<HTMLElement | undefined>();
  let sheet = $state<HTMLElement | undefined>();

  async function openMenu() {
    menuOpen = true;
    await tick();
    closeButton?.focus();
  }

  function closeMenu(refocus = true) {
    menuOpen = false;
    if (refocus) openButton?.focus();
  }

  function onSheetKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet!.querySelectorAll<HTMLElement>('a[href], button, select')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  });

  function onLanguage(event: Event) {
    const value = (event.currentTarget as HTMLSelectElement).value;
    if (isLocale(value)) setLocale(value);
  }
</script>

<header class={hero ? 'hero-top' : 'topbar'}>
  <div class="wrap">
    <nav class="nav" aria-label={d.nav.label}>
      <Wordmark logo={hero ? 44 : 42} />
      <div class="nav-links">
        {#each links as link (link.id)}
          <a href={link.href} rel={link.external ? 'external' : undefined} aria-current={link.current ? 'page' : undefined}
            >{link.label}</a
          >
        {/each}
      </div>
      <div class="nav-tools">
        <span class="tool-lang"><LangSwitch /></span>
        <span class="tool-theme"><ThemeToggle /></span>
        <Button class="nav-gh" size="sm" icon="code" href={LINKS.org} rel="noopener">{d.nav.github}</Button>
        <Button
          bind:el={openButton}
          class="nav-menu"
          size="sm"
          icon="menu"
          aria-expanded={menuOpen}
          aria-controls="mnav"
          aria-label={d.nav.openMenu}
          onclick={openMenu}><span class="menu-text">{d.nav.menu}</span></Button
        >
      </div>
    </nav>
  </div>
</header>

{#if menuOpen}
  <div
    class="msheet"
    id="mnav"
    role="dialog"
    aria-modal="true"
    aria-label={d.nav.menu}
    tabindex="-1"
    bind:this={sheet}
    onkeydown={onSheetKey}
  >
    <div class="msheet-bar">
      <Wordmark logo={38} />
      <Button
        bind:el={closeButton}
        iconOnly
        icon="x"
        aria-label={d.nav.closeMenu}
        aria-expanded="true"
        onclick={() => closeMenu()}
      />
    </div>
    <nav class="mnav" aria-label={d.nav.label}>
      {#each links as link (link.id)}
        <a
          class="mlink"
          href={link.href}
          rel={link.external ? 'external' : undefined}
          aria-current={link.current ? 'page' : undefined} onclick={() => closeMenu(false)}
          >{link.label}<Icon name="chev-r" /></a
        >
      {/each}
      <a class="mlink" href={LINKS.org} rel="noopener">{d.nav.github}<Icon name="code" /></a>
    </nav>
    <div class="mprefs">
      <div>
        <label for="m-lang" class="mlabel">{d.nav.language}</label>
        <div class="selwrap">
          <select id="m-lang" class="btn" onchange={onLanguage}>
            {#each LOCALES as code (code)}
              <option value={'' + code} lang={code} selected={i18n.locale === code}>{String(LOCALE_NAMES[code])}</option>
            {/each}
          </select>
          <Icon name="globe" />
        </div>
      </div>
      <div>
        <p class="mlabel" id="m-th">{d.nav.theme}</p>
        <div class="seg" role="radiogroup" aria-labelledby="m-th">
          {#each themes as t (t.id)}
            <button
              type="button"
              role="radio"
              aria-checked={theme.pref === t.id}
              onclick={() => setThemePref(t.id)}>{t.label()}</button
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .topbar {
    background: var(--bg);
    border-bottom: 2px solid var(--line);
  }
  .hero-top {
    position: absolute;
    inset-inline: 0;
    top: 0;
    z-index: 20;
    color: var(--hero-text);
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 72px;
  }
  .hero-top .nav {
    min-height: 76px;
  }
  .nav-links {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .nav-links a {
    color: var(--text);
    font-weight: 700;
    text-decoration: none;
    padding: 10px 14px;
    border-radius: 10px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  .hero-top .nav-links a {
    color: var(--hero-text);
  }
  .nav-links a:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .nav-links a[aria-current='page'] {
    background: var(--primary-soft);
    color: var(--primary-ink);
  }
  .nav-tools {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .nav-tools :global(.nav-menu) {
    display: none;
  }

  /* Phone / tablet: links collapse into the menu sheet */
  @media (max-width: 900px) {
    .nav-links,
    .nav-tools :global(.nav-gh) {
      display: none;
    }
    .nav-tools :global(.nav-menu) {
      display: inline-flex;
    }
  }
  @media (max-width: 600px) {
    .tool-lang,
    .tool-theme {
      display: none;
    }
    .menu-text {
      display: none;
    }
    .nav-tools :global(.nav-menu) {
      width: 44px;
      min-height: 44px;
      padding: 0;
    }
  }

  .msheet {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: var(--bg);
    color: var(--text);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .msheet-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 16px;
    min-height: 72px;
    border-bottom: 2px solid var(--line);
  }
  .mnav {
    padding: 12px 20px;
    display: flex;
    flex-direction: column;
  }
  .mlink {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    padding: 0 4px;
    border-bottom: 2px solid var(--line);
    color: var(--text);
    text-decoration: none;
    font: 750 22px var(--f-display);
  }
  .mlink:hover,
  .mlink[aria-current='page'] {
    color: var(--primary-ink);
  }
  .mprefs {
    padding: 12px 20px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .mlabel {
    display: block;
    font-weight: 700;
    font-size: 14.5px;
    margin-bottom: 6px;
  }
  .selwrap {
    position: relative;
  }
  .selwrap :global(.ico) {
    position: absolute;
    left: 14px;
    top: 12px;
    pointer-events: none;
  }
  select.btn {
    width: 100%;
    justify-content: flex-start;
    appearance: none;
    padding-left: 44px;
  }
  .seg {
    display: flex;
    gap: 4px;
    padding: 4px;
    background: var(--surface-2);
    border: 2px solid var(--line);
    border-radius: 14px;
  }
  .seg button {
    flex: 1;
    min-height: 44px;
    padding: 0 14px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--text-2);
    font: 700 15px/1 var(--f-body);
    cursor: pointer;
  }
  .seg button[aria-checked='true'] {
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 2px 0 var(--line-strong);
  }
  @media (min-width: 901px) {
    .msheet {
      display: none;
    }
  }
</style>
