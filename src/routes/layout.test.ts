import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LOCALES, LOCALE_NAMES, dictionaries } from '$lib/i18n';
import { i18n } from '$lib/locale.svelte';
import { prerender } from './+layout';
import Layout from './+layout.svelte';
import Home from './+page.svelte';
import Faq from './faq/+page.svelte';
import Guides from './guides/+page.svelte';
import Article from './guides/fix-game-on-phone/+page.svelte';
import { entries, load } from './guides/[slug]/+page';
import Guide from './guides/[slug]/+page.svelte';
import { ARTICLE_IDS } from '$lib/guides';
import { GUIDE_CODE } from '$lib/commands';
import { GUIDE_SHOTS } from '$lib/shots';
import Legal from './legal/+page.svelte';
import Server from './server/+page.svelte';

const nav = vi.hoisted(() => ({ path: '/', hash: '', goto: vi.fn() }));
vi.mock('$app/state', () => ({
  page: {
    get url() {
      return new URL('http://localhost' + nav.path);
    }
  }
}));
vi.mock('$app/navigation', () => ({ goto: nav.goto }));

const children = createRawSnippet(() => ({ render: () => '<p>child</p>' }));

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  nav.path = '/';
});
afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
  i18n.locale = 'en';
  location.hash = '';
  nav.goto.mockClear();
});

describe('layout', () => {
  it('is prerendered', () => {
    expect(prerender).toBe(true);
  });

  it('renders chrome, children and initialises locale + theme', () => {
    localStorage.setItem('bh-locale', 'tr');
    localStorage.setItem('bh-theme', 'dark');
    render(Layout, { children });
    expect(screen.getByText('child')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'İçeriğe geç' })).toHaveAttribute('href', '#main');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.title).toBe('Blockheads Club');
    const meta = (sel: string) => document.head.querySelector(sel)?.getAttribute('content');
    expect(meta('meta[property="og:image"]')).toBe('https://blockheads-club.github.io/website/social-preview.png');
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
  });

  it('sets a per-page title and falls back for unknown routes', () => {
    nav.path = '/server';
    const { unmount } = render(Layout, { children });
    expect(document.title).toBe('Server quick start · Blockheads Club');
    unmount();
    nav.path = '/missing';
    const other = render(Layout, { children });
    expect(document.title).toBe('Blockheads Club');
    other.unmount();
    nav.path = '/guides/docker';
    render(Layout, { children });
    expect(document.title).toBe('Docker and Docker Compose · Blockheads Club');
  });

  it('switches language from the header menu and theme', async () => {
    const user = userEvent.setup();
    render(Layout, { children });
    await user.click(screen.getAllByRole('button', { name: 'Language: English' })[0]);
    await user.click(screen.getByRole('menuitemradio', { name: /Türkçe/ }));
    expect(screen.getAllByRole('link', { name: 'Yamalayıcı' }).length).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe('tr');
    await user.click(screen.getByRole('button', { name: 'Koyu temaya geç' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it.each(['ru', 'kk'] as const)('in %s the docs links open the matching docs locale', async (code) => {
    const user = userEvent.setup();
    render(Layout, { children });
    expect(screen.getByRole('navigation', { name: 'Main' }).querySelector('a[rel="external"]')).toHaveAttribute('href', '/docs/');
    await user.click(screen.getAllByRole('button', { name: 'Language: English' })[0]);
    await user.click(screen.getByRole('menuitemradio', { name: new RegExp(LOCALE_NAMES[code]) }));
    expect(document.documentElement.lang).toBe(code);
    const docs = screen.getAllByRole('link', { name: dictionaries[code].nav.docs });
    expect(docs.length).toBeGreaterThan(1);
    for (const link of docs) expect(link).toHaveAttribute('href', '/docs/' + code + '/');
  });
});

describe('home', () => {
  it('has sections and real links', () => {
    render(Home);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Keep The Blockheads playable');
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://blockheads.club/patcher/');
    expect(hrefs).toContain('https://github.com/Blockheads-Club/blockheads-patcher/releases');
    expect(hrefs).toContain('/server');
    expect(screen.getByText('0.1.0').tagName).toBe('STRONG');
    expect(screen.getByText('Is this the official Blockheads?').closest('details')).toHaveAttribute('open');
    expect(screen.queryByText('Coming soon')).toBeNull();
  });

  it('renders Turkish', () => {
    i18n.locale = 'tr';
    render(Home);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('oynanabilir');
  });

  it('redirects legacy anchors', async () => {
    location.hash = '#faq';
    render(Home);
    await waitFor(() => expect(nav.goto).toHaveBeenCalledWith('/faq', { replaceState: true }));
  });

  it('keeps #patcher on the page', () => {
    location.hash = '#patcher';
    render(Home);
    expect(nav.goto).not.toHaveBeenCalled();
  });
});

describe('server', () => {
  it('switches platform tabs and shows commands', async () => {
    const user = userEvent.setup();
    render(Server);
    expect(screen.getByRole('tab', { name: 'Linux' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/tar -xzf blockheads-server-v0\.1\.1-x86_64-unknown-linux-gnu\.tar\.gz/)).toBeInTheDocument();
    for (const name of ['Windows', 'macOS', 'Raspberry Pi', 'Docker', 'Android']) {
      await user.click(screen.getByRole('tab', { name }));
      expect(screen.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true');
    }
    expect(screen.getByRole('link', { name: 'Download for Android' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Windows' }));
    expect(screen.getByText(/blockheads_server\.exe --new/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Example QR code/ })).toBeInTheDocument();
    expect(screen.getAllByText('ghcr.io/blockheads-club/blockheads-server').length).toBeGreaterThan(0);
    expect(screen.queryByText(/--world|install-service|BH_WORLD/)).toBeNull();
  });
});

describe('guides index', () => {
  it('filters by chip and search, and can be cleared', async () => {
    const user = userEvent.setup();
    render(Guides);
    expect(screen.getByRole('heading', { level: 2, name: 'Start here' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Server' }));
    expect(screen.queryByRole('heading', { name: 'Patcher' })).toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Server' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Patcher' }));
    expect(screen.queryByRole('heading', { level: 2, name: 'Server' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'All guides' }));
    await user.type(screen.getByRole('searchbox', { name: 'Search guides' }), 'raspberry');
    expect(screen.getAllByText('Run a 24/7 server on a Raspberry Pi')).toHaveLength(1);
    expect(screen.queryByText('Docker and Docker Compose')).toBeNull();
    await user.clear(screen.getByRole('searchbox'));
    await user.type(screen.getByRole('searchbox'), 'zzzz');
    expect(screen.getByText('No guides match your search.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    expect(screen.queryByText('No guides match your search.')).toBeNull();
  });
});

describe('article', () => {
  it('has toc, screenshots and feedback', async () => {
    const user = userEvent.setup();
    render(Article);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fix the game on your phone');
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument();
    const shots = screen.getAllByRole('img').map((img) => img.getAttribute('src'));
    expect(shots).toEqual([
      '/shots/en/patcher/phone-choose.webp',
      '/shots/en/patcher/phone-review.webp',
      '/shots/en/patcher/phone-uninstall-confirm.webp',
      '/shots/en/patcher/phone-installed.webp'
    ]);
    expect(screen.getByText(/Updated 21 October 2026/)).toBeInTheDocument();
    expect(document.querySelector('.ph')).toBeNull();
    expect(within(screen.getByRole('navigation', { name: 'Breadcrumb' })).getAllByRole('link')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Yes' }));
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Thanks for the feedback!');
    await user.click(screen.getByRole('button', { name: 'No' }));
    expect(screen.getByRole('button', { name: 'No' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('guide articles', () => {
  it('prerenders every written guide except the hand-made one and 404s others', () => {
    const slugs = (entries as () => { slug: string }[])().map((e) => e.slug);
    expect(slugs).toEqual(ARTICLE_IDS);
    expect(slugs).toHaveLength(9);
    expect(slugs).not.toContain('fix-game-on-phone');
    const run = (slug: string) => (load as (e: unknown) => unknown)({ params: { slug } });
    expect(run('docker')).toEqual({ id: 'docker' });
    expect(() => run('nope')).toThrow();
  });

  it.each(ARTICLE_IDS.flatMap((id) => LOCALES.map((locale) => [id, locale] as const)))(
    '%s renders in %s with toc, steps, code and help',
    (id, locale) => {
      i18n.locale = locale;
      const { container } = render(Guide, { data: { id } });
      const steps = container.querySelectorAll('h2');
      expect(screen.getByRole('heading', { level: 1 }).textContent).not.toBe('');
      expect(steps.length).toBeGreaterThan(1);
      const toc = within(screen.getByRole('navigation', { name: dictionaries[locale].article.toc }));
      expect(toc.getAllByRole('link')).toHaveLength(steps.length + 2);
      expect(container.querySelectorAll('pre')).toHaveLength(Object.keys(GUIDE_CODE[id] ?? {}).length);
      const imgs = [...container.querySelectorAll('figure img')].map((img) => img.getAttribute('src'));
      expect(imgs).toEqual(Object.values(GUIDE_SHOTS[id] ?? {}).map((n) => '/shots/' + locale + '/' + n + '.webp'));
      expect(container.querySelector('#help li')).not.toBeNull();
      for (const a of container.querySelectorAll('a')) expect(a.getAttribute('href')).toBeTruthy();
    }
  );

  it('links to neighbours on the same topic and takes feedback', async () => {
    const user = userEvent.setup();
    render(Guide, { data: { id: 'lan-play' } });
    expect(screen.getByRole('link', { name: /Next.*Run a 24\/7 server/ })).toHaveAttribute('href', '/guides/raspberry-pi');
    expect(screen.queryByRole('link', { name: /Previous/ })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Yes' }));
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'No' }));
    expect(screen.getByText('Thanks for the feedback!')).toHaveAttribute('role', 'status');
  });

  it('the last guide of a topic has no next link', () => {
    render(Guide, { data: { id: 'docker' } });
    expect(screen.getByRole('link', { name: /Previous.*Host from an Android phone/ })).toHaveAttribute(
      'href',
      '/guides/host-android'
    );
    expect(screen.queryByRole('link', { name: /Next/ })).toBeNull();
  });
});

describe('faq and legal', () => {
  it('faq has sections, details and a sidebar', async () => {
    const user = userEvent.setup();
    render(Faq);
    expect(screen.getByText('Do you upload my game file?').closest('details')).not.toBeNull();
    const side = screen.getByRole('navigation', { name: 'FAQ sections' });
    expect(within(side).getByRole('link', { name: 'About the project' })).toHaveAttribute('aria-current', 'true');
    await user.click(within(side).getByRole('link', { name: 'Server' }));
    expect(within(side).getByRole('link', { name: 'Server' })).toHaveAttribute('aria-current', 'true');
    await user.click(within(side).getByRole('link', { name: 'Getting help' }));
    expect(within(side).getByRole('link', { name: 'Getting help' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'Open an issue' })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-patcher/issues'
    );
  });

  it('legal has real contact links and the disclaimer', () => {
    render(Legal);
    expect(document.querySelector('.ph')).toBeNull();
    expect(screen.getByRole('link', { name: 'Blockheads Club organisation on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club'
    );
    expect(screen.getAllByRole('link', { name: /issue on GitHub/ })).toHaveLength(2);
    expect(screen.getByText(/not affiliated with, endorsed, sponsored or approved by/)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(8);
  });
});
