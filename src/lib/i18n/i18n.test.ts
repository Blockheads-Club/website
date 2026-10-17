import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALES, dictionaries, isLocale } from './index';

function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${prefix}[${i}]`))];
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => shape(v, `${prefix}.${k}`));
  }
  return [prefix];
}

describe('i18n', () => {
  it('defaults to English and lists en + tr', () => {
    expect(DEFAULT_LOCALE).toBe('en');
    expect(LOCALES).toEqual(['en', 'tr']);
  });

  it('every dictionary has the same keys and array lengths as en', () => {
    const base = shape(dictionaries.en);
    for (const locale of LOCALES) {
      expect(shape(dictionaries[locale])).toEqual(base);
    }
  });

  it('has no empty strings', () => {
    for (const locale of LOCALES) {
      expect(JSON.stringify(dictionaries[locale])).not.toContain('""');
    }
  });

  it('isLocale validates', () => {
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});
