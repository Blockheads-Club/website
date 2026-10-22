# Olaylar

Bir mod, **olaylara** abone olarak oyuna tepki verir:

```lua
bh.events.on("chat", function(ev)
	if string.find(ev.text, "badword") then
		ev.cancelled = true            -- mesaj hiç gösterilmez
	end
end, { priority = "lowest" })
```

`bh.events.on` bir id döndürür; `bh.events.off(id)` işleyiciyi kaldırır.

## Olay türleri

| Tür | Ne zaman | Neyi değiştirebilir |
| --- | --- | --- |
| `player-join`, `player-quit` | bir oyuncu katıldı / ayrıldı | – |
| `chat` | bir sohbet mesajı, gösterilmeden önce | iptal, `ev.text` |
| `command` | bir `/komut` satırı, herhangi bir işleyiciden önce | iptal (yutar) |
| `tick` | her dünya adımı (0,2 sn) | – |
| `world-loaded`, `world-save` | dünya yüklendi / kaydediliyor (`pre`, `post`) | – |
| `player-pre-login` | bir oyuncu katılma kontrollerini geçti | iptal (reddet), `ev.reason` |
| `block-place`, `block-break` | bir oyuncu blok koyar / kaldırır | iptal |
| `object-place` | bir oyuncu tezgah, sandık, kapı vb. koyar | iptal |
| `block-changed` | herhangi bir kare değişti; büyüme veya fizik de dahil | – (yalnızca izle) |
| `damage` | bir blockhead zarar görmek üzere | iptal, `ev.amount` |
| `death` | bir blockhead öldü | – |
| `player-move` | bir blockhead başka bir kareye girdi | – |

`player-pre-login`'den aşağıdaki türler API 0.2 gerektirir ([API sürümleri](./api-versions)). Tüm alanlar:
[`events` başvurusu](./api/events).

İptal edilen bir blok değişikliği, korumalı bir karedeki gibi oyuncunun ekranında geri alınır.

## Öncelik

İşleyiciler `lowest`'ten `highest`'e, sonra `monitor` olarak çalışır:

`lowest` → `low` → `normal` (varsayılan) → `high` → `highest` → `monitor`

- Sonraki işleyiciler seni ezebilecekse **erken** çalış (`lowest`, `low`); örneğin yumuşak bir filtre.
- Son sözü söylemek için **geç** çalış (`high`, `highest`); örneğin bir koruma modu.
- `monitor` nihai sonucu görür ve değiştiremez. Günlükler ve istatistikler için kullan.

Aynı öncelik içinde modlar yüklenme sırasıyla çalışır (önce bağımlılıklar).

## İptal etmek

- İptal etmek için `ev.cancelled = true` yap. Sonraki bir işleyici bunu tekrar `false` yapabilir.
- `{ ignore_cancelled = true }`, olay iptal edilmişken işleyicini atlar.
- İptal edilemeyen olaylardaki değişiklikler yok sayılır ve günlüğe uyarı yazılır.

İşleyiciler sunucunun ana iş parçacığında tek tek çalışır ve hızlı olmalıdır ([sınırlar](./servers#time-and-memory-limits)).
