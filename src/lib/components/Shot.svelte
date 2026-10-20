<script lang="ts">
  import { base } from '$app/paths';
  import { SHOTS, type ShotName } from '$lib/shots';
  import { dict, i18n } from '$lib/locale.svelte';

  /** A screenshot of one of our apps, in the current UI language (`static/shots/<locale>/<name>.webp`). */
  let { name }: { name: ShotName } = $props();

  const meta = $derived(SHOTS[name]);
  const text = $derived(dict().shots[name]);
</script>

<figure class={['shot', meta.phone && 'phone']}>
  <img
    src={base + '/shots/' + i18n.locale + '/' + name + '.webp'}
    alt={text.alt}
    width={meta.w}
    height={meta.h}
    loading="lazy"
    decoding="async"
  />
  <figcaption>{text.caption}</figcaption>
</figure>

<style>
  .shot {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    border: 2px solid var(--line);
    border-radius: 14px;
    background: var(--surface-2);
  }
  .phone {
    align-self: center;
    width: min(100%, 300px);
  }
  .phone img {
    border-radius: 22px;
  }
  figcaption {
    color: var(--text-3);
    font-size: 15px;
    line-height: 1.5;
    text-align: center;
  }
</style>
