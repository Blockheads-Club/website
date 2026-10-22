# Aynı Wi-Fi ağındaki arkadaşlarınla oyna

Evdeki bir bilgisayarda sunucu başlat; Wi-Fi ağına bağlı her telefon aynı dünyaya katılsın. Yaklaşık dört dakika sürer.

::: info Nelere ihtiyacın var
- Telefonlarla aynı Wi-Fi ağında bir Windows, macOS ya da Linux bilgisayar
- Blockheads Sunucu — masaüstü uygulaması ya da komut satırı sunucusu ([indirmeler](https://github.com/Blockheads-Club/blockheads-server/releases))
- Her telefonda The Blockheads. Yeni Android sürümlerinde [önce oyunu düzelt](./fix-game-on-phone)
:::

## 1. Bir sunucu başlat

**Masaüstü uygulaması:** **Dünyalar**’ı aç, **Dünya oluştur**’a dokun, bir ad ver ve **Sunucuyu başlat**’a dokun.

**Komut satırı:** bilgisayarına uygun indirmeyi aç ve bir dünya oluştur. Sunucu hemen başlar:

```sh
# Linux / macOS, in the unpacked folder
./blockheads_server --new MYWORLD
# Windows (PowerShell)
.\blockheads_server.exe --new MYWORLD
```

![Blockheads Server masaüstü uygulaması, “Dünya oluştur” penceresi: dünya adı, 1/16× ile 16× arası dünya boyutu, uzman modu anahtarı ve oluşturma düğmesi.](/shots/tr/server/worlds-create.webp)

*Bir dünya oluştur: ad, boyut ve istersen uzman modu.*

::: tip
Komut satırı sunucusunu `/stop` ile durdur. Ctrl + C son kaydı yapmadan kapatır.
:::

## 2. Güvenlik duvarından geçir

Sunucu **UDP 15151** portunu kullanır. Windows Güvenlik Duvarı sorduğunda **özel ağlarda** erişime izin ver. Başka sistemlerde güvenlik duvarı kullanıyorsan 15151’e gelen UDP trafiğine izin ver.

## 3. Sunucunun adresini bul

Masaüstü uygulamasında **Panel**’deki **Telefondan bağlan** kartı **Yerel ağ adresi**ni, portu ve bir QR kodu gösterir. Adresi kopyalamak için kodu telefon kamerasıyla tara.

Komut satırında bilgisayarının yerel IP adresini ağ ayarlarından bul, örneğin `192.168.1.42`.

![Çalışan sunucunun paneli: durum Çalışıyor, 2 çevrimiçi oyuncu, çalışma süresi ve geçerli dünya “Sunny Isle”; QR kodu, 192.168.1.42 LAN adresi ve 15151 portu olan telefondan bağlanma kartı.](/shots/tr/server/dashboard.webp)

*Panel LAN adresini, portu ve bir QR kodu gösterir.*

## 4. Oyundan katıl

Her telefonda oyunu aç ve şuraya git:

- **Join World** → **Advanced...** → **Online IP/Port...**
- Adresi ve portu gir (alanda zaten `15151` yazar)
- **Join Online World**’e dokun

::: tip
Sunucunun parolası varsa oyun onu sorar.
:::

## Bir şeyler ters giderse

- **Kimse bağlanamıyor** — telefonların aynı Wi-Fi ağında (misafir ağında değil) olduğunu ve güvenlik duvarının UDP 15151’e izin verdiğini kontrol et.
- **Bir arkadaşın reddediliyor** — beyaz listede isim varsa yalnızca o isimler katılabilir. Bkz. [Yöneticiler, moderatörler ve yasaklar](./admins-mods).
- Hâlâ takıldın mı? [GitHub’da sorun bildir](https://github.com/Blockheads-Club/blockheads-server/issues) ve sunucu logunu ekle.
