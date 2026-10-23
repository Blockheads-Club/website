<script lang="ts">
  import { base } from '$app/paths';
  import { APPS, appName } from '$lib/apps';
  import Icon from '$lib/components/Icon.svelte';
  import { LINKS } from '$lib/config';
  import { docsPath } from '$lib/i18n';
  import type { IconName } from '$lib/icons';
  import { dict, i18n } from '$lib/locale.svelte';
  import { formatDate, releasesPage, type Releases } from '$lib/releases';
  import { PATHS } from '$lib/route';

  let { data }: { data: { releases: Releases } } = $props();

  const d = $derived(dict());
  const h = $derived(d.home);
  const docs = $derived(base + docsPath(i18n.locale));

  const CHIP_ICONS: Record<string, IconName> = {
    windows: 'win',
    macos: 'apple',
    linux: 'linux',
    android: 'phone',
    pi: 'pi',
    docker: 'docker',
    web: 'globe',
    desktop: 'monitor'
  };
  const JOIN: { icon: IconName; bg: string }[] = [
    { icon: 'code', bg: '#ffd27a' },
    { icon: 'lang', bg: '#b9d7f5' },
    { icon: 'bug', bg: '#bfe8cf' },
    { icon: 'book', bg: '#f6c79c' }
  ];
  // Release rows: newest tools first, as in the design.
  const ROWS = ['patcher', 'server', 'pc'] as const;
</script>

<section class="hero">
  <div class="wrap hero-g">
    <div class="copy">
      <div class="mini-tiles" aria-hidden="true">
        {#each APPS as a, i (a.id)}<img class="tile" src={base + a.icon} alt="" width="56" height="56" style:rotate={[-6, 4, -2][i] + 'deg'} />{/each}
      </div>
      <span class="badge dark-badge"><Icon name="heartf" size={14} />{h.badge}</span>
      <h1>{h.title}</h1>
      <p class="lead">{h.lead}</p>
      <div class="row">
        <a class="btn btn-p btn-lg" href={base + PATHS.download}><Icon name="download" />{h.cta}</a>
        <a class="btn btn-lg btn-ink what-btn" href="#what">{h.ctaWhat}</a>
      </div>
      <p class="fine"><Icon name="info" size={14} />{d.common.unofficial}</p>
    </div>
    <div class="art" aria-hidden="true">
      <img class="tile t1" src={base + '/apps/pc.svg'} alt="" width="190" height="190" />
      <img class="tile t2" src={base + '/apps/patcher.svg'} alt="" width="170" height="170" />
      <img class="tile t3" src={base + '/apps/server.svg'} alt="" width="180" height="180" />
      <span class="t4"><Icon name="puzzle" size={30} />{d.apps.names.mods}</span>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="q">
  <div class="wrap">
    <div class="sec-h">
      <h2 id="q">{h.q}</h2>
      <p class="muted lead-l">{h.qLead}</p>
    </div>
    <div class="tasks">
      {#each APPS as a (a.id)}
        <article class="card task">
          <div class="task-h">
            <img class="tile" src={base + a.icon} alt="" width="60" height="60" />
            <div>
              <p class="tk">{d.apps[a.id].task}</p>
              <h3>{appName(a.id, d)}</h3>
            </div>
          </div>
          <p class="muted body">{d.apps[a.id].card}</p>
          <div class="chiprow">
            {#each a.chips as chip (chip)}<span class="pchip"><Icon name={CHIP_ICONS[chip]} size={14} />{d.devices[chip]}</span>{/each}
          </div>
          <div class="go">
            <a class="btn btn-p" href={base + PATHS.download + '?task=' + a.id}><Icon name="download" size={16} />{d.apps[a.id].get}</a>
            <a class="b700" href={base + a.path}>{d.common.learnMore}<span class="sr">{': ' + appName(a.id, d)}</span></a>
          </div>
        </article>
      {/each}
      <a class="card mods-card" href={base + PATHS.mods}>
        <span class="icon-box mods-ico"><Icon name="puzzle" /></span>
        <span class="mods-text">
          <span class="hint b700 blk">{d.apps.mods.task}</span>
          <span class="mods-title blk">{h.mods.title}</span>
          <span class="muted blk small">{h.mods.body}</span>
        </span>
        <span class="more">{h.mods.link}<Icon name="arrow-r" size={16} /></span>
      </a>
    </div>
  </div>
</section>

<section id="what" class="sec band" aria-labelledby="w">
  <div class="wrap split">
    <div class="sec-h flat">
      <span class="eyebrow">{h.what.eyebrow}</span>
      <h2 id="w">{h.what.title}</h2>
      <p class="muted lead-l">{h.what.lead}</p>
      <div class="chiprow">
        <span class="badge b-ok"><Icon name="check" size={14} />{h.what.free}</span>
        <span class="badge b-info"><Icon name="code" size={14} />{h.what.gpl}</span>
        <span class="badge b-p"><Icon name="globe" size={14} />EN · TR · RU · KK</span>
      </div>
    </div>
    <ol class="steps">
      {#each h.what.steps as step, i (i)}
        <li><span class="num" aria-hidden="true">{i + 1}</span><div><p class="t">{step.title}</p><p class="muted b">{step.body}</p></div></li>
      {/each}
    </ol>
  </div>
</section>

<section class="sec" aria-labelledby="inv">
  <div class="wrap split">
    <div class="sec-h flat">
      <span class="eyebrow"><Icon name="users" size={16} />{h.join.eyebrow}</span>
      <h2 id="inv">{h.join.title}</h2>
      <p class="muted lead-l">{h.join.lead}</p>
      <div class="row">
        <a class="btn btn-p" href={base + PATHS.contribute}>{h.join.cta}</a>
        <a class="btn" href={LINKS.org}><Icon name="github" />{h.join.code}</a>
      </div>
    </div>
    <div class="join">
      {#each h.join.cards as card, i (i)}
        <a class="card join-card" href={base + PATHS.contribute}>
          <span class="icon-box pastel" style:background={JOIN[i].bg}><Icon name={JOIN[i].icon} /></span>
          <span class="grow"><span class="b700 blk">{card.title}</span><span class="hint blk">{card.body}</span></span>
          <Icon name="arrow-r" size={16} />
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="sec top0" aria-labelledby="new">
  <div class="wrap news">
    <div class="card rels">
      <div class="rels-h">
        <h2 id="new">{h.releases.title}</h2>
        <a class="b700 small" href={LINKS.org}>{h.releases.all + ' ↗'}</a>
      </div>
      <ul>
        {#each ROWS as id (id)}
          {@const r = data.releases[id]}
          <li class="rel">
            <img src={base + '/apps/' + id + '.svg'} alt="" width="40" height="40" />
            <div class="grow">
              <p class="b700">{appName(id, d)}{#if r}{' '}<span class="mono">{r.version}</span>{/if}</p>
              <p class="hint">{r ? formatDate(r.date, i18n.locale) : h.releases.failed}</p>
            </div>
            <a class="b700 small" href={r ? r.url : releasesPage(id)}>{h.releases.whatsNew}<span class="sr">{': ' + appName(id, d)}</span></a>
          </li>
        {/each}
      </ul>
      <p class="hint">{h.releases.note}</p>
    </div>
    <div class="card docs-card">
      <span class="eyebrow"><Icon name="book" size={16} />{h.docs.eyebrow}</span>
      <h2>{h.docs.title}</h2>
      <p>{h.docs.lead}</p>
      <a class="btn sun-btn" href={docs} rel="external">{h.docs.cta + ' ↗'}</a>
    </div>
  </div>
</section>

<style>
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
    max-width: 660px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }
  .dark-badge {
    background: #1f1a17;
    color: #ffd27a;
    align-self: flex-start;
    white-space: normal;
    max-width: 100%;
  }
  .copy .btn {
    white-space: normal;
    text-align: center;
  }
  h1 {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.02;
  }
  .lead {
    font-size: clamp(16.5px, 2vw, 20px);
    color: var(--hero-text-2);
    max-width: 560px;
  }
  .fine {
    font-size: 14px;
    color: var(--hero-text-2);
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .what-btn {
    color: var(--hero-text);
  }
  .art {
    position: relative;
    width: 440px;
    height: 400px;
    flex: none;
  }
  .art > * {
    position: absolute;
  }
  .t1 {
    left: 40px;
    top: 40px;
    rotate: -8deg;
  }
  .t2 {
    left: 230px;
    top: 10px;
    rotate: 6deg;
  }
  .t3 {
    left: 170px;
    top: 200px;
    rotate: -3deg;
  }
  .t4 {
    left: 40px;
    top: 262px;
    width: 110px;
    height: 110px;
    border-radius: 24px;
    border: 3px solid var(--hero-text-2);
    background: rgba(255, 255, 255, 0.45);
    display: grid;
    place-items: center;
    align-content: center;
    text-align: center;
    rotate: 5deg;
    color: var(--hero-text-2);
    font: 800 15px var(--f-body);
  }
  .mini-tiles {
    display: none;
    gap: 8px;
  }
  @media (max-width: 960px) {
    .art {
      display: none;
    }
    .mini-tiles {
      display: flex;
    }
    .hero-g {
      padding-top: calc(var(--hdr-h) + 14px);
      padding-bottom: 32px;
    }
  }
  .tasks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 20px;
  }
  .task {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .task-h {
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .tk {
    font: 700 14px var(--f-body);
    color: var(--text-3);
  }
  .task h3 {
    font-size: 24px;
  }
  .go {
    margin-top: auto;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
  }
  .mods-card {
    grid-column: 1 / -1;
    padding: 18px 24px;
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  .mods-ico {
    width: 52px;
    height: 52px;
  }
  .mods-text {
    flex: 1 1 300px;
  }
  .mods-title {
    font: 750 21px var(--f-display);
  }
  .more {
    font-weight: 700;
    color: var(--primary-ink);
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .blk {
    display: block;
  }
  .small {
    font-size: 15px;
  }
  .flat {
    margin: 0;
  }
  .join {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 12px;
  }
  .join-card {
    padding: 18px 20px;
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .top0 {
    padding-top: 0;
  }
  .news {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: 40px;
    align-items: start;
  }
  .rels {
    padding: 22px 24px;
  }
  .rels-h {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
  }
  .rels h2 {
    font-size: 24px;
  }
  .rels ul {
    list-style: none;
    margin: 10px 0 8px;
    padding: 0;
  }
  .rel {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 14px 0;
    border-top: 1px solid var(--line);
  }
  .rel:first-child {
    border-top: 0;
  }
  .rel img {
    border-radius: 10px;
  }
  .docs-card {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #1f1a17;
    border-color: #1f1a17;
    color: #f5ede5;
  }
  .docs-card .eyebrow {
    color: #ffb08c;
  }
  .docs-card h2 {
    font-size: 26px;
  }
  .docs-card p {
    color: #cbbeb2;
  }
  .sun-btn {
    align-self: flex-start;
    background: #ffd27a;
    border-color: #1f1a17;
    box-shadow: 0 3px 0 #c98a2e;
    color: #1f1a17;
  }
  .sun-btn:hover {
    background: #ffdf9a;
    color: #1f1a17;
  }
  @media (max-width: 640px) {
    .task .body,
    .task .chiprow {
      display: none;
    }
    .task {
      padding: 16px;
      gap: 12px;
    }
  }
</style>
