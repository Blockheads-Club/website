<script lang="ts">
  import { tick } from 'svelte';
  import { base } from '$app/paths';
  import { APPS, appName } from '$lib/apps';
  import { LINKS } from '$lib/config';
  import { docsPath } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';
  import { PATHS, type RouteKey } from '$lib/route';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import LangSwitch from './LangSwitch.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Wordmark from './Wordmark.svelte';

  let { route, onHero = false }: { route: RouteKey; onHero?: boolean } = $props();

  const d = $derived(dict());
  const docs = $derived(base + docsPath(i18n.locale));
  const isApp = $derived(route === 'pc' || route === 'patcher' || route === 'server' || route === 'mods' || route === 'modsSubmit' || route === 'modDetail');

  // Apps disclosure (desktop): a button that shows a panel of links. Arrow keys move, Esc closes.
  let appsOpen = $state(false);
  let appsRoot = $state<HTMLElement>();
  let appsButton = $state<HTMLButtonElement>();

  const appLinks = () => [...appsRoot!.querySelectorAll<HTMLElement>('.apps a')];

  async function toggleApps() {
    appsOpen = !appsOpen;
    if (!appsOpen) return;
    await tick();
    appLinks()[0].focus();
  }

  function closeApps(refocus: boolean) {
    appsOpen = false;
    if (refocus) appsButton!.focus();
  }

  const STEPS: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

  function onAppsKey(event: KeyboardEvent) {
    if (!appsOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeApps(true);
      return;
    }
    const step = STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const links = appLinks();
    const index = links.indexOf(document.activeElement as HTMLElement);
    links[(index + step + links.length) % links.length].focus();
  }

  function onWindowClick(event: MouseEvent) {
    if (appsOpen && !appsRoot!.contains(event.target as Node)) closeApps(false);
  }

  // Phone menu: a full-screen dialog. Focus moves in; Esc closes it and returns focus to the menu button.
  let menuOpen = $state(false);
  let menuButton = $state<HTMLElement>();
  let closeButton = $state<HTMLElement>();
  let sheet = $state<HTMLElement>();

  async function openMenu() {
    menuOpen = true;
    await tick();
    closeButton!.focus();
  }

  function closeMenu(refocus = true) {
    menuOpen = false;
    if (refocus) menuButton!.focus();
  }

  function onSheetKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet!.querySelectorAll<HTMLElement>('a[href], button')];
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
</script>

<svelte:window onclick={onWindowClick} />

<header class={['hdr', onHero && 'on-hero']}>
  <div class="wrap">
    <Wordmark />
    <nav class="nav" aria-label={d.nav.label}>
      <div class="apps-root" bind:this={appsRoot} onkeydown={onAppsKey} role="presentation">
        <button
          bind:this={appsButton}
          type="button"
          class="nl"
          aria-expanded={appsOpen}
          aria-controls="apps-panel"
          aria-current={isApp ? 'page' : undefined}
          onclick={toggleApps}
        >
          {d.nav.apps}<Icon name="chev-d" size={16} />
        </button>
        {#if appsOpen}
          <div class="apps" id="apps-panel">
            {#each APPS as a (a.id)}
              <a class="ai" href={base + a.path} onclick={() => closeApps(false)}>
                <img src={base + a.icon} alt="" width="44" height="44" />
                <span><b>{appName(a.id, d)}</b><span>{d.apps[a.id].menu}</span></span>
              </a>
            {/each}
            <a class="ai" href={base + PATHS.mods} onclick={() => closeApps(false)}>
              <span class="icon-box mods-box"><Icon name="puzzle" /></span>
              <span><b>{d.apps.names.mods}</b><span>{d.apps.mods.menu}</span></span>
            </a>
            <div class="all">
              <span class="hint">{d.nav.notSure}</span>
              <Button size="sm" href={base + PATHS.download} iconEnd="arrow-r" onclick={() => closeApps(false)}
                >{d.nav.helpChoose}</Button
              >
            </div>
          </div>
        {/if}
      </div>
      <a class="nl" href={docs} rel="external">{d.nav.docs}<Icon name="extl" size={14} /></a>
      <a class="nl" href={base + PATHS.contribute} aria-current={route === 'contribute' ? 'page' : undefined}
        >{d.nav.contribute}</a
      >
    </nav>
    <div class="tools">
      <span class="wide"><LangSwitch /></span>
      <span class="wide"><ThemeToggle /></span>
      <span class="wide"
        ><a class="btn btn-sm btn-g btn-ic" href={LINKS.org} aria-label={d.nav.github}><Icon name="github" /></a></span
      >
      <a class="btn btn-sm btn-p dl-text" href={base + PATHS.download}><Icon name="download" size={16} />{d.nav.download}</a>
      <a class="btn btn-sm btn-p btn-ic dl-icon" href={base + PATHS.download} aria-label={d.nav.download}
        ><Icon name="download" /></a
      >
      <Button
        bind:el={menuButton}
        class="menu-btn"
        size="sm"
        iconOnly
        icon="menu"
        aria-expanded={menuOpen}
        aria-controls="mnav"
        aria-label={d.nav.openMenu}
        onclick={openMenu}
      />
    </div>
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
    <div class="mbar">
      <Wordmark logo={36} />
      <div class="tight">
        <a class="btn btn-sm btn-p btn-ic" href={base + PATHS.download} aria-label={d.nav.download} onclick={() => closeMenu(false)}
          ><Icon name="download" /></a
        >
        <Button
          bind:el={closeButton}
          size="sm"
          iconOnly
          icon="x"
          aria-label={d.nav.closeMenu}
          aria-expanded="true"
          onclick={() => closeMenu()}
        />
      </div>
    </div>
    <nav class="mnav" aria-label={d.nav.label}>
      <p class="hint b700 mlab">{d.nav.apps}</p>
      {#each APPS as a (a.id)}
        <a class="mlink" href={base + a.path} onclick={() => closeMenu(false)}
          ><img src={base + a.icon} alt="" width="36" height="36" />{appName(a.id, d)}</a
        >
      {/each}
      <a class="mlink" href={base + PATHS.mods} onclick={() => closeMenu(false)}
        ><span class="icon-box mi"><Icon name="puzzle" /></span>{d.apps.names.mods}</a
      >
      <a class="mlink" href={docs} rel="external">{d.nav.docs}<Icon name="extl" size={16} /></a>
      <a class="mlink" href={base + PATHS.contribute} onclick={() => closeMenu(false)}>{d.nav.contribute}</a>
      <a class="mlink" href={base + PATHS.about} onclick={() => closeMenu(false)}>{d.nav.about}</a>
    </nav>
    <div class="mfoot">
      <LangSwitch variant="footer" class="grow" />
      <ThemeToggle labelled class="grow" />
      <a class="btn btn-sm btn-ic" href={LINKS.org} aria-label={d.nav.github}><Icon name="github" /></a>
    </div>
  </div>
{/if}

<style>
  .hdr {
    position: relative;
    z-index: 10;
    border-bottom: 2px solid var(--line);
    background: var(--bg);
  }
  /* Over a hero: transparent, laid over the top of the page's hero (which reserves --hdr-h). */
  .hdr.on-hero {
    position: absolute;
    inset: 0 0 auto;
    background: transparent;
    border-bottom-color: transparent;
    color: var(--hero-text);
  }
  .hdr > .wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    min-height: 76px;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }
  .nl {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    color: inherit;
    text-decoration: none;
    font: 700 16px var(--f-body);
    border: 0;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  }
  .nl:hover {
    background: var(--surface-2);
    color: inherit;
  }
  .nl[aria-current='page'] {
    background: var(--primary-soft);
    color: var(--primary-ink);
  }
  .nl[aria-expanded='true'] {
    background: var(--surface-2);
    color: var(--text);
  }
  .apps-root {
    position: relative;
  }
  .apps {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    width: min(560px, calc(100vw - 32px));
    background: var(--surface);
    border: 2px solid var(--line-strong);
    border-radius: 20px;
    box-shadow: var(--lift);
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    z-index: 20;
    color: var(--text);
  }
  .ai {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    border-radius: 12px;
    text-decoration: none;
    color: var(--text);
  }
  .ai:hover,
  .ai:focus-visible {
    background: var(--surface-2);
    color: var(--text);
  }
  .ai img,
  .ai .mods-box {
    width: 44px;
    height: 44px;
    border-radius: 11px;
    flex: none;
  }
  .ai b {
    display: block;
    font-size: 15.5px;
  }
  .ai b + span {
    display: block;
    font-size: 13.5px;
    color: var(--text-2);
    line-height: 1.35;
  }
  .all {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px 14px;
    border-top: 2px solid var(--line);
    margin-top: 4px;
  }
  .tools {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: none;
    margin-left: auto;
  }
  .on-hero .tools :global(.btn-g) {
    color: inherit;
  }
  .wide {
    display: contents;
  }
  .dl-icon,
  .tools :global(.menu-btn) {
    display: none;
  }
  .on-hero .tools :global(.menu-btn) {
    border-color: #1f1a17;
    box-shadow: 0 3px 0 #1f1a17;
  }
  @media (max-width: 1100px) {
    .nav,
    .wide,
    .dl-text {
      display: none;
    }
    .dl-icon,
    .tools :global(.menu-btn) {
      display: inline-flex;
    }
    .hdr > .wrap {
      min-height: 68px;
    }
  }
  .msheet {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .mbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 14px 16px 8px;
  }
  .tight {
    display: flex;
    gap: 6px;
  }
  .mnav {
    padding: 6px 16px;
    display: flex;
    flex-direction: column;
  }
  .mlab {
    padding: 8px 4px 0;
  }
  .mlink {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 60px;
    padding: 0 4px;
    border-bottom: 2px solid var(--line);
    color: var(--text);
    text-decoration: none;
    font: 750 21px var(--f-display);
  }
  .mlink img,
  .mi {
    width: 36px;
    height: 36px;
    border-radius: 9px;
  }
  .mfoot {
    margin-top: auto;
    padding: 14px 20px 28px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .mfoot :global(.grow) {
    flex: 1;
  }
</style>
