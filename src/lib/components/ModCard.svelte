<script lang="ts">
  import { base } from '$app/paths';
  import { dict } from '$lib/locale.svelte';
  import { isNative, latestVersion, sortedVersions, type Mod } from '$lib/mods';
  import Badge from './Badge.svelte';
  import ModBadges from './ModBadges.svelte';

  let { mod }: { mod: Mod } = $props();

  const m = $derived(dict().mods);
  const latest = $derived(latestVersion(mod));
  const shown = $derived(latest ?? sortedVersions(mod)[0]);
</script>

<a class="card mcard" href={base + '/mods/' + mod.id}>
  <span class="head">
    <span class="t">{mod.name}</span>
    {#if mod.draft}<Badge>{m.draft}</Badge>{/if}
  </span>
  <span class="hint mono">{mod.id}</span>
  {#if mod.description}<span class="muted s">{mod.description}</span>{/if}
  <ModBadges version={shown} />
  {#if isNative(shown)}<span class="warn">{m.native.warn}</span>{/if}
  <span class="hint">
    {#if latest}{m.version + ' ' + latest.version}{:else}{m.allYanked}{/if}
    {' · ' + m.by + ' ' + mod.owners.join(', ')}
  </span>
</a>

<style>
  .mcard {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  .head {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .t {
    font: 800 20px/1.25 var(--f-display);
  }
  .warn {
    color: var(--bad);
    font-weight: 700;
    font-size: 14px;
  }
  .s {
    font-size: 15px;
  }
</style>
