# Mods on your server

::: warning Preview
The [Blockheads Server](../server) runs **Lua** and **WASM** (Rust) mods in its development builds; they are not in a
release yet. Mods with a **client** part need players to have the mod loader (PC Port, or Android with the Patcher).
:::

## Turn mods on

Mods load from the `mods` folder in the server's data folder:

| Setup | Mods folder |
| --- | --- |
| Desktop / command line | `<data folder>/mods` (the data folder is `BLOCKHEADS_DATA_DIR`, else `GNUstep/Library/ApplicationSupport/TheBlockheads` in your home folder) |
| Docker | `/data/mods` inside the volume |
| Anywhere | set `BLOCKHEADS_MODS_DIR` to another folder |

Without a mods folder (or with an empty one) the server behaves exactly like vanilla: same bytes, saves and output.

## Install a mod

1. Download the `.bhmod` file from the <a href="../../mods/" target="_self">Mods page</a> (or get it from the author).
   An unpacked mod folder (one with `mod.toml` in it) works too.
2. Put it in the mods folder.
3. Grant its permissions in `mods.toml` (below).
4. Restart the server. The log shows `loaded 1 mod(s): …` or why a mod did not load.

The Server app also has a Mods screen for the mods folder (development builds).

## mods.toml

`mods.toml` sits in the mods folder. One section per mod id:

```toml
[hello-lua]
grant = ["players:chat"]

[noisy-mod]
enabled = false   # stays installed, never loads
```

A mod that needs no permissions needs no section. A mod that asks for a permission you did not grant **does not
load**; mods that depend on it are skipped too.

## Permissions

| Permission | Lets the mod |
| --- | --- |
| `players:chat` | send chat messages to everyone |
| `players:kick`, `players:ban` | kick or ban players |
| `players:teleport`, `players:inventory`, `players:health` | move players, change inventories or health |
| `world:read`, `world:write` | read or change the world (`world:write` also covers `world:read`) |
| `net-http:<host>` | contact that website |
| `channels` | send messages to other mods and to clients |
| `native` | run native code outside the sandbox (**red warning**, reviewed by hand) |

Everything else needs no permission: events, its own commands, timers, its own storage, chat to one player, and
services of mods it depends on. The mod's page on the public list shows what it asks for.

## Time and memory limits

Mods run on the server's main thread, so each one is kept on a short leash:

- Each call into a mod may take **25 ms** (a warning is logged after 5 ms).
- All mods together get **20 ms** per world step; timers beyond that wait for the next step.
- Each mod gets **32 MiB** of memory.

An error, a timeout or running out of memory is a **fault**. **3 faults within 60 s turn the mod off** until the
next restart; the log says `disabled: 3 faults within 60 s` and names the error. Report it to the mod's author.

## Storage

Each mod keeps its own data per world in `saves/<world>/mods/storage`, separate from the world itself. Deleting it
resets the mods' data and leaves the world untouched. Back it up together with the world.

## Java mods (JVM) {#jvm}

Mods written in Java or Kotlin run in a Java virtual machine inside the server. A JVM **cannot be sandboxed**, so this is off by default and the mod must have the `native` permission:

1. Install Java 8 or newer on the machine (or point the server to one).
2. Turn on **Settings > Java mods** in the server app (or start the server with `BLOCKHEADS_JVM=1`; `BLOCKHEADS_JAVA_HOME` picks the Java folder). The app must be built with Java support, otherwise it says so under the switch.
3. Grant `native` to the mod in `mods.toml`. The red warning stays on the mod.

Turn this on only for mods you trust. The time limit cannot interrupt a tight loop in Java code, only a blocking call.

## Vanilla players

- **Server-only mods:** anyone can join with the normal game.
- **Client-required mods** <Badge type="info" text="preview" />: players without the mod loader are turned away
  (their game says the client is too old). The mod's page marks such mods as *client-required*.
