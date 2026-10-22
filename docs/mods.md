# Making a mod

**Mods** add features to The Blockheads: chat commands, new rules, tools for server admins and, later, changes that
players see in the game. You can browse what others made on the <a href="../mods/" target="_self">Mods page</a>.

::: warning Servers can't load mods yet
The mod tools below already work, but the Blockheads Server cannot load mods yet. That comes in a later release.
:::

## Sides

A mod runs on one or both **sides**:

- **server**: runs on the server.
- **client**: runs in the game on a player's device.
- **both**: has a server part and a client part. It can be marked *client-required*, so players without it cannot join.

## Languages

You can write a mod in **Lua/Luau** or in **Rust compiled to WebAssembly (WASM)**. More languages will follow.

## Install the tool

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

Then:

```sh
bhmod new my-mod     # create a new mod from a template
bhmod check          # check mod.toml and the code
bhmod pack           # build my-mod-0.1.0.bhmod
```

The SDK is at [github.com/Blockheads-Club/mod-sdk](https://github.com/Blockheads-Club/mod-sdk).

## mod.toml

Every mod has a `mod.toml` file. The main fields:

| Field | Meaning |
| --- | --- |
| `id`, `version`, `name`, `description` | Who the mod is. The id is lowercase letters, digits and `-`. |
| `authors`, `license` | Who made it and under which licence. |
| `sides` | `server`, `client` or both. |
| `api` | The mod API versions it works with. |
| `depends` | Other mods it needs. |
| `permissions` | What it is allowed to do (below). |

## Permissions

A mod can only do what its permissions allow:

- `world`: `none`, `read` or `write`.
- `players`: any of `chat`, `teleport`, `kick`, `ban`, `inventory`, `health`.
- `net-http`: websites it may contact.
- `channels`: its own messages between server, clients and other mods.
- `native`: native code outside the sandbox. This is shown with a **red warning** and is reviewed by hand.

Ask only for what you need.

## Publish it

Mods are listed by a pull request to [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods). The steps,
rules and checks are on the <a href="../mods/submit" target="_self">Submit a mod</a> page.

Every new mod gets a **security review**: a maintainer reads its code before it is listed. Updates are reviewed
again when they add permissions or native code. The published list is at
[blockheads.club/mods/index.json](https://blockheads.club/mods/index.json); every download is checked against the
SHA-256 and size it lists.
