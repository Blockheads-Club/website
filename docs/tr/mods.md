# Mod yapma

**Modlar** The Blockheads'e özellik ekler: sohbet komutları, yeni kurallar, sunucu yöneticileri için araçlar ve ileride
oyuncuların oyunda göreceği değişiklikler. Başkalarının yaptıklarına <a href="../../mods/" target="_self">Modlar sayfasından</a> bakabilirsin.

::: warning Bugün neler çalışıyor
`bhmod` (oluştur, kontrol et, paketle) çalışıyor ve [Blockheads Server](./server) geliştirme sürümlerinde **Lua**
modlarının yanında **WASM** (Rust) modlarını da çalıştırıyor. **İstemci** modları PC Sürümü'nün mod yükleyicisiyle ve
Patcher'ın Android mod yükleyici yamasıyla çalışır; ikisi de geliştirme sürümlerinde ve sonraki sürümlerle gelecek.
:::

## Buradan başla

1. [İlk Lua modun](./mods/first-lua-mod): `bhmod new`'den çalışan bir sunucuya.
2. [Olaylar](./mods/events), [komutlar ve zamanlayıcılar](./mods/commands), [depolama](./mods/storage).
3. [Başka modlarla çalışmak](./mods/interop): servisler, özel olaylar, kanallar.
4. Herkese açık listede [yayımlama](./mods/publishing).

Rust mı tercih edersin? [İlk Rust modun](./mods/first-rust-mod) sayfasına bak. Tüm fonksiyonlar
[API başvurusunda](./mods/api/).

## Taraflar

Bir mod bir veya iki **tarafta** çalışır:

- **server** (sunucu): sunucuda çalışır.
- **client** (istemci): oyuncunun cihazında, oyunun içinde çalışır (mod yükleyici gerekir).
- **both** (ikisi birden): hem sunucu hem istemci parçası vardır. *client-required* (istemcide zorunlu) işaretlenebilir; o zaman modu olmayan oyuncular katılamaz.

## Diller

**Lua (Luau)** en kolayı. **WebAssembly'ye (WASM) derlenen Rust** da çalışır; WASM bileşeni üretebilen C, Zig, Go
ve diğerleri de gelecek. Farklı dillerdeki modlar birbirini çağırabilir.

## mod.toml

Her modun bir `mod.toml` dosyası vardır. Ana alanlar:

| Alan | Anlamı |
| --- | --- |
| `id`, `version`, `name`, `description` | Modun kimliği. Id küçük harf, rakam, `-` ve `_` içerir. |
| `authors`, `license` | Kimin yaptığı ve hangi lisansla. |
| `api` | Çalıştığı mod API sürümleri, örneğin `^0.2` ([API sürümleri](./mods/api-versions)). |
| `[sides]`, `[entry]` | Nerede çalıştığı ve hangi dosyayla başladığı. |
| `[dependencies]` | İhtiyaç duyduğu diğer modlar. |
| `[permissions]` | Neler yapabileceği (aşağıda). |

Tüm biçim [SDK dokümanlarında](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/package.md).

## İzinler

Bir mod yalnızca izinlerinin verdiği kadarını yapabilir ve her birini sunucu sahibi vermelidir:

- `world`: `none`, `read` veya `write`.
- `players`: `chat`, `teleport`, `kick`, `ban`, `inventory`, `health` değerlerinden herhangi biri.
- `net-http`: bağlanabileceği siteler.
- `channels`: sunucu, istemciler ve diğer modlar arasındaki kendi mesajları.
- `native`: korumalı alanın dışındaki yerel kod. **Kırmızı uyarıyla** gösterilir ve elle incelenir.

Yalnızca ihtiyacın olanı iste. Sunucu sahiplerinin gördüğü: [Sunucunda modlar](./mods/servers#permissions).

## Yayımla

Modlar, [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods) deposuna gönderilen bir çekme isteğiyle (pull request) listelenir.
Adımlar, kurallar ve kontroller <a href="../../mods/submit" target="_self">Mod gönder</a> sayfasında, kısaca da
[Yayımlama](./mods/publishing) sayfasında.
