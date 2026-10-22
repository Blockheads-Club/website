<script lang="ts">
  import { dict } from '$lib/locale.svelte';
  import { isNative, permissionKeys, sidesLabel, type ModVersion } from '$lib/mods';
  import Badge from './Badge.svelte';

  let { version }: { version: ModVersion } = $props();

  const m = $derived(dict().mods);
  const sides = $derived(sidesLabel(version.sides));
  const perms = $derived(permissionKeys(version.permissions));
</script>

<span class="badges">
  <Badge tone="info" icon={sides === 'client' ? 'phone' : sides === 'server' ? 'server' : 'globe'}>{m.sides[sides]}</Badge>
  {#if version['client-required']}<Badge tone="primary">{m.clientRequired}</Badge>{/if}
  {#each perms as perm, i (i)}
    <Badge>
      {#if perm.kind === 'world'}{m.perms.world[perm.value].label}
      {:else if perm.kind === 'player'}{m.perms.players[perm.value].label}
      {:else if perm.kind === 'http'}{m.perms.http.label}
      {:else}{m.perms.channels.label}{/if}
    </Badge>
  {/each}
  {#if isNative(version)}<Badge tone="bad" icon="alert">{m.native.badge}</Badge>{/if}
</span>

<style>
  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
</style>
