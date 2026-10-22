import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NO_RELEASES } from '$lib/releases';
import { i18n } from '$lib/locale.svelte';
import { setTheme, theme } from '$lib/theme.svelte';
import { RELEASES } from '../../test/fixtures';
import Button from './Button.svelte';
import CodeBlock from './CodeBlock.svelte';
import Footer from './Footer.svelte';
import Header from './Header.svelte';
import Icon from './Icon.svelte';
import LangSwitch from './LangSwitch.svelte';
import ProductPage from './ProductPage.svelte';
import Rich from './Rich.svelte';
import Tabs from './Tabs.svelte';
import ThemeToggle from './ThemeToggle.svelte';
import Wordmark from './Wordmark.svelte';

const txt = (t: string) => createRawSnippet(() => ({ render: () => `<span>${t}</span>` }));
const ua = (value: string, touch = 0) => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(value);
  Object.defineProperty(navigator, 'maxTouchPoints', { value: touch, configurable: true });
};

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  localStorage.clear();
  i18n.locale = 'en';
  setTheme('light');
});

describe('primitives', () => {
  it('Icon is decorative or labelled', () => {
    const { container, rerender } = render(Icon, { name: 'check' });
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    rerender({ name: 'check', label: 'ok', size: 16 });
    expect(screen.getByRole('img', { name: 'ok' })).toBeInTheDocument();
  });

  it('Button renders link, button and variants', async () => {
    const onclick = vi.fn();
    render(Button, { href: '/x', variant: 'primary', size: 'lg', icon: 'check', iconEnd: 'arrow-r', hero: true, children: txt('Go') });
    expect(screen.getByRole('link', { name: 'Go' })).toHaveClass('btn', 'btn-p', 'btn-lg', 'btn-hero');
    render(Button, { variant: 'ghost', size: 'sm', iconOnly: true, 'aria-label': 'B', onclick });
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onclick).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'B' })).toHaveClass('btn-g', 'btn-sm', 'btn-ic');
  });

  it('Rich resolves link keys and markup', () => {
    render(Rich, { text: 'x **b** `m` {{[P]}} [g](org)' });
    expect(screen.getByText('b').tagName).toBe('STRONG');
    expect(screen.getByText('m')).toHaveClass('mono');
    expect(screen.getByText('[P]')).toHaveClass('ph');
    expect(screen.getByRole('link', { name: 'g' })).toHaveAttribute('href', 'https://github.com/Blockheads-Club');
  });

  it('Wordmark links home', () => {
    render(Wordmark);
    expect(screen.getByRole('link', { name: 'Blockheads Club home' })).toHaveAttribute('href', '/');
  });

  it('ThemeToggle, plain and labelled', async () => {
    render(ThemeToggle);
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(theme.value).toBe('dark');
    render(ThemeToggle, { labelled: true });
    expect(screen.getAllByRole('button', { name: 'Switch to light theme' })[1]).toHaveTextContent('Light');
    await userEvent.click(screen.getAllByRole('button', { name: 'Switch to light theme' })[1]);
    expect(screen.getAllByRole('button', { name: 'Switch to dark theme' })[1]).toHaveTextContent('Dark');
  });

  it('LangSwitch picks a language with the keyboard and closes', async () => {
    const user = userEvent.setup();
    render(LangSwitch, { variant: 'footer' });
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    expect(trigger).toHaveTextContent('English');
    await user.click(trigger);
    expect(screen.getByRole('menu')).toHaveClass('up');
    await user.keyboard('{ArrowDown}{ArrowUp}{ArrowDown}{a}');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    await user.click(trigger);
    await user.click(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
    await user.keyboard('{ArrowDown}');
    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByRole('menu')).toBeNull();
    await user.click(trigger);
    await user.click(screen.getByRole('menuitemradio', { name: 'Русский' }));
    expect(i18n.locale).toBe('ru');
    expect(screen.getByRole('button', { name: 'Язык: Русский' })).toBeInTheDocument();
  });

  it('CodeBlock copies and reports failures', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('no'));
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    render(CodeBlock, { code: 'docker run x' });
    const button = screen.getByRole('button', { name: 'Copy command' });
    await userEvent.click(button);
    expect(writeText).toHaveBeenCalledWith('docker run x');
    await waitFor(() => expect(button).toHaveTextContent('Copied'));
    await userEvent.click(button);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copy failed'));
    vi.advanceTimersByTime(2100);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(''));
  });

  it('Tabs move with the arrow keys, Home and End', async () => {
    const user = userEvent.setup();
    const panel = createRawSnippet((tab: () => string) => ({ render: () => `<p>${tab()}</p>` }));
    render(Tabs, {
      tabs: [
        { id: 'a', label: 'A', icon: 'docker' },
        { id: 'b', label: 'B', icon: 'pi' },
        { id: 'c', label: 'C', icon: 'linux' }
      ],
      selected: 'a',
      label: 'Platform',
      idPrefix: 't',
      panel
    });
    const tab = (n: string) => screen.getByRole('tab', { name: n });
    await user.click(tab('A'));
    await user.keyboard('{ArrowLeft}');
    expect(tab('C')).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}');
    expect(tab('A')).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}');
    expect(tab('B')).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowLeft}');
    expect(tab('A')).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}{End}');
    expect(tab('C')).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}{Home}x');
    expect(tab('A')).toHaveAttribute('aria-selected', 'true');
    await user.click(tab('B'));
    expect(tab('B')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('a');
  });
});

describe('Header', () => {
  it('opens the apps panel, moves with arrows and closes with Escape or a click outside', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'pc' });
    const apps = screen.getByRole('button', { name: 'Apps' });
    expect(apps).toHaveAttribute('aria-current', 'page');
    await user.click(apps);
    expect(apps).toHaveAttribute('aria-expanded', 'true');
    const panel = document.getElementById('apps-panel')!;
    const links = within(panel).getAllByRole('link');
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['/pc', '/patcher-app', '/server', '/mods', '/download']);
    expect(links[0]).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(links[1]).toHaveFocus();
    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(links[4]).toHaveFocus();
    await user.keyboard('{ArrowRight}{ArrowLeft}a');
    expect(links[4]).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(apps).toHaveFocus();
    expect(document.getElementById('apps-panel')).toBeNull();
    await user.keyboard('{ArrowDown}');
    await user.click(apps);
    await user.click(document.body);
    expect(document.getElementById('apps-panel')).toBeNull();
    await user.click(apps);
    await user.click(apps);
    expect(document.getElementById('apps-panel')).toBeNull();
    await user.click(apps);
    await user.click(within(document.getElementById('apps-panel')!).getByRole('link', { name: /Server/ }));
    expect(document.getElementById('apps-panel')).toBeNull();
    for (const name of [/Mods/, /Help me choose/]) {
      await user.click(apps);
      await user.click(within(document.getElementById('apps-panel')!).getByRole('link', { name }));
      expect(document.getElementById('apps-panel')).toBeNull();
    }
  });

  it('links Docs in the site language and marks Get involved', () => {
    i18n.locale = 'kk';
    render(Header, { route: 'contribute', onHero: true });
    expect(document.querySelector('header')).toHaveClass('on-hero');
    expect(screen.getAllByRole('link', { name: /Құжаттама/ })[0]).toHaveAttribute('href', '/docs/kk/');
    expect(screen.getByRole('button', { name: 'Қосымшалар' })).not.toHaveAttribute('aria-current');
    expect(screen.getAllByRole('link', { name: 'Жобаға көмектесу' })[0]).toHaveAttribute('aria-current', 'page');
  });

  it('phone menu traps focus, closes with Escape and on navigation', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'home' });
    const open = screen.getByRole('button', { name: 'Open menu' });
    await user.click(open);
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(document.body).toHaveClass('menu-open');
    const close = within(dialog).getByRole('button', { name: 'Close menu' });
    expect(close).toHaveFocus();
    const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button');
    const last = focusable[focusable.length - 1];
    last.focus();
    await user.tab();
    expect(focusable[0]).toHaveFocus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    await user.tab({ shift: true });
    await user.keyboard('a');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(open).toHaveFocus();
    await user.click(open);
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    for (const name of [/Blockheads PC/, /Mods/, 'Get involved', 'About & legal', 'Download']) {
      await user.click(open);
      await user.click(within(screen.getByRole('dialog')).getAllByRole('link', { name })[0]);
      expect(screen.queryByRole('dialog')).toBeNull();
    }
  });
});

describe('Footer', () => {
  it('lists apps, help and project links', () => {
    i18n.locale = 'tr';
    render(Footer);
    const nav = screen.getByRole('navigation', { name: 'Alt bilgi' });
    expect(within(nav).getByRole('link', { name: 'Blockheads PC' })).toHaveAttribute('href', '/pc');
    expect(within(nav).getByRole('link', { name: /SSS|FAQ/ })).toHaveAttribute('href', '/docs/tr/faq');
  });
});

describe('ProductPage', () => {
  it('offers the visitor’s platform and real release data', async () => {
    ua('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    render(ProductPage, { id: 'pc', releases: RELEASES });
    expect(screen.getByRole('heading', { level: 1, name: 'Blockheads PC' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('link', { name: 'Download for macOS' })).toHaveAttribute(
        'href',
        expect.stringContaining('Blockheads.PC_0.1.0_aarch64.dmg')
      )
    );
    expect(screen.getByRole('link', { name: /0\.1\.0 · October 20, 2026/ })).toHaveAttribute('href', RELEASES.pc!.url);
    expect(screen.getByRole('link', { name: /Download\s*: Linux/ })).toHaveAttribute(
      'href',
      '/download?task=pc&device=linux'
    );
    expect(screen.getByRole('link', { name: 'Other platforms' })).toHaveAttribute('href', '/download?task=pc');
    expect(screen.getAllByRole('link', { name: /Get the game file/ })[0]).toHaveAttribute('href', '/docs/guides/get-apk');
  });

  it('keeps Windows when the platform has no download, and falls back to GitHub without data', () => {
    ua('Mozilla/5.0 (Linux; Android 14)');
    render(ProductPage, { id: 'pc', releases: NO_RELEASES });
    expect(screen.getByRole('link', { name: 'Download for Windows' })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-pc/releases'
    );
    expect(screen.getByRole('link', { name: 'Latest version on GitHub' })).toBeInTheDocument();
  });

  it('keeps Windows when the browser is unknown', () => {
    ua('curl/8');
    render(ProductPage, { id: 'server', releases: RELEASES });
    expect(screen.getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', expect.stringContaining('x64-setup.exe'));
  });

  it('Patcher opens the web app; Server shows commands for headless hosts', async () => {
    ua('Mozilla/5.0 (Windows NT 10.0)');
    render(ProductPage, { id: 'patcher', releases: RELEASES });
    expect(screen.getAllByRole('link', { name: /Open the web Patcher|^Open$/ }).map((l) => l.getAttribute('href'))).toEqual([
      '/patcher/',
      '/patcher/'
    ]);
    expect(screen.getByText('Game 1.7.6 found')).toBeInTheDocument();
    render(ProductPage, { id: 'server', releases: RELEASES });
    expect(screen.getByRole('tab', { name: 'Docker' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('ghcr.io/blockheads-club/blockheads-server:0.1.1');
    await userEvent.click(screen.getByRole('tab', { name: 'Linux' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('x86_64-unknown-linux-gnu');
  });

  it('Server without release data links to GitHub instead of commands', () => {
    ua('x');
    render(ProductPage, { id: 'server', releases: NO_RELEASES });
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.getByRole('link', { name: /Open GitHub Releases/ })).toHaveAttribute(
      'href',
      'https://github.com/Blockheads-Club/blockheads-server/releases'
    );
  });
});
