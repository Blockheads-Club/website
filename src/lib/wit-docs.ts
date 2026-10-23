// Turns the mod API's WIT files (Blockheads-Club/mod-sdk, wit/blockheads-api/) into Markdown reference pages for the
// VitePress docs. Pure functions only; scripts/gen-mod-api.ts reads the files and writes the pages.
//
// The parser covers the WIT subset the API uses: `package`, `interface` (use, type, enum, flags, record, variant,
// resource, func) and `world` (import, export, include). `///` doc comments attach to the next item.

export type ItemKind = 'type' | 'enum' | 'flags' | 'record' | 'variant' | 'resource' | 'func';

/** A field, case, parameter or method. */
export interface Member {
  name: string;
  /** Field type, case payload, or a method's signature. Empty when there is none. */
  type: string;
  docs: string;
}

export interface Item {
  kind: ItemKind;
  name: string;
  docs: string;
  /** Alias target (`type`) or function signature (`func`). */
  type: string;
  members: Member[];
}

export interface Interface {
  name: string;
  docs: string;
  uses: string[];
  items: Item[];
}

export interface World {
  name: string;
  docs: string;
  /** `import x`, `export x`, `include x` in source order. */
  entries: { kind: 'import' | 'export' | 'include'; name: string }[];
}

export interface WitPackage {
  /** For example `blockheads:api@0.2.0`. */
  id: string;
  interfaces: Interface[];
  worlds: World[];
}

interface Token {
  text: string;
  /** Doc comment lines right before this token. */
  docs: string[];
}

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let docs: string[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (src.startsWith('///', i)) {
      const end = src.indexOf('\n', i);
      const stop = end === -1 ? src.length : end;
      docs.push(src.slice(i + 3, stop).trim());
      i = stop;
    } else if (src.startsWith('//', i)) {
      const end = src.indexOf('\n', i);
      i = end === -1 ? src.length : end;
    } else if (src.startsWith('/*', i)) {
      const end = src.indexOf('*/', i + 2);
      if (end === -1) throw new Error('unterminated block comment');
      i = end + 2;
    } else if (src.startsWith('->', i)) {
      out.push({ text: '->', docs });
      docs = [];
      i += 2;
    } else if ('{}()<>,;:=.'.includes(c)) {
      out.push({ text: c, docs });
      docs = [];
      i++;
    } else {
      const m = /^[%@A-Za-z0-9_\-/+]+/.exec(src.slice(i));
      if (!m) throw new Error(`unexpected character ${JSON.stringify(c)}`);
      out.push({ text: m[0], docs });
      docs = [];
      i += m[0].length;
    }
  }
  return out;
}

const joinDocs = (lines: string[]) => lines.join(' ').replace(/\s+/g, ' ').trim();
const ident = (t: string) => (t.startsWith('%') ? t.slice(1) : t);

class Parser {
  private pos = 0;
  constructor(private readonly toks: Token[]) {}

  done(): boolean {
    return this.pos >= this.toks.length;
  }

  peek(): Token {
    const t = this.toks[this.pos];
    if (!t) throw new Error('unexpected end of file');
    return t;
  }

  next(): Token {
    const t = this.peek();
    this.pos++;
    return t;
  }

  expect(text: string): Token {
    const t = this.next();
    if (t.text !== text) throw new Error(`expected ${text}, found ${t.text}`);
    return t;
  }

  eat(text: string): boolean {
    if (!this.done() && this.peek().text === text) {
      this.pos++;
      return true;
    }
    return false;
  }

  /** Raw tokens up to (not including) one of `stops` at nesting depth 0. */
  until(stops: string[]): string {
    let depth = 0;
    let s = '';
    for (;;) {
      const t = this.peek();
      if (depth === 0 && stops.includes(t.text)) return s;
      if (t.text === '<' || t.text === '(') depth++;
      if (t.text === '>' || t.text === ')') depth--;
      this.pos++;
      s += t.text === ',' ? ', ' : t.text === ':' ? ': ' : ident(t.text);
    }
  }
}

function parseFunc(p: Parser): string {
  // After `name:`; reads `func(...) [-> T];`
  p.expect('func');
  p.expect('(');
  const params = p.until([')']);
  p.expect(')');
  let result = '';
  if (p.eat('->')) result = p.until([';']);
  p.expect(';');
  return 'func(' + params + ')' + (result ? ' -> ' + result : '');
}

function parseMembers(p: Parser, kind: ItemKind): Member[] {
  const members: Member[] = [];
  p.expect('{');
  while (!p.eat('}')) {
    const head = p.next();
    const docs = joinDocs(head.docs);
    if (kind === 'resource') {
      // `name: func(...)`, or `constructor(...)`
      if (head.text === 'constructor') {
        p.expect('(');
        const params = p.until([')']);
        p.expect(')');
        p.expect(';');
        members.push({ name: 'constructor', type: 'constructor(' + params + ')', docs });
        continue;
      }
      p.expect(':');
      members.push({ name: ident(head.text), type: parseFunc(p), docs });
      continue;
    }
    let type = '';
    if (kind === 'record') {
      p.expect(':');
      type = p.until([',', '}']);
    } else if (kind === 'variant' && p.eat('(')) {
      type = p.until([')']);
      p.expect(')');
    }
    members.push({ name: ident(head.text), type, docs });
    p.eat(',');
  }
  return members;
}

function parseInterface(p: Parser, docs: string): Interface {
  const iface: Interface = { name: ident(p.next().text), docs, uses: [], items: [] };
  p.expect('{');
  while (!p.eat('}')) {
    const head = p.next();
    const d = joinDocs(head.docs);
    if (head.text === 'use') {
      iface.uses.push(p.until([';']));
      p.expect(';');
    } else if (head.text === 'type') {
      const name = ident(p.next().text);
      p.expect('=');
      const type = p.until([';']);
      p.expect(';');
      iface.items.push({ kind: 'type', name, docs: d, type, members: [] });
    } else if (['enum', 'flags', 'record', 'variant', 'resource'].includes(head.text)) {
      const kind = head.text as ItemKind;
      const name = ident(p.next().text);
      iface.items.push({ kind, name, docs: d, type: '', members: parseMembers(p, kind) });
    } else {
      p.expect(':');
      iface.items.push({ kind: 'func', name: ident(head.text), docs: d, type: parseFunc(p), members: [] });
    }
  }
  return iface;
}

function parseWorld(p: Parser, docs: string): World {
  const world: World = { name: ident(p.next().text), docs, entries: [] };
  p.expect('{');
  while (!p.eat('}')) {
    const kind = p.next().text;
    if (kind !== 'import' && kind !== 'export' && kind !== 'include') throw new Error(`unsupported world item ${kind}`);
    world.entries.push({ kind, name: p.until([';']) });
    p.expect(';');
  }
  return world;
}

/** Parses one or more WIT files of the same package. */
export function parseWit(sources: string[]): WitPackage {
  const pkg: WitPackage = { id: '', interfaces: [], worlds: [] };
  for (const src of sources) {
    const p = new Parser(tokenize(src));
    while (!p.done()) {
      const head = p.next();
      const docs = joinDocs(head.docs);
      if (head.text === 'package') {
        const id = p.until([';']).replace(/\s+/g, '');
        p.expect(';');
        if (pkg.id && pkg.id !== id) throw new Error(`mixed packages: ${pkg.id} and ${id}`);
        pkg.id = id;
      } else if (head.text === 'interface') {
        pkg.interfaces.push(parseInterface(p, docs));
      } else if (head.text === 'world') {
        pkg.worlds.push(parseWorld(p, docs));
      } else {
        throw new Error(`unsupported top-level item ${head.text}`);
      }
    }
  }
  if (!pkg.id) throw new Error('no package declaration');
  return pkg;
}

// ---------------------------------------------------------------------------------------------------------------
// Markdown

export type Locale = 'en' | 'tr' | 'ru' | 'kk';
export const LOCALES: Locale[] = ['en', 'tr', 'ru', 'kk'];

interface LocaleText {
  title: string;
  intro: string;
  /** Shown on translated pages: the reference itself stays in English. */
  english: string;
  interfaces: string;
  worlds: string;
}

const TEXT: Record<Locale, LocaleText> = {
  en: {
    title: 'API reference',
    intro:
      'Every interface of the mod API, generated from the WIT files in the [mod SDK](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/blockheads-api). Lua mods use the same API through the `bh` table: [how names map to Lua](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md).',
    english: '',
    interfaces: 'Interfaces',
    worlds: 'Worlds'
  },
  tr: {
    title: 'API başvurusu',
    intro:
      'Mod API’sinin bütün arayüzleri, [mod SDK’sındaki](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/blockheads-api) WIT dosyalarından üretilir. Lua modları aynı API’yi `bh` tablosuyla kullanır: [adların Lua’daki karşılıkları](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md).',
    english: 'Başvuru metni WIT dosyalarından otomatik üretildiği için İngilizce.',
    interfaces: 'Arayüzler',
    worlds: 'Dünyalar (worlds)'
  },
  ru: {
    title: 'Справочник API',
    intro:
      'Все интерфейсы API модов, собранные из WIT-файлов в [mod SDK](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/blockheads-api). Моды на Lua используют тот же API через таблицу `bh`: [как имена выглядят в Lua](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md).',
    english: 'Сам справочник на английском: он создаётся автоматически из WIT-файлов.',
    interfaces: 'Интерфейсы',
    worlds: 'Миры (worlds)'
  },
  kk: {
    title: 'API анықтамасы',
    intro:
      'Мод API-інің барлық интерфейстері [mod SDK](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/blockheads-api) ішіндегі WIT файлдарынан жасалады. Lua модтары сол API-ді `bh` кестесі арқылы пайдаланады: [атаулар Lua-да қалай аталады](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md).',
    english: 'Анықтаманың өзі ағылшын тілінде: ол WIT файлдарынан автоматты түрде жасалады.',
    interfaces: 'Интерфейстер',
    worlds: 'Әлемдер (worlds)'
  }
};

/** Escapes Markdown text for VitePress: `<`/`>` outside code spans (Vue would read them as tags). */
export function escapeText(s: string): string {
  return s
    .split('`')
    .map((part, i) => (i % 2 === 1 ? part : part.replace(/</g, '&lt;').replace(/>/g, '&gt;')))
    .join('`');
}

/** A table cell: escaped text with `|` escaped too (GFM splits cells on it even inside code spans). */
const cell = (s: string) => (s ? escapeText(s).replace(/\|/g, '\\|') : '');
const code = (s: string) => '`' + s + '`';
const snake = (s: string) => s.replace(/-/g, '_');

/** The first sentence of a doc comment, for summaries. */
export function summary(docs: string): string {
  const m = /^(.*?[.!?])(\s|$)/.exec(docs);
  return m ? m[1] : docs;
}

const KIND_LABEL: Record<ItemKind, string> = {
  type: 'type',
  enum: 'enum',
  flags: 'flags',
  record: 'record',
  variant: 'variant',
  resource: 'resource',
  func: 'function'
};

function header(pkgId: string): string {
  return `<!-- Generated by scripts/gen-mod-api.ts from ${pkgId}. Do not edit by hand. -->\n`;
}

/** Translated pages say why the reference text is in English. */
function intro(locale: Locale): string {
  return locale === 'en' ? '' : '::: info\n' + TEXT[locale].english + '\n:::';
}

function renderItem(item: Item): string {
  const lines: string[] = [`### ${code(item.name)} <Badge type="info" text="${KIND_LABEL[item.kind]}" />`, ''];
  if (item.kind === 'func') {
    lines.push('```txt', `${item.name}: ${item.type};`, '```', '');
  } else if (item.kind === 'type') {
    lines.push('```txt', `type ${item.name} = ${item.type};`, '```', '');
  }
  if (item.docs) lines.push(escapeText(item.docs), '');
  if (item.kind === 'record') {
    lines.push('| Field | Type | Description |', '| --- | --- | --- |');
    for (const m of item.members) lines.push(`| ${code(m.name)} | ${cell(code(m.type))} | ${cell(m.docs)} |`);
    lines.push('');
  } else if (item.kind === 'variant') {
    lines.push('| Case | Payload | Description |', '| --- | --- | --- |');
    for (const m of item.members) lines.push(`| ${code(m.name)} | ${m.type ? cell(code(m.type)) : '–'} | ${cell(m.docs)} |`);
    lines.push('');
  } else if (item.kind === 'enum' || item.kind === 'flags') {
    lines.push('| Case | Description |', '| --- | --- |');
    for (const m of item.members) lines.push(`| ${code(m.name)} | ${cell(m.docs)} |`);
    lines.push('');
  } else if (item.kind === 'resource') {
    lines.push('| Method | Signature | Description |', '| --- | --- | --- |');
    for (const m of item.members) lines.push(`| ${code(m.name)} | ${cell(code(m.type))} | ${cell(m.docs)} |`);
    lines.push('', 'Lua: methods are called with `:`, for example ' + code(`${item.name}:${snake(item.members[0]?.name ?? 'id')}()`) + '.', '');
  }
  return lines.join('\n');
}

/** One interface page. */
export function renderInterface(pkgId: string, iface: Interface, locale: Locale): string {
  const types = iface.items.filter((i) => i.kind !== 'func');
  const funcs = iface.items.filter((i) => i.kind === 'func');
  const out: string[] = [
    header(pkgId),
    `# ${code(iface.name)}`,
    '',
    intro(locale),
    '',
    escapeText(iface.docs),
    '',
    `Package ${code(pkgId)} · Lua table ${code('bh.' + snake(iface.name))}` +
      ` · [WIT source](https://github.com/Blockheads-Club/mod-sdk/blob/dev/wit/blockheads-api/${iface.name}.wit)`,
    ''
  ];
  if (iface.uses.length) out.push('Uses: ' + iface.uses.map(code).join(', '), '');
  if (types.length) out.push('## Types', '', ...types.map(renderItem));
  if (funcs.length) out.push('## Functions', '', ...funcs.map(renderItem));
  return (
    out
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd() + '\n'
  );
}

/** The worlds page (which interfaces a mod imports and exports). */
export function renderWorlds(pkgId: string, worlds: World[], locale: Locale): string {
  const out: string[] = [header(pkgId), '# Worlds', '', intro(locale), ''];
  for (const w of worlds) {
    out.push(`## ${code(w.name)}`, '');
    if (w.docs) out.push(escapeText(w.docs), '');
    out.push('| | Interface |', '| --- | --- |');
    for (const e of w.entries) out.push(`| ${e.kind} | ${code(e.name)} |`);
    out.push('');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

/** The reference index page. `prefix` is the locale's docs folder ('' or 'tr/'). */
export function renderIndex(pkg: WitPackage, locale: Locale): string {
  const t = TEXT[locale];
  const out: string[] = [header(pkg.id), `# ${t.title}`, '', escapeText(t.intro), '', `Version: ${code(pkg.id)}`, ''];
  out.push(`## ${t.interfaces}`, '', '| | |', '| --- | --- |');
  for (const i of pkg.interfaces) out.push(`| [${code(i.name)}](./${i.name}) | ${cell(summary(i.docs))} |`);
  if (pkg.worlds.length) {
    out.push('', `## ${t.worlds}`, '', `[${pkg.worlds.map((w) => code(w.name)).join(', ')}](./worlds)`);
  }
  return out.join('\n') + '\n';
}

/** Every page to write, keyed by path relative to `docs/` (for example `tr/mods/api/events.md`). */
export function renderAll(pkg: WitPackage): Record<string, string> {
  const files: Record<string, string> = {};
  for (const locale of LOCALES) {
    const dir = (locale === 'en' ? '' : locale + '/') + 'mods/api/';
    files[dir + 'index.md'] = renderIndex(pkg, locale);
    for (const i of pkg.interfaces) files[dir + i.name + '.md'] = renderInterface(pkg.id, i, locale);
    if (pkg.worlds.length) files[dir + 'worlds.md'] = renderWorlds(pkg.id, pkg.worlds, locale);
  }
  return files;
}

/** Sidebar data for docs/.vitepress/config.ts. */
export function sidebarData(pkg: WitPackage): { id: string; pages: string[] } {
  return { id: pkg.id, pages: [...pkg.interfaces.map((i) => i.name), ...(pkg.worlds.length ? ['worlds'] : [])] };
}

/** Interfaces in a reading order: the ones mods use most first, the rest after in source order. */
export function sortInterfaces(pkg: WitPackage, order: string[]): WitPackage {
  const rank = (n: string) => {
    const i = order.indexOf(n);
    return i === -1 ? order.length : i;
  };
  return { ...pkg, interfaces: [...pkg.interfaces].sort((a, b) => rank(a.name) - rank(b.name)) };
}
