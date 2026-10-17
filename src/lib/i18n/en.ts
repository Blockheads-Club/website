export interface Step {
  title: string;
  text?: string;
  hint?: string;
  button?: string;
}

export const en = {
  meta: {
    title: 'Blockheads Club',
    description:
      'A community project around The Blockheads: a patcher that fixes the game on modern Android and a clean-room open-source dedicated server.',
    titles: {
      home: 'Blockheads Club',
      server: 'Server quick start · Blockheads Club',
      guides: 'Guides · Blockheads Club',
      article: 'Fix the game on your phone · Blockheads Club',
      faq: 'FAQ · Blockheads Club',
      legal: 'Legal notice · Blockheads Club'
    }
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main',
    home: 'Blockheads Club home',
    patcher: 'Patcher',
    server: 'Server',
    guides: 'Guides',
    faq: 'FAQ',
    github: 'GitHub',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    theme: 'Theme',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    themeNowSystem: 'System theme',
    themeNowLight: 'Light theme',
    themeNowDark: 'Dark theme'
  },
  home: {
    hero: {
      badge: 'Free · open source · made by players',
      title: 'Keep The Blockheads playable — on today’s phones and your own servers.',
      lead: 'Blockheads Club is a community project. We fix the game when new Android versions break it, and we let you host worlds for your friends.',
      ctaFix: 'Fix my game',
      ctaHost: 'Host a server',
      disclaimer: 'Unofficial fan project. Not affiliated with Majic Jungle Software or Noodlecake.',
      cardTitle: 'Game 1.7.6 found',
      ready: 'Ready',
      fixPopup: 'Welcome popup freeze',
      fixWorld: 'World loading crash'
    },
    what: {
      eyebrow: 'What is Blockheads Club?',
      title: 'A friendly toolbox for a game we still love.',
      lead: 'The Blockheads is a sandbox game for phones. Some versions no longer start properly on new Android phones, and many players want their own servers. We build free tools for both.',
      items: [
        {
          title: 'Open source, always free',
          body: 'Every tool is on GitHub. Anyone can read the code, report bugs or help translate.'
        },
        {
          title: 'Your copy stays yours',
          body: 'The Patcher changes the game you already have, on your own device. We never host or share the game.'
        },
        {
          title: 'Made by players',
          body: 'Volunteers run this project for fun. We are not the game’s developers and not connected to them.'
        }
      ]
    },
    patcher: {
      eyebrow: 'Blockheads Patcher',
      title: 'Game stuck on the “Welcome” popup? Let’s fix it.',
      lead: 'On modern Android, game versions 1.7.4 to 1.7.6 can freeze on the first popup. Version 1.7.6 can also crash while loading a world. The Patcher repairs your own copy of the game in a few clicks.',
      fixes: [
        {
          title: 'Welcome popup freeze',
          versions: '1.7.4 · 1.7.5 · 1.7.6',
          body: 'The game opens normally again on modern Android.'
        },
        {
          title: 'World loading crash',
          versions: '1.7.6',
          body: 'Your worlds load without the game closing.'
        }
      ],
      noteStrong: 'Nothing is uploaded.',
      note: 'Patching runs on your device — even the web app works offline in your browser. You need your own copy of the game.',
      howTitle: 'How it works',
      steps: [
        { title: 'Give it your game', body: 'Drop the APK file. On Android, just pick the installed game.' },
        { title: 'Check the fixes', body: 'The Patcher finds your version and ticks the fixes you need.' },
        {
          title: 'Install and play',
          body: 'Save the fixed game, or install it right away on your phone. Back up your worlds first — the guide shows how.'
        }
      ],
      ctaWeb: 'Open the web Patcher',
      getTitle: 'Get the Patcher',
      platforms: [
        { name: 'Web app', hint: 'Any modern browser' },
        { name: 'Android', hint: 'APK · {{[MIN ANDROID]}}' },
        { name: 'Windows', hint: '10 / 11 · x64' },
        { name: 'macOS', hint: 'Apple silicon & Intel' },
        { name: 'Linux', hint: 'AppImage · .deb' }
      ],
      version:
        'Current version {{[VERSION]}} · [Release notes](patcherReleases) · [Checksums](patcherReleases)'
    },
    server: {
      eyebrow: 'Blockheads Server',
      title: 'Your world, your rules, always online.',
      lead: 'An open-source dedicated server for The Blockheads. Run it on a PC, a Raspberry Pi or in Docker — or turn an old Android phone into a server with our app.',
      platforms: ['Windows', 'macOS', 'Linux', 'Raspberry Pi / ARM', 'Docker', 'Android app'],
      ctaStart: 'Start in 5 minutes',
      ctaDownloads: 'Downloads',
      exampleNote: 'Example output. Commands on the Server page use your real platform.'
    },
    guides: {
      eyebrow: 'Guides',
      title: 'Step by step, with pictures.',
      all: 'All guides',
      minRead: 'min read'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Good questions',
      lead: 'Can’t find your answer? [See all questions](faq) or ask on [GitHub](websiteIssues).',
      items: [
        {
          q: 'Is this the official Blockheads?',
          a: 'No. Blockheads Club is an independent fan project. We are not connected to Majic Jungle Software or Noodlecake, and we do not distribute the game.'
        },
        {
          q: 'Is it safe? Do you see my files?',
          a: 'Patching happens on your device. Nothing is uploaded to us or anyone else.'
        },
        {
          q: 'Will I lose my worlds?',
          a: 'On Android you must remove the original game first. Back up your worlds before you do.'
        }
      ]
    }
  },
  server: {
    hero: {
      eyebrow: 'Blockheads Server',
      title: 'Host a world your friends can join any time.',
      lead: 'A free, open-source dedicated server. Run it on a computer, a Raspberry Pi or Docker — or on an Android phone with our app.',
      ctaQuick: 'Quick start',
      ctaDownloads: 'All downloads',
      whatTitle: 'What you get',
      features: [
        { title: 'Worlds', hint: 'Create, load, back up' },
        { title: 'Live console', hint: 'Search, commands, history' },
        { title: 'Players', hint: 'Kick, ban, admins, mods' },
        { title: 'Access lists', hint: 'Whitelist, blacklist' }
      ],
      note: 'Desktop app, Android app and a browser admin panel share the same interface.'
    },
    quick: {
      eyebrow: 'Quick start',
      title: 'Pick your platform',
      lead: 'Each step has a command you can copy. The server keeps running until you close it or press Ctrl + C.',
      tabsLabel: 'Platform',
      copy: 'Copy',
      copied: 'Copied',
      copyFailed: 'Copy failed',
      copyLabel: 'Copy command',
      platforms: {
        win: {
          label: 'Windows',
          steps: [
            {
              title: 'Download and unzip',
              text: 'Get `blockheads-server-windows-x64.zip` and unzip it into a folder, for example Documents\\Blockheads Server.',
              button: 'Download for Windows'
            },
            {
              title: 'Start the server',
              text: 'Open PowerShell in that folder and run:',
              hint: 'Prefer clicking? Install the desktop app instead — it has the same features with buttons.'
            },
            {
              title: 'Allow it on your network',
              text: 'When Windows Firewall asks, allow access on **private networks**. Now connect from your phone (below).'
            }
          ] as Step[]
        },
        mac: {
          label: 'macOS',
          steps: [
            { title: 'Download and unpack' },
            {
              title: 'Let macOS open it',
              text: 'The first time, remove the download flag so Gatekeeper allows the program:'
            },
            { title: 'Start the server' }
          ] as Step[]
        },
        linux: {
          label: 'Linux',
          steps: [
            { title: 'Download and unpack' },
            {
              title: 'Start the server',
              hint: 'Run it as a service with the Raspberry Pi steps — they work on any systemd Linux.'
            }
          ] as Step[]
        },
        pi: {
          label: 'Raspberry Pi',
          steps: [
            {
              title: 'Download the ARM build',
              text: 'Use the 64-bit build on Raspberry Pi 4 and 5 with a 64-bit OS.'
            },
            { title: 'Start it on every boot' }
          ] as Step[]
        },
        docker: {
          label: 'Docker',
          steps: [
            {
              title: 'Run the container',
              text: 'Worlds are kept in the `bh-data` volume, so they survive updates.'
            },
            { title: 'Open the console' }
          ] as Step[]
        },
        android: {
          label: 'Android',
          steps: [
            {
              title: 'Install the Server app',
              text: 'Download the APK and open it. Android may ask you to allow installs from your browser.',
              button: 'Download for Android'
            },
            {
              title: 'Create a world and tap Start',
              text: 'The server keeps running in the background. A notification shows its status and a Stop button.'
            },
            {
              title: 'Keep the phone charging',
              text: 'Hosting uses battery. Turn off battery optimization for the app when it asks, so Android doesn’t stop it.'
            }
          ] as Step[]
        }
      }
    },
    connect: {
      eyebrow: 'Connect',
      title: 'Join from your phone',
      lead: 'Your phone and the server must be on the same Wi-Fi. The server shows its address when it starts — in the console, on the dashboard and as a QR code.',
      steps: [
        {
          title: 'Find the address',
          body: 'For example `192.168.1.42` and port `15151`. Scan the QR code to copy it on the phone.'
        },
        {
          title: 'Open the game’s multiplayer menu',
          body: 'Choose to join a server by address.'
        },
        {
          title: 'Enter the address and play',
          body: 'If the server has a password, the game asks for it.'
        }
      ],
      qrLabel: 'Example QR code for 192.168.1.42:15151',
      wifi: 'On your Wi-Fi',
      addressHint: 'Example address, as shown on the Server dashboard.',
      warnTitle: 'Playing over the internet?',
      warnBody:
        'Forward port 15151 on your router to the server computer and share your public IP. Set a password or turn on the whitelist first. [Read the guide](guides)',
      info: 'Your phone needs a game version that matches the server. Patched and original games can play together.'
    },
    downloads: {
      title: 'Downloads',
      items: [
        { name: 'Desktop app', hint: 'Windows · macOS · Linux' },
        { name: 'Command-line server', hint: 'x64 · ARM64 · ARMv7' },
        { name: 'Docker image', hint: 'multi-arch · {{[IMAGE]}}' },
        { name: 'Android app', hint: 'APK · {{[MIN ANDROID]}}' }
      ],
      version:
        'Version {{[VERSION]}} · [Release notes](serverReleases) · [Checksums](serverReleases) · [Source on GitHub](serverRepo)'
    }
  },
  guides: {
    eyebrow: 'Guides',
    title: 'Learn it step by step',
    lead: 'Short, illustrated guides for players and server hosts. Each one says how long it takes and what you need.',
    searchLabel: 'Search guides',
    searchPlaceholder: 'Search guides, e.g. “backup” or “port”',
    filterLabel: 'Filter by topic',
    filters: {
      all: 'All guides',
      patcher: 'Patcher',
      server: 'Server',
      android: 'Android',
      beginner: 'Beginner',
      advanced: 'Advanced'
    },
    startHere: 'Start here',
    patcherTitle: 'Patcher',
    serverTitle: 'Server',
    min: 'min',
    comingSoon: 'Coming soon',
    noResults: 'No guides match your search.',
    clear: 'Clear search and filters',
    resultsStatus: 'guides shown',
    missing: 'Missing a guide, or found a mistake?',
    suggest: 'Suggest it on GitHub',
    items: [
      {
        id: 'fix-game-on-phone',
        title: 'Fix the game on your phone, start to finish',
        summary: 'Back up worlds, patch, uninstall the original and install the fixed game.'
      },
      {
        id: 'lan-play',
        title: 'Play with friends on the same Wi-Fi',
        summary: 'Start a server on your computer and join from every phone at home.'
      },
      {
        id: 'backup-worlds',
        title: 'Back up your worlds before patching',
        summary: 'Why the original game must be removed and how to keep your worlds.'
      },
      {
        id: 'get-apk',
        title: 'Get the APK of the game you own',
        summary: 'Copy the installed game from your phone to your computer.'
      },
      {
        id: 'signing-key',
        title: 'Keep your signing key safe',
        summary: 'Why updates need the same key, and how to export and import it.'
      },
      {
        id: 'raspberry-pi',
        title: 'Run a 24/7 server on a Raspberry Pi',
        summary: 'Install the ARM build, start on boot and keep automatic backups.'
      },
      {
        id: 'open-internet',
        title: 'Open your server to the internet',
        summary: 'Port forwarding, passwords and whitelists, step by step.'
      },
      {
        id: 'admins-mods',
        title: 'Admins, mods and bans explained',
        summary: 'Who can do what, and how to manage players from the app.'
      },
      {
        id: 'host-android',
        title: 'Host from an Android phone',
        summary: 'Keep the server running in the background without Android stopping it.'
      },
      {
        id: 'docker',
        title: 'Docker and Docker Compose',
        summary: 'Volumes, updates and logs for container hosts.'
      }
    ]
  },
  article: {
    breadcrumb: 'Breadcrumb',
    guides: 'Guides',
    topic: 'Patcher',
    tags: 'Patcher · Android',
    level: 'Beginner',
    title: 'Fix the game on your phone, start to finish',
    lead: 'This guide uses the Blockheads Patcher app for Android. You will keep your worlds, fix the “Welcome” freeze and — on 1.7.6 — the world-loading crash.',
    updated: 'Updated {{[DATE]}} · [Edit this page on GitHub](websiteRepo)',
    toc: 'On this page',
    need: {
      title: 'What you need',
      items: [
        'The Blockheads 1.7.4, 1.7.5 or 1.7.6, installed on your phone',
        'The Blockheads Patcher app ([download](patcherReleases))',
        'About 200 MB of free space'
      ]
    },
    s1: {
      title: 'Back up your worlds',
      body: 'Android only lets you install the fixed game after the original is removed. Removing the game also deletes the worlds saved on this phone — so save them somewhere else first.',
      calloutStrong: 'Don’t skip this.',
      callout:
        'Worlds that are only on this phone can’t be recovered after you uninstall the game. Worlds on a server are safe.',
      shotAlt: 'Screenshot placeholder: the game’s world list with the backup option',
      shot: '[SCREENSHOT — world list and backup option]'
    },
    s2: {
      title: 'Pick the installed game',
      body: 'Open the Patcher and tap **Use installed game**. The Patcher reads the game on your phone and shows its version. Nothing is uploaded.',
      shotAlt: 'Screenshot placeholder: Patcher choose screen',
      shot: '[SCREENSHOT — Patcher “Choose your game”]'
    },
    s3: {
      title: 'Patch it',
      body: 'The fixes your version needs are already ticked. Tap **Patch game** and wait about a minute. Keep the app open.',
      callout:
        'The Patcher signs the game with **your own key**. Keep that key — you need the same one to install future updates without losing worlds again. [Learn about signing keys](guides)'
    },
    s4: {
      title: 'Swap the games',
      body: 'Tap **Uninstall original** and confirm. Then tap **Install patched game**. If Android asks, allow the Patcher to install apps.'
    },
    s5: {
      title: 'Bring your worlds back',
      body: 'Open the fixed game and restore the worlds you saved in step 1. The Welcome popup now closes normally.'
    },
    help: {
      title: 'If something goes wrong',
      items: [
        '**“App not installed”** — the original game is still on the phone. Uninstall it first.',
        '**“Version not supported”** — this guide is for 1.7.4–1.7.6 only.',
        'Still stuck? [Open an issue on GitHub](patcherIssues) and attach the Patcher log.'
      ]
    },
    helpful: 'Was this guide helpful?',
    yes: 'Yes',
    no: 'No',
    thanks: 'Thanks for the feedback!',
    previous: 'Previous',
    next: 'Next',
    prevTitle: 'Get the APK of the game you own',
    nextTitle: 'Keep your signing key safe'
  },
  faq: {
    title: 'Frequently asked questions',
    lead: 'Short answers first. Each answer links to a full guide when there is more to know.',
    sidebar: 'FAQ sections',
    sections: [
      {
        id: 'general',
        title: 'About the project',
        items: [
          {
            q: 'Is this the official Blockheads?',
            a: 'No. Blockheads Club is an independent, non-commercial fan project. We are not connected to Majic Jungle Software or Noodlecake, and we don’t sell or share the game.'
          },
          { q: 'Does it cost anything?', a: 'No. All tools are free and open source.' },
          {
            q: 'Can I help?',
            a: 'Yes — report bugs, write guides or translate the apps on GitHub.'
          }
        ]
      },
      {
        id: 'patcher',
        title: 'Patcher',
        items: [
          {
            q: 'Which game versions does it fix?',
            a: '1.7.4, 1.7.5 and 1.7.6 for the “Welcome” popup freeze. 1.7.6 also gets a fix for the crash while loading worlds.'
          },
          {
            q: 'Do you upload my game file?',
            a: 'Never. The web app, desktop apps and Android app all patch on your own device. The web app keeps working with no internet once it has loaded.'
          },
          {
            q: 'Why must I uninstall the original game on Android?',
            a: 'The patched game is signed with your own key, not the original one. Android doesn’t allow an app with a different signature to replace an installed app. Back up your worlds first.'
          },
          {
            q: 'What is a signing key and why keep it?',
            a: 'It proves an app comes from the same source. If you patch again later with the same key, you can install over your patched game and keep your worlds. Export it and store it somewhere safe.'
          }
        ]
      },
      {
        id: 'server',
        title: 'Server',
        items: [
          { q: 'How many players can join?', a: 'From 1 to 32. You choose the limit in Settings.' },
          {
            q: 'My friend can’t connect. What should I check?',
            a: 'Same Wi-Fi, correct address and port, firewall allows the server, and the whitelist (if on) includes their name. [Connection guide](guides)'
          },
          {
            q: 'Can I run it on an old Android phone?',
            a: 'Yes. Use the Server app, keep the phone charging and allow it to run in the background.'
          }
        ]
      }
    ],
    helpTitle: 'Still need help?',
    helpBody:
      'Open an issue on GitHub. Include your device, game version and — for the Patcher — the copied log from the error screen.',
    helpButton: 'Open an issue',
    helpSection: 'Getting help'
  },
  legal: {
    title: 'Legal notice',
    lead: 'Plain-language summary first. Last updated {{[DATE]}}.',
    shortTitle: 'In short',
    short:
      'We are fans, not the game’s makers. Our tools work only with a copy of The Blockheads that you own. We don’t share the game, we don’t collect your files, and the tools come with no warranty.',
    sections: [
      {
        title: '1. Who runs this project',
        body: 'Blockheads Club is maintained by {{[MAINTAINER NAME OR ORGANISATION]}}, {{[POSTAL ADDRESS, IF REQUIRED IN YOUR COUNTRY]}}. Contact: {{[CONTACT EMAIL]}}.'
      },
      {
        title: '2. No affiliation',
        body: 'Blockheads Club is an independent, non-commercial community project. It is not affiliated with, endorsed, sponsored or approved by Majic Jungle Software, Noodlecake or any other rights holder of The Blockheads.'
      },
      {
        title: '3. Trademarks and game content',
        body: '“The Blockheads” and related names, logos and artwork belong to their respective owners. We use the name only to describe what our tools work with. Our logo and design are our own. We do not distribute the game or any of its files.'
      },
      {
        title: '4. Use with your own copy',
        body: 'The Patcher modifies a copy of the game that you supply on your own device. You are responsible for making sure you are allowed to modify and use that copy. Do not use our tools to share or sell the game.'
      },
      {
        title: '5. Privacy',
        body: 'The Patcher processes files only on your device; nothing is uploaded. This website is static. {{[STATE ANALYTICS / COOKIES USED, OR “NONE”]}}. The Server stores player names and device identifiers only on the machine that runs it.'
      },
      {
        title: '6. No warranty',
        body: 'The software is provided “as is”, without warranty of any kind, as set out in its licence. Back up your worlds before patching or updating.'
      },
      {
        title: '7. Licences',
        body: 'Our code is released under GPL-3.0-only. Third-party components and fonts (Bricolage Grotesque, Atkinson Hyperlegible Next, JetBrains Mono — SIL Open Font License) are listed in each app under Settings → About → Licences.'
      },
      {
        title: '8. Takedown and contact',
        body: 'Rights holders can reach us at {{[CONTACT EMAIL]}}. We respond to good-faith requests promptly.'
      }
    ]
  },
  footer: {
    tagline: 'Community tools for The Blockheads. Made with',
    love: 'love',
    taglineEnd: 'by volunteers.',
    products: 'Products',
    help: 'Help',
    project: 'Project',
    downloads: 'Downloads',
    reportBug: 'Report a bug',
    translate: 'Help translate',
    legal: 'Legal notice',
    legalShort: 'Legal',
    nav: 'Footer',
    short: 'Unofficial community project. Not affiliated with Majic Jungle Software or Noodlecake.',
    disclaimer:
      'Blockheads Club is an unofficial, non-commercial community project. It is not affiliated with, endorsed or sponsored by Majic Jungle Software or Noodlecake. “The Blockheads” is a trademark of its respective owner. Code released under GPL-3.0-only.'
  }
};

export type Dict = typeof en;
