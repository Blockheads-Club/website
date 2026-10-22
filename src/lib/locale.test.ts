import { afterEach, describe, expect, it, vi } from 'vitest';
import { dict, i18n, initLocale, setLocale } from './locale.svelte';

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  i18n.locale = 'en';
});

describe('locale', () => {
  it('defaults to English when nothing is stored', () => {
    initLocale();
    expect(i18n.locale).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores a stored locale', () => {
    localStorage.setItem('bh-locale', 'tr');
    initLocale();
    expect(i18n.locale).toBe('tr');
    expect(dict().nav.docs).toBe('Dokümanlar');
  });

  it('follows the browser language when nothing is stored', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ru-RU', 'en-US']);
    initLocale();
    expect(i18n.locale).toBe('ru');
    expect(document.documentElement.lang).toBe('ru');
  });

  it('detects Kazakh, but a stored choice wins over the browser', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['kk-KZ']);
    initLocale();
    expect(i18n.locale).toBe('kk');
    localStorage.setItem('bh-locale', 'en');
    initLocale();
    expect(i18n.locale).toBe('en');
  });

  it('ignores an invalid stored locale', () => {
    localStorage.setItem('bh-locale', 'xx');
    initLocale();
    expect(i18n.locale).toBe('en');
  });

  it('setLocale persists and updates <html lang>', () => {
    setLocale('tr');
    expect(localStorage.getItem('bh-locale')).toBe('tr');
    expect(document.documentElement.lang).toBe('tr');
  });

  it('survives unavailable storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    initLocale();
    setLocale('tr');
    expect(i18n.locale).toBe('tr');
  });
});
