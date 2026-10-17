export type Theme = 'light' | 'dark';
export type ThemePref = Theme | 'system';

export const STORAGE_KEY = 'bh-theme';

/** `value` is the resolved theme; `pref` is what the visitor chose (`system` follows the OS). */
export const theme = $state<{ value: Theme; pref: ThemePref }>({ value: 'light', pref: 'system' });

function apply(value: Theme) {
  theme.value = value;
  document.documentElement.dataset.theme = value;
}

function systemTheme(): Theme {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(value: Theme) {
  theme.pref = value;
  apply(value);
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable: keep in memory only */
  }
}

export function setThemePref(pref: ThemePref) {
  if (pref !== 'system') {
    setTheme(pref);
    return;
  }
  theme.pref = 'system';
  apply(systemTheme());
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
}

const CYCLE: Record<ThemePref, ThemePref> = { system: 'light', light: 'dark', dark: 'system' };

export function cycleThemePref() {
  setThemePref(CYCLE[theme.pref]);
}

export function initTheme() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  if (stored === 'light' || stored === 'dark') {
    theme.pref = stored;
    apply(stored);
  } else {
    theme.pref = 'system';
    apply(systemTheme());
  }
}
