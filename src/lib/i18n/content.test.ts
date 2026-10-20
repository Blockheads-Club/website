import { describe, expect, it } from 'vitest';
import { LOCALES, dictionaries } from './index';

// Guards against unfinished copy shipping: `{{…}}` placeholders, TODO/TBD notes and template leftovers.
describe('dictionary content', () => {
  it.each(LOCALES)('%s has no placeholders or leftovers', (locale) => {
    const text = JSON.stringify(dictionaries[locale]);
    expect(text).not.toContain('{{');
    expect(text).not.toMatch(/\b(TODO|TBD|FIXME|lorem ipsum)\b|example\.com|\[(SCREENSHOT|DATE|VERSION)/i);
  });
});
