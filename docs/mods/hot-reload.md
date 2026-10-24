# Hot reload and timings

Change a mod and see the result **without restarting the world**. Server admins can also see which mods use how much
time. This page covers both, for server owners and for mod authors.

::: warning Preview
Hot reload and `/mods timings` are in the development builds of the [Blockheads Server](../server) and the PC Port.
:::

## Admin commands

On the server, admins (in the game chat) and the console can use `/mods`:

| Command | What it does |
| --- | --- |
| `/mods` | lists the mods and their state |
| `/mods reload` | reloads every mod whose files changed, starts new ones and stops mods whose files are gone |
| `/mods reload <id>` | reloads that mod, changed or not |
| `/mods timings [id]` | shows how long each kind of call took, over the last 60 seconds |
| `/mods timings reset [id]` | clears those numbers |

`/mods` is built in: a mod cannot use that name, and players who are not admins get "You do not have permission".

## What a reload does

For each mod it reloads:

1. It reads the package again (a `.bhmod` file or an unpacked folder, and `mods.toml`). If the new version cannot even
   start, the old version keeps running and the command says why.
2. The old version gets `on-disable`. Everything it registered is removed: event handlers, commands, timers, services,
   channels. Its storage is saved.
3. The new version starts like at boot: **its stored data is still there**, `on-enable` runs, and it gets
   `world-loaded` (only that mod).
4. Its fault counter and its time numbers start from zero.

The world, the players and all other mods keep going.

Good to know:

- If the new version fails in `on-enable` (for example a typo), the mod stays **off** and the command shows the error.
  Fix the file and run `/mods reload <id>` again.
- Players who are already online are not announced again to the reloaded mod. Read the online players in `on-enable`
  if your mod tracks them.
- A service another mod got with `bh.services.get` **before** the reload is stale afterwards. Calling it fails with
  `stale service handle … call services.get again`. Fetch the service again, or call it by name with
  `bh.services.call`, which always finds the new version.
- Content (cosmetics, items, blocks) and native code are not reloaded. They need a server restart (or a new game
  session on the client).
- Java mods get a fresh class loader. Threads a Java mod started itself must be stopped in `on-disable`.
- Clients that are already connected keep the client part they have. Players who join afterwards are offered the new one.

## Reload while you write a mod

On the server, set `BLOCKHEADS_MODS_WATCH=1`. The server then checks the mods folder about twice a second and reloads
what changed, as soon as the files stop changing. The log shows `watch: my-mod: reloaded (0.1.0 -> 0.1.1)` or why
it failed. Point `BLOCKHEADS_MODS_DIR` at a folder that holds your unpacked mod folder (a folder with `mod.toml` in it works) and edit.

In the PC Port, turn on developer mode and add your mod folder in the launcher. The launcher reloads it when the
files change, and **F5** in the game does it by hand. Only the mods that changed restart; you stay in the world.

## Timings

`/mods timings` answers "is this mod slowing my server?":

```text
Mod timings over the last 60 s (times in ms, inclusive of nested calls):
landclaim [enabled]: 412 calls, 18.40 ms total, 3 budget hits, strikes 0 now / 0 since reset
  event: 380 calls, total 15.10, avg 0.04, max 2.10, over soft 0, timeouts 0, errors 0
  command: 4 calls, total 1.90, avg 0.48, max 0.90, over soft 0, timeouts 0, errors 0
  task: 28 calls, total 1.40, avg 0.05, max 6.20, over soft 3, timeouts 0, errors 0
```

- **Kinds:** `event` (game events and custom events), `command`, `task` (timers), `service` (calls into the mod from other
  mods or the other side), `channel` (messages), `lifecycle` (`on-enable` and `on-disable`).
- **avg and max** are per call. A call's time includes the time of the mods it called.
- **over soft** counts calls longer than 5 ms (a warning in the log), **timeouts** calls stopped at 25 ms,
  **errors** calls that failed.
- **strikes** are the faults that count towards turning the mod off (3 within 60 s). `reset` clears the report; it does
  not forgive strikes.

In the PC Port, open the Mods panel with **F9** and press **T** for the same numbers (**R** or the Reset button clears
them, **T** again returns to the log).

Authors: the numbers come from `bhmod-core` ([`docs/hot-reload.md`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/hot-reload.md)),
so the server, the PC Port and the Android loader report the same way.
