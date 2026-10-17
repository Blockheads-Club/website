/** Command-line snippets are language-neutral and live outside the dictionaries. */
export type Kind = 'plain' | 'pr' | 'cm' | 'ok' | 'info';
export type Segment = readonly [Kind, string];
export type Line = readonly Segment[];

const pr = (text: string): Segment => ['pr', text];
const t = (text: string): Segment => ['plain', text];
const cm = (text: string): Segment => ['cm', text];

export type PlatformId = 'win' | 'mac' | 'linux' | 'pi' | 'docker' | 'android';

/** Code per platform, aligned to the steps in the dictionary (undefined = step has no code). */
export const COMMANDS: Record<PlatformId, readonly (readonly Line[] | undefined)[]> = {
  win: [undefined, [[pr('PS> '), t('.\\blockheads-server.exe --world "Sunny Isle"')]], undefined],
  mac: [
    [
      [pr('$ '), t('tar -xzf blockheads-server-macos-universal.tar.gz')],
      [pr('$ '), t('cd blockheads-server')]
    ],
    [[pr('$ '), t('xattr -d com.apple.quarantine ./blockheads-server')]],
    [[pr('$ '), t('./blockheads-server --world "Sunny Isle"')]]
  ],
  linux: [
    [
      [pr('$ '), t('tar -xzf blockheads-server-linux-x64.tar.gz')],
      [pr('$ '), t('cd blockheads-server')]
    ],
    [[pr('$ '), t('./blockheads-server --world "Sunny Isle" --port 15151')]]
  ],
  pi: [
    [
      [pr('$ '), t('tar -xzf blockheads-server-linux-arm64.tar.gz')],
      [pr('$ '), t('sudo mv blockheads-server /opt/')]
    ],
    [
      [pr('$ '), t('sudo /opt/blockheads-server/blockheads-server install-service')],
      [pr('$ '), t('sudo systemctl enable --now blockheads-server')]
    ]
  ],
  docker: [
    [
      [pr('$ '), t('docker run -d --name blockheads --restart unless-stopped \\')],
      [t('    -p 15151:15151 -v bh-data:/data \\')],
      [t('    -e BH_WORLD="Sunny Isle" [IMAGE]:latest')]
    ],
    [[pr('$ '), t('docker attach blockheads   '), cm('# detach: Ctrl+P, Ctrl+Q')]]
  ],
  android: [undefined, undefined, undefined]
};

/** Home page example console output. */
export const HOME_EXAMPLE: readonly Line[] = [
  [cm('# Linux / macOS / Raspberry Pi')],
  [pr('$ '), t('./blockheads-server --world "Sunny Isle"')],
  [['ok', '✓ '], t('World loaded · 1× · normal mode')],
  [['ok', '✓ '], t('Listening on 0.0.0.0:15151')],
  [['info', '→ '], t('MIRA_K joined (1/16)')]
];

/** Text that gets copied: prompts and comments are dropped, one command per line. */
export function copyText(lines: readonly Line[]): string {
  return lines
    .map((line) =>
      line
        .filter(([kind]) => kind === 'plain')
        .map(([, text]) => text)
        .join('')
        .trimEnd()
    )
    .join('\n');
}
