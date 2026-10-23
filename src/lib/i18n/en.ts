/** One numbered step, feature card or link card. */
export interface Item {
  title: string;
  body: string;
}

/** Plural forms picked with Intl.PluralRules (en/tr/kk use one/other; ru also uses few/many). */
export interface Plural {
  one: string;
  few: string;
  many: string;
  other: string;
}

export const en = {
  meta: {
    title: 'Blockheads Club',
    description:
      'Free, open-source tools for The Blockheads, made by players: play on your computer, fix the game on new phones and host worlds for friends.',
    titles: {
      home: 'Blockheads Club',
      download: 'Download · Blockheads Club',
      pc: 'Blockheads PC · Blockheads Club',
      patcher: 'Patcher · Blockheads Club',
      server: 'Server · Blockheads Club',
      mods: 'Mods · Blockheads Club',
      modsSubmit: 'Submit a mod · Blockheads Club',
      contribute: 'Get involved · Blockheads Club',
      about: 'About & legal · Blockheads Club',
      moved: 'This page moved · Blockheads Club'
    }
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main',
    home: 'Blockheads Club home',
    apps: 'Apps',
    docs: 'Docs',
    contribute: 'Get involved',
    about: 'About & legal',
    download: 'Download',
    github: 'Source code on GitHub',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    notSure: 'Not sure which one you need?',
    helpChoose: 'Help me choose'
  },
  apps: {
    pc: {
      task: 'Play on my computer',
      menu: 'Play your own copy on Windows, macOS and Linux',
      card: 'Play your own copy of the game in a window or full screen, with keyboard and mouse.',
      get: 'Get Blockheads PC'
    },
    patcher: {
      task: 'Fix the game on my phone',
      menu: 'Fix the game on new Android phones',
      card: 'Stops the game from freezing or crashing on new Android versions. Works in your browser too.',
      get: 'Get the Patcher'
    },
    server: {
      task: 'Play with friends',
      menu: 'Host a world for your friends',
      card: 'Host a world your friends can join — on a PC, an old phone, a Raspberry Pi or with Docker.',
      get: 'Get the Server'
    },
    mods: {
      task: 'Add mods',
      menu: 'Add new things to servers and the game'
    },
    names: { server: 'Server', mods: 'Mods' }
  },
  devices: {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    android: 'Android',
    pi: 'Raspberry Pi',
    docker: 'Docker',
    ios: 'iPhone / iPad',
    web: 'Web',
    desktop: 'Desktop'
  },
  common: {
    unofficial: 'Unofficial fan project. Not affiliated with Majic Jungle Software or Noodlecake.',
    free: 'Free',
    openSource: 'Open source',
    learnMore: 'Learn more'
  },
  home: {
    badge: 'Free · Open source · Made by players',
    title: 'The Blockheads, kept alive by its players.',
    lead: 'Free tools to play the game on your computer, fix it on new phones and host worlds for friends.',
    cta: 'Get the right download',
    ctaWhat: 'What is Blockheads Club?',
    q: 'What do you want to do?',
    qLead: 'Three free apps. Pick the one for what you want to do.',
    mods: {
      title: 'Mods are here',
      body: 'Add commands, chat tools and mini-games to your server from a public list reviewed by the maintainers. You can make your own.',
      link: 'Browse mods'
    },
    what: {
      eyebrow: 'What is Blockheads Club?',
      title: 'A group of players keeping a game we love playable.',
      lead: 'The Blockheads is a sandbox game from 2013. New phones and computers broke parts of it. We build free tools so people can keep playing — and we share all the code.',
      free: 'Free, no ads',
      gpl: 'Open source (GPL)',
      steps: [
        { title: 'Bring your own copy', body: 'You use the game file you already have. We never share or sell the game.' },
        {
          title: 'Pick a free tool',
          body: 'Blockheads PC, Patcher or Server. Each one is open source, so anyone can check what it does.'
        },
        { title: 'Play', body: 'Your worlds stay on your devices. Guides in the docs help when you get stuck.' }
      ] as Item[]
    },
    join: {
      eyebrow: 'Made by players',
      title: 'Come help — every skill counts.',
      lead: 'You don’t need to be a programmer. Translations, bug reports and guides help as much as code.',
      cta: 'Get involved',
      code: 'See the code',
      cards: [
        { title: 'Write code', body: 'Rust, TypeScript and Svelte — good first issues are labelled' },
        { title: 'Translate', body: 'English, Türkçe, Русский, Қазақша — and new languages' },
        { title: 'Test and report bugs', body: 'Try new releases, tell us what breaks' },
        { title: 'Write guides', body: 'Help other players in the docs' }
      ] as Item[]
    },
    releases: {
      title: 'Latest releases',
      all: 'All releases on GitHub',
      whatsNew: 'What’s new',
      note: 'Filled from GitHub releases when the site is built, so it never goes out of date.',
      failed: 'See GitHub for the latest version'
    },
    docs: {
      eyebrow: 'Docs',
      title: 'Stuck? The docs have step-by-step guides.',
      lead: 'Install steps for every platform, backups, hosting, and answers to common questions. In 4 languages.',
      cta: 'Open the docs'
    }
  },
  product: {
    home: 'Home',
    apps: 'Apps',
    breadcrumb: 'Breadcrumb',
    what: 'What it does',
    how: 'How it works',
    before: 'Before you start',
    platforms: 'Platforms',
    open: 'Open',
    download: 'Download',
    otherPlatforms: 'Other platforms',
    help: 'Need help?',
    helpLead: 'The docs have step-by-step guides with pictures, in 4 languages.',
    report: 'Report a problem on GitHub',
    latest: 'Latest version on GitHub'
  },
  pc: {
    tagline: 'Play your own copy of The Blockheads on your computer.',
    lead: 'A free launcher for Windows, macOS and Linux. Keyboard and mouse, a big window or full screen — with your worlds kept safe.',
    features: [
      { title: 'Play with keyboard and mouse', body: 'Set your own keys. Controllers work too.' },
      { title: 'Any window size', body: 'From a small window to full screen, sharp on big monitors.' },
      { title: 'Join any server', body: 'Play with friends on Blockheads Server worlds.' }
    ] as Item[],
    steps: [
      { title: 'Install Blockheads PC', body: 'A normal installer. No account needed.' },
      { title: 'Add your game file', body: 'Pick the APK of the game you own (1.7.4 to 1.7.6). We never share the game.' },
      { title: 'Play', body: 'Your settings and worlds stay on your computer.' }
    ] as Item[],
    before: [
      'Your own copy of the game (the APK file)',
      '64-bit Windows 10 or 11, macOS 11 or newer, or Linux',
      'An Intel, AMD or ARM processor'
    ],
    platforms: ['Windows 10, 11', 'macOS 11+', 'Linux · AppImage, .deb, .rpm'],
    guides: ['Get the game file from your phone', 'Install, import saves and set up controls', 'Join a friend’s server'],
    snipTitle: 'Your copy · ready',
    snipPlay: 'Play'
  },
  patcher: {
    tagline: 'Fix The Blockheads on new Android phones.',
    lead: 'Some versions freeze or crash on new Android. The Patcher repairs your own copy in a few clicks — in your browser, on your phone or on a computer.',
    primary: 'Open the web Patcher',
    features: [
      { title: 'Fixes the freeze and crashes', body: 'For versions 1.7.4 to 1.7.6. It ticks the fixes your version needs.' },
      { title: 'Nothing is uploaded', body: 'Everything happens on your device, even in the browser.' },
      { title: 'More fixes as packs', body: 'Optional: import patch packs to add more fixes.' }
    ] as Item[],
    steps: [
      { title: 'Give it your game', body: 'Drop the APK file, or pick the installed game on Android.' },
      { title: 'Check the fixes', body: 'The Patcher finds your version and ticks what it needs.' },
      { title: 'Install and play', body: 'Back up your worlds first — the guide shows how.' }
    ] as Item[],
    before: [
      'Your own copy of the game (version 1.7.4 – 1.7.6)',
      'A browser, or Android 7.0 or newer for the app',
      'A backup of your worlds'
    ],
    platforms: ['Any browser · no install', 'Android app', 'Windows', 'macOS', 'Linux'],
    guides: ['Fix the game on your phone, start to finish', 'Back up your worlds before patching', 'Get the APK from your phone'],
    snipFound: 'Game 1.7.6 found',
    snipReady: 'Ready',
    snipFix1: 'Welcome popup freeze',
    snipFix2: 'World loading crash'
  },
  server: {
    tagline: 'Host a world your friends can join.',
    lead: 'Run it on a PC, turn an old Android phone into a server, or keep a world online 24/7 on a Raspberry Pi or with Docker.',
    features: [
      { title: 'Play with friends', body: 'On the same Wi-Fi in a minute, or over the internet with a port forward.' },
      { title: 'Easy to manage', body: 'Start and stop, back up worlds and manage players from a simple app.' },
      { title: 'Mods', body: 'Add server mods from a reviewed public list.' }
    ] as Item[],
    steps: [
      { title: 'Install the Server', body: 'Desktop or Android app — or one command on Linux.' },
      { title: 'Pick or create a world', body: 'Start fresh or bring a world you already have.' },
      { title: 'Share the address', body: 'Friends join by address or by scanning a QR code.' }
    ] as Item[],
    before: [
      'Any 64-bit computer, a Raspberry Pi or an Android 7.0+ phone',
      'Players need their own copy of the game',
      'For internet play: a port forward (guide below)'
    ],
    platforms: ['Windows, macOS, Linux app', 'Android app', 'Raspberry Pi', 'Docker', 'Headless Linux'],
    guides: ['Play with friends on the same Wi-Fi', 'Open your server to the internet', 'Run a 24/7 server on a Raspberry Pi'],
    tech: {
      eyebrow: 'For technical hosts',
      title: 'One command on Linux, Pi or Docker.',
      lead: 'A headless server with the same options as the original, worlds in one folder and logs on stdout.',
      link: 'Server reference in the docs',
      tabs: 'Platform'
    }
  },
  copy: {
    copy: 'Copy',
    copied: 'Copied',
    failed: 'Copy failed',
    command: 'Copy command'
  },
  download: {
    title: 'Get the right download',
    lead: 'Answer two questions. We pick the file for you. Everything is free.',
    q1: 'What do you want to do?',
    q2: 'Which device?',
    detected: 'We think you’re on',
    yours: 'Your download',
    for: {
      windows: 'for Windows',
      macos: 'for macOS',
      linux: 'for Linux',
      android: 'for Android',
      pi: 'for Raspberry Pi',
      docker: 'for Docker',
      ios: 'for iPhone / iPad'
    },
    button: {
      windows: 'Download for Windows',
      macos: 'Download for macOS',
      linux: 'Download for Linux',
      android: 'Download the APK',
      pi: 'Download for Raspberry Pi',
      docker: 'Download',
      ios: 'Download'
    },
    files: {
      pcWin: 'Installer for Windows 10 and 11 (.exe) · 64-bit',
      pcMac: 'App for macOS 11 or newer (.dmg) · Apple silicon',
      pcLinux: 'AppImage · x86-64',
      patcherWin: 'Desktop app for Windows (.exe) · 64-bit',
      patcherMac: 'Desktop app for macOS (.dmg) · Apple silicon and Intel',
      patcherLinux: 'AppImage · x86-64',
      patcherAndroid: 'Android app (.apk) · Android 7.0 or newer',
      serverWin: 'Desktop app for Windows (.exe) · 64-bit',
      serverMac: 'Desktop app for macOS (.dmg) · Apple silicon',
      serverLinux: 'Desktop app (AppImage) · x86-64',
      serverAndroid: 'Android app (.apk) · turns a phone into a server',
      serverPi: 'Headless server for 64-bit Raspberry Pi OS (.tar.gz)',
      serverDocker: 'Official image on GitHub Container Registry · x86-64 and ARM'
    },
    alts: {
      winArm: 'Windows on ARM',
      macIntel: 'Intel Mac',
      macArm: 'Apple silicon',
      deb: '.deb',
      rpm: '.rpm',
      linuxArm: 'ARM64 AppImage',
      headless: 'Headless server (.tar.gz)',
      apk32: 'Older 32-bit phones',
      piArmv7: '32-bit Raspberry Pi OS',
      winCli: 'Command-line server (.zip)'
    },
    also: 'Also available:',
    none: {
      pcAndroid: 'Blockheads PC is for computers. On an Android phone, the Patcher fixes the game instead.',
      pcPi: 'Blockheads PC doesn’t run on a Raspberry Pi yet. A Pi is great for hosting a server.',
      pcDocker: 'Docker is for hosting a server, not for playing.',
      pcIos: 'Our apps don’t run on iPhone or iPad. Use a Windows, Mac, Linux or Android device instead.',
      patcherPi: 'Use the web Patcher in the Pi’s browser — nothing to install.',
      patcherDocker: 'The Patcher has no Docker image. Use the web Patcher in any browser.',
      patcherIos: 'The Patcher fixes the Android version of the game. It can’t change the game on iPhone or iPad.',
      serverIos: 'The Server doesn’t run on iPhone or iPad. An old Android phone or any computer works.'
    },
    notHere: 'isn’t available here',
    go: { patcher: 'Get the Patcher', server: 'Get the Server', web: 'Open the web Patcher' },
    orWeb: 'Or skip the download:',
    orWebLink: 'use the Patcher in your browser',
    own: 'Bring your own game',
    ownApk: 'You need the game’s APK file. We never share the game.',
    ownServer: 'Players join with their own copy of the game. The Server never includes it.',
    guide: 'Install guide',
    guideHint: 'Step by step, with pictures',
    notes: 'Release notes & checksums',
    notesHint: 'Check the file is ours',
    apkNote: 'Android asks you to allow installs from your browser. The guide shows how.',
    failedTitle: 'We couldn’t load the latest version.',
    failedBody: 'All files are always on GitHub Releases, with checksums.',
    failedButton: 'Open GitHub Releases',
    all: 'All downloads',
    tableApp: 'App',
    webRow: 'Patcher · web',
    webOpen: 'Open in your browser',
    webHint: '— works on any device with a modern browser, offline after the first visit',
    image: 'Image',
    older: 'Older versions, source code and checksums:',
    olderLink: 'GitHub Releases',
    footnote: 'Unofficial fan project. We never ship the game itself — you need your own copy.'
  },
  contribute: {
    eyebrow: 'Get involved',
    title: 'Blockheads Club is made by people like you.',
    lead: 'Everything here is free and open source under the GPL. Pick one small thing — every bit helps.',
    github: 'Open GitHub',
    issues: 'Browse good first issues',
    cards: [
      {
        title: 'Write code',
        body: 'Rust, TypeScript and Svelte in every app, a little Kotlin for Android. Start with an issue labelled “good first issue”.'
      },
      {
        title: 'Translate',
        body: 'Help keep English, Türkçe, Русский and Қазақша up to date — or add a new language. No coding needed.'
      },
      { title: 'Test and report bugs', body: 'Try new releases and tell us what breaks. Clear bug reports are a big help.' },
      {
        title: 'Write guides',
        body: 'Explain something you figured out. Guides live in the docs and anyone can suggest changes.'
      },
      {
        title: 'Help other players',
        body: 'Answer questions in the GitHub issues. Many players are new to patching or hosting.'
      },
      { title: 'Make mods', body: 'Publish yours on the public list for everyone.' }
    ] as Item[],
    links: ['Find a first issue', 'Open the translation files', 'Report a bug', 'Edit the docs', 'Open issues', 'About mods'],
    langTitle: 'Translations',
    langHint: 'Counted from the website’s translation files when the site builds.',
    langReview: 'Waiting for a native speaker’s review',
    goodTitle: 'Good to know',
    good: [
      'Be kind and patient. Everyone here is a volunteer.',
      'Never share the game itself, in issues or anywhere else.',
      'All code is GPL. By contributing, you agree to share your work under it.',
      'Kids are welcome too — ask a grown-up before making a GitHub account.'
    ]
  },
  about: {
    eyebrow: 'About',
    title: 'Players keeping a game playable.',
    lead: 'Blockheads Club is a volunteer, open-source project. We make free tools so people can keep playing The Blockheads on today’s devices.',
    toc: 'On this page',
    us: 'Who we are',
    usBody: [
      'A small group of players and developers. We started because new Android versions broke the game for many people: it froze on the first popup.',
      'The Patcher came first. Then an open-source rewrite of the dedicated server, so anyone can host a world, and Blockheads PC to play on a computer. Mods are next.',
      'Maintained by volunteers in the [Blockheads Club organisation on GitHub](org).'
    ],
    legal: 'An unofficial fan project',
    legalBody: [
      'Blockheads Club is **not** made by, connected to or endorsed by Majic Jungle Software or Noodlecake. “The Blockheads” is a trademark of its owners.',
      'We never share or sell the game. Every tool works with a copy that you own, on your own device. Our logo and design are our own.',
      'The software comes “as is”, without warranty. Back up your worlds before patching or updating. Rights holders can reach us by [opening an issue on GitHub](websiteIssues).'
    ],
    lic: 'Licences',
    licBody: [
      'All our code is free software under the GNU General Public License (GPL-3.0-or-later). You can use, study, change and share it. Third-party licences are listed in each app.',
      'This website’s code and text are under the same licence. Fonts: SIL Open Font License.'
    ],
    priv: 'Privacy',
    privBody:
      'This website has no analytics, tracking or cookies. It only remembers your theme and language in your browser. Our apps work on your device: your game file and worlds are never uploaded to us.',
    contact: 'Contact',
    contactBody: 'The fastest way is GitHub: open an issue for bugs or questions.',
    issue: 'Open an issue'
  },
  moved: {
    title: 'This page moved to the docs.',
    body: 'Taking you there now.',
    link: 'Open it'
  },
  notFound: {
    title: 'This block is missing.',
    body: 'The page moved or never existed.',
    home: 'Go home',
    docs: 'Search the docs'
  },
  mods: {
    eyebrow: 'Mods',
    title: 'Mods for The Blockheads',
    lead: 'Browse community mods for servers and clients. Every mod lists what it is allowed to do.',
    safeTitle: 'Safe by default',
    safeBody:
      'Server owners decide what each mod may do: a mod only gets the permissions you grant it. WebAssembly mods run in a sandbox.',
    permRead: 'Read world',
    permChange: 'Change world',
    permNet: 'Internet: one host',
    nativeTitle: 'Native code · full access',
    nativeBody:
      'Mods that run outside the sandbox always get an extra security review, again whenever an update asks for more.',
    sample: 'Sample data: the mod index isn’t published yet, so the mods below are examples.',
    searchLabel: 'Search mods',
    searchPlaceholder: 'Search by name, id, description or tag',
    tagsLabel: 'Filter by tag',
    allTags: 'All tags',
    resultsStatus: { one: 'mod shown', few: 'mods shown', many: 'mods shown', other: 'mods shown' } as Plural,
    noResults: 'No mods match your search.',
    clear: 'Clear search',
    by: 'by',
    draft: 'Placeholder',
    allYanked: 'All versions yanked',
    submitButton: 'Submit a mod',
    makeButton: 'Make a mod',
    clientRequired: 'Players need it',
    version: 'Version',
    sides: { server: 'Server', client: 'Client', both: 'Server + client' },
    native: {
      badge: 'Native code',
      warn: 'Runs native code outside the sandbox. Only install it if you trust the author.'
    },
    perms: {
      none: 'Needs no special permissions.',
      world: {
        read: { label: 'World: read', text: 'Can read the world: blocks, items and other data.' },
        write: { label: 'World: write', text: 'Can change the world: place and break blocks, add items.' }
      },
      players: {
        chat: { label: 'Chat', text: 'Can send chat messages to players.' },
        teleport: { label: 'Teleport', text: 'Can teleport players.' },
        kick: { label: 'Kick', text: 'Can kick players from the server.' },
        ban: { label: 'Ban', text: 'Can ban players.' },
        inventory: { label: 'Inventory', text: 'Can look at and change what players carry.' },
        health: { label: 'Health', text: 'Can change players’ health.' }
      },
      http: { label: 'Internet', text: 'Can connect to these websites:' },
      channels: { label: 'Messages', text: 'Can send its own messages between server, clients and other mods.' }
    },
    detail: {
      breadcrumb: 'Breadcrumb',
      all: 'All mods',
      noDescription: 'No description.',
      owners: 'Owners',
      repo: 'Source code',
      tags: 'Tags',
      versions: 'Versions',
      columns: { version: 'Version', published: 'Published', size: 'Size', sides: 'Runs on', download: 'Download' },
      select: 'Show details',
      selected: 'Showing',
      yanked: 'Yanked',
      latest: 'Latest',
      download: 'Download',
      mirror: 'Mirror',
      sha: 'SHA-256',
      copy: 'Copy',
      copied: 'Copied',
      copyFailed: 'Copy failed',
      copyLabel: 'Copy the SHA-256',
      noDownload: 'Every version of this mod was yanked, so there is nothing to download.',
      api: 'Needs mod API',
      loader: 'Loader',
      depends: 'Needs these mods',
      softDepends: 'Works better with',
      notInIndex: 'not in the index',
      noDepends: 'No other mods needed.',
      permsTitle: 'What this version can do',
      draftNote: 'This is a placeholder entry: the mod is not published yet and there is nothing to download.',
      installTitle: 'How to install',
      players: 'Players',
      playersBody: 'Client mods install with the mod loader: in the PC Port launcher, or on Android in the game itself (a Patcher option). Both are in development builds for now.',
      admins: 'Server admins',
      adminsBody:
        'Download the `.bhmod` file and drop it into the server’s `mods/` folder, then grant its permissions in `mods.toml`. The Blockheads Server runs Lua and WASM mods in its development builds; a release will follow.',
      nativeTitle: 'Native code: be careful',
      nativeBody:
        'This version runs native code outside the sandbox. It can do anything the program can do on your computer. Only install it if you trust the author and have read the source.'
    },
    submit: {
      eyebrow: 'Mods',
      title: 'Submit a mod',
      lead: 'Mods are listed through a pull request to the Blockheads-Club/mods repository. CI checks the files and a maintainer reviews the rest.',
      stepsTitle: 'How to submit',
      steps: [
        {
          title: 'Build and publish your mod',
          body: 'Run `bhmod pack` and attach the `.bhmod` file to a release in your own repository. The download link must be a public `https://` address ending in `.bhmod`.'
        },
        {
          title: 'Fork Blockheads-Club/mods',
          body: 'Add one file: `mods/<first letter>/<id>.toml`, for example `mods/h/hello-lua.toml`. It holds the mod’s name, owners, repository and every published version.'
        },
        {
          title: 'Describe the version',
          body: 'For each version give the download URL, the SHA-256 and size of the `.bhmod` file, the sides, the API range, the permissions and the date.'
        },
        {
          title: 'Open a pull request',
          body: 'CI runs the checks below and comments with the result. A maintainer reviews and merges. Then the index is rebuilt and this page picks it up on its next build.'
        }
      ],
      rulesTitle: 'Rules',
      rules: [
        'One mod per pull request.',
        'Every new mod gets a security review: a maintainer reads its code before it is listed. Updates are reviewed again when they add permissions or native code.',
        'Only the owners listed in the file can add versions. The first submitter becomes the first owner.',
        'Versions are append-only. Never edit or remove a published version; the only allowed change is `yanked = true`, to pull a broken or unsafe version.',
        'Only submit mods you made or may share, and keep their licence in your repository.',
        'Ask only for the permissions the mod really needs.',
        'No game files and no copied game assets.'
      ],
      ciTitle: 'What CI checks',
      ci: [
        'The file follows the index schema and its path matches the mod id.',
        'The pull request touches exactly one mod.',
        'Versions are only appended; existing ones change only by `yanked`.',
        'The pull request author is one of the `owners`.',
        'The download works, and its SHA-256 and size match.',
        'The package follows the package rules, and its `mod.toml` matches the entry.',
        'Dependencies exist in the index and their version ranges can be met.',
        'WASM modules validate and Lua/Luau scripts compile.',
        'A permission diff is posted. Every new mod, versions with native code and updates that add a permission get the `needs-security-review` label and wait for a maintainer’s review.'
      ],
      nativeTitle: 'Native mods',
      nativeBody: 'Mods with `native = true` run code outside the sandbox. They are allowed, but they are reviewed by hand and shown with a red warning.',
      toolsTitle: 'Tools',
      toolsBody: 'The mod SDK has the `bhmod` command line tool, the schemas and examples.',
      sdkButton: 'Open the mod SDK',
      modsButton: 'Open Blockheads-Club/mods',
      docsButton: 'Making a mod (docs)',
    }
  },
  footer: {
    tagline: 'Free, open-source tools for The Blockheads, made by players.',
    disclaimer:
      'Unofficial fan project. Not affiliated with Majic Jungle Software or Noodlecake. You need your own copy of the game.',
    apps: 'Apps',
    help: 'Help',
    project: 'Project',
    allDownloads: 'All downloads',
    guides: 'Install guides',
    faq: 'FAQ',
    bug: 'Report a bug',
    licence: 'Licence (GPL)',
    fine: 'Code licensed under the GPL · “The Blockheads” is a trademark of its owners.',
    nav: 'Footer'
  }
};

export type Dict = typeof en;
