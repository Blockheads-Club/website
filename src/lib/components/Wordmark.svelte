<script lang="ts">
  import { base } from '$app/paths';
  import { dict } from '$lib/locale.svelte';

  let { logo = 42 }: { logo?: number } = $props();
</script>

<a class="wm" href={base + '/'} aria-label={dict().nav.home}>
  <img src={base + '/logo.svg'} alt="" width={logo} height={logo} style:border-radius={Math.round(logo * 0.24) + 'px'} />
  <span class="wm-t">Blockheads<span class="wm-c">Club</span></span>
</a>

<style>
  .wm {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--text);
  }
  .wm:hover {
    color: var(--text);
  }
  .wm-t {
    display: flex;
    align-items: center;
    gap: 6px;
    font: 800 21px/1 var(--f-display);
    letter-spacing: -0.02em;
  }
  .wm-c {
    display: inline-block;
    background: var(--sun);
    color: #1f1a17;
    padding: 3px 7px 4px;
    border-radius: 6px;
    transform: rotate(-6deg);
    box-shadow: 0 2px 0 #c98a2e;
    font-size: 17px;
  }
  @media (max-width: 380px) {
    .wm-t {
      font-size: 19px;
    }
  }
</style>
