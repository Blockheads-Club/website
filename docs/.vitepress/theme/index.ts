// Default VitePress theme (without its bundled Inter font), restyled with the site's "Sunlit Blocks" tokens.
import DefaultTheme from 'vitepress/theme-without-fonts';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/atkinson-hyperlegible-next/400.css';
import '@fontsource/atkinson-hyperlegible-next/500.css';
import '@fontsource/atkinson-hyperlegible-next/700.css';
import '@fontsource/jetbrains-mono/400.css';
// Cyrillic-only companions (Onest, Golos Text) for the ru/kk docs, shared with the site.
import '../../../src/lib/fonts/cyrillic.css';
import './style.css';

export default DefaultTheme;
