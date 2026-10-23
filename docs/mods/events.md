# Events

A mod reacts to the game by subscribing to **events**:

```lua
bh.events.on("chat", function(ev)
	if string.find(ev.text, "badword") then
		ev.cancelled = true            -- the message is never shown
	end
end, { priority = "lowest" })
```

`bh.events.on` returns an id; `bh.events.off(id)` removes the handler.

## Event kinds

| Kind | When | Can change |
| --- | --- | --- |
| `player-join`, `player-quit` | a player joined / left | – |
| `chat` | a chat message, before it is shown | cancel, `ev.text` |
| `command` | a `/command` line, before any handler | cancel (swallows it) |
| `tick` | every world step (0.2 s) | – |
| `world-loaded`, `world-save` | the world loaded / is saved (`pre`, `post`) | – |
| `player-pre-login` | a player passed the join checks | cancel (reject), `ev.reason` |
| `block-place`, `block-break` | a player places / removes a block | cancel |
| `object-place` | a player places a workbench, chest, door, … | cancel |
| `block-changed` | any tile changed, also by growth or physics | – (watch only) |
| `damage` | a blockhead is about to be hurt | cancel, `ev.amount` |
| `death` | a blockhead died | – |
| `player-move` | a blockhead entered another tile | – |

The kinds from `player-pre-login` down need API 0.2 ([API versions](./api-versions)). Every field:
[`events` reference](./api/events).

A cancelled block edit is undone on the player's screen the same way as on a protected tile.

## Priority

Handlers run from `lowest` to `highest`, then `monitor`:

`lowest` → `low` → `normal` (default) → `high` → `highest` → `monitor`

- Run **early** (`lowest`, `low`) when later handlers may override you, for example a soft filter.
- Run **late** (`high`, `highest`) to have the last word, for example a protection mod.
- `monitor` sees the final result and cannot change it. Use it for logs and statistics.

Inside one priority, mods run in load order (dependencies first).

## Cancelling

- Set `ev.cancelled = true` to cancel. A later handler may set it back to `false`.
- `{ ignore_cancelled = true }` skips your handler while the event is cancelled.
- Changes to events that cannot be cancelled are ignored with a warning in the log.

Handlers run one at a time on the server's main thread and must be quick ([limits](./servers#time-and-memory-limits)).
