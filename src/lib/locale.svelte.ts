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

export function initLocale() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  // No saved choice yet: follow the browser language (ru-RU → ru, kk → kk), English otherwise.
  setLocale(isLocale(stored) ? stored : detectLocale(navigator.languages));
}
