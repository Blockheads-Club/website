<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import { LINKS } from '$lib/config';
  import { dict } from '$lib/locale.svelte';

  const d = $derived(dict().about);
  const toc = $derived([
    { id: 'us', label: d.us },
    { id: 'legal', label: d.legal },
    { id: 'lic', label: d.lic },
    { id: 'priv', label: d.priv },
    { id: 'contact', label: d.contact }
  ]);
</script>

<div class="page-hero">
  <div class="wrap">
    <span class="eyebrow">{d.eyebrow}</span>
    <h1>{d.title}</h1>
    <p class="muted lead">{d.lead}</p>
  </div>
</div>

<div class="wrap body">
  <nav aria-label={d.toc} class="toc">
    {#each toc as t (t.id)}<a href={'#' + t.id}>{t.label}</a>{/each}
  </nav>
  <div class="content">
    <section id="us" aria-labelledby="h-us">
      <h2 id="h-us">{d.us}</h2>
      {#each d.usBody as p (p)}<p><Rich text={p} /></p>{/each}
    </section>
    <section id="legal" class="notice warn legal" aria-labelledby="h-legal">
      <h2 id="h-legal">{d.legal}</h2>
      {#each d.legalBody as p (p)}<p><Rich text={p} /></p>{/each}
    </section>
    <section id="lic" aria-labelledby="h-lic">
      <h2 id="h-lic">{d.lic}</h2>
      {#each d.licBody as p (p)}<p><Rich text={p} /></p>{/each}
    </section>
    <section id="priv" aria-labelledby="h-priv">
      <h2 id="h-priv">{d.priv}</h2>
      <p>{d.privBody}</p>
    </section>
    <section id="contact" aria-labelledby="h-contact">
      <h2 id="h-contact">{d.contact}</h2>
      <p>{d.contactBody}</p>
      <div class="row">
        <a class="btn" href={LINKS.websiteIssues}><Icon name="bug" />{d.issue + ' ↗'}</a>
      </div>
    </section>
  </div>
</div>

<style>
  .body {
    padding-top: 72px;
    padding-bottom: 88px;
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 48px;
    align-items: start;
  }
  .toc {
    position: sticky;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .toc a {
    font-weight: 700;
    min-height: 40px;
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 28px;
    max-width: 760px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-margin-top: 20px;
  }
  h2 {
    font-size: 30px;
  }
  .legal {
    flex-direction: column;
    gap: 8px;
  }
  .legal h2 {
    font-size: 26px;
  }
  @media (max-width: 860px) {
    .body {
      grid-template-columns: minmax(0, 1fr);
      padding-top: 40px;
      gap: 24px;
    }
    .toc {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 4px 16px;
    }
  }
</style>
