# API sürümleri

Mod API'si `blockheads:api@<sürüm>` olarak sürümlenir. Bir mod, hangi sürümlerle çalıştığını `mod.toml` içinde söyler:

```toml
api = "^0.2"
```

| Sürüm | Ekledikleri |
| --- | --- |
| **0.1** | olaylar (katılma, ayrılma, sohbet, komut, tick, dünya yükleme ve kaydetme), komutlar, zamanlayıcı, depolama, oyuncular, günlük |
| **0.2** | oynanış olayları (giriş öncesi, blok koyma / kırma / değişme, nesne koyma, hasar, ölüm, hareket), `player:pos()`, servisler, özel olaylar, yerel kanallar |

## Uyumluluk

- Sunucular **0.2'yi uygular ve 0.1'i de sunar**. 0.x içinde yeni bir alt sürüm yalnızca bir şeyler **ekler**; yani
  `api = "^0.1"` olan bir mod değişmeden yüklenmeye ve çalışmaya devam eder.
- 0.2'den bir şey mi kullanıyorsun? `api = "^0.2"` bildir. Eski sunucular, çalışma anında hata vermek yerine modunu atlar.
- 0.1'e göre derlenmiş WASM modları çalışmaya devam eder: sunucular dondurulmuş
  [0.1 WIT](https://github.com/Blockheads-Club/mod-sdk/tree/dev/wit/compat/blockheads-api-0.1.0) dosyasını da bağlar.
- `bh.host.api_version()` sunucunun neyi çalıştırdığını söyler.

Bu sitedeki başvuru **0.2** içindir: [API başvurusu](./api/). 0.2'de yeni olan fonksiyonlar ve alanlar `(0.2)` ile
işaretlidir.
