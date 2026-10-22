import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '$lib/locale.svelte';
import { NO_RELEASES } from '$lib/releases';
import { setTheme } from '$lib/theme.svelte';
import { RELEASES } from '../test/fixtures';
import ErrorPage from './+error.svelte';
import { prerender } from './+layout';
import { load } from './+layout.server';
import Layout from './+layout.svelte';
import Home from './+page.svelte';
import About from './about/+page.svelte';
import Contribute from './contribute/+page.svelte';
import Download from './download/+page.svelte';
import Faq from './faq/+page.svelte';
import Guides from './guides/+page.svelte';
import { entries } from './guides/[slug]/+page';
import Guide from './guides/[slug]/+page.svelte';
import Legal from './legal/+page.svelte';
import Mods from './mods/+page.svelte';
import PatcherApp from './patcher-app/+page.svelte';
import Pc from './pc/+page.svelte';
import Server from './server/+page.svelte';

const nav = vi.hoisted(() => ({ path: '/', replaceState: vi.fn(), redirect: vi.fn() }));
vi.mock('$app/state', () => ({
  page: {
    get url() {
      return new URL('http://localhost' + nav.path);
    }
  }
}));
vi.mock('$app/navigation', async () => {
  const { onMount } = await import('svelte');
  return { afterNavigate: (fn: () => void) => onMount(fn), replaceState: nav.replaceState };
});
vi.mock('$lib/server/releases', () => ({ loadReleases: () => Promise.resolve(NO_RELEASES) }));
vi.mock('$lib/nav', () => ({ redirect: nav.redirect }));

const children = createRawSnippet(() => ({ render: () => '<p>child</p>' }));
const replace = nav.redirect;
const data = { releases: RELEASES };

function at(url: string) {
  window.history.replaceState(null, '', url);
}
function ua(value: string) {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(value);
}

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  nav.path = '/';
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
  i18n.locale = 'en';
  setTheme('light');
  replace.mockClear();
  nav.replaceState.mockClear();
  at('/');
});

describe('layout', () => {
  it('is prerendered and loads release data at build time', async () => {
    expect(prerender).toBe(true);
    expect(await load()).toEqual({ releases: NO_RELEASES });
  });

  it('renders chrome, children, titles and initialises locale + theme', () => {
    localStorage.setItem('bh-locale', 'tr');
    localStorage.setItem('bh-theme', 'dark');
    render(Layout, { children });
    expect(screen.getByText('child')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'İçeriğe geç' })).toHaveAttribute('href', '#main');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.title).toBe('Blockheads Club');
    expect(document.querySelector('header')).toHaveClass('on-hero');
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
  });

  it('sets per-page titles', () => {
    nav.path = '/download';
    const a = render(Layout, { children });
    expect(document.title).toBe('Download · Blockheads Club');
    expect(document.querySelector('header')).not.toHaveClass('on-hero');
    a.unmount();
    nav.path = '/nope';
    render(Layout, { children });
    expect(document.title).toBe('Blockheads Club');
  });

  it('sends old one-page anchors to their new home in the visitor’s language', () => {
    localStorage.setItem('bh-locale', 'ru');
    at('/#faq');
    render(Layout, { children });
    expect(replace).toHaveBeenCalledWith('/docs/ru/faq');
  });
});

describe('moved pages', () => {
  it.each([
    ['/faq', Faq, '/docs/faq', '/docs/tr/faq'],
    ['/guides', Guides, '/docs/guides/', '/docs/tr/guides/'],
    ['/guides/lan-play', Guide, '/docs/guides/lan-play', '/docs/tr/guides/lan-play'],
    ['/legal', Legal, '/about#legal', '/about#legal']
  ])('%s redirects', (path, Page, fallback, localized) => {
    nav.path = path;
    localStorage.setItem('bh-locale', 'tr');
    render(Page);
    expect(replace).toHaveBeenCalledWith(localized);
    expect(screen.getByRole('link', { name: /Aç|Open/ })).toHaveAttribute('href', fallback);
    expect(document.head.querySelector('meta[http-equiv="refresh"]')?.getAttribute('content')).toBe('2; url=' + fallback);
  });

  it('prerenders every old guide', () => {
    const list = entries() as { slug: string }[];
    expect(list).toHaveLength(10);
    expect(list[0]).toEqual({ slug: 'fix-game-on-phone' });
  });
});

describe('home', () => {
  it('routes to tasks, apps and the latest releases', () => {
    render(Home, { data });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Blockheads, kept alive by its players.');
    expect(screen.getByRole('link', { name: 'Get the Patcher' })).toHaveAttribute('href', '/download?task=patcher');
    expect(screen.getByRole('link', { name: /Learn more\s*: Server/ })).toHaveAttribute('href', '/server');
    expect(screen.getByRole('link', { name: /Mods are coming/ })).toHaveAttribute('href', '/mods');
    expect(screen.getAllByText('0.1.1', { selector: '.mono' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: /What’s new\s*: Blockheads PC/ })).toHaveAttribute('href', RELEASES.pc!.url);
    expect(screen.getByRole('link', { name: 'Open the docs ↗' })).toHaveAttribute('href', '/docs/');
  });

  it('links to GitHub when release data is missing', () => {
    render(Home, { data: { releases: NO_RELEASES } });
    expect(screen.getAllByText('See GitHub for the latest version')).toHaveLength(3);
    expect(screen.getByRole('link', { name: /What’s new\s*: Patcher/ })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-patcher/releases'
    );
  });
});

describe('product routes', () => {
  it.each([
    [Pc, 'Blockheads PC'],
    [PatcherApp, 'Patcher'],
    [Server, 'Server']
  ])('app page %#', (Page, name) => {
    render(Page, { data });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(name);
  });
});

describe('download', () => {
  it('follows the query string and keeps it in sync', async () => {
    at('/download?task=server&device=pi');
    ua('Mozilla/5.0 (Windows NT 10.0)');
    render(Download, { data });
    await waitFor(() => expect(document.getElementById('rt')).toHaveTextContent('Server for Raspberry Pi'));
    expect(screen.getByText(/We think you’re on\s*Windows/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download for Raspberry Pi' })).toHaveAttribute(
      'href',
      expect.stringContaining('aarch64-unknown-linux-gnu.tar.gz')
    );
    expect(screen.getByRole('link', { name: '32-bit Raspberry Pi OS' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy command' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Install guide/ })).toHaveAttribute('href', '/docs/guides/raspberry-pi');
    await userEvent.click(screen.getByRole('radio', { name: 'Docker' }));
    expect(nav.replaceState).toHaveBeenLastCalledWith('?task=server&device=docker', {});
    expect(document.getElementById('rt')).toHaveTextContent('Server for Docker');
    expect(screen.queryByRole('link', { name: /^Download for/ })).toBeNull();
    expect(screen.getByRole('link', { name: 'Image' })).toBeInTheDocument();
  });

  it('defaults a phone visitor to the Patcher and shows the APK', async () => {
    ua('Mozilla/5.0 (Linux; Android 14)');
    render(Download, { data });
    await waitFor(() => expect(document.getElementById('rt')).toHaveTextContent('Patcher for Android'));
    expect(screen.getByRole('radio', { name: /Fix the game on my phone/ })).toBeChecked();
    expect(screen.getByRole('link', { name: 'Download the APK' })).toHaveAttribute('href', expect.stringContaining('android-arm64.apk'));
    expect(screen.getByText(/Android asks you to allow installs/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'use the Patcher in your browser' })).toHaveAttribute('href', '/patcher/');
  });

  it('explains devices without a download and offers the alternative', async () => {
    at('/download?task=pc&device=android');
    ua('curl');
    render(Download, { data });
    await waitFor(() => expect(document.getElementById('rt')).toHaveTextContent('Blockheads PC isn’t available here'));
    await userEvent.click(screen.getByRole('button', { name: 'Get the Patcher' }));
    expect(document.getElementById('rt')).toHaveTextContent('Patcher for Android');
    await userEvent.click(screen.getByRole('radio', { name: 'macOS' }));
    expect(screen.queryByText('Also available:')).toBeNull();
    await userEvent.click(screen.getByRole('radio', { name: 'Raspberry Pi' }));
    expect(screen.getByRole('link', { name: 'Open the web Patcher' })).toHaveAttribute('href', '/patcher/');
    await userEvent.click(screen.getByRole('radio', { name: 'iPhone / iPad' }));
    expect(screen.queryByRole('link', { name: 'Open the web Patcher' })).toBeNull();
    await userEvent.click(screen.getByRole('radio', { name: /Play on my computer/ }));
    await userEvent.click(screen.getByRole('radio', { name: 'Windows' }));
    expect(document.getElementById('rt')).toHaveTextContent('Blockheads PC for Windows');
    expect(screen.getByText(/You need the game’s APK file/)).toBeInTheDocument();
  });

  it('falls back to GitHub Releases when the versions could not be loaded', async () => {
    at('/download?task=server&device=amiga');
    ua('Mozilla/5.0 (Windows NT 10.0)');
    render(Download, { data: { releases: NO_RELEASES } });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('We couldn’t load the latest version.'));
    expect(screen.getByRole('link', { name: /Open GitHub Releases/ })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-server/releases'
    );
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('link', { name: /Download\s*: Patcher, Android/ })[0]).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-patcher/releases'
    );
  });

  it('lists every file in the table', () => {
    ua('curl');
    render(Download, { data });
    const table = screen.getByRole('table');
    expect(within(table).getByRole('link', { name: /Download\s*: Blockheads PC, macOS/ })).toHaveAttribute(
      'href',
      expect.stringContaining('aarch64.dmg')
    );
    expect(within(table).getAllByText('—').length).toBeGreaterThan(5);
    expect(within(table).getByRole('link', { name: 'Open in your browser' })).toHaveAttribute('href', '/patcher/');
  });
});

describe('content pages', () => {
  it('mods: coming soon, linked to the SDK', () => {
    render(Mods);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mods are coming to The Blockheads.');
    expect(screen.getByRole('link', { name: /Follow progress on GitHub/ })).toHaveAttribute('href', 'https://github.com/Blockheads-Club/mod-sdk');
  });

  it('contribute: ways to help and translation status', () => {
    render(Contribute);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Blockheads Club is made by people like you.');
    expect(screen.getAllByText('100 %')).toHaveLength(4);
    expect(screen.getAllByText('Waiting for a native speaker’s review')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'About mods' })).toHaveAttribute('href', '/mods');
  });

  it('about: legal section keeps the #legal anchor', () => {
    render(About);
    expect(document.getElementById('legal')).toHaveTextContent('not made by');
    expect(screen.getByRole('link', { name: 'An unofficial fan project' })).toHaveAttribute('href', '#legal');
  });

  it('404', () => {
    i18n.locale = 'ru';
    render(ErrorPage);
    expect(screen.getByRole('link', { name: /Документац|документац/ })).toHaveAttribute('href', '/docs/ru/');
  });
});
