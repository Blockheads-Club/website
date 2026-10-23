import { en, type Dict, type Plural } from './en';
import { kk } from './kk';
import { ru } from './ru';
import { tr } from './tr';

export const dictionaries = { en, tr, ru, kk } satisfies Record<string, Dict>;
export type Locale = keyof typeof dictionaries;
export const LOCALES = Object.keys(dictionaries) as Locale[];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in dictionaries;
}

/** Native names, shown as-is in every language. */
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', tr: 'Türkçe', ru: 'Русский', kk: 'Қазақша' };

/** VitePress docs locale folder for each site locale (English lives at the docs root). */
export const DOCS_DIRS: Record<Locale, string> = { en: '', tr: 'tr/', ru: 'ru/', kk: 'kk/' };

/** Path of a docs page (`''` = docs home, `faq`, `guides/lan-play` ...) in `locale`, relative to the base path. */
export function docsPath(locale: Locale, page = ''): string {
  return '/docs/' + DOCS_DIRS[locale] + page;
}

/** First supported locale among the browser's preferred languages (`ru-RU` → `ru`), else English. */
export function detectLocale(languages: readonly string[]): Locale {
  for (const tag of languages) {
    const code = tag.toLowerCase().split('-')[0];
    if (isLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

/** Picks the plural form for `n` with the locale's CLDR rules (Russian: one/few/many). */
export function plural(forms: Plural, n: number, locale: string): string {
  const category = new Intl.PluralRules(locale).select(n);
  return category in forms ? forms[category as keyof Plural] : forms.other;
}

function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  return Object.values(value as object).flatMap(leaves);
}

/** Share (0–100) of the English UI strings each locale has, counted from the dictionaries at build time. */
export function translationProgress(): Record<Locale, number> {
  const total = leaves(en).length;
  return Object.fromEntries(
    LOCALES.map((code) => [code, Math.round((leaves(dictionaries[code]).filter((s) => s.trim() !== '').length / total) * 100)])
  ) as Record<Locale, number>;
}
