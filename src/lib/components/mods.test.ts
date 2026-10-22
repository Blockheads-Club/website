import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SAMPLE_INDEX } from '$lib/mods-index';
import { i18n } from '$lib/locale.svelte';
import type { Mod } from '$lib/mods';
import Badge from './Badge.svelte';
import Callout from './Callout.svelte';
import CopyText from './CopyText.svelte';
import ModBadges from './ModBadges.svelte';
import ModCard from './ModCard.svelte';

const byId = (id: string) => SAMPLE_INDEX.mods.find((m) => m.id === id) as Mod;
const txt = createRawSnippet(() => ({ render: () => '<span>x</span>' }));

afterEach(() => {
  i18n.locale = 'en';
  vi.useRealTimers();
});

describe('tones', () => {
  it('Badge and Callout have a red tone', () => {
    const { container } = render(Badge, { tone: 'bad', children: txt });
    expect(container.querySelector('.badge')).toHaveClass('b-bad');
    const call = render(Callout, { tone: 'bad', icon: 'alert', children: txt });
    expect(call.container.querySelector('.call')).toHaveClass('call-bad');
    const warn = render(Callout, { tone: 'warn', icon: 'alert', children: txt });
    expect(warn.container.querySelector('.call')).toHaveClass('call-warn');
  });
});

describe('ModBadges', () => {
  it('shows sides, client-required, permissions and native', () => {
    const minimap = byId('sample-minimap').versions[0];
    const { container, unmount } = render(ModBadges, { version: minimap });
    expect(container).toHaveTextContent('Server + client');
    expect(container).toHaveTextContent('Players need it');
    expect(container).toHaveTextContent('World: write');
    expect(container).toHaveTextContent('Messages');
    expect(container).not.toHaveTextContent('Native code');
    unmount();
    const native = render(ModBadges, { version: byId('sample-native-tools').versions[0] });
    expect(native.container).toHaveTextContent('Native code');
    expect(native.container).toHaveTextContent('Internet');
    expect(native.container).toHaveTextContent('Kick');
    expect(native.container).toHaveTextContent('World: read');
    native.unmount();
    const client = render(ModBadges, { version: byId('sample-skin-pack').versions[0] });
    expect(client.container).toHaveTextContent('Client');
    client.unmount();
    const server = render(ModBadges, { version: byId('hello-rust').versions[0] });
    expect(server.container).toHaveTextContent('Server');
  });
});

describe('ModCard', () => {
  it('links to the mod page with the newest usable version', () => {
    render(ModCard, { mod: byId('sample-lib') });
    expect(screen.getByRole('link')).toHaveAttribute('href', '/mods/sample-lib');
    expect(screen.getByRole('link')).toHaveTextContent('Version 1.1.0');
    expect(screen.getByRole('link')).toHaveTextContent('by sample-author');
  });
  it('marks drafts, warns about native code and handles all-yanked mods without a description', () => {
    const draft = render(ModCard, { mod: byId('hello-lua') });
    expect(draft.container).toHaveTextContent('Placeholder');
    draft.unmount();
    const native = render(ModCard, { mod: byId('sample-native-tools') });
    expect(native.container).toHaveTextContent('Runs native code outside the sandbox');
    native.unmount();
    const base = byId('sample-lib');
    const yanked: Mod = {
      ...base,
      description: undefined,
      versions: base.versions.map((v) => ({ ...v, yanked: true }))
    };
    const all = render(ModCard, { mod: yanked });
    expect(all.container).toHaveTextContent('All versions yanked');
    expect(all.container.querySelector('.s')).toBeNull();
  });
  it('renders Turkish', () => {
    i18n.locale = 'tr';
    render(ModCard, { mod: byId('sample-lib') });
    expect(screen.getByRole('link')).toHaveTextContent('Sürüm 1.1.0');
  });
});

describe('CopyText', () => {
  it('copies, confirms and resets', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(CopyText, { text: 'abc123', label: 'Copy the SHA-256' });
    expect(screen.getByText('abc123')).toHaveClass('mono');
    await user.click(screen.getByRole('button', { name: 'Copy the SHA-256' }));
    expect(writeText).toHaveBeenCalledWith('abc123');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/^\s*$/), { timeout: 3000 });
  });
  it('reports failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('no'));
    render(CopyText, { text: 'abc', label: 'Copy' });
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copy failed'));
  });
});
