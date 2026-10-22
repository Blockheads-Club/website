# Mod yapma

**Modlar** The Blockheads'e özellik ekler: sohbet komutları, yeni kurallar, sunucu yöneticileri için araçlar ve ileride
oyuncuların oyunda göreceği değişiklikler. Başkalarının yaptıklarına <a href="../../mods/" target="_self">Modlar sayfasından</a> bakabilirsin.

::: warning Sunucular henüz mod yükleyemiyor
Aşağıdaki mod araçları şimdiden çalışıyor, ama Blockheads Server henüz mod yükleyemiyor. Bu, sonraki bir sürümde gelecek.
:::

## Taraflar

Bir mod bir veya iki **tarafta** çalışır:

- **server** (sunucu): sunucuda çalışır.
- **client** (istemci): oyuncunun cihazında, oyunun içinde çalışır.
- **ikisi birden**: hem sunucu hem istemci parçası vardır. *client-required* (istemcide zorunlu) işaretlenebilir; o zaman modu olmayan oyuncular katılamaz.

## Diller

Modunu **Lua/Luau** ile veya **WebAssembly'ye (WASM) derlenen Rust** ile yazabilirsin. Daha fazla dil gelecek.

## Aracı kur

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

Sonra:

```sh
bhmod new my-mod     # şablondan yeni bir mod oluşturur
bhmod check          # mod.toml'u ve kodu kontrol eder
bhmod pack           # my-mod-0.1.0.bhmod dosyasını üretir
```

SDK şurada: [github.com/Blockheads-Club/mod-sdk](https://github.com/Blockheads-Club/mod-sdk).

## mod.toml

Her modun bir `mod.toml` dosyası vardır. Ana alanlar:

| Alan | Anlamı |
| --- | --- |
| `id`, `version`, `name`, `description` | Modun kimliği. Id küçük harf, rakam ve `-` içerir. |
| `authors`, `license` | Kimin yaptığı ve hangi lisansla. |
| `sides` | `server`, `client` veya ikisi. |
| `api` | Çalıştığı mod API sürümleri. |
| `depends` | İhtiyaç duyduğu diğer modlar. |
| `permissions` | Neler yapabileceği (aşağıda). |

## İzinler

Bir mod yalnızca izinlerinin verdiği kadarını yapabilir:

- `world`: `none`, `read` veya `write`.
- `players`: `chat`, `teleport`, `kick`, `ban`, `inventory`, `health` değerlerinden herhangi biri.
- `net-http`: bağlanabileceği siteler.
- `channels`: sunucu, istemciler ve diğer modlar arasındaki kendi mesajları.
- `native`: korumalı alanın dışındaki yerel kod. **Kırmızı uyarıyla** gösterilir ve elle incelenir.

Yalnızca ihtiyacın olanı iste.

## Yayınla

Modlar, [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods) deposuna gönderilen bir çekme isteğiyle listelenir.
Adımlar, kurallar ve kontroller <a href="../../mods/submit" target="_self">Mod gönder</a> sayfasında.

Her yeni mod **güvenlik incelemesinden** geçer: listelenmeden önce bir bakımcı kodunu okur. Güncellemeler yeni izin
veya yerel kod eklediğinde tekrar incelenir. Yayınlanan liste
[blockheads.club/mods/index.json](https://blockheads.club/mods/index.json) adresinde; her indirme, listedeki SHA-256 ve
boyutla karşılaştırılır.
