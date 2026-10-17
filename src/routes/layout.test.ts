import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '$lib/locale.svelte';
import { prerender } from './+layout';
import Layout from './+layout.svelte';
import Page from './+page.svelte';

const children = createRawSnippet(() => ({ render: () => '<p>child</p>' }));

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
});
afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
  i18n.locale = 'en';
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
    expect(meta('meta[property="og:image"]')).toBe(
      'https://blockheads-club.github.io/website/social-preview.png'
    );
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(screen.getAllByRole('link', { name: 'Blockheads Club' })[0].querySelector('img')).not.toBeNull();
  });

  it('switches language and theme from the header', async () => {
    const user = userEvent.setup();
    render(Layout, { children });
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'TR' }));
    expect(screen.getByRole('link', { name: 'Yamalayıcı' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('tr');

    await user.click(screen.getByRole('button', { name: 'Koyu temaya geç' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    await user.click(screen.getByRole('button', { name: 'Açık temaya geç' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

describe('page', () => {
  it('has all sections and the required links', () => {
    render(Page);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Keep The Blockheads playable.');
    for (const name of ['Patcher', 'Server', 'Guides', 'FAQ', 'Legal notice']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://blockheads-club.github.io/blockheads-patcher/');
    expect(hrefs).toContain('https://github.com/Blockheads-Club/blockheads-server');
    expect(hrefs).toContain('https://github.com/Blockheads-Club/blockheads-patcher/releases');
    expect(screen.getByText(/not affiliated with, endorsed by/)).toBeInTheDocument();
    expect(screen.getByText(/do not distribute any game files/)).toBeInTheDocument();
  });

  it('renders guides as ordered lists and FAQ as details', () => {
    render(Page);
    expect(screen.getAllByRole('list').length).toBeGreaterThan(3);
    expect(screen.getByText('Do you distribute the game?').closest('details')).not.toBeNull();
  });

  it('renders Turkish content', () => {
    i18n.locale = 'tr';
    render(Page);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('oynanabilir');
  });
});
