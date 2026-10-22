# Сақтау

Әр модқа әлем бойынша шағын **кілт-мән қоймасы** беріледі. Ол әлем сақтауына тиіспейді, сондықтан мод әлемді бүлдіре алмайды.

```lua
bh.storage.set("greetings", tostring(count))
local raw = bh.storage.get("greetings")         -- жоқ болса nil
bh.storage.delete("greetings")
for _, key in ipairs(bh.storage.keys("home:")) do ... end   -- осы префиксті кілттер, сұрыпталған
```

Мәндер жол (байттар). Кестелерді кодтау керек:

```lua
bh.storage.set("home:" .. p:id(), bh.value.encode({ x = 10, y = 200 }))
local home = bh.value.decode(bh.storage.get("home:" .. p:id()))
```

| Шектеу | |
| --- | --- |
| Кілт | 1–256 байт |
| Мән | 1 MiB-қа дейін |
| Мод пен әлем үшін | 64 MiB |

- Жазулар келесі әлем сақтауынан кейін дискіде қауіпсіз болады. Жадта ұстағаныңызды `world-save` өңдеушісінде
  (`pre` фазасы) немесе `on_disable` ішінде жазып қойыңыз.
- Бүркеншік атпен емес, `p:id()` бойынша кілттеңіз: ойыншылар атын өзгерте алады.
- Серверде деректер `saves/<world>/mods/storage` ішінде.

Анықтама: [`storage`](./api/storage).
