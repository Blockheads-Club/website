# Команды и таймеры

## Команды

```lua
bh.commands.register({
	name = "home",
	aliases = { "h" },
	description = "Takes you home.",
	usage = "/home [name]",
	min_role = "player",   -- player, moderator, admin or owner
	console = false,       -- может ли её запускать консоль сервера?
}, function(sender, label, args)
	local p = sender.player          -- nil, если запускает консоль
	if not args[1] then
		return { handled = false }   -- показывает "Usage: /home [name]"
	end
	return { handled = true, reply = { "Welcome home, " .. p:alias() } }
end)
```

- Имена состоят из `a-z`, `0-9`, `_`, `-`, до 32 символов, и не должны совпадать со встроенными командами и командами других модов.
- Команды модов работают для **каждого игрока** (в обычной игре `/` могут использовать только модераторы и админы),
  если `min_role` не указывает иное. Игрокам ниже этой роли отвечают "You do not have permission".
- `label` это имя или псевдоним, который ввели; `args` это остаток строки, разбитый по пробелам.
- Строки `reply` уходят отправителю: игроку в чат, консоли в лог.

## Таймеры

Время задаётся в **тиках**: один тик это один шаг мира, 0,2 с, так что 5 тиков это 1 секунда.

```lua
bh.scheduler.run_later(25, function() ... end)        -- один раз, через 5 с
local id = bh.scheduler.run_every(0, 5, function() ... end)  -- сразу, затем каждую секунду
bh.scheduler.cancel(id)
bh.scheduler.run_next_poll(function() ... end)        -- примерно через 16 мс, для быстрых ответов
```

Игрок, которого вы сохранили в таймере, к моменту запуска мог выйти: сначала проверьте `p:is_online()`.

Пример: [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua)
(`/countdown`, `/remind`). Справочник: [`commands`](./api/commands), [`scheduler`](./api/scheduler).
