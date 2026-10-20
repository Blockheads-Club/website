import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '$lib/locale.svelte';
import { setTheme, setThemePref, theme } from '$lib/theme.svelte';
import Badge from './Badge.svelte';
import Breadcrumb from './Breadcrumb.svelte';
import Button from './Button.svelte';
import Callout from './Callout.svelte';
import Chip from './Chip.svelte';
import CodeBlock from './CodeBlock.svelte';
import FaqItem from './FaqItem.svelte';
import Footer from './Footer.svelte';
import GuideCard from './GuideCard.svelte';
import Header from './Header.svelte';
import Icon from './Icon.svelte';
import LangSwitch from './LangSwitch.svelte';
import Rich from './Rich.svelte';
import StepNumber from './StepNumber.svelte';
import Tabs from './Tabs.svelte';
import Toc from './Toc.svelte';
import Wordmark from './Wordmark.svelte';

const txt = (t: string) => createRawSnippet(() => ({ render: () => `<span>${t}</span>` }));

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
});
afterEach(() => {
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
    render(Button, {
      href: '/x',
      variant: 'primary',
      size: 'lg',
      icon: 'check',
      iconEnd: 'arrow-r',
      hero: true,
      children: txt('Go')
    });
    expect(screen.getByRole('link', { name: 'Go' })).toHaveClass('btn', 'btn-p', 'btn-lg', 'btn-hero');
    render(Button, { variant: 'ghost', size: 'sm', iconOnly: true, 'aria-label': 'B', onclick });
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onclick).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'B' })).toHaveClass('btn-g', 'btn-sm', 'btn-ic');
  });

  it('Badge, StepNumber, Callout', () => {
    render(Badge, { tone: 'ok', dot: true, icon: 'wifi', children: txt('Ready') });
    expect(screen.getByText('Ready').parentElement).toHaveClass('b-ok');
    render(StepNumber, { n: 7 });
    expect(screen.getByText('7')).toBeInTheDocument();
    render(Callout, { tone: 'warn', icon: 'alert', children: txt('careful') });
    expect(screen.getByRole('note')).toHaveClass('call-warn');
    render(Callout, { tone: 'info', icon: 'info', children: txt('fyi') });
    expect(screen.getAllByRole('note')[1]).toHaveClass('call-info');
  });

  it('Chip toggles pressed state', async () => {
    const onclick = vi.fn();
    render(Chip, { pressed: true, icon: 'patch', onclick, children: txt('Patcher') });
    const chip = screen.getByRole('button', { name: 'Patcher' });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(chip);
    expect(onclick).toHaveBeenCalled();
    render(Chip, { pressed: false, onclick, children: txt('Plain') });
  });

  it('Rich resolves links and markup', () => {
    render(Rich, { text: 'x **b** `m` {{[P]}} [g](guides) [i](faq)' });
    expect(screen.getByText('b').tagName).toBe('STRONG');
    expect(screen.getByText('[P]')).toHaveClass('ph');
    expect(screen.getByRole('link', { name: 'g' })).toHaveAttribute('href', '/guides');
  });

  it('Rich links to the server page and to each written guide', () => {
    render(Rich, { text: '[s](server) [k](signingKey) [l](lanPlay)' });
    expect(screen.getByRole('link', { name: 's' })).toHaveAttribute('href', '/server');
    expect(screen.getByRole('link', { name: 'k' })).toHaveAttribute('href', '/guides/signing-key');
    expect(screen.getByRole('link', { name: 'l' })).toHaveAttribute('href', '/guides/lan-play');
  });

  it('Wordmark links home', () => {
    render(Wordmark);
    expect(screen.getByRole('link', { name: 'Blockheads Club home' })).toHaveAttribute('href', '/');
  });

  it('Breadcrumb marks the current page', () => {
    render(Breadcrumb, { label: 'Crumbs', items: [{ label: 'A', href: '/a' }, { label: 'B' }] });
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByText('B')).toHaveAttribute('aria-current', 'page');
  });

  it('FaqItem is a details element', () => {
    render(FaqItem, { q: 'Q?', a: 'A [x](faq)', open: true, large: true });
    expect(screen.getByText('Q?').closest('details')).toHaveAttribute('open');
    render(FaqItem, { q: 'Q2', a: 'A2' });
    expect(screen.getByText('Q2').closest('details')).not.toHaveAttribute('open');
  });

  it('Toc tracks the clicked entry', async () => {
    render(Toc, { label: 'L', heading: 'H', items: [{ id: 'a', label: 'One' }, { id: 'b', label: 'Two' }] });
    expect(screen.getByRole('link', { name: 'One' })).toHaveAttribute('aria-current', 'true');
    await userEvent.click(screen.getByRole('link', { name: 'Two' }));
    expect(screen.getByRole('link', { name: 'Two' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'One' })).not.toHaveAttribute('aria-current');
  });
});

describe('CodeBlock', () => {
  const lines = [[['pr', '$ '], ['plain', 'echo hi'], ['cm', ' # c']]] as const;

  it('copies commands and confirms, then resets', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(CodeBlock, { lines });
    await user.click(screen.getByRole('button', { name: 'Copy command' }));
    expect(writeText).toHaveBeenCalledWith('echo hi');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/^\s*$/), { timeout: 3000 });
  });

  it('reports failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('no'));
    render(CodeBlock, { lines });
    await user.click(screen.getByRole('button', { name: 'Copy command' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copy failed'));
  });

  it('can hide the copy button', () => {
    render(CodeBlock, { lines, copyable: false });
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('Tabs', () => {
  it('selects by click and keyboard', async () => {
    const user = userEvent.setup();
    const panel = createRawSnippet<[string]>(() => ({ render: () => '<p>panel</p>' }));
    render(Tabs, {
      tabs: [
        { id: 'a', label: 'A', icon: 'check' },
        { id: 'b', label: 'B', icon: 'check' },
        { id: 'c', label: 'C', icon: 'check' }
      ],
      selected: 'a',
      label: 'T',
      idPrefix: 'x',
      panel
    });
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'x-tab-a');
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'x-tab-b');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();
    await user.keyboard('x');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('LangSwitch', () => {
  it('opens a menu, picks a language, closes on Escape and outside click', async () => {
    const user = userEvent.setup();
    render(LangSwitch);
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    await user.click(trigger);
    expect(screen.getByRole('menuitemradio', { name: /English/ })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitemradio', { name: /Türkçe/ })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitemradio', { name: /English/ })).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    await user.keyboard('a');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(document.body);
    expect(screen.queryByRole('menu')).toBeNull();

    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByRole('menu')).toBeNull();
    await user.keyboard('{Escape}');

    await user.click(trigger);
    await user.click(screen.getByRole('menuitemradio', { name: /Türkçe/ }));
    expect(i18n.locale).toBe('tr');
    expect(screen.getByRole('button', { name: 'Dil: Türkçe' })).toHaveFocus();
  });

  it('footer variant shows the full name', async () => {
    render(LangSwitch, { variant: 'footer' });
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toHaveClass('up');
    expect(screen.getByRole('button', { name: 'Language: English' })).toHaveTextContent('English');
  });
});

describe('GuideCard', () => {
  it.each(['home', 'list', 'featured'] as const)('renders %s variants for written guides', (variant) => {
    render(GuideCard, { id: 'fix-game-on-phone', variant });
    expect(screen.getByRole('link', { name: /Fix the game on your phone/ })).toHaveAttribute(
      'href',
      '/guides/fix-game-on-phone'
    );
    render(GuideCard, { id: 'raspberry-pi', variant });
    expect(screen.getByRole('link', { name: /Raspberry Pi/ })).toHaveAttribute('href', '/guides/raspberry-pi');
    expect(screen.queryByText('Coming soon')).toBeNull();
  });

  it('server featured and beginner server tones', () => {
    render(GuideCard, { id: 'lan-play', variant: 'featured' });
    render(GuideCard, { id: 'lan-play', variant: 'home' });
    expect(screen.getAllByText(/Server/).length).toBeGreaterThan(0);
  });
});

describe('Header', () => {
  it('has links with current page and toggles the theme', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'article', hero: true });
    expect(screen.getAllByRole('link', { name: 'Guides' })[0]).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(theme.value).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });

  it('marks server and faq as current', () => {
    render(Header, { route: 'server' });
    expect(screen.getAllByRole('link', { name: 'Server' })[0]).toHaveAttribute('aria-current', 'page');
    render(Header, { route: 'faq' });
    expect(screen.getAllByRole('link', { name: 'FAQ' })[1]).toHaveAttribute('aria-current', 'page');
  });

  it('links the VitePress docs with a full page load', () => {
    render(Header, { route: 'home' });
    const docs = screen.getByRole('link', { name: 'Docs' });
    expect(docs).toHaveAttribute('href', '/docs/');
    expect(docs).toHaveAttribute('rel', 'external');
    expect(screen.getByRole('link', { name: 'FAQ' })).not.toHaveAttribute('rel');
  });

  it('opens and closes the menu sheet, traps focus, changes language and theme', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'home' });
    const open = screen.getByRole('button', { name: 'Open menu' });
    expect(open).toHaveAttribute('aria-expanded', 'false');
    await user.click(open);
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(document.body).toHaveClass('menu-open');
    const close = screen.getByRole('button', { name: 'Close menu' });
    expect(close).toHaveFocus();

    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
    // wrap forwards from the last control
    const radios = screen.getAllByRole('radio');
    radios[radios.length - 1].focus();
    await user.tab();
    expect(screen.getAllByRole('link', { name: 'Blockheads Club home' })[1]).toHaveFocus();
    await user.tab({ shift: true });
    expect(radios[radios.length - 1]).toHaveFocus();
    await user.tab();
    await user.tab({ shift: true });

    await user.selectOptions(screen.getByLabelText('Language'), 'tr');
    expect(i18n.locale).toBe('tr');
    await user.click(screen.getByRole('radio', { name: 'Koyu' }));
    expect(theme.pref).toBe('dark');
    await user.click(screen.getByRole('radio', { name: 'Sistem' }));
    expect(theme.pref).toBe('system');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body).not.toHaveClass('menu-open');
    expect(screen.getByRole('button', { name: 'Menüyü aç' })).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Menüyü aç' }));
    await user.click(screen.getByRole('button', { name: 'Menüyü kapat' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Menüyü aç' }));
    await user.click(within(screen.getByRole('dialog')).getAllByRole('link', { name: 'Sunucu' })[0]);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('marks the current page inside the menu', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'server' });
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(within(screen.getByRole('dialog')).getByRole('link', { name: 'Server' })).toHaveAttribute('aria-current', 'page');
  });

  it('ignores unknown language values', async () => {
    const user = userEvent.setup();
    render(Header, { route: 'home' });
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const select = screen.getByLabelText('Language') as HTMLSelectElement;
    select.add(new Option('Deutsch', 'de'));
    await user.selectOptions(select, 'de');
    expect(i18n.locale).toBe('en');
  });
});

describe('Footer', () => {
  it('rich footer cycles the theme preference', async () => {
    const user = userEvent.setup();
    setThemePref('system');
    render(Footer, { route: 'home', rich: true });
    expect(screen.getByRole('link', { name: 'Legal notice' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'System theme' }));
    expect(screen.getByRole('button', { name: 'Light theme' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Light theme' }));
    expect(screen.getByRole('button', { name: 'Dark theme' })).toBeInTheDocument();
  });

  it('rich footer marks the legal page', () => {
    render(Footer, { route: 'legal', rich: true });
    expect(screen.getByRole('link', { name: 'Legal notice' })).toHaveAttribute('aria-current', 'page');
  });

  it('slim footer', () => {
    render(Footer, { route: 'faq' });
    expect(screen.getByText(/Unofficial community project/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Legal/ })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('rel', 'external');
  });

  it('slim footer on legal page', () => {
    render(Footer, { route: 'legal' });
    expect(screen.getAllByRole('link', { name: /Legal/ })).toHaveLength(1);
  });
});
