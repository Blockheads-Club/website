import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALES, LOCALE_NAMES, detectLocale, dictionaries, docsPath, isLocale, plural } from './index';

function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${prefix}[${i}]`))];
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => shape(v, `${prefix}.${k}`));
  }
  return [prefix];
}

/** Every string leaf with its path. */
function leaves(value: unknown, prefix = ''): [string, string][] {
  if (typeof value === 'string') return [[prefix, value]];
  return Object.entries(value as object).flatMap(([k, v]) => leaves(v, prefix + '.' + k));
}

/** Inline markup that must survive translation: link targets, code spans, bold markers and placeholders. */
function markup(text: string) {
  return {
    links: (text.match(/\]\([^)]*\)/g) ?? []).sort(),
    code: (text.match(/`[^`]*`/g) ?? []).sort(),
    bold: (text.match(/\*\*/g) ?? []).length,
    placeholders: (text.match(/\{\{[^}]*\}\}/g) ?? []).length
  };
}

describe('i18n', () => {
  it('defaults to English and lists en, tr, ru, kk', () => {
    expect(DEFAULT_LOCALE).toBe('en');
    expect(LOCALES).toEqual(['en', 'tr', 'ru', 'kk']);
    expect(LOCALE_NAMES).toEqual({ en: 'English', tr: 'Türkçe', ru: 'Русский', kk: 'Қазақша' });
  });

  it.each(LOCALES)('%s has the same keys and array lengths as en', (locale) => {
    expect(shape(dictionaries[locale])).toEqual(shape(dictionaries.en));
  });

  it.each(LOCALES)('%s keeps every link, code span, bold marker and placeholder of en', (locale) => {
    const target = new Map(leaves(dictionaries[locale]));
    for (const [path, text] of leaves(dictionaries.en)) {
      expect(markup(target.get(path)!), locale + path).toEqual(markup(text));
    }
  });

  it.each(['ru', 'kk'] as const)('%s keeps the English placeholder text verbatim', (locale) => {
    const target = new Map(leaves(dictionaries[locale]));
    for (const [path, text] of leaves(dictionaries.en)) {
      expect(target.get(path)!.match(/\{\{[^}]*\}\}/g), locale + path).toEqual(text.match(/\{\{[^}]*\}\}/g));
    }
  });

  it.each(['ru', 'kk'] as const)('%s is written in Cyrillic', (locale) => {
    expect(dictionaries[locale].nav.guides).toMatch(/^[Ѐ-ӿ ]+$/);
    expect(dictionaries[locale].home.hero.title).toMatch(/[Ѐ-ӿ]/);
  });

  it('has no empty strings', () => {
    for (const locale of LOCALES) {
      expect(JSON.stringify(dictionaries[locale])).not.toContain('""');
    }
  });

  it('isLocale validates', () => {
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('ru')).toBe(true);
    expect(isLocale('kk')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });

  it('detectLocale follows the first supported browser language', () => {
    expect(detectLocale(['ru-RU', 'en'])).toBe('ru');
    expect(detectLocale(['de-DE', 'kk-KZ'])).toBe('kk');
    expect(detectLocale(['KK'])).toBe('kk');
    expect(detectLocale(['tr'])).toBe('tr');
    expect(detectLocale(['de', 'fr'])).toBe('en');
    expect(detectLocale([])).toBe('en');
  });

  it('docsPath points at the matching VitePress locale', () => {
    expect(docsPath('en')).toBe('/docs/');
    expect(docsPath('tr')).toBe('/docs/tr/');
    expect(docsPath('ru')).toBe('/docs/ru/');
    expect(docsPath('kk')).toBe('/docs/kk/');
  });

  it('plural uses the CLDR rules of each locale', () => {
    const forms = { one: 'one', few: 'few', many: 'many', other: 'other' };
    expect([1, 3, 5, 21, 22, 25, 11].map((n) => plural(forms, n, 'ru'))).toEqual(['one', 'few', 'many', 'one', 'few', 'many', 'many']);
    expect([1, 2, 5].map((n) => plural(forms, n, 'en'))).toEqual(['one', 'other', 'other']);
    expect([1, 5].map((n) => plural(forms, n, 'kk'))).toEqual(['one', 'other']);
    // Categories a dictionary does not carry (Arabic "two") fall back to "other".
    expect(plural(forms, 2, 'ar')).toBe('other');
  });

  it('Russian counts read naturally', () => {
    const { resultsStatus } = dictionaries.ru.guides;
    expect(new Set([plural(resultsStatus, 1, 'ru'), plural(resultsStatus, 3, 'ru'), plural(resultsStatus, 10, 'ru')]).size).toBe(3);
  });
});
