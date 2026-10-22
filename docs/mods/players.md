# Mods for players

**Mods** add things to The Blockheads: chat commands like `/balance` or `/claim`, new rules, minigames and, later,
things you see in the game. Browse them on the <a href="../../mods/" target="_self">Mods page</a>.

## Server mods: nothing to install

Most mods run **on the server**. You join as usual, with your normal game, and simply use what the mod adds, for
example by typing its commands in chat. The server owner decides which mods run and can tell you their commands.

## Joining a server with client mods <Badge type="warning" text="coming soon" />

Some mods also have a part that runs **in your game** (a new block, a minimap). When you join such a server:

1. Your game lists the server's mods and what each one is allowed to do.
2. You accept or cancel.
3. On accept, the client parts download straight from the server and run. Nothing else is installed.

Mods with the **native** permission run outside the safe sandbox. They are shown with a **red warning**, must be on
the public list with exactly the same file, and you must confirm them. A server can never push native code silently.

Without the mod loader you can still join servers whose mods are all server-side. Servers that need a client mod
turn you away; the game says your client is too old.

The mod loader comes with the [PC Port](../pc-port) and, on Android, with the [Patcher](../patcher). Neither has it yet.

## Your own client mods <Badge type="warning" text="coming soon" />

You will be able to install client mods (a minimap, coordinates, inventory sorting, cosmetics) from the public list
or from a file, in the PC Port launcher or in the Patcher.

## Staying safe

- Get mods from the <a href="../../mods/" target="_self">public list</a>. Every new mod is read by a maintainer
  before it is listed, and every download is checked against its SHA-256 and size.
- Read the permissions before you accept. A coordinates mod has no reason to kick players or contact websites.
- Be careful with **native** mods: they can do anything your game can.
- Mods never include game files.
