import { defineConfig, type DefaultTheme } from 'vitepress';

// Same BASE_PATH as the SvelteKit site ("/website" on GitHub Pages, empty elsewhere); the docs live under <base>/docs/.
const siteBase = process.env.BASE_PATH ?? '';

const GITHUB = 'https://github.com/Blockheads-Club';

/** Per-language UI strings. Page paths are the same in every language. */
interface Strings {
  /** Locale folder ('' for English at the root). */
  dir: string;
  label: string;
  lang: string;
  description: string;
  site: string;
  docs: string;
  pages: { start: string; pc: string; patcher: string; server: string; faq: string };
  /** Sidebar group for docs/<dir>/guides/, guide id → title. */
  guides: { title: string; items: Record<string, string> };
  outline: string;
  prev: string;
  next: string;
  menu: string;
  toTop: string;
  appearance: string;
  light: string;
  dark: string;
  language: string;
  notFound: string;
  goHome: string;
  footer: string;
  search: { button: string; placeholder: string; noResults: string; reset: string; select: string; navigate: string; close: string };
}

function themeConfig(s: Strings): DefaultTheme.Config {
  const p = '/' + (s.dir ? s.dir + '/' : '');
  // A relative link is not prefixed with the docs base, so it leads back to the main site in every deployment
  // (GitHub Pages under /website, Cloudflare Pages at the root). target=_self makes it a full page load.
  const siteRoot = s.dir ? '../../' : '../';
  return {
    logo: { src: '/logo.svg', alt: '' },
    siteTitle: 'Blockheads Club',
    logoLink: { link: siteRoot, target: '_self' },
    nav: [
      { text: s.docs, link: p, activeMatch: '^' + p + '$' },
      { text: s.site, link: siteRoot, target: '_self' }
    ],
    sidebar: [
      {
        text: s.docs,
        items: [
          { text: s.pages.start, link: p },
          { text: s.pages.pc, link: p + 'pc-port' },
          { text: s.pages.patcher, link: p + 'patcher' },
          { text: s.pages.server, link: p + 'server' },
          { text: s.pages.faq, link: p + 'faq' }
        ]
      },
      {
        text: s.guides.title,
        collapsed: false,
        items: [
          { text: s.guides.title, link: p + 'guides/' },
          ...Object.entries(s.guides.items).map(([id, text]) => ({ text, link: p + 'guides/' + id }))
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: GITHUB }],
    outline: { level: [2, 3], label: s.outline },
    docFooter: { prev: s.prev, next: s.next },
    sidebarMenuLabel: s.menu,
    returnToTopLabel: s.toTop,
    darkModeSwitchLabel: s.appearance,
    lightModeSwitchTitle: s.light,
    darkModeSwitchTitle: s.dark,
    langMenuLabel: s.language,
    notFound: { title: s.notFound, linkText: s.goHome, linkLabel: s.goHome, quote: '' },
    footer: { message: s.footer, copyright: 'GPL-3.0-or-later' }
  };
}

const en: Strings = {
  dir: '',
  label: 'English',
  lang: 'en',
  description: 'How to install and use the Blockheads Club tools: Blockheads PC, Patcher and Server.',
  site: 'Main site',
  docs: 'Docs',
  pages: { start: 'Getting started', pc: 'Blockheads PC', patcher: 'Patcher', server: 'Server', faq: 'FAQ' },
  guides: {
    title: 'Guides',
    items: {
      'fix-game-on-phone': 'Fix the game on your phone, start to finish',
      'lan-play': 'Play with friends on the same Wi-Fi',
      'backup-worlds': 'Back up your worlds before patching',
      'get-apk': 'Get the APK of the game you own',
      'signing-key': 'Keep your signing key safe',
      'raspberry-pi': 'Run a 24/7 server on a Raspberry Pi',
      'open-internet': 'Open your server to the internet',
      'admins-mods': 'Admins, mods and bans explained',
      'host-android': 'Host from an Android phone',
      'docker': 'Docker and Docker Compose'
    }
  },
  outline: 'On this page',
  prev: 'Previous page',
  next: 'Next page',
  menu: 'Menu',
  toTop: 'Back to top',
  appearance: 'Appearance',
  light: 'Switch to light theme',
  dark: 'Switch to dark theme',
  language: 'Change language',
  notFound: 'Page not found',
  goHome: 'Back to the docs',
  footer: 'Unofficial community project. Not affiliated with Majic Jungle Software or Noodlecake. No game files are included.',
  search: {
    button: 'Search',
    placeholder: 'Search the docs',
    noResults: 'No results for',
    reset: 'Clear search',
    select: 'to select',
    navigate: 'to navigate',
    close: 'to close'
  }
};

const tr: Strings = {
  dir: 'tr',
  label: 'Türkçe',
  lang: 'tr',
  description: 'Blockheads Club araçlarının kurulumu ve kullanımı: Blockheads PC, Patcher ve Sunucu.',
  site: 'Ana site',
  docs: 'Dokümanlar',
  pages: { start: 'Başlarken', pc: 'Blockheads PC', patcher: 'Patcher', server: 'Sunucu', faq: 'SSS' },
  guides: {
    title: 'Rehberler',
    items: {
      'fix-game-on-phone': 'Oyunu telefonunda baştan sona düzelt',
      'lan-play': 'Aynı Wi-Fi ağındaki arkadaşlarla oyna',
      'backup-worlds': 'Yamalamadan önce dünyalarını yedekle',
      'get-apk': 'Sahip olduğun oyunun APK’sını al',
      'signing-key': 'İmza anahtarını güvende tut',
      'raspberry-pi': 'Raspberry Pi’de 7/24 sunucu çalıştır',
      'open-internet': 'Sunucunu internete aç',
      'admins-mods': 'Yöneticiler, moderatörler ve yasaklar',
      'host-android': 'Android telefondan barındır',
      'docker': 'Docker ve Docker Compose'
    }
  },
  outline: 'Bu sayfada',
  prev: 'Önceki sayfa',
  next: 'Sonraki sayfa',
  menu: 'Menü',
  toTop: 'Başa dön',
  appearance: 'Görünüm',
  light: 'Açık temaya geç',
  dark: 'Koyu temaya geç',
  language: 'Dili değiştir',
  notFound: 'Sayfa bulunamadı',
  goHome: 'Dokümanlara dön',
  footer: 'Resmî olmayan topluluk projesi. Majic Jungle Software veya Noodlecake ile bağlantısı yoktur. Oyun dosyası içermez.',
  search: {
    button: 'Ara',
    placeholder: 'Dokümanlarda ara',
    noResults: 'Sonuç yok:',
    reset: 'Aramayı temizle',
    select: 'seç',
    navigate: 'gezin',
    close: 'kapat'
  }
};

const ru: Strings = {
  dir: 'ru',
  label: 'Русский',
  lang: 'ru',
  description: 'Как установить и использовать инструменты Blockheads Club: Blockheads PC, Patcher и Сервер.',
  site: 'Главный сайт',
  docs: 'Документация',
  pages: { start: 'Начало работы', pc: 'Blockheads PC', patcher: 'Patcher', server: 'Сервер', faq: 'Вопросы и ответы' },
  guides: {
    title: 'Руководства',
    items: {
      'fix-game-on-phone': 'Починить игру на телефоне от начала до конца',
      'lan-play': 'Играть с друзьями по одной сети Wi-Fi',
      'backup-worlds': 'Резервная копия миров перед патчем',
      'get-apk': 'Как получить APK своей игры',
      'signing-key': 'Берегите ключ подписи',
      'raspberry-pi': 'Сервер 24/7 на Raspberry Pi',
      'open-internet': 'Открыть сервер для интернета',
      'admins-mods': 'Админы, модераторы и баны',
      'host-android': 'Сервер на Android-телефоне',
      'docker': 'Docker и Docker Compose'
    }
  },
  outline: 'На этой странице',
  prev: 'Предыдущая страница',
  next: 'Следующая страница',
  menu: 'Меню',
  toTop: 'Наверх',
  appearance: 'Оформление',
  light: 'Светлая тема',
  dark: 'Тёмная тема',
  language: 'Сменить язык',
  notFound: 'Страница не найдена',
  goHome: 'Вернуться к документации',
  footer: 'Неофициальный проект сообщества. Не связан с Majic Jungle Software или Noodlecake. Файлы игры не включены.',
  search: {
    button: 'Поиск',
    placeholder: 'Поиск по документации',
    noResults: 'Ничего не найдено:',
    reset: 'Очистить',
    select: 'выбрать',
    navigate: 'перейти',
    close: 'закрыть'
  }
};

const kk: Strings = {
  dir: 'kk',
  label: 'Қазақша',
  lang: 'kk',
  description: 'Blockheads Club құралдарын орнату және пайдалану: Blockheads PC, Patcher және Сервер.',
  site: 'Басты сайт',
  docs: 'Құжаттама',
  pages: { start: 'Бастау', pc: 'Blockheads PC', patcher: 'Patcher', server: 'Сервер', faq: 'Жиі сұрақтар' },
  guides: {
    title: 'Нұсқаулықтар',
    items: {
      'fix-game-on-phone': 'Ойынды телефонда басынан аяғына дейін жөндеу',
      'lan-play': 'Достармен бір Wi-Fi желісінде ойнау',
      'backup-worlds': 'Патчтамас бұрын әлемдерді сақтау',
      'get-apk': 'Өзіңізде бар ойынның APK файлын алу',
      'signing-key': 'Қолтаңба кілтін сақтаңыз',
      'raspberry-pi': 'Raspberry Pi-да тәулік бойы сервер',
      'open-internet': 'Серверді интернетке ашу',
      'admins-mods': 'Админдер, модераторлар және бандар',
      'host-android': 'Android телефонда сервер ашу',
      'docker': 'Docker және Docker Compose'
    }
  },
  outline: 'Осы бетте',
  prev: 'Алдыңғы бет',
  next: 'Келесі бет',
  menu: 'Мәзір',
  toTop: 'Жоғарыға',
  appearance: 'Көрініс',
  light: 'Ашық тақырып',
  dark: 'Қараңғы тақырып',
  language: 'Тілді ауыстыру',
  notFound: 'Бет табылмады',
  goHome: 'Құжаттамаға оралу',
  footer: 'Ресми емес қауымдастық жобасы. Majic Jungle Software немесе Noodlecake компанияларымен байланысы жоқ. Ойын файлдары қамтылмаған.',
  search: {
    button: 'Іздеу',
    placeholder: 'Құжаттамадан іздеу',
    noResults: 'Ештеңе табылмады:',
    reset: 'Тазарту',
    select: 'таңдау',
    navigate: 'жылжу',
    close: 'жабу'
  }
};

const all = [en, tr, ru, kk];

function searchTranslations(s: Strings) {
  return {
    button: { buttonText: s.search.button, buttonAriaLabel: s.search.button },
    modal: {
      displayDetails: s.search.button,
      resetButtonTitle: s.search.reset,
      backButtonTitle: s.search.close,
      noResultsText: s.search.noResults,
      footer: { selectText: s.search.select, navigateText: s.search.navigate, closeText: s.search.close }
    }
  };
}

export default defineConfig({
  base: siteBase + '/docs/',
  // Built into the SvelteKit static output, so the deployed site serves it at /docs (see package.json "build").
  outDir: '../build/docs',
  cleanUrls: true,
  // Maintainer notes, not a docs page.
  srcExclude: ['development.md'],
  lastUpdated: false,
  // App screenshots in docs/public/shots/<locale>/ load only when scrolled near.
  markdown: { image: { lazyLoading: true } },
  title: 'Blockheads Club Docs',
  titleTemplate: ':title · Blockheads Club Docs',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: siteBase + '/docs/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#c2410c' }]
  ],
  locales: Object.fromEntries(
    all.map((s) => [
      s.dir || 'root',
      {
        label: s.label,
        lang: s.lang,
        description: s.description,
        ...(s.dir ? { link: '/' + s.dir + '/' } : {}),
        themeConfig: themeConfig(s)
      }
    ])
  ),
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: Object.fromEntries(all.map((s) => [s.dir || 'root', { translations: searchTranslations(s) }]))
      }
    }
  }
});
