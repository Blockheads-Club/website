import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Shot from '$lib/components/Shot.svelte';
import { ARTICLE_IDS } from '$lib/guides';
import { LOCALES, dictionaries } from '$lib/i18n';
import { i18n } from '$lib/locale.svelte';
import { GUIDE_SHOTS, SHOTS, type ShotName } from './shots';

const NAMES = Object.keys(SHOTS) as ShotName[];
// Every file under static/shots (paths only; nothing is loaded).
const FILES = Object.keys(import.meta.glob('/static/shots/**/*.webp'));

afterEach(() => {
  i18n.locale = 'en';
});

describe('screenshots', () => {
  it.each(LOCALES)('every screenshot has a file, alt text and a caption in %s', (locale) => {
    for (const name of NAMES) {
      expect(FILES).toContain('/static/shots/' + locale + '/' + name + '.webp');
      const text = dictionaries[locale].shots[name];
      expect(text.alt.length).toBeGreaterThan(30);
      expect(text.caption).not.toBe('');
    }
    expect(Object.keys(dictionaries[locale].shots).sort()).toEqual([...NAMES].sort());
  });

  it('has no unused files', () => {
    const used = NAMES.flatMap((name) => ['en', 'tr', 'ru', 'kk'].map((l) => '/static/shots/' + l + '/' + name + '.webp'));
    expect(FILES.filter((file) => !used.includes(file))).toEqual([]);
  });

  it('guide screenshots point at real guides', () => {
    for (const id of Object.keys(GUIDE_SHOTS)) expect(ARTICLE_IDS).toContain(id);
  });

  it('renders a lazy image in the current language, with a caption', () => {
    i18n.locale = 'tr';
    render(Shot, { name: 'server/dashboard' });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/shots/tr/server/dashboard.webp');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width', '1200');
    expect(img).toHaveAccessibleName(dictionaries.tr.shots['server/dashboard'].alt);
    expect(img.closest('figure')).not.toHaveClass('phone');
    expect(screen.getByText(dictionaries.tr.shots['server/dashboard'].caption).tagName).toBe('FIGCAPTION');
  });

  it('phone screens get the narrow frame', () => {
    render(Shot, { name: 'server/phone-dashboard' });
    expect(screen.getByRole('img').closest('figure')).toHaveClass('phone');
  });
});
