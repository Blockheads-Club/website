# API versions

The mod API is versioned as `blockheads:api@<version>`. A mod says which versions it works with in `mod.toml`:

```toml
api = "^0.2"
```

| Version | Adds |
| --- | --- |
| **0.1** | events (join, quit, chat, command, tick, world load and save), commands, scheduler, storage, players, log |
| **0.2** | gameplay events (pre-login, block place / break / change, object place, damage, death, move), `player:pos()`, services, custom events, local channels |
| **0.3** | client UI (`ui`), mod content and cosmetics (`content`), for client mods and servers with the mod loader |
| **0.3.1** | services across the network: a client mod calls a server mod and the other way round (`call-remote`, `cancel-remote`, `caller`); a patch version, nothing else changes |

## Compatibility

- Servers implement **0.3.1 and also serve 0.3, 0.2 and 0.1**. In 0.x a new minor version only **adds** things, so a mod with
  `api = "^0.1"` keeps loading and working unchanged.
- Use anything from 0.2? Declare `api = "^0.2"`; from 0.3, `"^0.3"`; remote services need `"^0.3.1"`. Older servers then skip your mod instead of failing at runtime.
- WASM mods built against 0.1 keep working: servers also bind the frozen
  [0.1 WIT](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/compat/blockheads-api-0.1.0).
- `bh.host.api_version()` tells you what the server runs.

The reference on this site is for **0.3.1**: [API reference](./api/). Functions and fields new in 0.2 or 0.3 are marked
`(0.2)` or `(0.3)`.
