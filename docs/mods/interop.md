# Working with other mods

Mods can build on each other, even across languages. Three tools, all from API 0.2:

| Tool | Use it for | Example |
| --- | --- | --- |
| **Services** | calling functions of another mod and getting an answer | `landclaim` takes coins from `economy` |
| **Custom events** | announcing that something happened; others may react or cancel | `economy:balance-changed` |
| **Channels** | sending raw messages between mods (later also to clients) | live updates |

Values cross as plain Lua values (CBOR underneath); players stay players. Calls are synchronous and run on the main
thread.

## Services

The **provider** declares the service in `mod.toml` and registers its functions:

```toml
# economy/mod.toml
[provides]
services = [{ name = "economy", version = "1.0.0", wit = "wit/economy.wit" }]
```

```lua
bh.services.provide("economy", "1.0.0", {
	balance = function(p) return balances[p:id()] or 100 end,
	withdraw = function(p, n) ... end,
})
```

The **consumer** depends on the provider and calls it:

```toml
# landclaim/mod.toml
[dependencies]
economy = "^1"
```

```lua
local eco = bh.services.get("economy", "^1")
if not eco.withdraw(p, 50) then
	return "A plot costs 50 coins."
end
```

- You may only call mods you depend on, or soft-depend on (`[soft-dependencies]`, used when present).
- The highest matching version wins.
- A provider's `error("msg", 0)` reaches the caller as an error you can `pcall`.
- A call back into a mod that is already running (A → B → A) fails with `reentrant`.
- The `wit/` file documents the service's functions for other authors.

## Custom events

```lua
-- economy fires:
bh.events.fire_custom("economy:balance-changed", { player = p, balance = n })

-- any mod listens, with the usual priority and cancel rules:
bh.events.on_custom("economy:balance-changed", function(ev)
	ev.payload.player:send_chat("You now have " .. ev.payload.balance .. " coins.")
end)
```

A mod may only fire events named after its own id (`<id>:<name>`). `fire_custom` returns whether the event ended up
cancelled.

## Channels

```lua
local ch = bh.channels.open("my-mod:updates", function(origin, data) ... end)
bh.channels.send(ch, "local", "hello")
```

Needs the `channels` permission. `"local"` reaches every other mod that opened the same name, on the next tick.
Sending to players, `"all-players"` or `"server"` is coming soon with client mods.

## Examples

All in the SDK, ready to run together:

- [`economy`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/economy): coins, `/balance`, `/pay`; provides the `economy` service and fires `economy:balance-changed`.
- [`landclaim`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/landclaim): `/claim` plots with coins; cancels `block-place`/`block-break` on others' land; soft-depends on `perms`.
- [`perms`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/perms): permission nodes as a `permissions` service.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): a **Rust** mod paying through the **Lua** economy (needs the WASM runtime, coming soon).

Reference: [`services`](./api/services), [`events`](./api/events), [`channels`](./api/channels). Value rules:
[Luau API mapping](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md#values-typesvalue-cbor).
