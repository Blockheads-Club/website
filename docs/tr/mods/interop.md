# Başka modlarla çalışmak

Modlar, diller arasında bile birbirinin üzerine kurulabilir. Üç araç var, hepsi API 0.2'den:

| Araç | Ne için | Örnek |
| --- | --- | --- |
| **Servisler** | başka bir modun fonksiyonlarını çağırıp yanıt almak | `landclaim`, `economy`'den para çeker |
| **Özel olaylar** | bir şeyin olduğunu duyurmak; diğerleri tepki verebilir ya da iptal edebilir | `economy:balance-changed` |
| **Kanallar** | modlar arasında (ileride istemcilere de) ham mesaj göndermek | canlı güncellemeler |

Değerler düz Lua değerleri olarak geçer (altta CBOR); oyuncular oyuncu olarak kalır. Çağrılar eşzamanlıdır ve ana
iş parçacığında çalışır.

## Servisler

**Sağlayıcı** servisi `mod.toml` içinde bildirir ve fonksiyonlarını kaydeder:

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

**Tüketici** sağlayıcıya bağlanır ve onu çağırır:

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

- Yalnızca bağlı olduğun ya da isteğe bağlı bağlandığın (`[soft-dependencies]`, varsa kullanılır) modları çağırabilirsin.
- Eşleşen en yüksek sürüm kazanır.
- Sağlayıcının `error("msg", 0)` çağrısı, arayana `pcall` ile yakalayabileceğin bir hata olarak ulaşır.
- Zaten çalışan bir moda geri çağrı (A → B → A) `reentrant` ile başarısız olur.
- `wit/` dosyası, servisin fonksiyonlarını diğer yazarlar için belgeler.

## Özel olaylar

```lua
-- economy tetikler:
bh.events.fire_custom("economy:balance-changed", { player = p, balance = n })

-- herhangi bir mod, olağan öncelik ve iptal kurallarıyla dinler:
bh.events.on_custom("economy:balance-changed", function(ev)
	ev.payload.player:send_chat("You now have " .. ev.payload.balance .. " coins.")
end)
```

Bir mod yalnızca kendi id'sinden adlanan olayları tetikleyebilir (`<id>:<ad>`). `fire_custom`, olayın iptal edilmiş
bitip bitmediğini döndürür.

## Kanallar

```lua
local ch = bh.channels.open("my-mod:updates", function(origin, data) ... end)
bh.channels.send(ch, "local", "hello")
```

`channels` izni gerekir. `"local"`, aynı adı açan diğer her moda bir sonraki tick'te ulaşır. Oyunculara, `"all-players"`
ya da `"server"` hedefine göndermek için mod yükleyicili bir istemci modu gerekir.

## Örnekler

Hepsi SDK'da, birlikte çalıştırmaya hazır:

- [`economy`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/economy): para, `/balance`, `/pay`; `economy` servisini sağlar ve `economy:balance-changed` tetikler.
- [`landclaim`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/landclaim): para ile `/claim` arsaları; başkalarının arazisinde `block-place`/`block-break` iptal eder; `perms`'e isteğe bağlı bağlanır.
- [`perms`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/perms): izin düğümleri, bir `permissions` servisi olarak.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): **Lua** economy üzerinden ödeme yapan bir **Rust** modu (WASM modları sunucunun geliştirme sürümlerinde çalışır).

Başvuru: [`services`](./api/services), [`events`](./api/events), [`channels`](./api/channels). Değer kuralları:
[Luau API eşlemesi](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/luau-api.md#values-typesvalue-cbor).
