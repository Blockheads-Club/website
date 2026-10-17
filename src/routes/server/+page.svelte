<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import StepNumber from '$lib/components/StepNumber.svelte';
  import Tabs, { type TabItem } from '$lib/components/Tabs.svelte';
  import { COMMANDS, type PlatformId } from '$lib/commands';
  import { LINKS } from '$lib/config';
  import type { IconName } from '$lib/icons';
  import { dict } from '$lib/locale.svelte';
  import { qrPattern } from '$lib/qr';

  const d = $derived(dict().server);
  const ids: PlatformId[] = ['win', 'mac', 'linux', 'pi', 'docker', 'android'];
  const icons: Record<PlatformId, IconName> = {
    win: 'monitor',
    mac: 'monitor',
    linux: 'terminal',
    pi: 'chip',
    docker: 'box',
    android: 'phone'
  };
  const tabs = $derived<TabItem[]>(ids.map((id) => ({ id, label: d.quick.platforms[id].label, icon: icons[id] })));
  const downloadIcons: IconName[] = ['monitor', 'terminal', 'box', 'phone'];
  const downloadLinks = [LINKS.serverReleases, LINKS.serverReleases, LINKS.serverRepo, LINKS.serverReleases];
  const featureIcons: IconName[] = ['map', 'terminal', 'users', 'shield'];
  const qr = qrPattern();

  let platform = $state<string>('linux');
</script>

<section class="phero">
  <div class="wrap phero-g">
    <div class="col20">
      <span class="eyebrow hero-eyebrow"><Icon name="server" />{d.hero.eyebrow}</span>
      <h1>{d.hero.title}</h1>
      <p class="hero-lead">{d.hero.lead}</p>
      <div class="row">
        <Button href="#start" variant="primary" size="lg">{d.hero.ctaQuick}</Button>
        <Button href="#downloads" size="lg" icon="download" hero>{d.hero.ctaDownloads}</Button>
      </div>
    </div>
    <div class="card what">
      <p class="b">{d.hero.whatTitle}</p>
      <div class="feat">
        {#each d.hero.features as feature, i (feature.title)}
          <div class="f">
            <Icon name={featureIcons[i]} class="fi" />
            <div>
              <p class="b s15">{feature.title}</p>
              <p class="hint">{feature.hint}</p>
            </div>
          </div>
        {/each}
      </div>
      <p class="hint">{d.hero.note}</p>
    </div>
  </div>
</section>

<section class="sec s80" id="start" aria-labelledby="qs">
  <div class="wrap col28">
    <div class="col12 head">
      <span class="eyebrow">{d.quick.eyebrow}</span>
      <h2 id="qs">{d.quick.title}</h2>
      <p class="muted lead-l">{d.quick.lead}</p>
    </div>
    <Tabs {tabs} bind:selected={platform} label={d.quick.tabsLabel} idPrefix="qs">
      {#snippet panel(id)}
        {@const p = id as PlatformId}
        {@const commands = COMMANDS[p]}
        {#each d.quick.platforms[p].steps as step, i (i)}
          {@const code = commands[i]}
          <div class={['stp', i === d.quick.platforms[p].steps.length - 1 && 'last']}>
            <StepNumber n={i + 1} />
            <div class="stp-b">
              <p class="b s18">{step.title}</p>
              {#if step.text}<p class="muted"><Rich text={step.text} /></p>{/if}
              {#if code}<CodeBlock lines={code} />{/if}
              {#if step.button}
                <Button size="sm" icon="download" href={LINKS.serverReleases} rel="noopener" class="self">{step.button}</Button>
              {/if}
              {#if step.hint}<p class="hint">{step.hint}</p>{/if}
            </div>
          </div>
        {/each}
      {/snippet}
    </Tabs>
  </div>
</section>

<section class="sec s80 connect" aria-labelledby="cn">
  <div class="wrap split">
    <div class="col14">
      <span class="eyebrow"><Icon name="phone" />{d.connect.eyebrow}</span>
      <h2 id="cn">{d.connect.title}</h2>
      <p class="muted lead-l">{d.connect.lead}</p>
      <ol>
        {#each d.connect.steps as step, i (step.title)}
          <li>
            <StepNumber n={i + 1} />
            <div>
              <p class="b">{step.title}</p>
              <p class="muted s155"><Rich text={step.body} /></p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
    <div class="col16">
      <div class="card addr">
        <div class="qr" role="img" aria-label={d.connect.qrLabel}>
          {#each qr as on, i (i)}<span class:on></span>{/each}
        </div>
        <div class="addr-t">
          <Badge tone="ok" icon="wifi" class="self">{d.connect.wifi}</Badge>
          <p class="mono ip">192.168.1.42:15151</p>
          <p class="hint">{d.connect.addressHint}</p>
        </div>
      </div>
      <Callout tone="warn" icon="alert">
        <p class="b">{d.connect.warnTitle}</p>
        <p class="muted s15"><Rich text={d.connect.warnBody} /></p>
      </Callout>
      <Callout tone="info" icon="info"><p class="s15">{d.connect.info}</p></Callout>
    </div>
  </div>
</section>

<section class="sec s80" id="downloads" aria-labelledby="dl">
  <div class="wrap col24">
    <h2 id="dl">{d.downloads.title}</h2>
    <div class="grid-d">
      {#each d.downloads.items as item, i (item.name)}
        <a class="card dl" href={downloadLinks[i]} rel="noopener">
          <Icon name={downloadIcons[i]} size={26} class="pi" />
          <span class="grow">
            <span class="b blk">{item.name}</span>
            <span class="hint"><Rich text={item.hint} /></span>
          </span>
          <Icon name="download" />
        </a>
      {/each}
    </div>
    <p class="hint"><Rich text={d.downloads.version} /></p>
  </div>
</section>

<style>
  .phero {
    background-color: var(--hero-bg);
    background-image: repeating-conic-gradient(
      from -3deg at 85% 140%,
      var(--hero-ray) 0deg 7deg,
      transparent 7deg 22deg
    );
    color: var(--hero-text);
    border-bottom: 3px solid #1f1a17;
  }
  .phero-g {
    padding-top: 64px;
    padding-bottom: 64px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(440px, 100%), 1fr));
    gap: 40px;
    align-items: center;
  }
  .col20 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .hero-eyebrow {
    color: var(--hero-text);
  }
  h1 {
    font-size: clamp(40px, 5.4vw, 66px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.03;
  }
  .hero-lead {
    font-size: 19px;
    color: var(--hero-text-2);
    max-width: 580px;
  }
  .row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .what {
    padding: 22px;
    box-shadow: var(--lift);
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-color: var(--line-strong);
    color: var(--text);
  }
  .feat {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .f {
    display: flex;
    gap: 10px;
  }
  .f :global(.fi) {
    color: var(--primary-ink);
    margin-top: 2px;
  }
  .b {
    font-weight: 700;
  }
  .s15 {
    font-size: 15px;
  }
  .s155 {
    font-size: 15.5px;
  }
  .s18 {
    font-size: 18px;
  }
  .blk {
    display: block;
  }
  .grow {
    flex: 1;
  }
  .s80 {
    padding: 80px 0;
  }
  .sec h2 {
    font-size: clamp(30px, 3.6vw, 42px);
  }
  .col28 {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .col24 {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .col12,
  .col14,
  .col16 {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .col14 {
    gap: 14px;
  }
  .col16 {
    gap: 16px;
  }
  .head {
    max-width: 760px;
  }
  .stp {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 18px;
    padding: 22px 0;
    border-bottom: 2px dashed var(--line);
  }
  .stp.last {
    border-bottom: 0;
  }
  .stp-b {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }
  .stp-b :global(.self) {
    align-self: flex-start;
  }
  .connect {
    background: var(--surface-2);
    border-block: 2px solid var(--line);
  }
  .split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(440px, 100%), 1fr));
    gap: 48px;
    align-items: start;
  }
  ol {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  li {
    display: flex;
    gap: 16px;
  }
  .addr {
    padding: 22px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  .qr {
    width: 132px;
    height: 132px;
    background: #fff;
    border-radius: 12px;
    padding: 10px;
    border: 2px solid var(--line-strong);
    display: grid;
    grid-template-columns: repeat(21, minmax(0, 1fr));
  }
  .qr span.on {
    background: #1f1a17;
  }
  .addr-t {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 180px;
  }
  .addr-t :global(.self) {
    align-self: flex-start;
  }
  .ip {
    font-size: 22px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .grid-d {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
    gap: 20px;
  }
  .dl {
    padding: 18px;
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .dl :global(.pi) {
    color: var(--primary-ink);
  }
  @media (max-width: 900px) {
    .s80 {
      padding: 56px 0;
    }
    .phero-g {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
</style>
