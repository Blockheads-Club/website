// Build-time link preview images (1200x630 PNG). satori lays out a small element tree with the site's body font
// (Atkinson Hyperlegible Next, SIL OFL, bundled from @fontsource as .woff) and @resvg/resvg-js rasterises the SVG.
// Prerendered by src/routes/og/[page].png and src/routes/mods/[id]/og.png; nothing here runs in the browser.
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import regularLatin from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff?inline';
import regularExt from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-ext-400-normal.woff?inline';
import boldLatin from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-800-normal.woff?inline';
import boldExt from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-ext-800-normal.woff?inline';
import logoSvg from '../../../static/logo.svg?raw';
import patcherSvg from '../../../static/apps/patcher.svg?raw';
import pcSvg from '../../../static/apps/pc.svg?raw';
import serverSvg from '../../../static/apps/server.svg?raw';
import { en } from '../i18n/en';
import { modDescription, modName, type Mod } from '../mods';
import { OG_HEIGHT, OG_WIDTH, modFacts, pageText, truncate, type OgPage } from '../seo';

export type OgIcon = 'logo' | 'pc' | 'patcher' | 'server';

export interface OgCard {
  /** Small line above the title ("Mods for The Blockheads", "Blockheads Club"). */
  eyebrow: string;
  title: string;
  description: string;
  /** Pills under the description (version, sides, tags ...). */
  chips: string[];
  icon: OgIcon;
}

const ICONS: Record<OgIcon, string> = { logo: logoSvg, pc: pcSvg, patcher: patcherSvg, server: serverSvg };

/** Shown at the bottom of every card. */
export const SITE_LABEL = 'blockheads.club';

/** Bytes of a base64 data URL (`?inline` imports). */
export function dataUrlBytes(url: string): Uint8Array {
  const bin = atob(url.slice(url.indexOf(',') + 1));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** A UTF-8 string as a base64 data URL. */
export function svgDataUrl(svg: string): string {
  let bin = '';
  for (const byte of new TextEncoder().encode(svg)) bin += String.fromCharCode(byte);
  return 'data:image/svg+xml;base64,' + btoa(bin);
}

const FONT = 'Atkinson Hyperlegible Next';
/** Card width minus padding (2 x 72), icon (300) and gap (60). */
const TEXT_WIDTH = OG_WIDTH - 2 * 72 - 300 - 60;
const FONTS = [
  { name: FONT, data: dataUrlBytes(regularLatin), weight: 400 as const, style: 'normal' as const },
  { name: FONT, data: dataUrlBytes(regularExt), weight: 400 as const, style: 'normal' as const },
  { name: FONT, data: dataUrlBytes(boldLatin), weight: 800 as const, style: 'normal' as const },
  { name: FONT, data: dataUrlBytes(boldExt), weight: 800 as const, style: 'normal' as const }
];

interface Node {
  type: string;
  props: { style?: Record<string, string | number>; children?: (Node | string)[] | Node | string; src?: string; width?: number; height?: number };
}

const h = (type: string, style: Record<string, string | number>, children?: Node['props']['children']): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children }
});

/** Title size that keeps long names on at most two lines. */
export function titleSize(title: string): number {
  if (title.length <= 18) return 76;
  if (title.length <= 32) return 60;
  return 48;
}

/** The satori element tree of a card (same look as static/social-preview.png). */
export function cardTree(card: OgCard): Node {
  const chip = (text: string): Node =>
    h(
      'div',
      {
        padding: '8px 20px',
        borderRadius: 999,
        background: 'rgba(255, 255, 255, 0.16)',
        border: '2px solid rgba(255, 255, 255, 0.32)',
        color: '#ffffff',
        fontSize: 24
      },
      text
    );
  const icon: Node = { type: 'img', props: { src: svgDataUrl(ICONS[card.icon]), width: 300, height: 300, style: { borderRadius: 64 } } };
  return h(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      alignItems: 'center',
      padding: '0 72px',
      gap: 60,
      fontFamily: FONT,
      backgroundImage: 'linear-gradient(135deg, #7b2a20 0%, #b2412d 55%, #e2553a 100%)'
    },
    [
      icon,
      h('div', { flexDirection: 'column', width: TEXT_WIDTH, gap: 18 }, [
        h('div', { color: '#ffd27a', fontSize: 28, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }, card.eyebrow),
        h('div', { color: '#ffffff', fontSize: titleSize(card.title), fontWeight: 800, lineHeight: 1.05 }, card.title),
        h('div', { color: '#fff3d6', fontSize: 30, lineHeight: 1.3 }, truncate(card.description, 130)),
        h('div', { flexWrap: 'wrap', gap: 12, marginTop: 6 }, card.chips.slice(0, 5).map(chip)),
        h('div', { color: 'rgba(255, 243, 214, 0.75)', fontSize: 22, marginTop: 10 }, SITE_LABEL)
      ])
    ]
  );
}

/** Renders a card to PNG bytes. */
export async function renderOg(card: OgCard): Promise<Uint8Array> {
  const svg = await satori(cardTree(card) as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: FONTS });
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng());
}

/** Preview card of a top-level page (English: the prerendered pages are English). */
export function pageCard(key: OgPage): OgCard {
  const text = pageText(key, en);
  const app = key === 'pc' || key === 'patcher' || key === 'server';
  return {
    eyebrow: 'Blockheads Club',
    title: text.name,
    // App cards show the one-line pitch; the page description adds the lead.
    description: app ? en[key].tagline : text.description,
    chips: app ? en[key].platforms : [],
    icon: app ? key : 'logo'
  };
}

/** Preview card of a mod: name, description, latest version, sides, vanilla-client support and tags. */
export function modCard(mod: Mod): OgCard {
  return {
    eyebrow: en.mods.title,
    title: modName(mod, 'en'),
    description: modDescription(mod, 'en') ?? en.mods.detail.noDescription,
    chips: [...modFacts(mod, en), ...(mod.tags ?? [])],
    icon: 'logo'
  };
}

/** A prerendered PNG response. */
export function pngResponse(png: Uint8Array): Response {
  return new Response(png as BodyInit, { headers: { 'content-type': 'image/png' } });
}
