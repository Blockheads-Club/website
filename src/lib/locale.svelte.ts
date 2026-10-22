import { DEFAULT_LOCALE, detectLocale, dictionaries, isLocale, type Locale } from './i18n';

export const STORAGE_KEY = 'bh-locale';

export const i18n = $state<{ locale: Locale }>({ locale: DEFAULT_LOCALE });

export function dict() {
  return dictionaries[i18n.locale];
}

export function setLocale(locale: Locale) {
  i18n.locale = locale;
  document.documentElement.lang = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* storage unavailable: keep in memory only */
  }
}

/** The saved choice, else the browser language (ru-RU → ru, kk → kk), else English. */
export function preferredLocale(): Locale {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  return isLocale(stored) ? stored : detectLocale(navigator.languages);
}

export function initLocale() {
  setLocale(preferredLocale());
}
