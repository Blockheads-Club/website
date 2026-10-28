const GH = 'https://github.com/Blockheads-Club';

export const LINKS = {
  org: GH,
  pcRepo: GH + '/blockheads-pc',
  pcIssues: GH + '/blockheads-pc/issues',
  patcherRepo: GH + '/blockheads-patcher',
  patcherIssues: GH + '/blockheads-patcher/issues',
  serverRepo: GH + '/blockheads-server',
  serverIssues: GH + '/blockheads-server/issues',
  websiteRepo: GH + '/website',
  websiteIssues: GH + '/website/issues',
  modSdk: GH + '/mod-sdk',
  modsRepo: GH + '/mods',
  modSdkIssues: GH + '/mod-sdk/issues',
  i18nFiles: GH + '/website/tree/dev/src/lib/i18n',
  docsSource: GH + '/website/tree/dev/docs',
  goodFirstIssues: 'https://github.com/issues?q=is%3Aopen+is%3Aissue+org%3ABlockheads-Club+label%3A%22good+first+issue%22',
  openIssues: 'https://github.com/issues?q=is%3Aopen+is%3Aissue+org%3ABlockheads-Club',
  licence: GH + '/website/blob/dev/LICENSE'
} as const;

export type LinkKey = keyof typeof LINKS;

/** Canonical site URL (blockheads.club, served by Cloudflare; the GitHub Pages copy points here too); used for absolute OpenGraph and canonical URLs. Ends with a slash. */
export const SITE_URL = 'https://blockheads.club/';
