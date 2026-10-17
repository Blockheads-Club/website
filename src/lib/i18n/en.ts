export const en = {
  meta: {
    title: 'Blockheads Club',
    description:
      'A community project around The Blockheads: a patcher that fixes the game on modern Android and a clean-room open-source dedicated server.'
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main navigation',
    patcher: 'Patcher',
    server: 'Server',
    guides: 'Guides',
    faq: 'FAQ',
    legal: 'Legal',
    language: 'Language',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme'
  },
  hero: {
    eyebrow: 'Community project',
    title: 'Keep The Blockheads playable.',
    lead: 'Blockheads Club builds free, open-source tools around The Blockheads: a patcher that fixes your own copy of the game on modern Android, and a clean-room dedicated server you can host anywhere.',
    ctaPatcher: 'Open the web patcher',
    ctaServer: 'Get the server'
  },
  patcher: {
    title: 'Patcher',
    lead: 'The patcher repairs your own copy of the game APK. It runs entirely on your device or in your browser; your APK is never uploaded anywhere.',
    fixesTitle: 'What it fixes',
    fixes: [
      {
        title: 'Popup freeze on modern Android',
        body: 'On recent Android versions, versions 1.7.4 to 1.7.6 can freeze when a popup is shown. The patch removes the cause so menus and dialogs work again.'
      },
      {
        title: 'Store font crash in 1.7.6',
        body: 'Version 1.7.6 can crash when the in-game store loads its font. The patch fixes that crash.'
      }
    ],
    versions: 'Supported game versions: 1.7.4, 1.7.5 and 1.7.6.',
    ctaWeb: 'Use the web patcher',
    ctaReleases: 'Download desktop and Android apps',
    ctaSource: 'Source code'
  },
  server: {
    title: 'Server',
    lead: 'A clean-room dedicated server for The Blockheads, written in Rust. It is a fresh implementation of the documented behavior, not a copy of the original code.',
    platformsTitle: 'Runs on',
    platforms: ['Windows', 'Linux', 'macOS', 'ARM devices', 'Android (host app)'],
    items: [
      {
        title: 'Host from anywhere',
        body: 'Run it on a PC, a Raspberry Pi or a small cloud machine, or host straight from your phone with the Android host app.'
      },
      {
        title: 'Open source',
        body: 'Everything is GPL-3.0 licensed. Read it, build it, improve it.'
      }
    ],
    ctaRepo: 'Server on GitHub',
    ctaReleases: 'Server releases'
  },
  guides: {
    title: 'Guides',
    lead: 'Short, practical walkthroughs.',
    items: [
      {
        id: 'patch-apk',
        title: 'Patch your own APK',
        steps: [
          'Get the game APK from a source you legitimately own it from. Do not use files from untrusted sites.',
          'Open the web patcher or install the desktop or Android app from the releases page.',
          'Select your APK. The patcher detects the version (1.7.4, 1.7.5 or 1.7.6).',
          'Apply the patch and save the signed output APK.',
          'Install the patched APK on your device. If the original is installed with a different signature, uninstall it first (back up your worlds).'
        ]
      },
      {
        id: 'host-server',
        title: 'Host a server',
        steps: [
          'Download the server build for your system from the server releases page.',
          'Start it once to generate its configuration and a world folder.',
          'Forward the server port on your router, or use a host that gives you a public address.',
          'Share your address with friends. Keep the server updated.'
        ]
      },
      {
        id: 'connect-phone',
        title: 'Connect from your phone',
        steps: [
          'Make sure the game on your phone is patched and runs normally.',
          'Make sure your phone and the server can reach each other: same Wi-Fi for a home server, or the public address for an online one.',
          'Add the server address in the game and join.'
        ]
      }
    ]
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'Do you distribute the game?',
        a: 'No. We never host, ship or link to game files. You patch the copy you already own.'
      },
      {
        q: 'Is my APK uploaded anywhere?',
        a: 'No. The patcher works fully client-side, in your browser or in the app on your device.'
      },
      {
        q: 'Which game versions are supported?',
        a: 'Versions 1.7.4, 1.7.5 and 1.7.6 of the Android game.'
      },
      {
        q: 'Is the server a copy of the official one?',
        a: 'No. It is a clean-room reimplementation written from scratch in Rust.'
      },
      {
        q: 'How can I help?',
        a: 'Report issues, send pull requests or translate this site on GitHub.'
      }
    ]
  },
  legal: {
    title: 'Legal notice',
    body: [
      'Blockheads Club is an independent community project. It is not affiliated with, endorsed by or connected to Majic Jungle Software or Noodlecake Studios.',
      'The Blockheads is a trademark of its respective owners. We do not distribute any game files, assets or code from the game.',
      'Only patch software that you own or are otherwise legally allowed to modify.',
      'All software here is released under the GPL-3.0 license and provided without warranty.'
    ]
  },
  footer: {
    license: 'Released under GPL-3.0-only.',
    source: 'Website source'
  }
};

export type Dict = typeof en;
