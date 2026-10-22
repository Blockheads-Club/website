# Пәрмендер мен таймерлер

## Пәрмендер

```lua
bh.commands.register({
	name = "home",
	aliases = { "h" },
	description = "Takes you home.",
	usage = "/home [name]",
	min_role = "player",   -- player, moderator, admin немесе owner
	console = false,       -- сервер консолі іске қоса ала ма?
}, function(sender, label, args)
	local p = sender.player          -- консоль іске қосса nil
	if not args[1] then
		return { handled = false }   -- "Usage: /home [name]" көрсетеді
	end
	return { handled = true, reply = { "Welcome home, " .. p:alias() } }
end)
```

- Атаулар `a-z`, `0-9`, `_`, `-` таңбаларынан, 32 таңбаға дейін, және кіріктірілген не басқа модтардың пәрмендерімен
  сәйкеспеуі керек.
- Мод пәрмендері **әр ойыншыға** жұмыс істейді (ванильде `/` тек модераторлар мен әкімшілерге рұқсат), егер
  `min_role` басқаша демесе. Одан төмен ойыншыларға "You do not have permission" шығады.
- `label` жазылған атау немесе бүркеншік ат; `args` жолдың қалған бөлігі, бос орындар бойынша бөлінген.
- `reply` жолдары жіберушіге барады: ойыншыға чатқа, консольге журналға.

## Таймерлер

Уақыт **тикпен** өлшенеді: бір тик әлемнің бір қадамы, 0,2 с, яғни 5 тик 1 секунд.

```lua
bh.scheduler.run_later(25, function() ... end)        -- бір рет, 5 с кейін
local id = bh.scheduler.run_every(0, 5, function() ... end)  -- қазір, содан кейін әр секунд сайын
bh.scheduler.cancel(id)
bh.scheduler.run_next_poll(function() ... end)        -- шамамен 16 мс кейін, жылдам жауап үшін
```

Таймерде сақтаған ойыншы ол орындалғанда шығып кетуі мүмкін: алдымен `p:is_online()` тексеріңіз.

Мысал: [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua)
(`/countdown`, `/remind`). Анықтама: [`commands`](./api/commands), [`scheduler`](./api/scheduler).
