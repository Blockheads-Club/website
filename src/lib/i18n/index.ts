import { en, type Dict } from './en';
import { tr } from './tr';

export const dictionaries = { en, tr } satisfies Record<string, Dict>;
export type Locale = keyof typeof dictionaries;
export const LOCALES = Object.keys(dictionaries) as Locale[];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in dictionaries;
}

/** Native names, shown as-is in every language. */
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', tr: 'Türkçe' };
