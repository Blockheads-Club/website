# Making a mod

**Mods** add features to The Blockheads: chat commands, new rules, tools for server admins and, later, changes that
players see in the game. You can browse what others made on the <a href="../mods/" target="_self">Mods page</a>.

::: warning What works today
`bhmod` (create, check, pack) works, and the [Blockheads Server](./server) runs **Lua** and **WASM** (Rust) mods in
its development builds. **Client** mods run with the mod loader of the PC Port and the Patcher's Android mod loader
patch; both are in development builds too and arrive with the next releases.
:::

## Start here

1. [Your first Lua mod](./mods/first-lua-mod), from `bhmod new` to a running server.
2. [Events](./mods/events), [commands and timers](./mods/commands), [storage](./mods/storage).
3. [Working with other mods](./mods/interop): services, custom events, channels.
4. [Publishing](./mods/publishing) on the public list.

Prefer Rust? See [your first Rust mod](./mods/first-rust-mod). Every function is in the
[API reference](./mods/api/).

## Sides

A mod runs on one or both **sides**:

- **server**: runs on the server.
- **client**: runs in the game on a player's device (needs the mod loader).
- **both**: has a server part and a client part. It can be marked *client-required*, so players without it cannot join.

## Languages

**Lua (Luau)** is the easiest. **Rust compiled to WebAssembly (WASM)** also works; C, Zig, Go and others that
build WASM components will follow. Mods in different languages can call each other.

## mod.toml

Every mod has a `mod.toml` file. The main fields:

| Field | Meaning |
| --- | --- |
| `id`, `version`, `name`, `description` | Who the mod is. The id is lowercase letters, digits, `-` and `_`. |
| `authors`, `license` | Who made it and under which licence. |
| `api` | The mod API versions it works with, for example `^0.2` ([API versions](./mods/api-versions)). |
| `[sides]`, `[entry]` | Where it runs and which file starts it. |
| `[dependencies]` | Other mods it needs. |
| `[permissions]` | What it is allowed to do (below). |

The full format is in the [SDK docs](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/package.md).

## Permissions

A mod can only do what its permissions allow, and the server owner must grant each one:

- `world`: `none`, `read` or `write`.
- `players`: any of `chat`, `teleport`, `kick`, `ban`, `inventory`, `health`.
- `net-http`: websites it may contact.
- `channels`: its own messages between server, clients and other mods.
- `native`: native code outside the sandbox. This is shown with a **red warning** and is reviewed by hand.

Ask only for what you need. What server owners see: [Mods on your server](./mods/servers#permissions).

## Publish it

Mods are listed by a pull request to [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods). The steps,
rules and checks are on the <a href="../mods/submit" target="_self">Submit a mod</a> page, and in short in
[Publishing](./mods/publishing).
