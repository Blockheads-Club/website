<script lang="ts">
  import Rich from '$lib/components/Rich.svelte';
  import { dict } from '$lib/locale.svelte';

  const l = $derived(dict().legal);
</script>

<div class="wrap page">
  <div class="intro">
    <h1>{l.title}</h1>
    <p class="muted lead-l"><Rich text={l.lead} /></p>
  </div>
  <div class="short">
    <p class="st">{l.shortTitle}</p>
    <p class="sb">{l.short}</p>
  </div>
  <div class="legal">
    {#each l.sections as section, i (section.title)}
      <section aria-labelledby={'l' + (i + 1)}>
        <h2 id={'l' + (i + 1)}>{section.title}</h2>
        <p><Rich text={section.body} /></p>
      </section>
    {/each}
  </div>
</div>

<style>
  .page {
    padding-top: 64px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .intro {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 780px;
  }
  h1 {
    font-size: clamp(38px, 5vw, 56px);
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .short {
    border: 3px solid #1f1a17;
    border-radius: 18px;
    background: var(--sun);
    color: #1f1a17;
    padding: 22px 24px;
    max-width: 780px;
    box-shadow: 0 4px 0 #1f1a17;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .st {
    font: 750 21px var(--f-display);
  }
  .sb {
    font-size: 16.5px;
  }
  .legal {
    max-width: 780px;
    display: flex;
    flex-direction: column;
    gap: 34px;
    font-size: 17px;
    line-height: 1.7;
  }
  .legal section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .legal h2 {
    font-size: 24px;
  }
</style>
