<script lang="ts">
  import { base } from '$app/paths';
  import Badge from '$lib/components/Badge.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CopyText from '$lib/components/CopyText.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ModBadges from '$lib/components/ModBadges.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import { dict } from '$lib/locale.svelte';
  import { formatSize, isNative, latestVersion, permissionKeys, sortedVersions, type Mod, type PermKey } from '$lib/mods';

  let { data }: { data: { mod: Mod; ids: string[] } } = $props();

  const m = $derived(dict().mods);
  const d = $derived(m.detail);
  const mod = $derived(data.mod);
  const versions = $derived(sortedVersions(mod));
  const latest = $derived(latestVersion(mod));
  let pick = $state('');
  // The version whose details are shown: the picked one, else the latest usable one, else the newest.
  const shown = $derived(versions.find((v) => v.version === pick) ?? latest ?? versions[0]);
  const perms = $derived(permissionKeys(shown.permissions));
  function permText(perm: PermKey): { label: string; text: string } {
    if (perm.kind === 'world') return m.perms.world[perm.value];
    if (perm.kind === 'player') return m.perms.players[perm.value];
    return perm.kind === 'http' ? m.perms.http : m.perms.channels;
  }
  const depends = $derived(Object.entries(shown.depends ?? {}));
  const softDepends = $derived(Object.entries(shown['soft-depends'] ?? {}));
</script>

{#snippet dep(entries: [string, string][])}
  <ul class="plain">
    {#each entries as [id, req] (id)}
      <li>
        {#if data.ids.includes(id)}<a href={base + '/mods/' + id}>{id}</a>{:else}<span class="mono">{id}</span>{/if}
        <span class="mono hint">{req}</span>
        {#if !data.ids.includes(id)}<span class="hint">{'(' + d.notInIndex + ')'}</span>{/if}
      </li>
    {/each}
  </ul>
{/snippet}

<div class="wrap page">
  <Breadcrumb label={d.breadcrumb} items={[{ label: dict().apps.names.mods, href: base + '/mods' }, { label: mod.name }]} />

  <header class="intro">
    <div class="title">
      <h1>{mod.name}</h1>
      {#if mod.draft}<Badge>{m.draft}</Badge>{/if}
    </div>
    <p class="hint mono">{mod.id}</p>
    <p class="muted lead-l">{mod.description ?? d.noDescription}</p>
    <ModBadges version={shown} />
    {#if mod.draft}<Callout tone="info" icon="info">{d.draftNote}</Callout>{/if}
    {#if isNative(shown)}
      <Callout tone="bad" icon="alert">
        <strong>{d.nativeTitle}</strong>
        <p>{d.nativeBody}</p>
      </Callout>
    {/if}
  </header>

  <section class="facts card" aria-label={d.owners}>
    <dl>
      <div><dt>{d.owners}</dt><dd>{mod.owners.join(', ')}</dd></div>
      <div><dt>{d.repo}</dt><dd><a href={mod.repo} rel="noopener">{mod.repo}</a></dd></div>
      {#if mod.tags?.length}<div><dt>{d.tags}</dt><dd>{mod.tags.join(', ')}</dd></div>{/if}
    </dl>
  </section>

  <section aria-labelledby="h-versions" class="grp">
    <h2 id="h-versions">{d.versions}</h2>
    {#if !latest}<Callout tone="warn" icon="alert">{d.noDownload}</Callout>{/if}
    <div class="scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">{d.columns.version}</th>
            <th scope="col">{d.columns.published}</th>
            <th scope="col">{d.columns.size}</th>
            <th scope="col">{d.columns.sides}</th>
            <th scope="col">{d.columns.download}</th>
          </tr>
        </thead>
        <tbody>
          {#each versions as v (v.version)}
            <tr class={[v === latest && 'latest', v.yanked && 'yanked']} data-version={v.version}>
              <th scope="row">
                <span class="ver mono">{v.version}</span>
                {#if v === latest}<Badge tone="ok">{d.latest}</Badge>{/if}
                {#if v.yanked}<Badge tone="bad">{d.yanked}</Badge>{/if}
              </th>
              <td>{v.published}</td>
              <td>{formatSize(v.size)}</td>
              <td>{m.sides[v.sides.length > 1 ? 'both' : v.sides[0]]}</td>
              <td class="links">
                <a href={v.url} rel="noopener" aria-label={d.download + ' ' + v.version}><Icon name="download" size={16} />{d.download}</a>
                {#if v.mirror}<a href={v.mirror} rel="noopener" aria-label={d.mirror + ' ' + v.version}>{d.mirror}</a>{/if}
                <button type="button" class="btn btn-sm" aria-pressed={v === shown} onclick={() => (pick = v.version)}
                  >{v === shown ? d.selected : d.select}</button
                >
              </td>
            </tr>
            <tr class="shaRow">
              <td colspan="5"><span class="hint">{d.sha}</span> <CopyText text={v.sha256} label={d.copyLabel + ' ' + v.version} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section aria-labelledby="h-details" class="grp">
    <h2 id="h-details">{d.permsTitle + ' · ' + shown.version}</h2>
    <div class="card box">
      {#if perms.length === 0 && !isNative(shown)}
        <p>{m.perms.none}</p>
      {/if}
      <ul class="plain">
        {#each perms as perm, i (i)}
          <li>
            <strong>{permText(perm).label + '.'}</strong>
            {permText(perm).text}
            {#if perm.kind === 'http'}<span class="mono">{perm.value.join(', ')}</span>{/if}
          </li>
        {/each}
        {#if isNative(shown)}<li class="bad"><strong>{m.native.badge + '.'}</strong>{' ' + m.native.warn}</li>{/if}
      </ul>
      <p class="hint">
        {d.api + ' '}<span class="mono">{shown.api}</span>{shown.loader ? ' · ' + d.loader + ' ' + shown.loader : ''}
      </p>
    </div>
    <div class="card box">
      {#if depends.length === 0 && softDepends.length === 0}<p>{d.noDepends}</p>{/if}
      {#if depends.length}<h3>{d.depends}</h3>{@render dep(depends)}{/if}
      {#if softDepends.length}<h3>{d.softDepends}</h3>{@render dep(softDepends)}{/if}
    </div>
  </section>

  <section aria-labelledby="h-install" class="grp">
    <h2 id="h-install">{d.installTitle}</h2>
    <div class="two">
      <div class="card box">
        <h3>{d.players}</h3>
        <p>{d.playersBody}</p>
      </div>
      <div class="card box">
        <h3>{d.admins}</h3>
        <p><Rich text={d.adminsBody} /></p>
      </div>
    </div>
    <div class="actions">
      <Button href={base + '/mods/submit'} icon="code">{m.submitButton}</Button>
      <Button href={mod.repo} rel="noopener" icon="code">{d.repo}</Button>
    </div>
  </section>
</div>

<style>
  .page {
    padding-top: 48px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .intro {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 820px;
  }
  .title {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }
  h1 {
    font-size: clamp(34px, 5vw, 52px);
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .facts {
    padding: 18px 22px;
  }
  dl {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
  }
  dl > div {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  dt {
    font-weight: 700;
    min-width: 110px;
  }
  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }
  .grp {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .grp h2 {
    font-size: 26px;
  }
  .scroll {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 640px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 12px;
    vertical-align: middle;
  }
  thead th {
    font-size: 14px;
    color: var(--text-3);
    border-bottom: 2px solid var(--line);
  }
  tbody tr:not(.shaRow) {
    border-top: 2px solid var(--line);
  }
  tr.latest {
    background: var(--ok-soft);
  }
  tr.yanked .ver {
    text-decoration: line-through;
    color: var(--text-3);
  }
  .shaRow td {
    padding-top: 0;
    padding-bottom: 12px;
  }
  tr.latest + .shaRow {
    background: var(--ok-soft);
  }
  th[scope='row'] {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .links {
    display: flex;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;
  }
  .links a {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .box {
    padding: 18px 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .box h3 {
    font-size: 17px;
  }
  .plain {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .bad {
    color: var(--bad);
  }
  .two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
    gap: 18px;
  }
  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
