# Sunucunda modlar

::: warning Önizleme
[Blockheads Server](../server) geliştirme sürümlerinde **Lua** modlarını çalıştırır; henüz bir sürümde yok.
**WASM** (Rust) modları ve **istemci** modları yakında geliyor.
:::

## Modları aç

Modlar, sunucunun veri klasöründeki `mods` klasöründen yüklenir:

| Kurulum | Mod klasörü |
| --- | --- |
| Masaüstü / komut satırı | `<veri klasörü>/mods` (veri klasörü `BLOCKHEADS_DATA_DIR`; yoksa ev klasöründeki `GNUstep/Library/ApplicationSupport/TheBlockheads`) |
| Docker | birimin içinde `/data/mods` |
| Her yerde | `BLOCKHEADS_MODS_DIR` değişkenini başka bir klasöre ayarla |

Mod klasörü yoksa (ya da boşsa) sunucu tam olarak vanilla gibi davranır: aynı baytlar, kayıtlar ve çıktı.

## Mod kur

1. `.bhmod` dosyasını <a href="../../../mods/" target="_self">Modlar sayfasından</a> indir (ya da yazarından al).
   Açılmış bir mod klasörü de (içinde `mod.toml` olan) çalışır.
2. Mod klasörüne koy.
3. İzinlerini `mods.toml` içinde ver (aşağıda).
4. Sunucuyu yeniden başlat. Günlükte `loaded 1 mod(s): …` ya da bir modun neden yüklenmediği görünür.

Masaüstü uygulamasında herkese açık listeden, dosyadan veya bağlantıdan kurmak yakında geliyor.

## mods.toml

`mods.toml` mod klasöründe durur. Her mod id'si için bir bölüm vardır:

```toml
[hello-lua]
grant = ["players:chat"]

[noisy-mod]
enabled = false   # kurulu kalır, hiç yüklenmez
```

İzin gerektirmeyen bir mod için bölüm gerekmez. Vermediğin bir izni isteyen mod **yüklenmez**; ona bağlı modlar da atlanır.

## İzinler {#permissions}

| İzin | Modun yapabilecekleri |
| --- | --- |
| `players:chat` | herkese sohbet mesajı göndermek |
| `players:kick`, `players:ban` | oyuncuları atmak veya yasaklamak |
| `players:teleport`, `players:inventory`, `players:health` | oyuncuları taşımak, envanter veya canı değiştirmek |
| `world:read`, `world:write` | dünyayı okumak veya değiştirmek (`world:write` `world:read`'i de kapsar) |
| `net-http:<host>` | o siteye bağlanmak |
| `channels` | diğer modlara ve istemcilere mesaj göndermek |
| `native` | korumalı alanın dışında yerel kod çalıştırmak (**kırmızı uyarı**, elle incelenir) |

Geri kalan her şey izin gerektirmez: olaylar, kendi komutları, zamanlayıcılar, kendi depolaması, tek bir oyuncuya
sohbet ve bağlı olduğu modların servisleri. Modun herkese açık listedeki sayfası ne istediğini gösterir.

## Süre ve bellek sınırları {#time-and-memory-limits}

Modlar sunucunun ana iş parçacığında çalışır, bu yüzden her birinin süresi ve belleği sınırlıdır:

- Bir moda yapılan her çağrı en fazla **25 ms** sürebilir (5 ms'den sonra günlüğe uyarı yazılır).
- Tüm modlar birlikte dünya adımı başına **20 ms** alır; fazlası için zamanlayıcılar sonraki adımı bekler.
- Her mod **32 MiB** bellek alır.

Bir hata, zaman aşımı ya da belleğin bitmesi bir **arızadır**. **60 sn içinde 3 arıza, modu bir sonraki yeniden başlatmaya kadar kapatır**;
günlük `disabled: 3 faults within 60 s` der ve hatayı belirtir. Modun yazarına bildir.

## Depolama

Her mod kendi verisini dünya başına `saves/<world>/mods/storage` içinde tutar, dünyadan ayrı. Silersen modların
verisi sıfırlanır, dünyaya dokunulmaz. Dünyayla birlikte yedekle.

## Vanilla oyuncular

- **Yalnızca sunucu modları:** herkes normal oyunla katılabilir.
- **İstemcide zorunlu modlar** <Badge type="warning" text="yakında" />: mod yükleyicisi olmayan oyuncular geri
  çevrilir (oyunları istemcinin çok eski olduğunu söyler). Modun sayfası bunları *client-required* olarak işaretler.
