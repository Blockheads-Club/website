# Работа с другими модами

Моды могут опираться друг на друга, даже на разных языках. Три инструмента, все начиная с API 0.2:

| Инструмент | Для чего | Пример |
| --- | --- | --- |
| **Сервисы** | вызвать функции другого мода и получить ответ | `landclaim` берёт монеты у `economy` |
| **Свои события** | сообщить, что что-то произошло; остальные могут отреагировать или отменить | `economy:balance-changed` |
| **Каналы** | отправлять сырые сообщения между модами (позже и клиентам) | живые обновления |

Значения передаются как обычные значения Lua (внутри CBOR); игроки остаются игроками. Вызовы синхронные и
выполняются в главном потоке.

## Сервисы

**Поставщик** объявляет сервис в `mod.toml` и регистрирует его функции:

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

**Потребитель** зависит от поставщика и вызывает его:

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

- Вызывать можно только моды, от которых вы зависите или мягко зависите (`[soft-dependencies]`, используются, если есть).
- Побеждает самая высокая подходящая версия.
- `error("msg", 0)` у поставщика доходит до вызывающего как ошибка, которую можно поймать через `pcall`.
- Вызов обратно в уже работающий мод (A → B → A) завершается ошибкой `reentrant`.
- Файл в `wit/` описывает функции сервиса для других авторов.

## Через сеть (клиент и сервер)

API 0.3.1. Клиентский мод может вызвать сервис **серверного** мода, а серверный мод — сервис **клиентского** мода игрока, по обычному игровому соединению. Сетевые вызовы **асинхронны**: вы передаёте колбэк, он выполняется позже, но никогда внутри самого вызова.

```toml
# shop/mod.toml  (the provider: a server mod)
api = "^0.3.1"
[provides]
services = [{ name = "shop", version = "1.0.0", wit = "wit/shop.wit", remote = true, remote-methods = ["price"] }]
```

```lua
-- provider (server)
bh.services.provide("shop", "1.0.0", {
	price = function(item)
		local who = bh.services.caller() -- { mod = "shop-ui", player = <player> }
		return prices[item]
	end,
})

-- caller (client mod, permission `channels`)
local id = bh.services.call_remote("server", "shop", "^1", "price", { "apple" }, function(ok, v)
	if ok then bh.ui.toast("apple: " .. tostring(v)) else print(v.kind .. ": " .. v.message) end
end, 3000)
bh.services.cancel_remote(id) -- the callback never runs
```

- **Поставщик** решает, что можно вызывать: `remote = true` в `[provides]` (без этого сервис вызывают только моды на той же стороне) и, при желании, `remote-methods`, чтобы разрешить лишь некоторые методы.
- Вызывающий указывает `api = "^0.3.1"` и ему нужно разрешение `channels`.
- Ответ — ровно один раз `(true, значение)` или `(false, { kind, message })`. `kind`, например: `not-found`, `not-permitted`, `busy` (лимит частоты), `provider-error`, `timeout`, `unavailable` (нет сервера с модами или у игрока нет загрузчика модов) или `disconnected`.
- Внутри поставщика `bh.services.caller()` сообщает, какой мод вызвал и, если вызвал клиент, какой игрок.
- **Ограничения:** тайм-аут по умолчанию 5 с, не больше 30 с; 16 открытых вызовов на мод; 32 КиБ на аргументы и на результат; 10 вызовов в секунду на игрока (всплески до 20). Поставщик работает в своём бюджете времени, и сбой считается ошибкой *поставщика*: проверяйте аргументы и никогда не доверяйте вызывающему.
- Rust-моды используют `services::call_remote`, Java-моды — `api.callRemote(...)`; во всех языках ответ приходит как своё событие `<mod-id>:service-result`. См. [Luau API](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md#remote-services-api-031) и примеры [`prices-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/prices-lua), [`prices-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/prices-rust).

## Свои события

```lua
-- economy вызывает:
bh.events.fire_custom("economy:balance-changed", { player = p, balance = n })

-- любой мод слушает, с обычными правилами приоритета и отмены:
bh.events.on_custom("economy:balance-changed", function(ev)
	ev.payload.player:send_chat("You now have " .. ev.payload.balance .. " coins.")
end)
```

Мод может вызывать только события, названные по его id (`<id>:<name>`). `fire_custom` возвращает, было ли событие
в итоге отменено.

## Каналы

```lua
local ch = bh.channels.open("my-mod:updates", function(origin, data) ... end)
bh.channels.send(ch, "local", "hello")
```

Нужно разрешение `channels`. `"local"` доходит до каждого другого мода, открывшего то же имя, на следующем тике.
Для отправки игрокам, `"all-players"` или `"server"` нужен клиентский мод с загрузчиком модов.

## Примеры

Все они лежат в SDK и готовы работать вместе:

- [`economy`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/economy): монеты, `/balance`, `/pay`; предоставляет сервис `economy` и вызывает `economy:balance-changed`.
- [`landclaim`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/landclaim): участки через `/claim` за монеты; отменяет `block-place`/`block-break` на чужой земле; мягко зависит от `perms`.
- [`perms`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/perms): узлы прав как сервис `permissions`.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): мод на **Rust**, платящий через **Lua**-мод economy (WASM-моды работают в сборках сервера для разработки).

Справочник: [`services`](./api/services), [`events`](./api/events), [`channels`](./api/channels). Правила значений:
[соответствие Luau API](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md#values-typesvalue-cbor).
