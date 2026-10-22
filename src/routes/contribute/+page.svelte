<script lang="ts">
  import { base } from '$app/paths';
  import Icon from '$lib/components/Icon.svelte';
  import { LINKS } from '$lib/config';
  import { LOCALES, LOCALE_NAMES, translationProgress } from '$lib/i18n';
  import type { IconName } from '$lib/icons';
  import { dict } from '$lib/locale.svelte';
  import { PATHS } from '$lib/route';

  const d = $derived(dict().contribute);
  const progress = translationProgress();
  const CARDS: { icon: IconName; bg: string; href: string }[] = [
    { icon: 'code', bg: '#ffd27a', href: LINKS.goodFirstIssues },
    { icon: 'lang', bg: '#b9d7f5', href: LINKS.i18nFiles },
    { icon: 'bug', bg: '#bfe8cf', href: LINKS.openIssues },
    { icon: 'book', bg: '#f6c79c', href: LINKS.docsSource },
    { icon: 'users', bg: '#d9c7f0', href: LINKS.openIssues },
    { icon: 'puzzle', bg: '#ffe3a3', href: base + PATHS.mods }
  ];
</script>

<div class="page-hero">
  <div class="wrap">
    <span class="eyebrow"><Icon name="heartf" size={16} />{d.eyebrow}</span>
    <h1>{d.title}</h1>
    <p class="muted lead">{d.lead}</p>
    <div class="row">
      <a class="btn btn-p btn-lg" href={LINKS.org}><Icon name="github" />{d.github + ' ↗'}</a>
      <a class="btn btn-lg" href={LINKS.goodFirstIssues}>{d.issues + ' ↗'}</a>
    </div>
  </div>
</div>

<div class="wrap body">
  <div class="cards">
    {#each d.cards as card, i (i)}
      <article class="card feature">
        <span class="icon-box pastel tilt" style:background={CARDS[i].bg}><Icon name={CARDS[i].icon} /></span>
        <h2 class="h3">{card.title}</h2>
        <p class="muted">{card.body}</p>
        <a class="b700 end" href={CARDS[i].href}>{d.links[i] + (i < 5 ? ' ↗' : '')}</a>
      </article>
    {/each}
  </div>
  <div class="two">
    <section class="card box" aria-labelledby="langs">
      <h2 id="langs">{d.langTitle}</h2>
      <p class="hint">{d.langHint}</p>
      <ul class="langs">
        {#each LOCALES as code (code)}
          <li>
            <span class="lname" lang={code}>{LOCALE_NAMES[code]}</span>
            <span class="bar" role="presentation"><span style:width={progress[code] + '%'}></span></span>
            <span class="mono hint pct">{progress[code] + ' %'}</span>
            {#if code === 'ru' || code === 'kk'}<span class="hint review">{d.langReview}</span>{/if}
          </li>
        {/each}
      </ul>
    </section>
    <section class="card box" aria-labelledby="good">
      <h2 id="good">{d.goodTitle}</h2>
      <ul class="dots">
        {#each d.good as g (g)}<li>{g}</li>{/each}
      </ul>
    </section>
  </div>
</div>

<style>
  .body {
    padding-top: 72px;
    padding-bottom: 88px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 16px;
  }
  .h3 {
    font-size: 21px;
  }
  .tilt {
    width: 48px;
    height: 48px;
    transform: rotate(-4deg);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.15);
  }
  .end {
    margin-top: auto;
  }
  .two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: 20px;
    align-items: start;
  }
  .box {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .box h2 {
    font-size: 24px;
  }
  .langs {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .langs li {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid var(--line);
  }
  .lname {
    width: 120px;
    font-weight: 700;
  }
  .bar {
    flex: 1;
    min-width: 120px;
    height: 10px;
    border-radius: 999px;
    background: var(--surface-3);
    overflow: hidden;
  }
  .bar span {
    display: block;
    height: 100%;
    background: var(--ok);
    border-radius: 999px;
  }
  .pct {
    width: 60px;
    text-align: right;
  }
  .review {
    flex-basis: 100%;
  }
  .dots {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
</style>
