# Алғашқы Lua модыңыз

Нөлден өз серверіңіздегі `/hello` пәрменіне дейін он минут.

## 1. Құралды орнатыңыз

`bhmod` орнату үшін [Rust](https://rustup.rs) бір рет қажет:

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

## 2. Модты жасаңыз

```sh
bhmod new my-mod
cd my-mod
```

Бұл `mod.toml` және `server/main.luau` жасайды. `server/main.luau` ашыңыз:

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

- `on_enable` әлем жүктелгенде бір рет орындалады. Оқиғаларға жазылу мен пәрмендерді тіркеуді осы жерде жасаңыз.
- Ойын ұсынатын бәрі жаһандық `bh` кестесінде: [API анықтамасы](./api/).
- Luau қолдайтын редакторлар [`bh.d.luau`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/bh.d.luau) арқылы толықтыру алады.

## 3. Тексеріңіз

```sh
bhmod check .
```

Ол `mod.toml` мен файлдардағы қателерді көрсетеді, мысалы жоқ кіру файлын немесе белгісіз рұқсатты.

## 4. Буып-түйіңіз

```sh
bhmod pack .
```

Бұл `my-mod-0.1.0.bhmod` жазады. Бірдей кіріс әрқашан бірдей файл береді.

## 5. Жергілікті серверде іске қосыңыз

1. Деректер қалтасын жасауы үшін [Blockheads Server](../server) әзірлеу құрастырмасын бір рет іске қосыңыз.
2. `my-mod-0.1.0.bhmod` файлын (немесе бүкіл `my-mod` қалтасын) `<деректер қалтасы>/mods/` ішіне көшіріңіз.
3. Үлгі `players:chat` сұрайды, сондықтан оны `<деректер қалтасы>/mods/mods.toml` ішінде беріңіз:

   ```toml
   [my-mod]
   grant = ["players:chat"]
   ```

4. Серверді қосып, қосылыңыз. Журналда `loaded 1 mod(s): my-mod 0.1.0` шығады, сәлемдесу жолын аласыз және
   `/hello` жауап береді.

::: tip Жылдамырақ цикл
Серверді тікелей жұмыс қалтаңызға бағыттаңыз: `BLOCKHEADS_MODS_DIR=/path/to/folder-with-my-mod`, әр өзгерістен кейін
қайта қосыңыз. Буып-түю керек емес.
:::

## Әрі қарай

- Тағы мысалдар: [`hello-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-lua),
  [`chat-filter`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/chat-filter),
  [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua).
- [Оқиғалар](./events) · [Пәрмендер мен таймерлер](./commands) · [Сақтау](./storage)
