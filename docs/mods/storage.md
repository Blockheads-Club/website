# Storage

Each mod gets a small **key-value store per world**. It never touches the world save, so a mod can't break a world.

```lua
bh.storage.set("greetings", tostring(count))
local raw = bh.storage.get("greetings")         -- nil if missing
bh.storage.delete("greetings")
for _, key in ipairs(bh.storage.keys("home:")) do ... end   -- keys with that prefix, sorted
```

Values are strings (bytes). For tables, encode them:

```lua
bh.storage.set("home:" .. p:id(), bh.value.encode({ x = 10, y = 200 }))
local home = bh.value.decode(bh.storage.get("home:" .. p:id()))
```

| Limit | |
| --- | --- |
| Key | 1–256 bytes |
| Value | up to 1 MiB |
| Per mod and world | 64 MiB |

- Writes are safe on disk after the next world save. Flush anything you keep in memory in a `world-save` handler
  (phase `pre`) or in `on_disable`.
- Key by `p:id()`, not the alias: players can change their name.
- On the server the data is in `saves/<world>/mods/storage`.

Reference: [`storage`](./api/storage).
