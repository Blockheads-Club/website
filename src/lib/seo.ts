// Link previews (Open Graph + Twitter card) for every prerendered page. The layout renders one <Seo> from
// pageMeta(), so each page gets exactly one set of og:* tags; unknown pages fall back to the site-wide preview.
// Preview images: static/social-preview.png (home, fallback) and PNGs rendered at build time by
// src/lib/server/og-image.ts (/og/<page>.png for the app and top-level pages, /mods/<id>/og.png per mod).
import { SITE_URL } from './config';
import type { Dict } from './i18n/en';
import type { Locale } from './i18n';
import { latestVersion, modDescription, modName, sidesLabel, type Mod } from './mods';
import { movedTarget, targetHref, type RouteKey, type Target } from './route';

export interface PageMeta {
  /** og:title / twitter:title (the <title> tag is set separately). */
  title: string;
  description: string;
  /** Canonical absolute URL (og:url, <link rel="canonical">). */
  url: string;
  image: { url: string; width: number; height: number; alt: string };
  type: 'website' | 'article';
  /** og:locale, e.g. `en_US`. */
  locale: string;
}

/** Size of the generated preview images (the size Facebook, X, Discord and Slack crop to least). */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Site-wide preview, used on the home page and as the fallback. */
export const DEFAULT_IMAGE = { path: 'social-preview.png', width: 1280, height: 640 };

/** Pages with their own generated preview at /og/<key>.png. */
export const OG_PAGES = ['download', 'pc', 'patcher', 'server', 'mods', 'modsSubmit', 'contribute', 'about'] as const;
export type OgPage = (typeof OG_PAGES)[number];

export const isOgPage = (key: string): key is OgPage => (OG_PAGES as readonly string[]).includes(key);

export const OG_LOCALES: Record<Locale, string> = { en: 'en_US', tr: 'tr_TR', ru: 'ru_RU', kk: 'kk_KZ' };

/** Collapses whitespace and cuts `text` to at most `max` characters at a word boundary, adding an ellipsis. */
export function truncate(text: string, max = 200): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > max / 2 ? cut.slice(0, space) : cut).replace(/[\s,.;:—–-]+$/, '') + '…';
}

/** Absolute canonical URL of a site path below the base path (`/pc` -> `https://…/website/pc`). */
export function canonical(path: string): string {
  return SITE_URL + path.replace(/^\/+/, '').replace(/\/+$/, '');
}

/** Image path of a generated page preview, relative to the site root. */
export const ogPagePath = (key: OgPage): string => 'og/' + key + '.png';
/** Image path of a mod's preview, relative to the site root. */
export const ogModPath = (id: string): string => 'mods/' + id + '/og.png';

/** Title and one-line pitch of a top-level page, from the dictionary. */
export function pageText(key: OgPage, d: Dict): { name: string; title: string; description: string } {
  switch (key) {
    case 'pc':
    case 'patcher':
    case 'server':
      return { name: d.meta.titles[key].split(' · ')[0], title: d.meta.titles[key], description: d[key].tagline + ' ' + d[key].lead };
    case 'download':
      return { name: d.download.title, title: d.meta.titles.download, description: d.download.lead };
    case 'mods':
      return { name: d.mods.title, title: d.meta.titles.mods, description: d.mods.lead };
    case 'modsSubmit':
      return { name: d.mods.submit.title, title: d.meta.titles.modsSubmit, description: d.mods.submit.lead };
    case 'contribute':
      return { name: d.contribute.title, title: d.meta.titles.contribute, description: d.contribute.lead };
    case 'about':
      return { name: d.about.title, title: d.meta.titles.about, description: d.about.lead };
  }
}

/** Short facts about a mod's latest usable version: `v1.2.0`, sides, and "works on vanilla clients". */
export function modFacts(mod: Mod, d: Dict): string[] {
  const latest = latestVersion(mod);
  if (!latest) return [d.mods.allYanked];
  const facts = ['v' + latest.version, d.mods.sides[sidesLabel(latest.sides)]];
  if (latest['client-required'] !== true) facts.push(d.meta.vanilla);
  return facts;
}

/** Preview title of a mod page: "<name> — Blockheads mod". */
export const modTitle = (mod: Mod, d: Dict, locale: string): string => modName(mod, locale) + ' — ' + d.meta.modTitle;

/** Preview description of a mod page: its description (trimmed) plus its facts. */
export function modSummary(mod: Mod, d: Dict, locale: string): string {
  const facts = modFacts(mod, d).join(' · ');
  const text = modDescription(mod, locale) ?? d.mods.detail.noDescription;
  return truncate(text, 200 - facts.length - 3) + ' · ' + facts;
}

/** Everything the <Seo> component needs for the page at `path` (below the base path). */
export function pageMeta(route: RouteKey, path: string, d: Dict, locale: Locale, mod?: Mod): PageMeta {
  const site = (title: string, description: string, url: string, image: string, width: number, height: number): PageMeta => ({
    title,
    description,
    url,
    image: { url: SITE_URL + image, width, height, alt: title },
    type: 'website',
    locale: OG_LOCALES[locale]
  });
  if (route === 'modDetail' && mod) {
    const meta = site(modTitle(mod, d, locale), modSummary(mod, d, locale), canonical(path), ogModPath(mod.id), OG_WIDTH, OG_HEIGHT);
    return { ...meta, type: 'article' };
  }
  if (isOgPage(route)) {
    const text = pageText(route, d);
    return site(text.title, truncate(text.description), canonical(path), ogPagePath(route), OG_WIDTH, OG_HEIGHT);
  }
  // Home, moved pages, 404: the site-wide preview. A moved page points at its new home (English docs).
  const url = route === 'moved' ? canonical(targetHref(movedTarget(path, '') as Target, '', '').split('#')[0]) : SITE_URL;
  return site(d.meta.title, d.meta.description, url, DEFAULT_IMAGE.path, DEFAULT_IMAGE.width, DEFAULT_IMAGE.height);
}
