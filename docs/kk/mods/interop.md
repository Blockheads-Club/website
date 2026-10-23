# Басқа модтармен жұмыс

Модтар бір-бірінің үстіне құрыла алады, тіпті әр түрлі тілдер арасында. Үш құрал, бәрі API 0.2-ден:

| Құрал | Не үшін | Мысал |
| --- | --- | --- |
| **Сервистер** | басқа модтың функцияларын шақырып, жауап алу | `landclaim` `economy` модынан монета алады |
| **Өз оқиғалар** | бірдеңе болғанын жариялау; басқалар жауап беруі немесе бас тартуы мүмкін | `economy:balance-changed` |
| **Арналар** | модтар арасында шикі хабар жіберу (кейін клиенттерге де) | тікелей жаңартулар |

Мәндер қарапайым Lua мәндері ретінде өтеді (ішінде CBOR); ойыншылар ойыншы күйінде қалады. Шақырулар синхронды және
негізгі ағында жұмыс істейді.

## Сервистер

**Провайдер** сервисті `mod.toml` ішінде жариялап, функцияларын тіркейді:

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

**Тұтынушы** провайдерге тәуелді болып, оны шақырады:

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

- Тек тәуелді болатын немесе жұмсақ тәуелді болатын (`[soft-dependencies]`, бар болса қолданылады) модтарды ғана шақыра аласыз.
- Сәйкес келетін ең жоғары нұсқа жеңеді.
- Провайдердің `error("msg", 0)` шақырушыға `pcall` арқылы ұстауға болатын қате болып жетеді.
- Қазір жұмыс істеп тұрған модқа кері шақыру (A → B → A) `reentrant` қатесімен аяқталады.
- `wit/` файлы сервистің функцияларын басқа авторларға құжаттайды.

## Өз оқиғалар

```lua
-- economy жібереді:
bh.events.fire_custom("economy:balance-changed", { player = p, balance = n })

-- кез келген мод әдеттегі басымдық және бас тарту ережелерімен тыңдайды:
bh.events.on_custom("economy:balance-changed", function(ev)
	ev.payload.player:send_chat("You now have " .. ev.payload.balance .. " coins.")
end)
```

Мод тек өз id-імен аталған оқиғаларды (`<id>:<name>`) жібере алады. `fire_custom` оқиғаның бас тартылғанын қайтарады.

## Арналар

```lua
local ch = bh.channels.open("my-mod:updates", function(origin, data) ... end)
bh.channels.send(ch, "local", "hello")
```

`channels` рұқсаты керек. `"local"` дәл сол атауды ашқан әрбір басқа модқа келесі тикте жетеді. Ойыншыларға,
`"all-players"` немесе `"server"` жіберу үшін мод жүктегіші бар клиент моды керек.

## Мысалдар

Бәрі SDK-да, бірге іске қосуға дайын:

- [`economy`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/economy): монеталар, `/balance`, `/pay`; `economy` сервисін ұсынады және `economy:balance-changed` жібереді.
- [`landclaim`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/landclaim): монеталарға `/claim` телімдері; басқалардың жерінде `block-place`/`block-break` бас тартады; `perms` модына жұмсақ тәуелді.
- [`perms`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/perms): `permissions` сервисі ретінде рұқсат түйіндері.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): **Lua** economy арқылы төлейтін **Rust** моды (WASM модтары сервердің әзірлеу құрастырмаларында жұмыс істейді).

Анықтама: [`services`](./api/services), [`events`](./api/events), [`channels`](./api/channels). Мән ережелері:
[Luau API сәйкестігі](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md#values-typesvalue-cbor).
