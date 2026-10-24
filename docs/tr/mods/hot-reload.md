# Sıcak yenileme ve süreler

Bir modu değiştir ve sonucu **dünyayı yeniden başlatmadan** gör. Sunucu yöneticileri ayrıca hangi modun ne kadar zaman
harcadığını görebilir. Bu sayfa hem sunucu sahipleri hem mod yazarları için.

::: warning Önizleme
Sıcak yenileme ve `/mods timings`, [Blockheads Server](../server) ile PC Sürümü'nün geliştirme sürümlerinde var.
:::

## Yönetici komutları

Sunucuda yöneticiler (oyun sohbetinde) ve konsol `/mods` komutunu kullanabilir:

| Komut | Ne yapar |
| --- | --- |
| `/mods` | modları ve durumlarını listeler |
| `/mods reload` | dosyaları değişen her modu yeniden yükler, yeni modları başlatır, dosyaları silinen modları durdurur |
| `/mods reload <id>` | o modu, değişmiş olsun olmasın, yeniden yükler |
| `/mods timings [id]` | her çağrı türünün son 60 saniyede ne kadar sürdüğünü gösterir |
| `/mods timings reset [id]` | bu sayıları sıfırlar |

`/mods` yerleşiktir: hiçbir mod bu adı kullanamaz; yönetici olmayan oyuncular "You do not have permission" yanıtı alır.

## Yenileme ne yapar

Yeniden yüklediği her mod için:

1. Paketi yeniden okur (`.bhmod` dosyası ya da açılmış klasör, bir de `mods.toml`). Yeni sürüm hiç başlayamıyorsa eski
   sürüm çalışmaya devam eder ve komut nedenini söyler.
2. Eski sürüme `on-disable` verilir. Kaydettiği her şey kaldırılır: olay işleyicileri, komutlar, zamanlayıcılar, servisler,
   kanallar. Deposu kaydedilir.
3. Yeni sürüm açılıştaki gibi başlar: **depolanan verisi yerinde durur**, `on-enable` çalışır ve (yalnızca o moda)
   `world-loaded` gelir.
4. Hata sayacı ve süre sayıları sıfırdan başlar.

Dünya, oyuncular ve diğer tüm modlar devam eder.

Bilmen gerekenler:

- Yeni sürüm `on-enable` içinde hata verirse (örneğin bir yazım hatası) mod **kapalı** kalır ve komut hatayı gösterir.
  Dosyayı düzelt ve `/mods reload <id>` komutunu yeniden çalıştır.
- Zaten çevrimiçi olan oyuncular yenilenen moda yeniden duyurulmaz. Modun oyuncuları takip ediyorsa `on-enable` içinde
  çevrimiçi oyuncuları oku.
- Başka bir modun yenilemeden **önce** `bh.services.get` ile aldığı servis sonradan bayatlar. Çağırmak
  `stale service handle … call services.get again` hatasıyla biter. Servisi yeniden al ya da her zaman yeni sürümü bulan
  `bh.services.call` ile ada göre çağır.
- İçerik (kozmetikler, eşyalar, bloklar) ve yerel kod yeniden yüklenmez. Sunucuyu yeniden başlatmak (istemcide yeni bir
  oyun oturumu) gerekir.
- Java modları yeni bir sınıf yükleyici alır. Bir Java modunun kendi başlattığı iş parçacıkları `on-disable` içinde
  durdurulmalı.
- Bağlı olan istemciler elindeki istemci parçasını korur. Sonradan katılan oyunculara yenisi sunulur.

## Mod yazarken yenileme

Sunucuda `BLOCKHEADS_MODS_WATCH=1` ayarla. Sunucu mod klasörüne saniyede yaklaşık iki kez bakar ve değişenleri, dosyalar
değişmeyi bırakır bırakmaz yeniden yükler. Günlükte `watch: my-mod: reloaded (0.1.0 -> 0.1.1)` ya da neden başarısız
olduğu görünür. `BLOCKHEADS_MODS_DIR` değişkenini açılmış mod klasörünü içeren bir klasöre yönlendir (içinde `mod.toml`
olan klasör çalışır) ve düzenle.

PC Sürümü'nde geliştirici modunu aç ve mod klasörünü başlatıcıya ekle. Başlatıcı dosyalar değişince yeniden yükler;
oyunda **F5** bunu elle yapar. Yalnızca değişen modlar yeniden başlar; dünyada kalırsın.

## Süreler

`/mods timings` "bu mod sunucumu yavaşlatıyor mu?" sorusunu yanıtlar:

```text
Mod timings over the last 60 s (times in ms, inclusive of nested calls):
landclaim [enabled]: 412 calls, 18.40 ms total, 3 budget hits, strikes 0 now / 0 since reset
  event: 380 calls, total 15.10, avg 0.04, max 2.10, over soft 0, timeouts 0, errors 0
  command: 4 calls, total 1.90, avg 0.48, max 0.90, over soft 0, timeouts 0, errors 0
  task: 28 calls, total 1.40, avg 0.05, max 6.20, over soft 3, timeouts 0, errors 0
```

- **Türler:** `event` (oyun olayları ve özel olaylar), `command`, `task` (zamanlayıcılar), `service` (diğer modlardan ya da
  öbür taraftan moda gelen çağrılar), `channel` (mesajlar), `lifecycle` (`on-enable` ve `on-disable`).
- **avg ve max** çağrı başınadır. Bir çağrının süresi, çağırdığı modların süresini de içerir.
- **over soft** 5 ms'den uzun süren çağrıları (günlükte uyarı), **timeouts** 25 ms'de durdurulan çağrıları, **errors**
  başarısız olan çağrıları sayar.
- **strikes**, modun kapatılmasına doğru sayılan hatalardır (60 sn içinde 3). `reset` raporu sıfırlar; hataları silmez.

PC Sürümü'nde **F9** ile Modlar panelini aç ve aynı sayılar için **T**'ye bas (**R** ya da Sıfırla düğmesi sıfırlar,
**T** yeniden günlüğe döner).

Yazarlar için: sayılar `bhmod-core`'dan gelir ([`docs/hot-reload.md`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/hot-reload.md)),
yani sunucu, PC Sürümü ve Android yükleyici aynı şekilde raporlar.
