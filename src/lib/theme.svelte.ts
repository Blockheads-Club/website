export type Theme = 'light' | 'dark';

export const STORAGE_KEY = 'bh-theme';

export const theme = $state<{ value: Theme }>({ value: 'light' });

export function setTheme(value: Theme) {
  theme.value = value;
  document.documentElement.dataset.theme = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable: keep in memory only */
  }
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored);
  } else {
    setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
}
