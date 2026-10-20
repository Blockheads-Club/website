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
const DOCS_DIRS: Record<Locale, string> = { en: '', tr: 'tr/', ru: 'ru/', kk: 'kk/' };

/** Path of the docs home in `locale`, relative to the base path. */
export function docsPath(locale: Locale): string {
  return '/docs/' + DOCS_DIRS[locale];
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
