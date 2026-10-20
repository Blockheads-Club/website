/**
 * Screenshots of our own apps (never of the game), rendered headlessly from each app's e2e mocks.
 * Files: `static/shots/<locale>/<name>.webp`, one per UI language. Alt text and captions live in the dictionaries (`shots`).
 */
export interface ShotMeta {
  w: number;
  h: number;
  /** Phone-sized screen: shown narrower and centred. */
  phone: boolean;
}

const desktop: ShotMeta = { w: 1200, h: 816, phone: false };
const phone: ShotMeta = { w: 600, h: 1200, phone: true };

export const SHOTS = {
  'patcher/phone-choose': phone,
  'patcher/phone-review': phone,
  'patcher/phone-uninstall-confirm': phone,
  'patcher/phone-installed': phone,
  'patcher/choose': desktop,
  'patcher/keys-export': desktop,
  'server/worlds-create': { w: 1200, h: 936, phone: false },
  'server/dashboard': desktop,
  'server/access': desktop,
  'server/players-menu': desktop,
  'server/settings': desktop,
  'server/phone-worlds': phone,
  'server/phone-dashboard': phone
} satisfies Record<string, ShotMeta>;

export type ShotName = keyof typeof SHOTS;

/** Screenshot shown under a step of a `/guides/[slug]` guide, by guide id and step index. */
export const GUIDE_SHOTS: Record<string, Record<number, ShotName>> = {
  'lan-play': { 0: 'server/worlds-create', 2: 'server/dashboard' },
  'backup-worlds': { 2: 'patcher/phone-uninstall-confirm' },
  'get-apk': { 2: 'patcher/choose' },
  'signing-key': { 1: 'patcher/keys-export' },
  'open-internet': { 0: 'server/settings' },
  'admins-mods': { 1: 'server/access', 2: 'server/players-menu' },
  'host-android': { 1: 'server/phone-worlds', 4: 'server/phone-dashboard' }
};
