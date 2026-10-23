<script lang="ts">
  import { base } from '$app/paths';
  import { APPS, appName } from '$lib/apps';
  import { LINKS } from '$lib/config';
  import { docsPath } from '$lib/i18n';
  import { dict, i18n } from '$lib/locale.svelte';
  import { PATHS } from '$lib/route';
  import LangSwitch from './LangSwitch.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Wordmark from './Wordmark.svelte';

  const d = $derived(dict());
  const docs = (page = '') => base + docsPath(i18n.locale, page);
</script>

<footer class="ftr">
  <div class="wrap">
    <div class="cols">
      <div class="brand">
        <Wordmark logo={36} />
        <p class="muted tag">{d.footer.tagline}</p>
        <p class="hint">{d.footer.disclaimer}</p>
      </div>
      <nav aria-label={d.footer.nav} class="links">
        <div>
          <h2>{d.footer.apps}</h2>
          <ul>
            {#each APPS as a (a.id)}<li><a href={base + a.path}>{appName(a.id, d)}</a></li>{/each}
            <li><a href={base + PATHS.mods}>{d.apps.names.mods}</a></li>
            <li><a href={base + PATHS.download}>{d.footer.allDownloads}</a></li>
          </ul>
        </div>
        <div>
          <h2>{d.footer.help}</h2>
          <ul>
            <li><a href={docs()} rel="external">{d.nav.docs + ' ↗'}</a></li>
            <li><a href={docs('guides/')} rel="external">{d.footer.guides + ' ↗'}</a></li>
            <li><a href={docs('faq')} rel="external">{d.footer.faq + ' ↗'}</a></li>
            <li><a href={LINKS.websiteIssues}>{d.footer.bug + ' ↗'}</a></li>
          </ul>
        </div>
        <div>
          <h2>{d.footer.project}</h2>
          <ul>
            <li><a href={base + PATHS.contribute}>{d.nav.contribute}</a></li>
            <li><a href={base + PATHS.about}>{d.nav.about}</a></li>
            <li><a href={LINKS.org}>{'GitHub ↗'}</a></li>
            <li><a href={base + PATHS.about + '#lic'}>{d.footer.licence}</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="bottom">
      <p class="hint">{d.footer.fine}</p>
      <div class="row tools">
        <LangSwitch variant="footer" />
        <ThemeToggle labelled />
      </div>
    </div>
  </div>
</footer>

<style>
  .ftr {
    background: var(--surface-2);
    border-top: 2px solid var(--line);
    padding: 56px 0 36px;
  }
  .cols {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 3fr);
    gap: 32px;
  }
  .links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
  }
  .brand {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .tag {
    font-size: 15px;
  }
  h2 {
    font: 700 15px var(--f-body);
    color: var(--text-3);
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  li a {
    color: var(--text);
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    min-height: 36px;
    align-items: center;
  }
  li a:hover {
    color: var(--primary-ink);
    text-decoration: underline;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid var(--line);
  }
  .tools {
    gap: 6px;
  }
  @media (max-width: 860px) {
    .cols {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 560px) {
    .links {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }
</style>
