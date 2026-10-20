# Sunucu

**Blockheads Sunucu**, siz ve arkadaşlarınız için çok oyunculu dünyalar barındırır. Oyunun özel sunucusunun (1.7.1
sürümü) ücretsiz ve açık kaynaklı yeniden yazımıdır; bu yüzden oyun ve mevcut dünyalar onunla değişiklik olmadan
çalışır.

[Sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-server/releases) indirin.

## Masaüstü uygulaması

Bilgisayarda en kolay yol. Sisteminize uygun uygulamayı indirin:

| Sistem | Dosya |
| --- | --- |
| Windows | `_x64-setup.exe` (ARM bilgisayarlar için `arm64`) |
| macOS | `_x64.dmg` (Intel) veya `_aarch64.dmg` (Apple Silicon) |
| Linux | `.AppImage`, `.deb` veya `.rpm` |

Sonra:

1. **Dünya oluştur** (ad, boyut, isterseniz uzman modu).
2. **Sunucuyu başlat**’a basın.
3. Uygulamada görünen adresi arkadaşlarınızla paylaşın. Telefonlar için bir QR kod da vardır.

![Blockheads Server masaüstü uygulaması, dünya oluşturma penceresi: dünya adı, 1/16× ile 16× arası boyut, uzman modu anahtarı ve oluşturma düğmesi.](/shots/tr/server/worlds-create.webp)

*Bir dünya oluşturun: ad, boyut ve isterseniz uzman modu.*

![Çalışan Blockheads Server paneli: 2 çevrimiçi oyuncu, geçerli dünya “Sunny Isle” ve QR kodu, 192.168.1.42 LAN adresi ve 15151 portu olan telefondan bağlanma kartı.](/shots/tr/server/dashboard.webp)

*Panel paylaşılacak adresi ve telefonlar için bir QR kodu gösterir.*

Uygulamada canlı konsolu ve kimlerin çevrimiçi olduğunu da görebilir, yönetici, moderatör, beyaz ve kara listeleri
düzenleyebilirsiniz. Port, en çok oyuncu sayısı ve parola **Ayarlar**’dadır.

![Blockheads Server konsolu: katılma, sohbet ve hata satırlarıyla canlı günlük, filtreler, arama alanı ve çalıştırma düğmeli komut kutusu.](/shots/tr/server/console.webp)

*Canlı konsol: günlükte arayın ve komut yazın.*

![Blockheads Server ayarları, bağlantı: port 15151, en çok oyuncu ve parola; ardından kaydetme aralığı ve veri klasörüyle dünya ve kaydetme bölümü.](/shots/tr/server/settings.webp)

*Port, en çok oyuncu ve parola Ayarlar’dadır.*

## Komut satırı

Ekranı olmayan sunucular için ya da terminali tercih ediyorsanız. Sisteminize uygun arşivi (`x86_64`, `aarch64` ya da
Raspberry Pi için `armv7`) indirin, açın ve çalıştırın:

```sh
./blockheads_server --new world1 --port 15151
```

Windows’ta (PowerShell):

```powershell
.\blockheads_server.exe --new world1 --port 15151
```

Tüm seçenekler için `--help` ile çalıştırın. Seçenekler asıl sunucudakilerle aynıdır.

Dünyalar ev klasörünüzdeki `GNUstep/Library/ApplicationSupport/TheBlockheads` klasörüne kaydedilir. Başka bir klasör
kullanmak için `BLOCKHEADS_DATA_DIR` ortam değişkenini ayarlayın.

## Docker

```sh
docker run -i --rm -p 15151:15151/udp -v bh-data:/data \
  ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

- Konsola yazabilmek için (`/stop`, sohbet) `-i`’yi koruyun.
- Dünyalarınız `bh-data` biriminde saklanır, böylece güncellemelerden sonra da kalır.
- İmaj x86_64 ve ARM’de çalışır.

## Android

1. `blockheads-server-…-android.apk` dosyasını indirip açarak kurun. Android, tarayıcınızdan yüklemeye izin vermenizi
   isteyebilir.
2. Bir dünya oluşturun ve **Sunucuyu başlat**’a dokunun. Sunucu arka planda çalışmaya devam eder; bir bildirim durumunu
   gösterir.
3. Telefonu şarjda tutun. Uygulama sorarsa onun için pil optimizasyonunu kapatın, böylece Android onu durdurmaz.

![Android telefonda Blockheads Server uygulaması: çalışırken panel; diğer telefonlar için LAN adresi, port ve QR kodu.](/shots/tr/server/phone-dashboard.webp)

*Android uygulaması aynı paneli gösterir.*

## Oyundan bağlanma {#connect-from-the-game}

1. Sunucuyu başlatın ve adresini ve portunu not edin; örneğin `192.168.1.42` ve port `15151`.
2. Oyunda **Join World → Advanced… → Online IP/Port…** menüsünü açın.
3. Adresi ve portu girip katılın. Sunucunun parolası varsa oyun onu sorar.

::: tip Android oyuncuları
Oyunun modern Android sürümleri, bir sunucuya katılabilmek için [Yamalayıcı](/tr/patcher)’daki karşılama penceresi
düzeltmesine ihtiyaç duyar.
:::

## LAN (aynı Wi-Fi)

Birlikte oynamanın en kolay yolu aynı ağda olmaktır:

- Telefon (veya bilgisayar) ile sunucu **aynı Wi-Fi’de ya da ağda** olmalıdır.
- Sunucunun gösterdiği **Yerel ağ adresini** kullanın (`192.168.`, `10.` veya benzeriyle başlar). Telefonda
  kopyalamak için QR kodu okutun.
- Varsayılan port **15151**’dir (UDP). Arkadaşlarınız bağlanamıyorsa adresi ve portu kontrol edin ve güvenlik duvarında
  sunucuya izin verin.

::: warning İnternet üzerinden mi oynayacaksınız?
Modeminizde UDP 15151 portunu sunucu bilgisayarına yönlendirin ve genel IP adresinizi paylaşın. Önce bir parola
belirleyin ya da beyaz listeyi kullanın.
:::
