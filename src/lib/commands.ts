/** Command-line snippets are language-neutral and live outside the dictionaries. */
export type Kind = 'plain' | 'pr' | 'cm' | 'ok' | 'info';
export type Segment = readonly [Kind, string];
export type Line = readonly Segment[];

const pr = (text: string): Segment => ['pr', text];
const t = (text: string): Segment => ['plain', text];
const cm = (text: string): Segment => ['cm', text];

export type PlatformId = 'win' | 'mac' | 'linux' | 'pi' | 'docker' | 'android';

const V = 'v0.1.1';
const SERVER_IMAGE = 'ghcr.io/blockheads-club/blockheads-server:0.1.1';
const archive = (target: string) => 'blockheads-server-' + V + '-' + target;

/** Code per platform, aligned to the steps in the dictionary (undefined = step has no code). */
export const COMMANDS: Record<PlatformId, readonly (readonly Line[] | undefined)[]> = {
  win: [undefined, [[pr('PS> '), t('.\\blockheads_server.exe --new "Sunny Isle"')]], undefined],
  mac: [
    [
      [cm('# Apple silicon; on Intel use x86_64-apple-darwin')],
      [pr('$ '), t('tar -xzf ' + archive('aarch64-apple-darwin') + '.tar.gz')],
      [pr('$ '), t('cd ' + archive('aarch64-apple-darwin'))]
    ],
    [[pr('$ '), t('xattr -d com.apple.quarantine ./blockheads_server')]],
    [[pr('$ '), t('./blockheads_server --new "Sunny Isle"')]]
  ],
  linux: [
    [
      [pr('$ '), t('tar -xzf ' + archive('x86_64-unknown-linux-gnu') + '.tar.gz')],
      [pr('$ '), t('cd ' + archive('x86_64-unknown-linux-gnu'))]
    ],
    [[pr('$ '), t('./blockheads_server --new "Sunny Isle" --port 15151')]]
  ],
  pi: [
    [
      [pr('$ '), t('tar -xzf ' + archive('aarch64-unknown-linux-gnu') + '.tar.gz')],
      [pr('$ '), t('sudo mv ' + archive('aarch64-unknown-linux-gnu') + ' /opt/blockheads-server')]
    ],
    [
      [cm('# after creating the service from the Raspberry Pi guide')],
      [pr('$ '), t('sudo systemctl enable --now blockheads')]
    ]
  ],
  docker: [
    [
      [pr('$ '), t('docker run -dit --name blockheads \\')],
      [t('    -p 15151:15151/udp -v bh-data:/data \\')],
      [t('    ' + SERVER_IMAGE + ' --new "Sunny Isle"')]
    ],
    [[pr('$ '), t('docker attach blockheads   '), cm('# detach: Ctrl+P, Ctrl+Q')]]
  ],
  android: [undefined, undefined, undefined]
};

/** Home page example console output (real start-up lines, timestamps trimmed). */
export const HOME_EXAMPLE: readonly Line[] = [
  [cm('# Linux / macOS / Raspberry Pi')],
  [pr('$ '), t('./blockheads_server --new "Sunny Isle"')],
  [['info', '→ '], t('Creating new world named "SUNNY ISLE"')],
  [['info', '→ '], t('Loading world named "SUNNY ISLE" on port 15151 with id:34343411…')],
  [['ok', '✓ '], t('World load complete.')]
];

/** Text that gets copied: prompts and comments (and comment-only lines) are dropped, one command per line. */
export function copyText(lines: readonly Line[]): string {
  return lines
    .filter((line) => line.some(([kind]) => kind === 'plain'))
    .map((line) =>
      line
        .filter(([kind]) => kind === 'plain')
        .map(([, text]) => text)
        .join('')
        .trimEnd()
    )
    .join('\n');
}

const REL = 'https://github.com/Blockheads-Club/blockheads-server/releases/download/v0.1.1/';
const PI = 'blockheads-server-v0.1.1-aarch64-unknown-linux-gnu';
const IMG = SERVER_IMAGE;

/** Code per guide, by step index (missing = step has no code). Shown on `/guides/[slug]`. */
export const GUIDE_CODE: Record<string, Record<number, readonly Line[]>> = {
  'lan-play': {
    0: [
      [cm('# Linux / macOS, in the unpacked folder')],
      [pr('$ '), t('./blockheads_server --new MYWORLD')],
      [cm('# Windows (PowerShell)')],
      [pr('PS> '), t('.\\blockheads_server.exe --new MYWORLD')]
    ]
  },
  'get-apk': {
    1: [
      [pr('$ '), t('adb shell pm path com.noodlecake.blockheads')],
      [cm('# package:/data/app/…/base.apk')],
      [pr('$ '), t('adb pull /data/app/…/base.apk blockheads.apk')]
    ]
  },
  'raspberry-pi': {
    0: [
      [pr('$ '), t('uname -m')],
      [cm('# aarch64 = 64-bit, armv7l = 32-bit')]
    ],
    1: [
      [pr('$ '), t('curl -LO ' + REL + PI + '.tar.gz')],
      [pr('$ '), t('tar -xzf ' + PI + '.tar.gz')],
      [pr('$ '), t('sudo mv ' + PI + ' /opt/blockheads-server')]
    ],
    2: [
      [pr('$ '), t('/opt/blockheads-server/blockheads_server --new MYWORLD')],
      [cm('# wait for "World load complete.", then type:')],
      [pr('> '), t('/stop')]
    ],
    3: [
      [pr('$ '), t("sudo tee /etc/systemd/system/blockheads.service <<'EOF'")],
      [t('[Unit]')],
      [t('Description=Blockheads server')],
      [t('After=network-online.target')],
      [t('Wants=network-online.target')],
      [t('')],
      [t('[Service]')],
      [t('User=pi')],
      [t('ExecStart=/opt/blockheads-server/blockheads_server')],
      [t('Restart=on-failure')],
      [t('')],
      [t('[Install]')],
      [t('WantedBy=multi-user.target')],
      [t('EOF')],
      [pr('$ '), t('sudo systemctl enable --now blockheads')],
      [pr('$ '), t('journalctl -u blockheads -f')]
    ],
    4: [
      [pr('$ '), t('sudo crontab -e')],
      [cm('# add this line (one line): every night at 04:00')],
      [
        t(
          '0 4 * * * systemctl stop blockheads && tar -czf /home/pi/bh-backup-$(date +\\%F).tar.gz -C /home/pi/GNUstep/Library/ApplicationSupport TheBlockheads; systemctl start blockheads'
        )
      ]
    ]
  },
  'open-internet': {
    0: [
      [cm('# in the server console')],
      [pr('> '), t('/set-password secret123')],
      [pr('> '), t('/whitelist friendname')]
    ]
  },
  'admins-mods': {
    1: [
      [pr('> '), t('/admin playername')],
      [pr('> '), t('/mod playername')],
      [pr('> '), t('/list-adminlist')]
    ],
    2: [
      [pr('> '), t('/kick playername')],
      [pr('> '), t('/ban playername')],
      [pr('> '), t('/unban playername')]
    ],
    3: [
      [pr('> '), t('/whitelist playername')],
      [pr('> '), t('/list-whitelist')]
    ],
    4: [[pr('> '), t('/load-lists')]]
  },
  docker: {
    0: [[pr('$ '), t('docker run -it --rm -p 15151:15151/udp -v bh-data:/data ' + IMG + ' --new MYWORLD')]],
    1: [
      [pr('$ '), t('docker run --rm -v bh-data:/data ' + IMG + ' --list')],
      [cm('# "MYWORLD" stored in directory named 4e834bde…')]
    ],
    2: [
      [pr('$ '), t('docker run -dit --name blockheads --restart unless-stopped \\')],
      [t('    -p 15151:15151/udp -v bh-data:/data \\')],
      [t('    ' + IMG + ' --load WORLD_ID')]
    ],
    3: [
      [pr('$ '), t('docker logs -f blockheads')],
      [pr('$ '), t('docker attach blockheads   '), cm('# detach: Ctrl+P, Ctrl+Q')]
    ],
    4: [
      [t('services:')],
      [t('  blockheads:')],
      [t('    image: ' + IMG)],
      [t('    command: ["--load", "WORLD_ID"]')],
      [t('    ports: ["15151:15151/udp"]')],
      [t('    volumes: ["bh-data:/data"]')],
      [t('    stdin_open: true')],
      [t('    tty: true')],
      [t('    restart: unless-stopped')],
      [t('volumes:')],
      [t('  bh-data:')]
    ]
  }
};
