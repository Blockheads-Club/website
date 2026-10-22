# Ваш первый Lua-мод

Десять минут от нуля до команды `/hello` на вашем сервере.

## 1. Установите инструмент

[Rust](https://rustup.rs) нужен один раз, чтобы установить `bhmod`:

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

## 2. Создайте мод

```sh
bhmod new my-mod
cd my-mod
```

Появятся `mod.toml` и `server/main.luau`. Откройте `server/main.luau`:

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

- `on_enable` вызывается, когда мир загрузился. Подписывайтесь на события и регистрируйте команды там.
- Всё, что умеет игра, лежит в глобальной таблице `bh`: [справочник API](./api/).
- Редакторы с поддержкой Luau подсказывают код по файлу [`bh.d.luau`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/bh.d.luau).

## 3. Проверьте его

```sh
bhmod check .
```

Команда сообщает об ошибках в `mod.toml` и файлах, например об отсутствующем входном файле или неизвестном разрешении.

## 4. Упакуйте его

```sh
bhmod pack .
```

Получится `my-mod-0.1.0.bhmod`. Одни и те же исходные данные всегда дают один и тот же файл.

## 5. Запустите на локальном сервере

1. Один раз запустите сборку для разработки [Blockheads Server](../server), чтобы он создал папку данных.
2. Скопируйте `my-mod-0.1.0.bhmod` (или всю папку `my-mod`) в `<папка данных>/mods/`.
3. Шаблон просит `players:chat`, так что выдайте его в `<папка данных>/mods/mods.toml`:

   ```toml
   [my-mod]
   grant = ["players:chat"]
   ```

4. Запустите сервер и зайдите. В логе будет `loaded 1 mod(s): my-mod 0.1.0`, вы получите приветствие, а
   `/hello` ответит.

::: tip Цикл быстрее
Укажите серверу прямо вашу рабочую папку через `BLOCKHEADS_MODS_DIR=/path/to/folder-with-my-mod` и перезапускайте
его после каждого изменения. Упаковывать не нужно.
:::

## Дальше

- Больше примеров: [`hello-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-lua),
  [`chat-filter`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/chat-filter),
  [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua).
- [События](./events) · [Команды и таймеры](./commands) · [Хранилище](./storage)
