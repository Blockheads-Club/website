<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { LINKS } from '$lib/config';
  import type { IconName } from '$lib/icons';
  import { dict } from '$lib/locale.svelte';

  const d = $derived(dict().mods);
  const CARDS: { icon: IconName; bg: string }[] = [
    { icon: 'server', bg: '#bfe8cf' },
    { icon: 'game', bg: '#b9d7f5' },
    { icon: 'shield', bg: '#ffd27a' },
    { icon: 'code', bg: '#f6c79c' }
  ];
</script>

<div class="page-hero plain">
  <div class="wrap">
    <span class="eyebrow"><Icon name="puzzle" size={16} />{d.eyebrow}</span>
    <h1>{d.title}</h1>
    <p class="muted lead">{d.lead}</p>
    <div class="row">
      <a class="btn btn-p btn-lg" href={LINKS.modSdk}><Icon name="github" />{d.follow + ' ↗'}</a>
      <a class="btn btn-lg" href={LINKS.modSdk + '#readme'}><Icon name="book" />{d.sdk + ' ↗'}</a>
    </div>
  </div>
</div>

<div class="wrap body">
  <div class="cards">
    {#each d.cards as card, i (i)}
      <div class="card feature">
        <span class="icon-box pastel" style:background={CARDS[i].bg}><Icon name={CARDS[i].icon} /></span>
        <h2 class="h3">{card.title}</h2>
        <p class="muted">{card.body}</p>
      </div>
    {/each}
  </div>

  <section class="card safe" aria-labelledby="safe">
    <div class="stack">
      <h2 id="safe">{d.safeTitle}</h2>
      <p class="muted">{d.safeBody}</p>
    </div>
    <div class="stack">
      <div class="chiprow">
        <span class="badge b-ok"><Icon name="eye" size={14} />{d.permRead}</span>
        <span class="badge b-warn"><Icon name="pencil" size={14} />{d.permChange}</span>
        <span class="badge b-warn"><Icon name="globe" size={14} />{d.permNet}</span>
      </div>
      <div class="native">
        <p class="stripe"><Icon name="octagon" size={16} />{d.nativeTitle}</p>
        <p class="nb">{d.nativeBody}</p>
      </div>
    </div>
  </section>

  <div class="card status">
    <span class="soonb"><Icon name="clock" size={14} />{d.statusBadge}</span>
    <p class="muted grow">{d.status}</p>
    <a class="btn" href={LINKS.modSdkIssues}>{d.statusLink + ' ↗'}</a>
  </div>
</div>

<style>
  .plain {
    background: var(--bg);
  }
  .body {
    padding-top: 72px;
    padding-bottom: 88px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 16px;
  }
  .h3 {
    font-size: 20px;
  }
  .safe {
    padding: 24px 26px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
    gap: 28px;
    align-items: center;
  }
  .safe h2 {
    font-size: 28px;
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .native {
    border: 2px solid #7a1710;
    border-radius: 12px;
    overflow: hidden;
  }
  .stripe {
    padding: 8px 12px;
    color: #fff;
    font: 800 13px var(--f-body);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: repeating-linear-gradient(-45deg, #b42318 0 10px, #9a1d13 10px 20px);
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .nb {
    padding: 10px 12px;
    font-size: 14.5px;
    background: var(--bad-soft);
  }
  .status {
    padding: 22px 26px;
    display: flex;
    gap: 18px;
    align-items: center;
    flex-wrap: wrap;
    border-style: dashed;
  }
  .grow {
    flex: 1 1 400px;
  }
</style>
