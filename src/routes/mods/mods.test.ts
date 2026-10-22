import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { i18n } from '$lib/locale.svelte';
import type { Mod } from '$lib/mods';
import { SAMPLE_INDEX, resetModsIndexCache } from '$lib/mods-index';
import { load as layoutLoad } from './+layout.server';
import { load as listLoad } from './+page.server';
import List from './+page.svelte';
import { entries, load as detailLoad } from './[id]/+page.server';
import Detail from './[id]/+page.svelte';
import Submit from './submit/+page.svelte';

const mods = SAMPLE_INDEX.mods;
const byId = (id: string) => mods.find((m) => m.id === id) as Mod;
const ids = mods.map((m) => m.id);

beforeEach(() => {
  resetModsIndexCache();
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  resetModsIndexCache();
  i18n.locale = 'en';
});

describe('server loaders (build time, no network)', () => {
  it('fall back to the bundled sample and expose the mods', async () => {
    expect(await layoutLoad({} as never)).toEqual({ sample: true });
    expect(((await listLoad({} as never)) as { mods: Mod[] }).mods).toEqual(mods);
    expect(await (entries as () => Promise<{ id: string }[]>)()).toEqual(ids.map((id) => ({ id })));
    const detail = await detailLoad({ params: { id: 'hello-lua' } } as never);
    expect(detail).toEqual({ mod: byId('hello-lua'), ids });
  });
  it('404s for unknown mods', async () => {
    await expect(detailLoad({ params: { id: 'nope' } } as never)).rejects.toMatchObject({ status: 404 });
  });
});

describe('list page', () => {
  const cards = () => screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('/mods/') && a.classList.contains('card'));

  it('lists the mods with badges and the sample notice', () => {
    render(List, { data: { mods, sample: true } });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mods for The Blockheads');
    expect(screen.getByTestId('sample-notice')).toHaveTextContent('Sample data');
    expect(cards()).toHaveLength(mods.length);
    expect(screen.getByRole('link', { name: 'Submit a mod' })).toHaveAttribute('href', '/mods/submit');
    expect(screen.getByRole('link', { name: 'Make a mod' })).toHaveAttribute('href', '/docs/mods');
    expect(document.body).toHaveTextContent('Native code');
    expect(document.body).toHaveTextContent('Players need it');
  });

  it('hides the notice for a published index and searches', async () => {
    const user = userEvent.setup();
    render(List, { data: { mods, sample: false } });
    expect(screen.queryByTestId('sample-notice')).toBeNull();
    await user.type(screen.getByRole('searchbox', { name: 'Search mods' }), 'minimap');
    expect(cards()).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('1 mod shown');
    await user.clear(screen.getByRole('searchbox'));
    await user.type(screen.getByRole('searchbox'), 'no-such-mod');
    expect(screen.getByText('No mods match your search.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(cards()).toHaveLength(mods.length);
  });

  it('filters by tag', async () => {
    const user = userEvent.setup();
    render(List, { data: { mods, sample: false } });
    const group = screen.getByRole('group', { name: 'Filter by tag' });
    expect(within(group).getByRole('button', { name: 'All tags' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(within(group).getByRole('button', { name: 'admin' }));
    expect(cards()).toHaveLength(1);
    expect(within(group).getByRole('button', { name: 'admin' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(within(group).getByRole('button', { name: 'example' }));
    expect(cards()).toHaveLength(2);
    await user.click(within(group).getByRole('button', { name: 'All tags' }));
    expect(cards()).toHaveLength(mods.length);
  });

  it('links the docs in the current language', () => {
    i18n.locale = 'ru';
    render(List, { data: { mods, sample: true } });
    expect(screen.getByRole('link', { name: 'Сделать мод' })).toHaveAttribute('href', '/docs/ru/mods');
  });
});

describe('detail page', () => {
  const page = (id: string) => render(Detail, { data: { mod: byId(id), ids } });
  const rowOf = (version: string) => document.querySelector(`tr[data-version="${version}"]`) as HTMLElement;

  it('shows a draft mod with its fields', () => {
    page('hello-lua');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello (Lua)');
    expect(document.body).toHaveTextContent('Placeholder');
    expect(document.body).toHaveTextContent('This is a placeholder entry');
    expect(screen.getByRole('link', { name: 'Download 0.1.0' })).toHaveAttribute('href', byId('hello-lua').versions[0].url);
    expect(screen.getByText(byId('hello-lua').versions[0].sha256)).toHaveClass('mono');
    expect(rowOf('0.1.0')).toHaveClass('latest');
    expect(document.body).toHaveTextContent('1.5 KiB');
    expect(document.body).toHaveTextContent('Chat. Can send chat messages to players.');
    expect(document.body).toHaveTextContent('No other mods needed.');
    expect(document.body).toHaveTextContent('Blockheads-Club');
    expect(document.body).toHaveTextContent('example, lua');
    expect(document.body).toHaveTextContent('drop it into the server’s mods/ folder');
    expect(screen.getByRole('link', { name: 'Source code' })).toHaveAttribute('href', byId('hello-lua').repo);
  });

  it('shows no permissions for a mod without any', () => {
    page('hello-rust');
    expect(screen.getByText('Needs no special permissions.')).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent('Native code');
  });

  it('marks yanked versions, the latest one and the mirror, and lets you pick a version', async () => {
    const user = userEvent.setup();
    page('sample-lib');
    expect(rowOf('1.0.0')).toHaveClass('yanked');
    expect(within(rowOf('1.0.0')).getByText('Yanked')).toBeInTheDocument();
    expect(rowOf('1.1.0')).toHaveClass('latest');
    expect(within(rowOf('1.1.0')).getByText('Latest')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mirror 1.1.0' })).toHaveAttribute('href', expect.stringContaining('/mirror/'));
    expect(screen.queryByRole('link', { name: 'Mirror 1.0.0' })).toBeNull();
    expect(screen.getByRole('heading', { name: /1\.1\.0$/ })).toBeInTheDocument();
    await user.click(within(rowOf('1.0.0')).getByRole('button', { name: 'Show details' }));
    expect(screen.getByRole('heading', { name: /1\.0\.0$/ })).toBeInTheDocument();
    expect(within(rowOf('1.0.0')).getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(within(rowOf('1.0.0')).getByRole('button')).toHaveTextContent('Showing');
  });

  it('links dependencies that are in the index and flags the others', () => {
    page('sample-minimap');
    expect(screen.getByRole('link', { name: 'sample-lib' })).toHaveAttribute('href', '/mods/sample-lib');
    expect(screen.getByText('missing-mod')).toHaveClass('mono');
    expect(screen.getByText('(not in the index)')).toBeInTheDocument();
    expect(document.body).toHaveTextContent('World: write. Can change the world');
    expect(document.body).toHaveTextContent('Messages. Can send its own messages');
    expect(document.body).toHaveTextContent('Players need it');
  });

  it('warns loudly about native code and lists net-http hosts', () => {
    page('sample-native-tools');
    const warning = screen.getAllByRole('note').find((n) => n.classList.contains('call-bad'))!;
    expect(warning).toHaveTextContent('Native code: be careful');
    expect(document.body).toHaveTextContent('Internet. Can connect to these websites: api.example.invalid');
    expect(document.body).toHaveTextContent('Kick. Can kick players');
    expect(document.body).toHaveTextContent('Native code. Runs native code outside the sandbox');
  });

  it('copes with a mod that has only yanked versions, no description, no tags and a loader', () => {
    const base = byId('sample-lib');
    const mod: Mod = {
      ...base,
      description: undefined,
      tags: undefined,
      versions: [{ ...base.versions[0], yanked: true, loader: 'lua' }]
    };
    render(Detail, { data: { mod, ids } });
    expect(document.body).toHaveTextContent('Every version of this mod was yanked');
    expect(document.body).toHaveTextContent('No description.');
    expect(document.body).not.toHaveTextContent('Tags');
    expect(document.body).toHaveTextContent('Loader lua');
    expect(screen.queryByText('Latest')).toBeNull();
  });

  it('renders Turkish', () => {
    i18n.locale = 'tr';
    page('sample-lib');
    expect(screen.getByRole('heading', { name: 'Sürümler' })).toBeInTheDocument();
  });
});

describe('submit page', () => {
  it('explains the process, rules and CI checks', () => {
    render(Submit);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Submit a mod');
    expect(document.body).toHaveTextContent('mods/<first letter>/<id>.toml');
    expect(document.body).toHaveTextContent('needs-security-review');
    expect(document.body).toHaveTextContent('Versions are append-only');
    expect(document.body).toHaveTextContent('The repositories are not public yet'.replace('The repositories', 'The mod-sdk and mods repositories'));
    expect(screen.getByRole('link', { name: 'Open the mod SDK' })).toHaveAttribute('href', 'https://github.com/Blockheads-Club/mod-sdk');
    expect(screen.getByRole('link', { name: 'Open Blockheads-Club/mods' })).toHaveAttribute('href', 'https://github.com/Blockheads-Club/mods');
    expect(screen.getByRole('link', { name: 'Making a mod (docs)' })).toHaveAttribute('href', '/docs/mods');
    expect(document.querySelector('.call-bad')).not.toBeNull();
  });
  it('renders Kazakh docs link', async () => {
    i18n.locale = 'kk';
    render(Submit);
    await waitFor(() => expect(screen.getByRole('link', { name: 'Мод жасау (құжаттама)' })).toHaveAttribute('href', '/docs/kk/mods'));
  });
});
