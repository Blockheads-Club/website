/** Devices the download picker offers. `pi` and `docker` are never detected, only chosen. */
export const DEVICES = ['windows', 'macos', 'linux', 'android', 'pi', 'docker', 'ios'] as const;
export type Device = (typeof DEVICES)[number];

export function isDevice(value: unknown): value is Device {
  return typeof value === 'string' && (DEVICES as readonly string[]).includes(value);
}

/**
 * Guesses the visitor's device from the browser (client side only). iPadOS reports itself as a Mac, so a "Mac" with
 * a touch screen counts as iOS. Returns undefined when nothing matches; the picker then keeps its default.
 */
export function detectDevice(userAgent: string, maxTouchPoints = 0): Device | undefined {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (ua.includes('android')) return 'android';
  if (ua.includes('mac os') || ua.includes('macintosh')) return maxTouchPoints > 1 ? 'ios' : 'macos';
  if (ua.includes('windows')) return 'windows';
  if (ua.includes('linux') || ua.includes('x11') || ua.includes('cros')) return 'linux';
  return undefined;
}
