<script lang="ts">
  import { base } from '$app/paths';
  import Badge from '$lib/components/Badge.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Button from '$lib/components/Button.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Rich from '$lib/components/Rich.svelte';
  import Shot from '$lib/components/Shot.svelte';
  import StepNumber from '$lib/components/StepNumber.svelte';
  import Toc from '$lib/components/Toc.svelte';
  import { GUIDE_CODE } from '$lib/commands';
  import { guideById, neighbours } from '$lib/guides';
  import { GUIDE_SHOTS } from '$lib/shots';
  import type { GuideDoc } from '$lib/i18n/en';
  import { dict } from '$lib/locale.svelte';

  let { data }: { data: { id: string } } = $props();

  const d = $derived(dict());
  const a = $derived(d.article);
  const meta = $derived(guideById(data.id));
  const doc = $derived((d.docs as Record<string, GuideDoc>)[data.id]);
  const topic = $derived(d.guides.filters[meta.topic]);
  const code = $derived(GUIDE_CODE[data.id] ?? []);
  const shots = $derived(GUIDE_SHOTS[data.id] ?? {});
  const near = $derived(neighbours(data.id));
  const titleOf = (id: string) => d.guides.items.find((item) => item.id === id)!.title;
  const tocItems = $derived([
    { id: 'need', label: a.need.title },
    ...doc.steps.map((step, i) => ({ id: 's' + (i + 1), label: i + 1 + ' · ' + step.title })),
    { id: 'help', label: a.help.title }
  ]);

  let vote = $state<'yes' | 'no' | undefined>();
</script>

<div class="wrap page">
  <Breadcrumb
    label={a.breadcrumb}
    items={[
      { label: a.guides, href: base + '/guides' },
      { label: topic, href: base + '/guides' },
      { label: doc.title }
    ]}
  />
  <div class="intro">
    <div class="tags">
      <Badge tone={meta.topic === 'patcher' ? 'primary' : 'info'}>{doc.tags}</Badge>
      <Badge icon="clock">{meta.minutes + ' ' + d.guides.min}</Badge>
      <Badge>{d.guides.filters[meta.level]}</Badge>
    </div>
    <h1>{doc.title}</h1>
    <p class="muted lede"><Rich text={doc.lead} /></p>
    <p class="hint"><Rich text={a.updated} /></p>
  </div>

  <div class="layout">
    <Toc label={a.toc} heading={a.toc} items={tocItems} />

    <article class="prose">
      <div id="need" class="card need">
        <p class="b">{a.need.title}</p>
        <ul class="checks">
          {#each doc.need as item (item)}
            <li><Icon name="check" class="okc" /><span><Rich text={item} /></span></li>
          {/each}
        </ul>
      </div>

      {#each doc.steps as step, i (step.title)}
        <h2 id={'s' + (i + 1)}><StepNumber n={i + 1} />{step.title}</h2>
        {#each step.body as para (para)}<p><Rich text={para} /></p>{/each}
        {#if step.list}
          <ul class="list">
            {#each step.list as item (item)}<li><Rich text={item} /></li>{/each}
          </ul>
        {/if}
        {#if code[i]}<CodeBlock lines={code[i]} />{/if}
        {#if shots[i]}<Shot name={shots[i]} />{/if}
        {#if step.warn}<Callout tone="warn" icon="alert"><p><Rich text={step.warn} /></p></Callout>{/if}
        {#if step.tip}<Callout tone="info" icon="info"><p><Rich text={step.tip} /></p></Callout>{/if}
      {/each}

      <section id="help" class="card helpbox">
        <h3>{a.help.title}</h3>
        <ul>
          {#each doc.help as item (item)}<li><Rich text={item} /></li>{/each}
        </ul>
      </section>

      <div class="feedback">
        <p class="b" id="helpful">{a.helpful}</p>
        <div role="group" aria-labelledby="helpful" class="votes">
          <Button size="sm" icon="thumb" aria-pressed={vote === 'yes'} onclick={() => (vote = 'yes')}>{a.yes}</Button>
          <Button size="sm" icon="thumb" class="down" aria-pressed={vote === 'no'} onclick={() => (vote = 'no')}
            >{a.no}</Button
          >
        </div>
        <p class="hint" role="status">{vote ? a.thanks : ''}</p>
      </div>

      <div class="pn">
        {#if near.prev}
          <a class="card" href={base + near.prev.path}>
            <Icon name="chev-l" />
            <span><span class="hint blk">{a.previous}</span><span class="b">{titleOf(near.prev.id)}</span></span>
          </a>
        {/if}
        {#if near.next}
          <a class="card nx" href={base + near.next.path}>
            <span><span class="hint blk">{a.next}</span><span class="b">{titleOf(near.next.id)}</span></span>
            <Icon name="chev-r" />
          </a>
        {/if}
      </div>
    </article>
  </div>
</div>

<style>
  .page {
    padding-top: 40px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
  .intro {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 860px;
  }
  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  h1 {
    font-size: clamp(36px, 4.6vw, 56px);
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .lede {
    font-size: 19px;
  }
  .layout {
    display: flex;
    flex-wrap: wrap;
    gap: 56px;
    align-items: flex-start;
  }
  .prose {
    flex: 999 1 560px;
    min-width: 0;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    font-size: 18px;
    line-height: 1.7;
  }
  .prose h2 {
    font-size: 28px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .prose :global(.mono) {
    overflow-wrap: anywhere;
  }
  .list {
    margin: 0;
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .b {
    font-weight: 700;
  }
  .blk {
    display: block;
  }
  .need {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 16.5px;
  }
  .need .b {
    font-size: 17px;
  }
  .checks {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .checks li {
    display: flex;
    gap: 10px;
  }
  .checks :global(.ico) {
    margin-top: 3px;
  }
  :global(.okc) {
    color: var(--ok);
  }
  .prose :global(.call) {
    font-size: 16.5px;
    line-height: 1.55;
  }
  .helpbox {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16.5px;
    margin-top: 12px;
  }
  .helpbox h3 {
    font-size: 21px;
  }
  .helpbox ul {
    margin: 0;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .feedback {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    border-top: 2px solid var(--line);
    padding-top: 24px;
    margin-top: 8px;
    font-size: 16px;
  }
  .votes {
    display: flex;
    gap: 8px;
  }
  .votes :global(.btn[aria-pressed='true']) {
    background: var(--primary-soft);
    border-color: var(--primary);
    color: var(--primary-ink);
  }
  .votes :global(.down .ico) {
    transform: scaleY(-1);
  }
  .feedback > .hint {
    flex-basis: 100%;
    min-height: 1.45em;
  }
  .pn {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
    gap: 14px;
    font-size: 16px;
  }
  .pn a {
    padding: 16px 18px;
    display: flex;
    gap: 12px;
    align-items: center;
    line-height: 1.5;
  }
  .pn .nx {
    justify-content: flex-end;
    text-align: right;
    grid-column: -2;
  }
</style>
