# Commands and timers

## Commands

```lua
bh.commands.register({
	name = "home",
	aliases = { "h" },
	description = "Takes you home.",
	usage = "/home [name]",
	min_role = "player",   -- player, moderator, admin or owner
	console = false,       -- may the server console run it?
}, function(sender, label, args)
	local p = sender.player          -- nil when the console runs it
	if not args[1] then
		return { handled = false }   -- shows "Usage: /home [name]"
	end
	return { handled = true, reply = { "Welcome home, " .. p:alias() } }
end)
```

- Names are `a-z`, `0-9`, `_`, `-`, up to 32 characters, and must not clash with built-in or other mods' commands.
- Mod commands work for **every player** (vanilla only lets moderators and admins use `/`), unless `min_role` says
  otherwise. Players below it get "You do not have permission".
- `label` is the name or alias that was typed; `args` is the rest of the line split on spaces.
- `reply` lines go to the sender: chat for players, the log for the console.

## Timers

Times are in **ticks**: one tick is one world step, 0.2 s, so 5 ticks are 1 second.

```lua
bh.scheduler.run_later(25, function() ... end)        -- once, in 5 s
local id = bh.scheduler.run_every(0, 5, function() ... end)  -- now, then every second
bh.scheduler.cancel(id)
bh.scheduler.run_next_poll(function() ... end)        -- in about 16 ms, for quick replies
```

A player you saved in a timer may have left by the time it runs: check `p:is_online()` first.

Example: [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua)
(`/countdown`, `/remind`). Reference: [`commands`](./api/commands), [`scheduler`](./api/scheduler).
