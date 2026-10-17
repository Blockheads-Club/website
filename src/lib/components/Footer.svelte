<script lang="ts">
  import { LINKS } from '$lib/config';
  import { dict } from '$lib/locale.svelte';

  const d = $derived(dict());
</script>

<footer class="site-footer">
  <div class="container">
    <p>{d.footer.license}</p>
    <p>
      <a href={LINKS.org} rel="noopener">GitHub</a> ·
      <a href={LINKS.websiteRepo} rel="noopener">{d.footer.source}</a>
    </p>
  </div>
</footer>
