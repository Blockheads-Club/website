<script lang="ts">
  import type { PageMeta } from '$lib/seo';

  // Link preview tags of one page (see $lib/seo). Rendered once, by the root layout: crawlers read the first og:* tag.
  let { meta }: { meta: PageMeta } = $props();
</script>

<svelte:head>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.url} />
  <meta property="og:type" content={meta.type} />
  <meta property="og:site_name" content="Blockheads Club" />
  <meta property="og:locale" content={meta.locale} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:image" content={meta.image.url} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content={String(meta.image.width)} />
  <meta property="og:image:height" content={String(meta.image.height)} />
  <meta property="og:image:alt" content={meta.image.alt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image.url} />
  <meta name="twitter:image:alt" content={meta.image.alt} />
</svelte:head>
