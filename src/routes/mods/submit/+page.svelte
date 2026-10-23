<script lang="ts">
  import { base } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import StepNumber from '$lib/components/StepNumber.svelte';
  import { LINKS } from '$lib/config';
  import { docsPath } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';

  const s = $derived(dict().mods.submit);
</script>

<div class="wrap page">
  <div class="intro">
    <span class="eyebrow"><Icon name="box" />{s.eyebrow}</span>
    <h1>{s.title}</h1>
    <p class="muted lead-l">{s.lead}</p>
  </div>

  <section aria-labelledby="h-steps" class="grp">
    <h2 id="h-steps">{s.stepsTitle}</h2>
    <ol class="steps">
      {#each s.steps as step, i (step.title)}
        <li class="card step">
          <StepNumber n={i + 1} />
          <div>
            <h3>{step.title}</h3>
            <p><Rich text={step.body} /></p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <div class="cols">
    <section aria-labelledby="h-rules" class="grp">
      <h2 id="h-rules">{s.rulesTitle}</h2>
      <ul class="list">
        {#each s.rules as rule (rule)}<li><Rich text={rule} /></li>{/each}
      </ul>
    </section>
    <section aria-labelledby="h-ci" class="grp">
      <h2 id="h-ci">{s.ciTitle}</h2>
      <ul class="list">
        {#each s.ci as check (check)}<li><Rich text={check} /></li>{/each}
      </ul>
    </section>
  </div>

  <Callout tone="bad" icon="alert">
    <strong>{s.nativeTitle}</strong>
    <p><Rich text={s.nativeBody} /></p>
  </Callout>

  <section aria-labelledby="h-tools" class="grp">
    <h2 id="h-tools">{s.toolsTitle}</h2>
    <p class="muted"><Rich text={s.toolsBody} /></p>
    <div class="actions">
      <Button variant="primary" href={LINKS.modSdk} rel="noopener" icon="code">{s.sdkButton}</Button>
      <Button href={LINKS.modsRepo} rel="noopener" icon="code">{s.modsButton}</Button>
      <Button href={base + docsPath(i18n.locale, 'mods')} rel="external" icon="book">{s.docsButton}</Button>
    </div>
  </section>
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
  .grp {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .grp h2 {
    font-size: 26px;
  }
  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .step {
    display: flex;
    gap: 16px;
    padding: 18px 22px;
    align-items: flex-start;
  }
  .step h3 {
    font-size: 19px;
    margin-bottom: 4px;
  }
  .cols {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
    gap: 32px;
  }
  .list {
    margin: 0;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
