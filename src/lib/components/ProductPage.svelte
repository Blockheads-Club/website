<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { app, appName } from '$lib/apps';
  import { docsPath } from '$lib/i18n';
  import type { IconName } from '$lib/icons';
  import { dict, i18n } from '$lib/locale.svelte';
  import { detectDevice, type Device } from '$lib/platform';
  import { formatDate, pickDownload, releasesPage, serverCommands, type ProductId, type Releases } from '$lib/releases';
  import { PATHS, WEB_PATCHER } from '$lib/route';
  import CodeBlock from './CodeBlock.svelte';
  import Icon from './Icon.svelte';
  import Tabs from './Tabs.svelte';

  let { id, releases }: { id: ProductId; releases: Releases } = $props();

  const d = $derived(dict());
  const meta = $derived(app(id));
  const copy = $derived(d[id]);
  const name = $derived(appName(id, d));
  const release = $derived(releases[id]);
  const docs = (page: string) => base + docsPath(i18n.locale, page);
  const dl = (device?: Device) => base + PATHS.download + '?task=' + id + (device ? '&device=' + device : '');

  // The hero button offers the visitor's own platform once the browser tells us (Windows before that).
  let device = $state<Device>('windows');
  onMount(() => {
    const seen = detectDevice(navigator.userAgent, navigator.maxTouchPoints);
    if (seen && pickDownload(id, seen, releases).state === 'file') device = seen;
  });
  const pick = $derived(pickDownload(id, device, releases));
  const primaryHref = $derived(pick.state === 'file' ? pick.asset.url : releasesPage(id));

  const FEATURE_ICONS: Record<ProductId, IconName[]> = {
    pc: ['game', 'monitor', 'users'],
    patcher: ['check', 'shield', 'puzzle'],
    server: ['users', 'gauge', 'puzzle']
  };
  type Row = { icon: IconName; device?: Device; web?: boolean };
  const ROWS: Record<ProductId, Row[]> = {
    pc: [
      { icon: 'win', device: 'windows' },
      { icon: 'apple', device: 'macos' },
      { icon: 'linux', device: 'linux' }
    ],
    patcher: [
      { icon: 'globe', web: true },
      { icon: 'phone', device: 'android' },
      { icon: 'win', device: 'windows' },
      { icon: 'apple', device: 'macos' },
      { icon: 'linux', device: 'linux' }
    ],
    server: [
      { icon: 'win', device: 'windows' },
      { icon: 'phone', device: 'android' },
      { icon: 'pi', device: 'pi' },
      { icon: 'docker', device: 'docker' },
      { icon: 'server', device: 'linux' }
    ]
  };

  // Server only: copyable commands for headless hosts, built from the latest release.
  const techTabs: { id: Device; label: string; icon: IconName }[] = $derived([
    { id: 'docker', label: d.devices.docker, icon: 'docker' },
    { id: 'pi', label: d.devices.pi, icon: 'pi' },
    { id: 'linux', label: d.devices.linux, icon: 'linux' }
  ]);
  let tech = $state<string>('docker');
  const techCmds = $derived(serverCommands(releases));
</script>

<section class="phero" style:--tint={meta.tint} style:--tint-dark={meta.tintDark} style:--pray={meta.ray}>
  <div class="wrap hero-g">
    <div class="copy">
      <nav aria-label={d.product.breadcrumb} class="crumbs hint b700">
        <a href={base + '/'}>{d.product.home}</a> / <span>{d.product.apps}</span>
      </nav>
      <div class="title">
        <img class="tile" src={base + meta.icon} alt="" width="72" height="72" />
        <h1>{name}</h1>
      </div>
      <p class="tagline">{copy.tagline}</p>
      <p class="muted lead">{copy.lead}</p>
      <div class="row">
        {#if id === 'patcher'}
          <a class="btn btn-p btn-lg" href={base + WEB_PATCHER} rel="external"><Icon name="globe" />{d.patcher.primary}</a>
        {:else}
          <a class="btn btn-p btn-lg" href={primaryHref}><Icon name="download" />{d.download.button[device]}</a>
        {/if}
        <a class="b700" href={dl()}>{d.product.otherPlatforms}</a>
      </div>
      <div class="chiprow">
        <span class="badge b-ok"><Icon name="check" size={14} />{d.common.free}</span>
        <span class="badge b-info"><Icon name="code" size={14} />{d.common.openSource}</span>
        {#if release}
          <a class="badge ver" href={release.url}><span class="mono">{release.version}</span>{' · ' + formatDate(release.date, i18n.locale)}</a>
        {:else}
          <a class="badge ver" href={releasesPage(id)}>{d.product.latest}</a>
        {/if}
      </div>
    </div>
    <div class="art" aria-hidden="true">
      <img class="tile big" src={base + meta.icon} alt="" width="250" height="250" />
      <div class="snip">
        {#if id === 'pc'}
          <div class="card snip-card">
            <p class="b700">The Blockheads 1.7.6</p>
            <p class="hint">{d.pc.snipTitle}</p>
            <span class="btn btn-sm sunb"><Icon name="play" size={16} />{d.pc.snipPlay}</span>
          </div>
        {:else if id === 'patcher'}
          <div class="card snip-card">
            <div class="found"><p class="b700">{d.patcher.snipFound}</p><span class="badge b-ok">{d.patcher.snipReady}</span></div>
            <p class="hint">{'✓ ' + d.patcher.snipFix1}<br />{'✓ ' + d.patcher.snipFix2}</p>
          </div>
        {:else}
          <pre class="code snip-code">{'$ ./blockheads_server --new "Sunny Isle"\n→ Creating new world named "SUNNY ISLE"\n→ Loading world on port 15151\n✓ World load complete.'}</pre>
        {/if}
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby={'wd-' + id}>
  <div class="wrap">
    <h2 id={'wd-' + id} class="sr">{d.product.what}</h2>
    <div class="grid-3">
      {#each copy.features as f, i (i)}
        <div class="card feature">
          <span class="icon-box"><Icon name={FEATURE_ICONS[id][i]} /></span>
          <h3>{f.title}</h3>
          <p class="muted">{f.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="sec top0" aria-labelledby={'hw-' + id}>
  <div class="wrap split">
    <div class="col">
      <h2 id={'hw-' + id} class="h-sec">{d.product.how}</h2>
      <ol class="steps">
        {#each copy.steps as s, i (i)}
          <li><span class="num" aria-hidden="true">{i + 1}</span><div><p class="t">{s.title}</p><p class="muted b">{s.body}</p></div></li>
        {/each}
      </ol>
    </div>
    <div class="col">
      <div class="card box">
        <h3>{d.product.before}</h3>
        <ul class="checks">
          {#each copy.before as b (b)}<li><Icon name="check" />{b}</li>{/each}
        </ul>
      </div>
      <div class="card box plat">
        <h3>{d.product.platforms}</h3>
        <ul>
          {#each ROWS[id] as row, i (i)}
            <li>
              <Icon name={row.icon} />
              <span class="grow b700">{copy.platforms[i]}</span>
              {#if row.web}
                <a class="b700 small" href={base + WEB_PATCHER} rel="external">{d.product.open}</a>
              {:else}
                <a class="b700 small" href={dl(row.device)}
                  >{d.product.download}<span class="sr">{': ' + copy.platforms[i]}</span></a
                >
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

{#if id === 'server'}
  <section class="sec dark-band tech" aria-labelledby="tech">
    <div class="wrap split mid">
      <div class="col">
        <span class="eyebrow"><Icon name="terminal" size={16} />{d.server.tech.eyebrow}</span>
        <h2 id="tech">{d.server.tech.title}</h2>
        <p class="muted">{d.server.tech.lead}</p>
        <a class="sun-link b700" href={docs('server')} rel="external">{d.server.tech.link + ' ↗'}</a>
      </div>
      {#if techCmds}
        <div class="col">
        <Tabs tabs={techTabs} bind:selected={tech} label={d.server.tech.tabs} idPrefix="tech">
          {#snippet panel(tab)}<CodeBlock code={techCmds[tab as keyof typeof techCmds]} />{/snippet}
        </Tabs>
        </div>
      {:else}
        <a class="btn" href={releasesPage('server')}><Icon name="github" />{d.download.failedButton + ' ↗'}</a>
      {/if}
    </div>
  </section>
{/if}

<section class="sec" aria-labelledby={'hp-' + id}>
  <div class="wrap help">
    <div class="col">
      <h2 id={'hp-' + id} class="h-help">{d.product.help}</h2>
      <p class="muted">{d.product.helpLead}</p>
      <a class="btn self-start" href={meta.issues}><Icon name="bug" />{d.product.report + ' ↗'}</a>
    </div>
    <div class="guides">
      {#each meta.guides as page, i (page)}
        <a class="card guide" href={docs(page)} rel="external"
          ><Icon name="book" /><span class="grow b700">{copy.guides[i]}</span><Icon name="extl" /></a
        >
      {/each}
    </div>
  </div>
</section>

<style>
  .phero {
    background-color: var(--tint);
    background-image: repeating-conic-gradient(from -3deg at 80% 120%, var(--pray) 0deg 7deg, transparent 7deg 22deg);
    border-bottom: 3px solid #1f1a17;
  }
  :global(:root[data-theme='dark']) .phero {
    background-color: var(--tint-dark);
    background-image: repeating-conic-gradient(
      from -3deg at 80% 120%,
      rgba(255, 210, 122, 0.07) 0deg 7deg,
      transparent 7deg 22deg
    );
  }
  .hero-g {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;
    padding-top: calc(var(--hdr-h) + 40px);
    padding-bottom: 64px;
    flex-wrap: wrap;
  }
  .copy {
    flex: 1 1 520px;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
  }
  .crumbs a {
    color: var(--primary-ink);
  }
  .title {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  h1 {
    font-size: clamp(36px, 5.5vw, 56px);
    font-weight: 800;
    letter-spacing: -0.03em;
  }
  .tagline {
    font: 750 clamp(20px, 2.6vw, 26px) / 1.25 var(--f-display);
  }
  .lead {
    font-size: clamp(15.5px, 1.8vw, 18.5px);
  }
  .ver {
    text-decoration: none;
  }
  .art {
    position: relative;
    width: 420px;
    height: 340px;
    flex: none;
  }
  .big {
    position: absolute;
    left: 60px;
    top: 10px;
    rotate: -6deg;
  }
  .snip {
    position: absolute;
    right: 0;
    bottom: 0;
    rotate: 2deg;
  }
  .snip-card {
    padding: 14px 16px;
    width: 280px;
    box-shadow: var(--lift);
  }
  .snip-code {
    width: max-content;
    max-width: 380px;
    font-size: 13px;
    box-shadow: var(--lift);
  }
  .found {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .sunb {
    margin-top: 10px;
    background: #ffd27a;
    border-color: #1f1a17;
    box-shadow: 0 3px 0 #c98a2e;
    color: #1f1a17;
  }
  @media (max-width: 960px) {
    .art {
      display: none;
    }
    .hero-g {
      padding-top: calc(var(--hdr-h) + 10px);
      padding-bottom: 28px;
    }
    .title .tile {
      width: 56px;
      height: 56px;
    }
  }
  .top0 {
    padding-top: 0;
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }
  .h-sec {
    font-size: clamp(28px, 3.5vw, 36px);
    margin-bottom: 6px;
  }
  .box {
    padding: 22px 24px;
  }
  .box h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .checks {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .checks li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .checks :global(.ico) {
    color: var(--ok);
    margin-top: 3px;
  }
  .plat ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .plat li {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid var(--line);
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .small {
    font-size: 15px;
  }
  .tech h2 {
    font-size: clamp(26px, 3.4vw, 34px);
  }
  .mid {
    align-items: center;
  }
  .tech :global(.panel) {
    padding: 14px;
  }
  .sun-link {
    color: #ffd27a;
  }
  .help {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
    gap: 40px;
    align-items: start;
  }
  .h-help {
    font-size: 32px;
  }
  .self-start {
    align-self: flex-start;
  }
  .guides {
    display: grid;
    gap: 10px;
  }
  .guide {
    padding: 16px 18px;
    display: flex;
    gap: 12px;
    align-items: center;
  }
</style>
