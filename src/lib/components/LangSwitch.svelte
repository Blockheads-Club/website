<script lang="ts">
  import { tick } from 'svelte';
  import { LOCALES, LOCALE_NAMES, type Locale } from '$lib/i18n';
  import { dict, i18n, setLocale } from '$lib/locale.svelte';
  import Icon from './Icon.svelte';

  let { variant = 'header' }: { variant?: 'header' | 'footer' } = $props();

  const d = $derived(dict());
  let open = $state(false);
  let root: HTMLElement;
  let trigger: HTMLButtonElement;
  let items = $state<HTMLButtonElement[]>([]);

  async function show() {
    open = true;
    await tick();
    items[LOCALES.indexOf(i18n.locale)].focus();
  }

  function hide(refocus: boolean) {
    open = false;
    if (refocus) trigger.focus();
  }

  function pick(code: Locale) {
    setLocale(code);
    hide(true);
  }

  function onkeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      hide(true);
      return;
    }
    const step = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    items[(index + step + items.length) % items.length].focus();
  }

  function onwindowclick(event: MouseEvent) {
    if (open && !root.contains(event.target as Node)) hide(false);
  }
</script>

<svelte:window onclick={onwindowclick} />

<div class="lang" bind:this={root} {onkeydown} role="presentation">
  <button
    bind:this={trigger}
    type="button"
    class="btn btn-sm"
    aria-haspopup="menu"
    aria-expanded={open}
    aria-label={d.nav.language + ': ' + LOCALE_NAMES[i18n.locale]}
    onclick={() => (open ? hide(false) : show())}
  >
    <Icon name="globe" />{variant === 'header' ? i18n.locale.toUpperCase() : LOCALE_NAMES[i18n.locale]}
    {#if variant === 'footer'}<Icon name="chev-d" />{/if}
  </button>
  {#if open}
    <ul class={['pop', variant === 'footer' && 'up']} role="menu" aria-label={d.nav.language}>
      {#each LOCALES as code, i (code)}
        <li role="none">
          <button
            bind:this={items[i]}
            type="button"
            role="menuitemradio"
            aria-checked={i18n.locale === code}
            lang={code}
            onclick={() => pick(code)}
          >
            <span>{LOCALE_NAMES[code]}</span>
            {#if i18n.locale === code}<Icon name="check" size={16} />{/if}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .lang {
    position: relative;
  }
  .pop {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    z-index: 30;
    min-width: 170px;
    margin: 0;
    padding: 6px;
    list-style: none;
    background: var(--surface);
    border: 2px solid var(--line-strong);
    border-radius: var(--r-md);
    box-shadow: var(--lift);
  }
  .pop.up {
    top: auto;
    bottom: calc(100% + 8px);
  }
  .pop button {
    width: 100%;
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font: 700 15px var(--f-body);
    cursor: pointer;
  }
  .pop button:hover,
  .pop button[aria-checked='true'] {
    background: var(--primary-soft);
    color: var(--primary-ink);
  }
</style>
