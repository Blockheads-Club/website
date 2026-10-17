<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import FaqItem from '$lib/components/FaqItem.svelte';
  import { LINKS } from '$lib/config';
  import { dict } from '$lib/locale.svelte';

  const f = $derived(dict().faq);
  let current = $state('');
  const active = $derived(current || f.sections[0].id);
</script>

<div class="wrap page">
  <div class="intro">
    <h1>{f.title}</h1>
    <p class="muted lead-l">{f.lead}</p>
  </div>
  <div class="layout">
    <nav class="side" aria-label={f.sidebar}>
      {#each f.sections as section (section.id)}
        <a href={'#' + section.id} aria-current={active === section.id ? 'true' : undefined} onclick={() => (current = section.id)}
          >{section.title}</a
        >
      {/each}
      <a href="#help" aria-current={active === 'help' ? 'true' : undefined} onclick={() => (current = 'help')}
        >{f.helpSection}</a
      >
    </nav>
    <div class="main">
      {#each f.sections as section (section.id)}
        <section id={section.id} aria-labelledby={'h-' + section.id}>
          <h2 id={'h-' + section.id}>{section.title}</h2>
          <div class="list">
            {#each section.items as item, i (item.q)}
              <FaqItem q={item.q} a={item.a} large open={section.id === 'general' && i === 0} />
            {/each}
          </div>
        </section>
      {/each}
      <section id="help" aria-labelledby="h-help" class="helpbox">
        <h2 id="h-help">{f.helpTitle}</h2>
        <p class="muted">{f.helpBody}</p>
        <Button href={LINKS.patcherIssues} rel="noopener" icon="code" class="self">{f.helpButton}</Button>
      </section>
    </div>
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
    max-width: 760px;
  }
  h1 {
    font-size: clamp(38px, 5vw, 58px);
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .layout {
    display: flex;
    flex-wrap: wrap;
    gap: 56px;
    align-items: flex-start;
  }
  .side {
    flex: 1 1 220px;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .side a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    color: var(--text-2);
    text-decoration: none;
    font-weight: 700;
  }
  .side a:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .side a[aria-current='true'] {
    background: var(--primary-soft);
    color: var(--primary-ink);
  }
  .main {
    flex: 999 1 560px;
    min-width: 0;
    max-width: 820px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  section > h2 {
    font-size: 26px;
    margin-bottom: 16px;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .helpbox {
    border: 2px solid var(--line);
    border-radius: 16px;
    padding: 24px;
    background: var(--surface-2);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .helpbox > h2 {
    font-size: 24px;
    margin: 0;
  }
  .helpbox :global(.self) {
    align-self: flex-start;
  }
  @media (max-width: 900px) {
    .side {
      max-width: none;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>
