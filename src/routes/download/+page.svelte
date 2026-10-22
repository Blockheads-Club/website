<script lang="ts">
  import { base } from '$app/paths';
  import { afterNavigate, replaceState } from '$app/navigation';
  import { APPS, app, appName, installGuide } from '$lib/apps';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { docsPath } from '$lib/i18n';
  import type { IconName } from '$lib/icons';
  import { dict, i18n } from '$lib/locale.svelte';
  import { DEVICES, detectDevice, isDevice, type Device } from '$lib/platform';
  import { PRODUCTS, formatSize, pickDownload, releasesPage, type ProductId, type Releases } from '$lib/releases';
  import { WEB_PATCHER } from '$lib/route';

  let { data }: { data: { releases: Releases } } = $props();

  const d = $derived(dict());
  const dd = $derived(d.download);

  const DEVICE_ICONS: Record<Device, IconName> = {
    windows: 'win',
    macos: 'apple',
    linux: 'linux',
    android: 'phone',
    pi: 'pi',
    docker: 'docker',
    ios: 'phone'
  };
  const IMAGE_PAGE = 'https://github.com/Blockheads-Club/blockheads-server/pkgs/container/blockheads-server';

  let task = $state<ProductId>('pc');
  let device = $state<Device>('windows');
  let detected = $state<Device>();
  let ready = false;

  // Task and device live in the query string (shareable links); the device defaults to the visitor's platform.
  // afterNavigate (not onMount): replaceState needs the router, which starts after hydration.
  afterNavigate(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('task');
    detected = detectDevice(navigator.userAgent, navigator.maxTouchPoints);
    if (t === 'pc' || t === 'patcher' || t === 'server') task = t;
    // On a phone, fixing the game is the likely task (Blockheads PC is for computers).
    else if (detected === 'android' || detected === 'ios') task = 'patcher';
    const asked = params.get('device');
    if (isDevice(asked)) device = asked;
    else if (detected) device = detected;
    ready = true;
  });

  $effect(() => {
    const query = '?task=' + task + '&device=' + device;
    if (ready && location.search !== query) replaceState(query, {});
  });

  const pick = $derived(pickDownload(task, device, data.releases));
  const name = $derived(appName(task, d));
  const alts = $derived(pick.state === 'file' ? pick.alts : []);
  const docs = (page: string) => base + docsPath(i18n.locale, page);
</script>

<div class="wrap page">
  <div class="sec-h flat">
    <h1 class="h-xl">{dd.title}</h1>
    <p class="muted lead">{dd.lead}</p>
  </div>

  <fieldset>
    <legend><span class="num small-num" aria-hidden="true">1</span>{dd.q1}</legend>
    <div class="tasks">
      {#each APPS as a (a.id)}
        <label class="card qc">
          <input class="sr" type="radio" name="task" value={a.id} checked={task === a.id} onchange={() => (task = a.id)} />
          <img class="tile" src={base + a.icon} alt="" width="52" height="52" />
          <span class="grow"><span class="b700 blk">{d.apps[a.id].task}</span><span class="hint">{appName(a.id, d)}</span></span>
          <span class="radio" aria-hidden="true"></span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset>
    <legend
      ><span class="num small-num" aria-hidden="true">2</span>{dd.q2}{#if detected}<span class="badge b-info det"
          ><Icon name="check" size={14} />{dd.detected + ' ' + d.devices[detected]}</span
        >{/if}</legend
    >
    <div class="seg">
      {#each DEVICES as dev (dev)}
        <label>
          <input class="sr" type="radio" name="device" value={dev} checked={device === dev} onchange={() => (device = dev)} />
          <Icon name={DEVICE_ICONS[dev]} />{d.devices[dev]}
        </label>
      {/each}
    </div>
  </fieldset>

  <section class="card result" aria-live="polite" aria-labelledby="rt">
    {#if pick.state === 'file' || pick.state === 'docker'}
      <div class="res-h">
        <img class="tile" src={base + app(task).icon} alt="" width="80" height="80" />
        <div class="grow">
          <p class="eyebrow">{dd.yours}</p>
          <h2 id="rt">{name + ' ' + dd.for[device]}</h2>
          <p class="muted">{dd.files[pick.file]}</p>
          <p class="hint mono">
            {pick.state === 'file' ? pick.release.version + ' · ' + formatSize(pick.asset.size, i18n.locale) : pick.release.version}
          </p>
        </div>
        {#if pick.state === 'file'}
          <a class="btn btn-p btn-lg" href={pick.asset.url}><Icon name="download" />{dd.button[device]}</a>
        {/if}
      </div>
      {#if alts.length}
        <p class="hint alts">
          <span>{dd.also}</span>
          {#each alts as alt (alt.key)}<a href={alt.asset.url}>{dd.alts[alt.key]}</a>{/each}
        </p>
      {/if}
      {#if pick.state === 'docker' || pick.cmd}<CodeBlock code={pick.cmd!} />{/if}
      {#if task === 'patcher'}
        <p class="muted web"><Icon name="globe" />{dd.orWeb + ' '}<a class="b700" href={base + WEB_PATCHER} rel="external">{dd.orWebLink}</a></p>
      {/if}
      <div class="extras">
        <div class="notice warn">
          <Icon name="file" />
          <div><p class="b700 s15">{dd.own}</p><p class="hint t2">{task === 'server' ? dd.ownServer : dd.ownApk}</p></div>
        </div>
        <a class="card extra" href={docs(installGuide(task, device))} rel="external">
          <Icon name="book" />
          <span><span class="b700 s15 blk">{dd.guide + ' ↗'}</span><span class="hint">{dd.guideHint}</span></span>
        </a>
        <a class="card extra" href={pick.release.url}>
          <Icon name="shield" />
          <span><span class="b700 s15 blk">{dd.notes}</span><span class="hint">{dd.notesHint}</span></span>
        </a>
      </div>
      {#if device === 'android'}<p class="hint note"><Icon name="info" size={16} />{dd.apkNote}</p>{/if}
    {:else if pick.state === 'none'}
      <div class="res-h top">
        <span class="dashed-box no-ico"><Icon name="info" /></span>
        <div class="grow stack gap">
          <h2 id="rt" class="h-no">{name + ' ' + dd.notHere}</h2>
          <p class="muted s17">{dd.none[pick.why]}</p>
          {#if pick.go === 'web'}
            <div><a class="btn btn-p" href={base + WEB_PATCHER} rel="external">{dd.go.web}<Icon name="arrow-r" /></a></div>
          {:else if pick.go}
            {@const go = pick.go}
            <div><button type="button" class="btn btn-p" onclick={() => (task = go)}>{dd.go[go]}<Icon name="arrow-r" /></button></div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="notice warn" role="alert">
        <Icon name="wifioff" />
        <div class="stack gap">
          <h2 id="rt" class="b700 s17">{dd.failedTitle}</h2>
          <p class="muted">{dd.failedBody}</p>
          <a class="btn btn-sm self-start" href={releasesPage(task)}><Icon name="github" />{dd.failedButton + ' ↗'}</a>
        </div>
      </div>
    {/if}
  </section>

  <details class="card all">
    <summary><Icon name="chev-d" />{dd.all}</summary>
    <div class="scroll">
      <table class="mx">
        <thead>
          <tr>
            <th scope="col"><span class="sr">{dd.tableApp}</span></th>
            {#each DEVICES as dev (dev)}<th scope="col">{d.devices[dev]}</th>{/each}
          </tr>
        </thead>
        <tbody>
          {#each PRODUCTS as id (id)}
            <tr>
              <th scope="row"><span class="rowh"><img src={base + app(id).icon} alt="" width="28" height="28" />{appName(id, d)}</span></th>
              {#each DEVICES as dev (dev)}
                {@const p = pickDownload(id, dev, data.releases)}
                <td>
                  {#if p.state === 'file'}
                    <a class="b700" href={p.asset.url}>{d.product.download}<span class="sr">{': ' + appName(id, d) + ', ' + d.devices[dev]}</span></a>
                  {:else if p.state === 'docker'}
                    <a class="b700" href={IMAGE_PAGE}>{dd.image}</a>
                  {:else if p.state === 'error'}
                    <a class="b700" href={releasesPage(id)}>{d.product.download}<span class="sr">{': ' + appName(id, d) + ', ' + d.devices[dev]}</span></a>
                  {:else}
                    <span class="hint" aria-label="—">—</span>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
          <tr>
            <th scope="row"><span class="rowh"><img src={base + '/apps/patcher.svg'} alt="" width="28" height="28" />{dd.webRow}</span></th>
            <td colspan="7"><a class="b700" href={base + WEB_PATCHER} rel="external">{dd.webOpen}</a> <span class="hint">{dd.webHint}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="hint older">
      {dd.older + ' '}{#each PRODUCTS as id, i (id)}<a href={releasesPage(id)}>{appName(id, d)}</a>{i < 2 ? ' · ' : ''}{/each}
    </p>
  </details>

  <p class="hint foot"><Icon name="info" size={14} />{dd.footnote}</p>
</div>

<style>
  .page {
    padding-top: 56px;
    padding-bottom: 88px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    max-width: 1104px;
  }
  .flat {
    margin: 0;
  }
  .lead {
    font-size: 19px;
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
  legend {
    font: 750 22px var(--f-display);
    margin-bottom: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
  }
  .small-num {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  .det {
    font-family: var(--f-body);
  }
  .tasks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: 12px;
  }
  .qc {
    padding: 16px 18px;
    display: flex;
    gap: 14px;
    align-items: center;
    cursor: pointer;
  }
  .qc:has(input:checked) {
    border-color: var(--primary);
    background: var(--primary-soft);
    box-shadow: 0 3px 0 var(--primary-edge);
  }
  .qc:has(input:focus-visible),
  .seg label:has(input:focus-visible) {
    outline: 3px solid var(--focus);
    outline-offset: 2px;
  }
  .radio {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--line-strong);
    flex: none;
    background: var(--surface);
  }
  .qc:has(input:checked) .radio {
    border: 7px solid var(--primary);
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .blk {
    display: block;
  }
  .seg {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    background: var(--surface-2);
    border: 2px solid var(--line);
    border-radius: 14px;
  }
  .seg label {
    min-height: 44px;
    padding: 0 16px;
    border-radius: 10px;
    color: var(--text-2);
    font: 700 15px var(--f-body);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .seg label:has(input:checked) {
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 2px 0 var(--line-strong);
  }
  .result {
    padding: 26px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    border-width: 3px;
    border-color: var(--text);
    box-shadow: 0 5px 0 var(--line-strong);
  }
  .res-h {
    display: flex;
    gap: 18px;
    align-items: center;
    flex-wrap: wrap;
  }
  .res-h.top {
    align-items: flex-start;
  }
  .res-h h2 {
    font-size: 30px;
  }
  .h-no {
    font-size: 26px !important;
  }
  .no-ico {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    border-width: 3px;
  }
  .alts {
    display: flex;
    gap: 6px 14px;
    flex-wrap: wrap;
  }
  .web {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .extras {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 12px;
  }
  .extras .notice,
  .extra {
    padding: 12px 14px;
  }
  .extra {
    display: flex;
    gap: 10px;
  }
  .s15 {
    font-size: 15px;
  }
  .s17 {
    font-size: 17px;
  }
  .t2 {
    color: var(--text-2);
  }
  .note {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .stack {
    display: flex;
    flex-direction: column;
  }
  .gap {
    gap: 10px;
  }
  .self-start {
    align-self: flex-start;
  }
  .all {
    padding: 18px 22px;
  }
  summary {
    cursor: pointer;
    font: 750 20px var(--f-display);
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .scroll {
    overflow-x: auto;
    margin-top: 10px;
  }
  .mx {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
  }
  .mx th,
  .mx td {
    padding: 12px 10px;
    border-bottom: 1px solid var(--line);
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
  }
  .mx thead th {
    font-size: 13.5px;
    color: var(--text-3);
  }
  .rowh {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .rowh img {
    border-radius: 7px;
  }
  .older {
    margin-top: 12px;
  }
  .foot {
    text-align: center;
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 640px) {
    .page {
      padding-top: 24px;
    }
    .result {
      padding: 16px;
    }
    .result .btn-lg {
      width: 100%;
    }
    .res-h h2 {
      font-size: 22px;
    }
  }
</style>
