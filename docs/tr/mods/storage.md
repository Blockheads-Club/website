# Depolama

Her mod, **dünya başına** küçük bir **anahtar-değer deposu** alır. Dünya kaydına hiç dokunmaz, bu yüzden bir mod
bir dünyayı bozamaz.

```lua
bh.storage.set("greetings", tostring(count))
local raw = bh.storage.get("greetings")         -- yoksa nil
bh.storage.delete("greetings")
for _, key in ipairs(bh.storage.keys("home:")) do ... end   -- bu önekli anahtarlar, sıralı
```

Değerler dizgedir (bayt). Tablolar için kodla:

```lua
bh.storage.set("home:" .. p:id(), bh.value.encode({ x = 10, y = 200 }))
local home = bh.value.decode(bh.storage.get("home:" .. p:id()))
```

| Sınır | |
| --- | --- |
| Anahtar | 1–256 bayt |
| Değer | en fazla 1 MiB |
| Mod ve dünya başına | 64 MiB |

- Yazılanlar, sonraki dünya kaydından sonra diske güvenle yazılmış olur. Bellekte tuttuğun her şeyi bir `world-save`
  işleyicisinde (`pre` evresi) ya da `on_disable` içinde boşalt.
- Anahtarı takma ada göre değil `p:id()` ile kur: oyuncular adlarını değiştirebilir.
- Sunucuda veri `saves/<world>/mods/storage` içindedir.

Başvuru: [`storage`](./api/storage).
