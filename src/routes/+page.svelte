<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import FaqItem from '$lib/components/FaqItem.svelte';
  import GuideCard from '$lib/components/GuideCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import StepNumber from '$lib/components/StepNumber.svelte';
  import { HOME_EXAMPLE } from '$lib/commands';
  import { LINKS } from '$lib/config';
  import { HOME_GUIDES } from '$lib/guides';
  import type { IconName } from '$lib/icons';
  import { dict } from '$lib/locale.svelte';

  const d = $derived(dict().home);
  const platformIcons: IconName[] = ['globe', 'phone', 'monitor', 'monitor', 'monitor'];
  const platformLinks = [
    LINKS.webPatcher,
    LINKS.patcherReleases,
    LINKS.patcherReleases,
    LINKS.patcherReleases,
    LINKS.patcherReleases
  ];
  const serverIcons: IconName[] = ['monitor', 'monitor', 'monitor', 'chip', 'box', 'phone'];

  /** Old single-page anchors now live on their own routes. */
  const LEGACY: Record<string, string> = {
    '#server': '/server',
    '#guides': '/guides',
    '#faq': '/faq',
    '#legal': '/legal'
  };

  onMount(() => {
    const target = LEGACY[location.hash];
    if (target) goto(base + target, { replaceState: true });
  });
</script>

<section class="hero">
  <div class="wrap hero-g">
    <div class="hero-copy">
      <Badge class="hero-badge">{d.hero.badge}</Badge>
      <h1>{d.hero.title}</h1>
      <p class="hero-lead">{d.hero.lead}</p>
      <div class="row">
        <Button href="#patcher" variant="primary" size="lg" icon="patch">{d.hero.ctaFix}</Button>
        <Button href={base + '/server'} size="lg" icon="server" hero>{d.hero.ctaHost}</Button>
      </div>
      <p class="fine">{d.hero.disclaimer}</p>
    </div>
    <div class="hero-art">
      <img src={base + '/logo.svg'} alt="" width="360" height="360" />
      <div class="card mock" aria-hidden="true">
        <div class="mock-h">
          <span class="mock-t">{d.hero.cardTitle}</span>
          <Badge tone="ok" dot>{d.hero.ready}</Badge>
        </div>
        <div class="mock-r"><Icon name="check" class="okc" />{d.hero.fixPopup}</div>
        <div class="mock-r"><Icon name="check" class="okc" />{d.hero.fixWorld}</div>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="what">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">{d.what.eyebrow}</span>
      <h2 id="what">{d.what.title}</h2>
      <p class="muted lead-l">{d.what.lead}</p>
    </div>
    <div class="grid-a">
      {#each d.what.items as item, i (item.title)}
        <div class="card feature">
          <StepNumber n={i + 1} />
          <h3>{item.title}</h3>
          <p class="muted">{item.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="sec patcher" id="patcher" aria-labelledby="ph">
  <div class="wrap">
    <div class="split top">
      <div class="col18">
        <span class="eyebrow"><Icon name="patch" />{d.patcher.eyebrow}</span>
        <h2 id="ph" class="h-sec">{d.patcher.title}</h2>
        <p class="muted lead-l">{d.patcher.lead}</p>
        <div class="col12">
          {#each d.patcher.fixes as fix (fix.title)}
            <div class="card fix">
              <Icon name="check" class="okc" />
              <div class="grow">
                <div class="fix-h"><span class="b">{fix.title}</span><Badge>{fix.versions}</Badge></div>
                <p class="muted s15">{fix.body}</p>
              </div>
            </div>
          {/each}
        </div>
        <Callout tone="info" icon="shield">
          <p class="s155"><strong>{d.patcher.noteStrong}</strong>{' ' + d.patcher.note}</p>
        </Callout>
      </div>
      <div class="card how">
        <h3>{d.patcher.howTitle}</h3>
        <ol>
          {#each d.patcher.steps as step, i (step.title)}
            <li>
              <StepNumber n={i + 1} />
              <div>
                <p class="b">{step.title}</p>
                <p class="muted s15">{step.body}</p>
              </div>
            </li>
          {/each}
        </ol>
        <Button href={LINKS.webPatcher} rel="noopener" variant="primary" size="lg" icon="globe" class="self"
          >{d.patcher.ctaWeb}</Button
        >
      </div>
    </div>
    <h3 class="get">{d.patcher.getTitle}</h3>
    <div class="grid-p">
      {#each d.patcher.platforms as platform, i (platform.name)}
        <a class="card plat" href={platformLinks[i]} rel="noopener">
          <Icon name={platformIcons[i]} size={26} class="pi" />
          <span class="b">{platform.name}</span>
          <span class="hint"><Rich text={platform.hint} /></span>
        </a>
      {/each}
    </div>
    <p class="hint ver"><Rich text={d.patcher.version} /></p>
  </div>
</section>

<section class="sec dark-band" aria-labelledby="sh">
  <div class="wrap">
    <div class="split mid">
      <div class="col18">
        <span class="eyebrow"><Icon name="server" />{d.server.eyebrow}</span>
        <h2 id="sh" class="h-sec">{d.server.title}</h2>
        <p class="lead-l srv-lead">{d.server.lead}</p>
        <div class="badges">
          {#each d.server.platforms as name, i (name)}
            <Badge icon={serverIcons[i]}>{name}</Badge>
          {/each}
        </div>
        <div class="row top6">
          <Button href={base + '/server'} variant="primary" size="lg" iconEnd="arrow-r">{d.server.ctaStart}</Button>
          <Button href={base + '/server#downloads'} size="lg" icon="download">{d.server.ctaDownloads}</Button>
        </div>
      </div>
      <div class="col12 term">
        <div class="termbox"><CodeBlock lines={HOME_EXAMPLE} copyable={false} /></div>
        <p class="hint">{d.server.exampleNote}</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="gh">
  <div class="wrap">
    <div class="gh-head">
      <div class="sec-head nomb">
        <span class="eyebrow"><Icon name="book" />{d.guides.eyebrow}</span>
        <h2 id="gh" class="h-sec">{d.guides.title}</h2>
      </div>
      <Button href={base + '/guides'} iconEnd="arrow-r">{d.guides.all}</Button>
    </div>
    <div class="grid-a">
      {#each HOME_GUIDES as id (id)}
        <GuideCard {id} variant="home" />
      {/each}
    </div>
  </div>
</section>

<section class="sec nopt" aria-labelledby="fh">
  <div class="wrap faq-g">
    <div class="sec-head nomb">
      <span class="eyebrow">{d.faq.eyebrow}</span>
      <h2 id="fh" class="h-sec">{d.faq.title}</h2>
      <p class="muted"><Rich text={d.faq.lead} /></p>
    </div>
    <div class="col12">
      {#each d.faq.items as item, i (item.q)}
        <FaqItem q={item.q} a={item.a} open={i === 0} />
      {/each}
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-top: 76px;
    background-color: var(--hero-bg);
    background-image: repeating-conic-gradient(
      from -3deg at 72% 120%,
      var(--hero-ray) 0deg 7deg,
      transparent 7deg 22deg
    );
    color: var(--hero-text);
    border-bottom: 3px solid #1f1a17;
  }
  .hero-g {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
    gap: 48px;
    align-items: center;
    padding-top: 72px;
    padding-bottom: 88px;
  }
  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .hero-copy :global(.hero-badge) {
    background: #1f1a17;
    color: #ffd27a;
    align-self: flex-start;
    font-size: 13.5px;
    padding: 5px 12px;
    white-space: normal;
  }
  h1 {
    font-size: clamp(42px, 6vw, 76px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.02;
  }
  .hero-lead {
    font-size: clamp(18px, 1.6vw, 21px);
    color: var(--hero-text-2);
    max-width: 600px;
  }
  .fine {
    font-size: 14px;
    color: var(--hero-text-2);
  }
  .row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .hero-art {
    position: relative;
    display: flex;
    justify-content: center;
    min-height: 400px;
    align-items: center;
  }
  .hero-art img {
    width: min(360px, 80%);
    height: auto;
    aspect-ratio: 1;
    border-radius: 19%;
    transform: rotate(-6deg);
    box-shadow:
      0 10px 0 #9c3a12,
      0 40px 80px rgba(31, 26, 23, 0.35);
  }
  .mock {
    position: absolute;
    right: 0;
    bottom: 8px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 290px;
    max-width: 100%;
    box-shadow: var(--lift);
    transform: rotate(2deg);
    border-color: var(--line-strong);
    color: var(--text);
  }
  .mock-h {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .mock-t {
    font-weight: 700;
  }
  .mock-r {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 14.5px;
  }
  :global(.okc) {
    color: var(--ok);
  }
  .feature {
    padding: 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .feature h3 {
    font-size: 22px;
  }
  .patcher {
    background: var(--surface-2);
    border-block: 2px solid var(--line);
  }
  .split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr));
    gap: 48px;
  }
  .split.top {
    align-items: start;
  }
  .split.mid {
    align-items: center;
  }
  .col18,
  .col12 {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .col12 {
    gap: 12px;
  }
  .fix {
    padding: 16px 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .fix :global(.ico) {
    margin-top: 3px;
  }
  .grow {
    flex: 1;
  }
  .fix-h {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
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
  .how {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    box-shadow: var(--lift);
  }
  .how h3 {
    font-size: 24px;
  }
  .how ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .how li {
    display: flex;
    gap: 16px;
  }
  .how :global(.self) {
    align-self: flex-start;
    white-space: normal;
    text-align: start;
  }
  .get {
    font-size: 22px;
    margin: 56px 0 18px;
  }
  .grid-p {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
    gap: 14px;
  }
  .plat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 18px;
  }
  .plat :global(.pi) {
    color: var(--primary-ink);
  }
  .ver {
    margin-top: 14px;
  }
  .srv-lead {
    color: #cbbeb2;
  }
  .badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .top6 {
    margin-top: 6px;
  }
  .termbox {
    border: 2px solid #3a312b;
    border-radius: 14px;
  }
  .gh-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .nomb {
    margin: 0;
  }
  .nopt {
    padding-top: 0;
  }
  .faq-g {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
    gap: 40px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .sec:not(.nopt) {
      padding: 64px 0;
    }
    .hero-g {
      padding-top: 40px;
      padding-bottom: 56px;
    }
    .hero-art {
      min-height: 0;
      padding-bottom: 80px;
    }
    .hero-copy .row :global(.btn) {
      flex: 1 1 auto;
    }
  }
</style>
