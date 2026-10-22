import { describe, expect, it } from 'vitest';
import {
  escapeText,
  parseWit,
  renderAll,
  renderIndex,
  renderInterface,
  renderWorlds,
  sidebarData,
  sortInterfaces,
  summary,
  tokenize
} from './wit-docs';

const API = `package demo:api@0.2.0;

/* a block comment */
// a plain comment

/// Shared types.
interface types {
    /// A position.
    record pos {
        /// Across.
        x: s32,
        y: s32
    }
    /// Errors.
    variant api-error {
        /// No permission.
        not-permitted(string),
        stale-handle,
    }
    enum side { server, client }
    flags caps { a, b }
    type value = list<u8>;
}

/// Players.
/// Two lines.
interface players {
    use types.{api-error, pos};
    /// One player.
    resource player {
        constructor(id: string);
        /// The alias.
        alias: func() -> string;
        send-chat: func(text: string) -> result<_, api-error>;
    }
    resource empty {}
    /// Everyone online.
    online: func() -> list<player>;
    reset: func();
    %from: func(handle: u64, map: list<tuple<string, option<borrow<player>>>>) -> option<player>;
}

/// A server mod.
world server-mod {
    import types;
    include core;
    export guest;
}
world bare {
    import players;
}`;

describe('tokenize', () => {
  it('splits tokens, keeps doc comments and drops other comments', () => {
    const toks = tokenize('/// doc\n// skip\n/* skip */ a-b: func() -> u8;');
    expect(toks.map((t) => t.text)).toEqual(['a-b', ':', 'func', '(', ')', '->', 'u8', ';']);
    expect(toks[0].docs).toEqual(['doc']);
    expect(toks[1].docs).toEqual([]);
  });

  it('handles comments at the end of the input', () => {
    expect(tokenize('a /// tail')).toEqual([{ text: 'a', docs: [] }]);
    expect(tokenize('a // tail')).toEqual([{ text: 'a', docs: [] }]);
  });

  it('rejects broken input', () => {
    expect(() => tokenize('/* open')).toThrow('unterminated block comment');
    expect(() => tokenize('a $ b')).toThrow('unexpected character "$"');
  });
});

describe('parseWit', () => {
  const pkg = parseWit([API]);

  it('reads the package, interfaces and worlds', () => {
    expect(pkg.id).toBe('demo:api@0.2.0');
    expect(pkg.interfaces.map((i) => i.name)).toEqual(['types', 'players']);
    expect(pkg.interfaces[1].docs).toBe('Players. Two lines.');
    expect(pkg.interfaces[1].uses).toEqual(['types.{api-error, pos}']);
    expect(pkg.worlds[0]).toEqual({
      name: 'server-mod',
      docs: 'A server mod.',
      entries: [
        { kind: 'import', name: 'types' },
        { kind: 'include', name: 'core' },
        { kind: 'export', name: 'guest' }
      ]
    });
  });

  it('reads records, variants, enums, flags and aliases', () => {
    const [pos, err, side, caps, value] = pkg.interfaces[0].items;
    expect(pos.members).toEqual([
      { name: 'x', type: 's32', docs: 'Across.' },
      { name: 'y', type: 's32', docs: '' }
    ]);
    expect(err.members).toEqual([
      { name: 'not-permitted', type: 'string', docs: 'No permission.' },
      { name: 'stale-handle', type: '', docs: '' }
    ]);
    expect(side.members.map((m) => m.name)).toEqual(['server', 'client']);
    expect(caps.kind).toBe('flags');
    expect(value).toMatchObject({ kind: 'type', name: 'value', type: 'list<u8>' });
  });

  it('reads resources and functions with nested types and %-escaped names', () => {
    const [player, empty, online, reset, from] = pkg.interfaces[1].items;
    expect(player.members).toEqual([
      { name: 'constructor', type: 'constructor(id: string)', docs: '' },
      { name: 'alias', type: 'func() -> string', docs: 'The alias.' },
      { name: 'send-chat', type: 'func(text: string) -> result<_, api-error>', docs: '' }
    ]);
    expect(empty.members).toEqual([]);
    expect(online).toMatchObject({ kind: 'func', type: 'func() -> list<player>', docs: 'Everyone online.' });
    expect(reset.type).toBe('func()');
    expect(from).toMatchObject({
      name: 'from',
      type: 'func(handle: u64, map: list<tuple<string, option<borrow<player>>>>) -> option<player>'
    });
  });

  it('merges files of one package', () => {
    const merged = parseWit(['package a:b@1.0.0; interface x {}', 'package a:b@1.0.0; world w {}']);
    expect(merged.interfaces.map((i) => i.name)).toEqual(['x']);
    expect(merged.worlds.map((w) => w.name)).toEqual(['w']);
  });

  it('rejects what it does not understand', () => {
    expect(() => parseWit(['interface x {}'])).toThrow('no package declaration');
    expect(() => parseWit(['package a:b@1.0.0;', 'package a:c@1.0.0;'])).toThrow('mixed packages');
    expect(() => parseWit(['package a:b; type x = u8;'])).toThrow('unsupported top-level item type');
    expect(() => parseWit(['package a:b; world w { use x; }'])).toThrow('unsupported world item use');
    expect(() => parseWit(['package a:b; interface x { f func(); }'])).toThrow('expected :, found func');
    expect(() => parseWit(['package a:b; interface x {'])).toThrow('unexpected end of file');
  });
});

describe('markdown helpers', () => {
  it('escapes angle brackets outside code spans', () => {
    expect(escapeText('a <b> `list<u8>` c<d')).toBe('a &lt;b&gt; `list<u8>` c&lt;d');
  });

  it('takes the first sentence', () => {
    expect(summary('One thing. And more.')).toBe('One thing.');
    expect(summary('Is it? Yes')).toBe('Is it?');
    expect(summary('no full stop')).toBe('no full stop');
  });
});

describe('render', () => {
  const pkg = parseWit([API]);

  it('renders an interface page with types, functions and escaped tables', () => {
    const md = renderInterface(pkg.id, pkg.interfaces[1], 'en');
    expect(md.startsWith('<!-- Generated by scripts/gen-mod-api.ts from demo:api@0.2.0.')).toBe(true);
    expect(md).toContain('# `players`');
    expect(md).toContain('Lua table `bh.players`');
    expect(md).toContain('Uses: `types.{api-error, pos}`');
    expect(md).toContain('### `player` <Badge type="info" text="resource" />');
    expect(md).toContain('| `alias` | `func() -> string` | The alias. |');
    expect(md).toContain('for example `player:constructor()`');
    expect(md).toContain('for example `empty:id()`');
    expect(md).toContain('```txt\nonline: func() -> list<player>;\n```');
    expect(md).not.toContain('::: info');
    expect(md).not.toMatch(/\n{3}/);
  });

  it('renders types and translated notes', () => {
    const md = renderInterface(pkg.id, pkg.interfaces[0], 'tr');
    expect(md).toContain('::: info\nBaşvuru metni');
    expect(md).toContain('| `x` | `s32` | Across. |');
    expect(md).toContain('| `not-permitted` | `string` | No permission. |');
    expect(md).toContain('| `stale-handle` | – |  |');
    expect(md).toContain('| `server` |  |');
    expect(md).toContain('```txt\ntype value = list<u8>;\n```');
    expect(md).not.toContain('## Functions');
    expect(md).not.toContain('Uses:');
  });

  it('escapes | in table cells', () => {
    const p = parseWit(['package a:b; interface x { /// a | b\n record r { /// c | d\n f: u8 } }']);
    expect(renderInterface(p.id, p.interfaces[0], 'en')).toContain('| `f` | `u8` | c \\| d |');
  });

  it('leaves out empty sections', () => {
    const p = parseWit(['package a:b; interface x { f: func(); }']);
    const md = renderInterface(p.id, p.interfaces[0], 'ru');
    expect(md).not.toContain('## Types');
    expect(md).toContain('## Functions');
    expect(md).toContain('Сам справочник на английском');
  });

  it('renders worlds', () => {
    const md = renderWorlds(pkg.id, pkg.worlds, 'kk');
    expect(md).toContain('## `server-mod`\n\nA server mod.');
    expect(md).toContain('| include | `core` |');
    expect(md).toContain('## `bare`\n\n| | Interface |');
    expect(md).toContain('ағылшын тілінде');
  });

  it('renders the index with and without worlds', () => {
    const md = renderIndex(pkg, 'en');
    expect(md).toContain('# API reference');
    expect(md).toContain('| [`players`](./players) | Players. |');
    expect(md).toContain('[`server-mod`, `bare`](./worlds)');
    const noWorlds = renderIndex({ ...pkg, worlds: [] }, 'tr');
    expect(noWorlds).toContain('# API başvurusu');
    expect(noWorlds).not.toContain('./worlds');
  });

  it('lists every page of every locale', () => {
    const files = renderAll(pkg);
    expect(Object.keys(files)).toEqual(
      ['', 'tr/', 'ru/', 'kk/'].flatMap((l) => ['index', 'types', 'players', 'worlds'].map((n) => l + 'mods/api/' + n + '.md'))
    );
    expect(Object.keys(renderAll({ ...pkg, worlds: [] }))).not.toContain('mods/api/worlds.md');
  });

  it('builds sidebar data and sorts interfaces', () => {
    expect(sidebarData(pkg)).toEqual({ id: 'demo:api@0.2.0', pages: ['types', 'players', 'worlds'] });
    expect(sidebarData({ ...pkg, worlds: [] }).pages).toEqual(['types', 'players']);
    expect(sortInterfaces(pkg, ['players']).interfaces.map((i) => i.name)).toEqual(['players', 'types']);
  });
});
