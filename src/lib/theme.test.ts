import { afterEach, describe, expect, it, vi } from 'vitest';
import { initTheme, setTheme, theme, toggleTheme } from './theme.svelte';

function mockMedia(dark: boolean) {
  vi.stubGlobal('matchMedia', () => ({ matches: dark }));
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe('theme', () => {
  it('follows system dark preference', () => {
    mockMedia(true);
    initTheme();
    expect(theme.value).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('follows system light preference', () => {
    mockMedia(false);
    initTheme();
    expect(theme.value).toBe('light');
  });

  it('prefers a stored value over the system', () => {
    mockMedia(true);
    localStorage.setItem('bh-theme', 'light');
    initTheme();
    expect(theme.value).toBe('light');
  });

  it('toggles both ways and persists', () => {
    setTheme('light');
    toggleTheme();
    expect(theme.value).toBe('dark');
    expect(localStorage.getItem('bh-theme')).toBe('dark');
    toggleTheme();
    expect(theme.value).toBe('light');
  });

  it('survives unavailable storage', () => {
    mockMedia(false);
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    initTheme();
    toggleTheme();
    expect(theme.value).toBe('dark');
  });
});

describe('theme preference', () => {
  it('system removes the stored value and follows the OS', async () => {
    const { setThemePref, cycleThemePref } = await import('./theme.svelte');
    mockMedia(true);
    setTheme('light');
    setThemePref('system');
    expect(theme.pref).toBe('system');
    expect(theme.value).toBe('dark');
    expect(localStorage.getItem('bh-theme')).toBeNull();
    cycleThemePref();
    expect(theme.pref).toBe('light');
    cycleThemePref();
    expect(theme.pref).toBe('dark');
    cycleThemePref();
    expect(theme.pref).toBe('system');
  });

  it('system survives unavailable storage', async () => {
    const { setThemePref } = await import('./theme.svelte');
    mockMedia(false);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    setThemePref('system');
    expect(theme.value).toBe('light');
  });
});
