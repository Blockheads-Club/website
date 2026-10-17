<script lang="ts">
  import { LINKS } from '$lib/config';
  import { dict } from '$lib/locale.svelte';

  const d = $derived(dict());
</script>

<section class="hero container">
  <p class="eyebrow">{d.hero.eyebrow}</p>
  <h1>{d.hero.title}</h1>
  <p class="lead">{d.hero.lead}</p>
  <p class="actions">
    <a class="btn primary" href={LINKS.webPatcher} rel="noopener">{d.hero.ctaPatcher}</a>
    <a class="btn" href={LINKS.serverRepo} rel="noopener">{d.hero.ctaServer}</a>
  </p>
</section>

<section id="patcher" class="container" aria-labelledby="patcher-h">
  <h2 id="patcher-h">{d.patcher.title}</h2>
  <p class="lead">{d.patcher.lead}</p>
  <h3>{d.patcher.fixesTitle}</h3>
  <div class="cards">
    {#each d.patcher.fixes as fix (fix.title)}
      <article class="card">
        <h4>{fix.title}</h4>
        <p>{fix.body}</p>
      </article>
    {/each}
  </div>
  <p>{d.patcher.versions}</p>
  <p class="actions">
    <a class="btn primary" href={LINKS.webPatcher} rel="noopener">{d.patcher.ctaWeb}</a>
    <a class="btn" href={LINKS.patcherReleases} rel="noopener">{d.patcher.ctaReleases}</a>
    <a class="btn" href={LINKS.patcherRepo} rel="noopener">{d.patcher.ctaSource}</a>
  </p>
</section>

<section id="server" class="container" aria-labelledby="server-h">
  <h2 id="server-h">{d.server.title}</h2>
  <p class="lead">{d.server.lead}</p>
  <h3>{d.server.platformsTitle}</h3>
  <ul class="chips">
    {#each d.server.platforms as platform (platform)}
      <li>{platform}</li>
    {/each}
  </ul>
  <div class="cards">
    {#each d.server.items as item (item.title)}
      <article class="card">
        <h4>{item.title}</h4>
        <p>{item.body}</p>
      </article>
    {/each}
  </div>
  <p class="actions">
    <a class="btn primary" href={LINKS.serverRepo} rel="noopener">{d.server.ctaRepo}</a>
    <a class="btn" href={LINKS.serverReleases} rel="noopener">{d.server.ctaReleases}</a>
  </p>
</section>

<section id="guides" class="container" aria-labelledby="guides-h">
  <h2 id="guides-h">{d.guides.title}</h2>
  <p class="lead">{d.guides.lead}</p>
  {#each d.guides.items as guide (guide.id)}
    <article class="guide" id={guide.id} aria-labelledby={guide.id + "-h"}>
      <h3 id={guide.id + "-h"}>{guide.title}</h3>
      <ol>
        {#each guide.steps as step (step)}
          <li>{step}</li>
        {/each}
      </ol>
    </article>
  {/each}
</section>

<section id="faq" class="container" aria-labelledby="faq-h">
  <h2 id="faq-h">{d.faq.title}</h2>
  {#each d.faq.items as item (item.q)}
    <details>
      <summary>{item.q}</summary>
      <p>{item.a}</p>
    </details>
  {/each}
</section>

<section id="legal" class="container" aria-labelledby="legal-h">
  <h2 id="legal-h">{d.legal.title}</h2>
  {#each d.legal.body as paragraph (paragraph)}
    <p>{paragraph}</p>
  {/each}
</section>
