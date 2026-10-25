# Sunucu

**Blockheads Sunucu**, sen ve arkadaşların için çok oyunculu dünyalar barındırır. Oyunun özel sunucusunun (1.7.1
sürümü) ücretsiz ve açık kaynaklı yeniden yazımıdır; bu yüzden oyun ve mevcut dünyalar onunla değişiklik olmadan
çalışır.

[Sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-server/releases) indir.

## Masaüstü uygulaması

Bilgisayarda en kolay yol. Sistemine uygun uygulamayı indir:

| Sistem | Dosya |
| --- | --- |
| Windows | `_x64-setup.exe` (ARM bilgisayarlar için `arm64`) |
| macOS | `_x64.dmg` (Intel) veya `_aarch64.dmg` (Apple Silicon) |
| Linux | `.AppImage`, `.deb` veya `.rpm` |

Sonra:

1. **Dünya oluştur** (ad, boyut, istersen uzman modu).
2. **Sunucuyu başlat**’a bas.
3. Uygulamada görünen adresi arkadaşlarınla paylaş. Telefonlar için bir QR kod da vardır.

![Blockheads Server masaüstü uygulaması, dünya oluşturma penceresi: dünya adı, 1/16× ile 16× arası boyut, uzman modu anahtarı ve oluşturma düğmesi.](/shots/tr/server/worlds-create.webp)

*Bir dünya oluştur: ad, boyut ve istersen uzman modu.*

![Çalışan Blockheads Server paneli: 2 çevrimiçi oyuncu, geçerli dünya “Sunny Isle” ve QR kodu, 192.168.1.42 LAN adresi ve 15151 portu olan telefondan bağlanma kartı.](/shots/tr/server/dashboard.webp)

*Panel paylaşılacak adresi ve telefonlar için bir QR kodu gösterir.*

Uygulamada canlı konsolu ve kimlerin çevrimiçi olduğunu da görebilir, yönetici, moderatör, beyaz ve kara listeleri
düzenleyebilirsin. Port, en çok oyuncu sayısı ve parola **Ayarlar**’dadır.

İsim oyuncunun kendisidir: Minecraft çevrimdışı modundaki gibi, bilinen bir isimle giren herkes hangi cihazdan olursa
olsun o oyuncu olarak oynar (aynı blockhead’ler, envanter ve yetkiler). Zaten çevrimiçi olan bir isimle yapılan giriş
eski oturumun yerini alır. Özgün kuralı, yani ismin ilk cihazına ait olmasını istiyorsan **Ayarlar**’dan **Aynı
kullanıcı adıyla her cihazdan giriş** seçeneğini kapat. İsim parola değildir; herkese açık bir sunucuda parola ya da
beyaz liste kullan.

![Blockheads Server konsolu: katılma, sohbet ve hata satırlarıyla canlı log, filtreler, arama alanı ve çalıştırma düğmeli komut kutusu.](/shots/tr/server/console.webp)

*Canlı konsol: logda ara ve komut yaz.*

![Blockheads Server ayarları, bağlantı: port 15151, en çok oyuncu ve parola; ardından kaydetme aralığı ve veri klasörüyle dünya ve kaydetme bölümü.](/shots/tr/server/settings.webp)

*Port, en çok oyuncu ve parola Ayarlar’dadır.*

## Komut satırı

Ekranı olmayan sunucular için ya da terminali tercih ediyorsan. Sistemine uygun arşivi (`x86_64`, `aarch64` ya da
Raspberry Pi için `armv7`) indir, aç ve çalıştır:

```sh
./blockheads_server --new world1 --port 15151
```

Windows’ta (PowerShell):

```powershell
.\blockheads_server.exe --new world1 --port 15151
```

**macOS:** İlk seferde, Gatekeeper’ın programa izin vermesi için indirme işaretini kaldır:

```sh
xattr -d com.apple.quarantine ./blockheads_server
```

Tüm seçenekler için `--help` ile çalıştır. Seçenekler asıl sunucudakilerle aynıdır.

Dünyalar ev klasöründeki `GNUstep/Library/ApplicationSupport/TheBlockheads` klasörüne kaydedilir. Başka bir klasör
kullanmak için `BLOCKHEADS_DATA_DIR` ortam değişkenini ayarla.

## Docker

```sh
docker run -i --rm -p 15151:15151/udp -v bh-data:/data \
  ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

- Konsola yazabilmek için (`/stop`, sohbet) `-i`’yi koru.
- Dünyaların `bh-data` volume’ünde saklanır, böylece güncellemelerden sonra da kalır.
- İmaj x86_64 ve ARM’de çalışır.

## Android

1. `blockheads-server-…-android.apk` dosyasını indirip açarak kur. Android, tarayıcından yüklemeye izin vermeni
   isteyebilir.
2. Bir dünya oluştur ve **Sunucuyu başlat**’a dokun. Sunucu arka planda çalışmaya devam eder; bir bildirim durumunu
   gösterir.
3. Telefonu şarjda tut. Uygulama sorarsa onun için pil optimizasyonunu kapat, böylece Android onu durdurmaz.

![Android telefonda Blockheads Server uygulaması: çalışırken panel; diğer telefonlar için LAN adresi, port ve QR kodu.](/shots/tr/server/phone-dashboard.webp)

*Android uygulaması aynı paneli gösterir.*

## Oyundan bağlanma {#connect-from-the-game}

1. Sunucuyu başlat ve adresini ve portunu not et; örneğin `192.168.1.42` ve port `15151`.
2. Oyunda **Join World → Advanced… → Online IP/Port…** menüsünü aç.
3. Adresi ve portu girip katıl. Sunucunun parolası varsa oyun onu sorar.

::: tip Android oyuncuları
Oyunun modern Android sürümleri, bir sunucuya katılabilmek için [Patcher](/tr/patcher)’daki karşılama penceresi
düzeltmesine ihtiyaç duyar.
:::

## LAN (aynı Wi-Fi)

Birlikte oynamanın en kolay yolu aynı ağda olmaktır:

- Telefon (veya bilgisayar) ile sunucu **aynı Wi-Fi ağında ya da yerel ağda** olmalıdır.
- Sunucunun gösterdiği **Yerel ağ adresini** kullan (`192.168.`, `10.` veya benzeriyle başlar). Telefonda
  kopyalamak için QR kodu okut.
- Varsayılan port **15151**’dir (UDP). Arkadaşların bağlanamıyorsa adresi ve portu kontrol et ve güvenlik duvarında
  sunucuya izin ver.

::: warning İnternet üzerinden mi oynayacaksın?
Modeminde UDP 15151 portunu sunucu bilgisayarına yönlendir ve genel IP adresini paylaş. Önce bir parola
belirle ya da beyaz listeyi kullan.
:::
