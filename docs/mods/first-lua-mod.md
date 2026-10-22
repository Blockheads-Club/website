# Your first Lua mod

Ten minutes from nothing to a `/hello` command on your own server.

## 1. Install the tool

You need [Rust](https://rustup.rs) once, to install `bhmod`:

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

## 2. Create the mod

```sh
bhmod new my-mod
cd my-mod
```

This makes `mod.toml` and `server/main.luau`. Open `server/main.luau`:

```lua
local mod = {}

function mod.on_enable()
	bh.events.on("player-join", function(ev)
		ev.player:send_chat(`Welcome, {ev.player:alias()}!`)
	end)

	bh.commands.register({ name = "hello", description = "Says hello." }, function(sender, label, args)
		return { handled = true, reply = { "Hello from my-mod!" } }
	end)
end

return mod
```

- `on_enable` runs once the world has loaded. Subscribe to events and register commands there.
- Everything the game offers is in the global `bh` table: [API reference](./api/).
- Editors with Luau support get completion from [`bh.d.luau`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/bh.d.luau).

## 3. Check it

```sh
bhmod check .
```

It reports mistakes in `mod.toml` and the files, for example a missing entry file or an unknown permission.

## 4. Pack it

```sh
bhmod pack .
```

This writes `my-mod-0.1.0.bhmod`. The same input always gives the same file.

## 5. Run it on a local server

1. Start a [Blockheads Server](../server) development build once, so it creates its data folder.
2. Copy `my-mod-0.1.0.bhmod` (or the whole `my-mod` folder) into `<data folder>/mods/`.
3. The template asks for `players:chat`, so grant it in `<data folder>/mods/mods.toml`:

   ```toml
   [my-mod]
   grant = ["players:chat"]
   ```

4. Start the server and join. The log shows `loaded 1 mod(s): my-mod 0.1.0`, you get the welcome line, and
   `/hello` answers.

::: tip Faster loop
Point the server straight at your work folder with `BLOCKHEADS_MODS_DIR=/path/to/folder-with-my-mod` and restart
it after each change. No packing needed.
:::

## Next

- More examples: [`hello-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-lua),
  [`chat-filter`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/chat-filter),
  [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua).
- [Events](./events) · [Commands and timers](./commands) · [Storage](./storage)
