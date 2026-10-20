export interface Step {
  title: string;
  text?: string;
  hint?: string;
  button?: string;
}

export interface GuideStep {
  title: string;
  /** Paragraphs (inline markup allowed). */
  body: string[];
  list?: string[];
  tip?: string;
  warn?: string;
}

export interface GuideDoc {
  tags: string;
  title: string;
  lead: string;
  need: string[];
  steps: GuideStep[];
  help: string[];
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
      lead: 'Each step has a command you can copy. To stop the server cleanly, type /stop in its console: it saves the world and exits. Ctrl + C stops it without a final save.',
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
              text: 'Get `blockheads-server-v0.1.1-x86_64-pc-windows-msvc.zip` (or `aarch64-pc-windows-msvc` on ARM) and unzip it into a folder, for example Documents\\Blockheads Server.',
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
              hint: 'Run it as a service with the Raspberry Pi guide — its systemd steps work on any systemd Linux.'
            }
          ] as Step[]
        },
        pi: {
          label: 'Raspberry Pi',
          steps: [
            {
              title: 'Download the ARM build',
              text: 'Use the `aarch64` build on a 64-bit OS and the `armv7` build on a 32-bit OS.'
            },
            {
              title: 'Start it on every boot',
              text: 'Create a systemd service as shown in the [Raspberry Pi guide](raspberryPi), then enable it:'
            }
          ] as Step[]
        },
        docker: {
          label: 'Docker',
          steps: [
            {
              title: 'Run the container',
              text: 'Map the port as UDP. Worlds are kept in the `bh-data` volume, so they survive updates. To restart the same world later, use `--load` (see the [Docker guide](docker)).'
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
              text: 'The server keeps running in the background. A notification shows its status, the players and the address, with a Stop server button.'
            },
            {
              title: 'Keep the phone charging',
              text: 'Hosting uses battery. The app keeps the phone and Wi-Fi awake while the server runs. If your phone still stops it, turn off battery optimization for the app in Android’s settings.'
            }
          ] as Step[]
        }
      }
    },
    connect: {
      eyebrow: 'Connect',
      title: 'Join from your phone',
      lead: 'Your phone and the server must be on the same Wi-Fi. The desktop and Android apps show the address on the dashboard and as a QR code. For the command-line server, use the computer’s local IP address.',
      steps: [
        {
          title: 'Find the address',
          body: 'For example `192.168.1.42` and port `15151`. Scan the QR code to copy it on the phone.'
        },
        {
          title: 'Open the game’s multiplayer menu',
          body: 'Go to **Join World** → **Advanced...** → **Online IP/Port...**.'
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
        'Forward UDP port 15151 on your router to the server computer and share your public IP. Set a password or turn on the whitelist first. [Read the guide](openInternet)',
      info: 'Your phone needs a game version that matches the server. Patched and original games can play together.'
    },
    downloads: {
      title: 'Downloads',
      items: [
        { name: 'Desktop app', hint: 'Windows · macOS · Linux' },
        { name: 'Command-line server', hint: 'x64 · ARM64 · ARMv7' },
        { name: 'Docker image', hint: 'multi-arch · `ghcr.io/blockheads-club/blockheads-server`' },
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
        'The Patcher signs the game with **your own key**. Keep that key — you need the same one to install future updates without losing worlds again. [Learn about signing keys](signingKey)'
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
  docs: {
    'lan-play': {
      tags: 'Server · Wi-Fi',
      title: 'Play with friends on the same Wi-Fi',
      lead: 'Start a server on a computer at home and let every phone on your Wi-Fi join the same world. It takes about four minutes.',
      need: [
        'A Windows, macOS or Linux computer on the same Wi-Fi as the phones',
        'Blockheads Server — the desktop app or the command-line server ([downloads](serverReleases))',
        'The Blockheads on every phone. On modern Android, [fix the game first](fixGameOnPhone)'
      ],
      steps: [
        {
          title: 'Start a server',
          body: [
            '**Desktop app:** open **Worlds**, tap **Create world**, give it a name and tap **Start server**.',
            '**Command line:** unpack the download for your computer and create a world. The server starts right away:'
          ],
          tip: 'Stop the command-line server with `/stop`. Ctrl + C closes it without a final save.'
        },
        {
          title: 'Let it through the firewall',
          body: [
            'The server uses **UDP port 15151**. When Windows Firewall asks, allow access on **private networks**. On other systems, allow incoming UDP on port 15151 if you use a firewall.'
          ]
        },
        {
          title: 'Find the server’s address',
          body: [
            'In the desktop app, the **Dashboard** has a **Connect from a phone** card with the **LAN address**, the port and a QR code. Scan the code with a phone camera to copy the address.',
            'On the command line, look up your computer’s local IP address in its network settings, for example `192.168.1.42`.'
          ]
        },
        {
          title: 'Join from the game',
          body: ['On each phone, open the game and go to:'],
          list: [
            '**Join World** → **Advanced...** → **Online IP/Port...**',
            'Enter the address and the port (the field already says `15151`)',
            'Tap **Join Online World**'
          ],
          tip: 'If the server has a password, the game asks for it.'
        }
      ],
      help: [
        '**Nobody can connect** — check that the phones are on the same Wi-Fi (not a guest network) and that the firewall allows UDP 15151.',
        '**One friend is refused** — if the whitelist has names in it, only those names can join. See [Admins, mods and bans](adminsMods).',
        'Still stuck? [Open an issue on GitHub](serverIssues) and paste the server log.'
      ]
    } as GuideDoc,
    'backup-worlds': {
      tags: 'Patcher · Android',
      title: 'Back up your worlds before patching',
      lead: 'On Android you must remove the original game before you can install the fixed one — and that deletes the worlds saved on the phone. Here is why, and how to keep them.',
      need: ['The Blockheads installed on your phone', 'A few minutes before you start patching'],
      steps: [
        {
          title: 'Know why the original has to go',
          body: [
            'The Patcher signs the fixed game with **your own key**, not the original one. Android won’t install an app over another app with a different signature, so the original must be uninstalled first.'
          ],
          warn: '**Worlds stored on that phone are deleted with it.** Worlds hosted on servers are not affected.'
        },
        {
          title: 'Back up every world in the game',
          body: [
            'Open the original game on your phone and use its own backup for each world you want to keep. The Patcher can’t do this for you: it never touches your saves.'
          ]
        },
        {
          title: 'Confirm in the Patcher',
          body: [
            'Before the Patcher removes the original, it shows **Your worlds on this phone will be deleted**. Tick **My worlds are backed up, or I don’t need them** to go on.'
          ]
        },
        {
          title: 'Restore after installing',
          body: ['When the fixed game is installed, open it and restore your worlds from your backup.'],
          tip: 'The fix **Offer to keep game data when uninstalling** is on by default. With it, Android 10 and newer ask whether to keep the game’s data if you ever uninstall the fixed game.'
        },
        {
          title: 'Skip this next time',
          body: [
            'Keep your signing key. If you patch again with the same key, the update installs over your fixed game and your worlds stay. [Keep your signing key safe](signingKey)'
          ]
        }
      ],
      help: [
        'Not sure a world is saved? Back it up again — it only takes a moment.',
        'Questions? [Ask on GitHub](patcherIssues).'
      ]
    } as GuideDoc,
    'get-apk': {
      tags: 'Patcher · Android',
      title: 'Get the APK of the game you own',
      lead: 'The web and desktop Patcher need the game as an `.apk` file. On Android you can usually skip this guide.',
      need: [
        'The Blockheads installed on your Android phone',
        'For the computer route: a USB cable and Android’s `adb` tool'
      ],
      steps: [
        {
          title: 'On Android? Use the installed game',
          body: [
            'The Blockheads Patcher app for Android finds the game on your phone. Tap **Use installed game** — no file needed. Or tap **Pick an APK file** if you already have one.'
          ]
        },
        {
          title: 'Copy the game to a computer',
          body: [
            'Turn on USB debugging on the phone, connect it and ask Android where the game is. Then copy that file:'
          ],
          warn: 'If the first command prints **more than one** line, the game is split into several APK files. The Patcher can’t patch those safely — you need a full (universal) APK.'
        },
        {
          title: 'Open it in the Patcher',
          body: [
            'Open the [web Patcher](webPatcher) or the desktop app and drop the file in. It takes **.apk files only**. Nothing is uploaded.'
          ],
          tip: 'Use only your own copy, and don’t share the APK with others.'
        }
      ],
      help: [
        '**“Choose the .apk of The Blockheads that you saved from your phone.”** — the file is a different app.',
        '**“The installed game is split into several APK files…”** — supply a full (universal) APK instead.',
        'Next: [Fix the game on your phone](fixGameOnPhone).'
      ]
    } as GuideDoc,
    'signing-key': {
      tags: 'Patcher',
      title: 'Keep your signing key safe',
      lead: 'Every game you patch is signed with a key that lives only on your device. Keep a backup, and future fixes install without uninstalling.',
      need: ['The Blockheads Patcher (web, desktop or Android)', 'A safe place for one small file, and a password you can remember'],
      steps: [
        {
          title: 'Know what the key does',
          body: [
            'The Patcher creates the key the first time you patch. Android only installs an update over your fixed game if **both are signed with the same key**. A new key means uninstalling again — and losing local worlds unless you back them up.'
          ],
          warn: '**Keep it private.** Anyone with your key could make apps that look like updates to your game.'
        },
        {
          title: 'Export a backup',
          body: [
            'Open **Signing keys** and choose **Export backup…**. Set a password, repeat it and tap **Save backup**. You get a `.json` file, by default `blockheads-patcher-key.json`.'
          ],
          tip: 'We can’t recover the password, so write it down. Without a password the file is not encrypted, and anyone with it could sign apps as you.'
        },
        {
          title: 'Move it to another device',
          body: [
            'On the new device, open **Signing keys**, choose **Import key** and pick the `.json` file. Enter the backup password, then tap **Use this key**.',
            'Compare the first and last four pairs of the fingerprint on both devices to be sure it is the same key.'
          ]
        },
        {
          title: 'If the key is lost',
          body: [
            'Without a backup you can’t update games patched with that key. Back up your worlds, uninstall the fixed game and patch again with a new key. [How to back up worlds](backupWorlds)'
          ]
        }
      ],
      help: [
        'The web Patcher keeps the key in your browser’s storage for this site. Clearing the site’s data removes it — export a backup first.',
        'Import accepts only the `.json` backups exported by the Patcher.',
        'Questions? [Ask on GitHub](patcherIssues).'
      ]
    } as GuideDoc,
    'raspberry-pi': {
      tags: 'Server · Linux',
      title: 'Run a 24/7 server on a Raspberry Pi',
      lead: 'A Raspberry Pi uses little power and can host your world day and night. You will install the ARM build, start it on boot and keep nightly backups.',
      need: [
        'A Raspberry Pi with Raspberry Pi OS (or another Linux), connected to your network',
        'A terminal on the Pi (directly or over SSH)',
        'The command-line server from the [releases page](serverReleases)'
      ],
      steps: [
        {
          title: 'Check 32-bit or 64-bit',
          body: [
            'Use the `aarch64` build on a 64-bit OS and the `armv7` build on a 32-bit OS. This command tells you which you have:'
          ]
        },
        {
          title: 'Download and unpack',
          body: [
            'These commands use version 0.1.1 and the 64-bit build. Take the newest version from the releases page, and use `armv7-unknown-linux-gnueabihf` instead of `aarch64-unknown-linux-gnu` on a 32-bit OS.'
          ]
        },
        {
          title: 'Create your world',
          body: [
            'Create the world once by hand. Worlds are saved in `~/GNUstep/Library/ApplicationSupport/TheBlockheads`.'
          ],
          tip: 'Without options, the server loads the most recent world. The service below uses that.'
        },
        {
          title: 'Start it on every boot',
          body: [
            'Create a systemd service. Replace `pi` with your user name — the one that created the world.'
          ],
          tip: 'The service has no console. Give commands as an admin in the game chat (see [Admins, mods and bans](adminsMods)), and watch the log with `journalctl`.'
        },
        {
          title: 'Keep nightly backups',
          body: [
            'Copy the world folder only while the server is stopped. This root cron job stops the server at 04:00, packs everything into a dated `.tar.gz` and starts it again. Replace `/home/pi` with your home folder.'
          ],
          warn: '`systemctl stop` ends the server without a final save. The server saves regularly, but the last few seconds can be lost — pick a quiet time.'
        }
      ],
      help: [
        '**“Exec format error”** — wrong build. Check `uname -m` again.',
        '**Friends can’t connect** — the same checks as in [Play with friends on the same Wi-Fi](lanPlay).',
        'Still stuck? [Open an issue on GitHub](serverIssues) with the `journalctl` output.'
      ]
    } as GuideDoc,
    'open-internet': {
      tags: 'Server · Network',
      title: 'Open your server to the internet',
      lead: 'Let friends outside your home join your world. You will lock the server first, then forward one port on your router.',
      need: [
        'A server that already works on your Wi-Fi ([LAN guide](lanPlay))',
        'Access to your router’s settings page'
      ],
      steps: [
        {
          title: 'Lock the server first',
          body: [
            'Set a **password**: in the app under **Settings** → **Password** (up to 15 characters), or with `/set-password` in the console.',
            'Or turn on the **whitelist** by adding names: in the app under **Access lists** → **Whitelist**, or with `/whitelist`. As soon as the whitelist has names, only those players can join.'
          ]
        },
        {
          title: 'Give the server a fixed address',
          body: [
            'In your router, reserve the server computer’s local IP address (often called DHCP reservation), so it doesn’t change after a restart.'
          ]
        },
        {
          title: 'Forward the port',
          body: [
            'In the router’s port forwarding page, forward **UDP port 15151** to the server computer’s local address. If you changed the port, use yours.'
          ]
        },
        {
          title: 'Share your public address',
          body: [
            'Look up your public IP address and send it to your friends with the port. They join with **Join World** → **Advanced...** → **Online IP/Port...**.'
          ],
          warn: 'Your public IP shows roughly where you are. Share it only with people you trust.'
        }
      ],
      help: [
        '**Works at home, not outside** — the router’s internet address may differ from your public IP (some providers share one address between customers). Then port forwarding can’t work; ask your provider.',
        '**Still blocked** — check the firewall on the server computer allows UDP 15151.',
        'Need help? [Open an issue on GitHub](serverIssues).'
      ]
    } as GuideDoc,
    'admins-mods': {
      tags: 'Server',
      title: 'Admins, mods and bans explained',
      lead: 'Who can do what on your server, and how to manage players from the app, the console or the game chat.',
      need: ['A running Blockheads Server', 'The player names you want to manage'],
      steps: [
        {
          title: 'Know the roles',
          body: [
            'The server console has every right. **Admins** have full control, including other admins. **Mods** can kick and ban players, but not change admins. Admins and mods type commands in the game chat, starting with `/`.'
          ],
          list: [
            '**Mods:** `/players`, `/kick`, `/ban`, `/unban`, `/whitelist`, `/unwhitelist`, `/clear`',
            '**Admins also:** `/stop`, `/pvp-on`, `/pvp-off`, `/mod`, `/unmod`, `/admin`, `/unadmin`, `/load-lists`',
            '**Owner only:** `/set-password`, `/remove-password`'
          ]
        },
        {
          title: 'Add admins and mods',
          body: [
            'In the app, open **Access lists** → **Admins** or **Mods** and tap **Add admin** or **Add mod**. Or tap a player under **Players** and choose **Make admin** or **Make mod**. In the console:'
          ]
        },
        {
          title: 'Kick and ban',
          body: [
            'In the app, tap a player and choose **Kick…** or **Ban…**. A ban can **also block the IP address**, not only the name. `/ban` also bans the player’s device; `/ban-no-device` bans only the name.'
          ]
        },
        {
          title: 'Use a whitelist',
          body: [
            'The whitelist turns on as soon as it has a name in it. Then only listed players can join, and anyone not allowed is kicked.'
          ]
        },
        {
          title: 'Edit the list files',
          body: [
            'Each world keeps `adminlist.txt`, `modlist.txt`, `whitelist.txt` and `blacklist.txt` in its folder under `saves`. One name per line; names are not case sensitive and the first line is ignored. After editing by hand, reload them:'
          ]
        }
      ],
      help: [
        '**“Sorry, you do not have permission to issue that command.”** — you are not a mod or admin on this server.',
        'While the server runs, the app applies list changes through console commands.',
        'Questions? [Ask on GitHub](serverIssues).'
      ]
    } as GuideDoc,
    'host-android': {
      tags: 'Server · Android',
      title: 'Host from an Android phone',
      lead: 'Turn a spare Android phone into a server. The Blockheads Server app keeps running in the background, with a notification to control it.',
      need: [
        'An Android phone on your Wi-Fi',
        'The Blockheads Server APK (`blockheads-server-…-android.apk`, [releases](serverReleases))',
        'A charger'
      ],
      steps: [
        {
          title: 'Install the app',
          body: ['Download the APK and open it. Android may ask you to allow installs from your browser.']
        },
        {
          title: 'Create a world and start',
          body: [
            'Open **Worlds** → **Create world**. Pick a name (up to 30 characters) and a size, keep **Use this world right away** on, then tap **Start server**.'
          ]
        },
        {
          title: 'Let it run in the background',
          body: [
            'A notification shows the state, the world, how many players are online and the address. Its buttons are **Stop server**, **Copy address** and **Console**.'
          ],
          tip: 'The app keeps the phone and its Wi-Fi awake while the server runs. If your phone still stops it, turn off battery optimization for Blockheads Server in Android’s settings.'
        },
        {
          title: 'Keep the phone charging',
          body: ['Hosting uses battery. Leave the phone on its charger while friends play.']
        },
        {
          title: 'Connect your friends',
          body: [
            'The **Dashboard** shows the **LAN address** and a QR code. On the other phones, join with **Join World** → **Advanced...** → **Online IP/Port...**.'
          ]
        }
      ],
      help: [
        '**“Server stopped unexpectedly”** — tap the notification and choose **Open log** to see why.',
        'The worlds are stored in the app’s private storage on this phone.',
        'Still stuck? [Open an issue on GitHub](serverIssues).'
      ]
    } as GuideDoc,
    docker: {
      tags: 'Server · Docker',
      title: 'Docker and Docker Compose',
      lead: 'Run the server as a container. Worlds live in a volume, so they survive updates.',
      need: [
        'Docker (and Docker Compose if you want it)',
        'The multi-arch image `ghcr.io/blockheads-club/blockheads-server` (amd64, arm64, arm/v7)'
      ],
      steps: [
        {
          title: 'Create a world',
          body: [
            'Run the container once with `-it` so you get the console. Worlds go into the `bh-data` volume. Wait for **World load complete.**, then type `/stop`.'
          ],
          tip: 'The examples use version 0.1.1. Every release has a version tag; pick the newest one.'
        },
        {
          title: 'Find the world ID',
          body: ['List the worlds in the volume. The long hex name is the world ID.']
        },
        {
          title: 'Run it in the background',
          body: [
            'Start the world with `--load`. Keep `-i` and `-t` so you can open the console later, and map the port as **UDP**.'
          ]
        },
        {
          title: 'Logs and console',
          body: ['Follow the log, or attach to the console to type commands like `/players` or `/stop`.']
        },
        {
          title: 'Or use Docker Compose',
          body: ['The same setup as a `compose.yaml`. Start it with `docker compose up -d`.']
        }
      ],
      help: [
        '**The container only prints help** — the image starts with `--help` unless you give options such as `--new` or `--load`.',
        '**Updating** — stop and remove the container, then run it again with the new tag. The `bh-data` volume keeps your worlds. `docker stop` ends the server without a final save, so stop when nobody is playing.',
        '**No connection** — the port must be mapped as `15151:15151/udp`.'
      ]
    } as GuideDoc
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
            a: 'Same Wi-Fi, correct address and port, firewall allows the server, and the whitelist (if on) includes their name. [Connection guide](lanPlay)'
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
