# Хранилище

У каждого мода есть небольшое **хранилище «ключ-значение» для каждого мира**. Оно не трогает сохранение мира, так что
мод не может его сломать.

```lua
bh.storage.set("greetings", tostring(count))
local raw = bh.storage.get("greetings")         -- nil, если нет
bh.storage.delete("greetings")
for _, key in ipairs(bh.storage.keys("home:")) do ... end   -- ключи с этим префиксом, по порядку
```

Значения это строки (байты). Таблицы нужно кодировать:

```lua
bh.storage.set("home:" .. p:id(), bh.value.encode({ x = 10, y = 200 }))
local home = bh.value.decode(bh.storage.get("home:" .. p:id()))
```

| Ограничение | |
| --- | --- |
| Ключ | 1–256 байт |
| Значение | до 1 МиБ |
| На мод и мир | 64 МиБ |

- Записи надёжно лежат на диске после следующего сохранения мира. Всё, что вы держите в памяти, сбрасывайте в
  обработчике `world-save` (фаза `pre`) или в `on_disable`.
- Используйте в ключе `p:id()`, а не псевдоним: игроки могут менять имя.
- На сервере данные лежат в `saves/<world>/mods/storage`.

Справочник: [`storage`](./api/storage).
