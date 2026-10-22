<script lang="ts">
  import ProductPage from '$lib/components/ProductPage.svelte';
  import type { Releases } from '$lib/releases';

  let { data }: { data: { releases: Releases } } = $props();
</script>

<ProductPage id="pc" releases={data.releases} />
