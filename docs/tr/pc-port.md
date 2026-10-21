# PC Sürümü

**Blockheads PC**, Android oyununun kendi kopyanı bilgisayarında çalıştırır. Windows, macOS ve Linux’ta, hem
normal (x86_64) hem de ARM (arm64) bilgisayarlarda çalışır.

::: warning Erken sürüm
PC Sürümü yeni. Oyunun büyük kısmı çalışıyor ama bazı pürüzler olabilir. Bulduğun sorunları lütfen
[bildir](https://github.com/Blockheads-Club/blockheads-pc/issues).
:::

## İndirme ve kurulum {#download-and-install}

En son sürümü [sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-pc/releases) indir.
Sistemine uygun dosyayı seç:

| Sistem | Dosya |
| --- | --- |
| Linux | `.AppImage`, `.deb` veya `.rpm` (`amd64`/`x86_64` ya da `arm64`/`aarch64`) |
| Windows | `_x64-setup.exe` veya `_x64_en-US.msi` (ARM bilgisayarlar için `arm64`) |
| macOS (Intel) | `_x64.dmg` |
| macOS (Apple Silicon) | `_aarch64.dmg` |

### Linux

- **AppImage** (her dağıtımda): çalıştırılabilir yap ve aç.
  ```sh
  chmod +x Blockheads*.AppImage
  ./Blockheads*.AppImage
  ```
- **Debian, Ubuntu**: `sudo apt install ./Blockheads*.deb`
- **Fedora, openSUSE**: `sudo dnf install ./Blockheads*.rpm`

### Windows

`setup.exe` dosyasını (yalnızca senin kullanıcın için kurar, yönetici izni gerekmez) ya da `.msi` dosyasını
çalıştır.

::: tip "Windows bilgisayarınızı korudu"
Yükleyici henüz kod imzalı değil, bu yüzden SmartScreen uyarı verebilir. **Ek bilgi**’ye, ardından **Yine de çalıştır**’a
tıkla.
:::

### macOS

`.dmg` dosyasını aç, lisansı kabul et ve **Blockheads PC**’yi **Uygulamalar** klasörüne sürükle.

::: tip "Blockheads PC açılamıyor"
Uygulama Apple tarafından onaylanmış (notarize) değil. İlk seferde uygulamaya **sağ tıklayıp** **Aç**’ı seç. Ya da
**Sistem Ayarları → Gizlilik ve Güvenlik**’e gidip **Yine de Aç**’a tıkla.
:::

## İlk açılış: oyun dosyan

Blockheads PC’yi ilk kez açtığında kısa bir kurulum sana yol gösterir:

1. **Hoş geldin** – oyuna sahip olduğunu ve yalnızca kendi kopyanı kullanacağını onayla.
2. **Oyun dosyası** – APK’nı seç ya da sürükleyip bırak.
3. **Pencere ve grafik** – pencere boyutu ve görüntü seçenekleri.
4. **Kontroller** – fare ve klavye tuşlarına göz at.
5. **Kayıtları aktar** – isteğe bağlı: oyunun kayıt klasörünü telefonundan (ya da bir zip yedeğini) kopyalayıp
   burada seç.
6. **Hazır** – bir özet. **Oyna**’ya bas.

![Blockheads PC kurulumu, 6 adımın 2.si “Oyun dosyanı seç”: The Blockheads 1.7.6 seçilmiş ve desteklendiği gösteriliyor; veri klasöründe özel kopya tutma seçeneği açık.](/shots/tr/pc/setup-2-apk.webp)

*Kurulumun 2. adımı: kendi APK’nı seç. Başlatıcı sürümü denetler.*

Hepsini daha sonra **Ayarlar**’dan değiştirebilirsin.

### Kendi APK’n

Blockheads PC’nin, sahip olduğun The Blockheads’in APK’sına ihtiyacı var: **1.7.4, 1.7.5 veya 1.7.6** sürümü.
Dosyayı telefonundan bilgisayarına kopyala, sonra kurulumda seç. Oyunu asla indirmeyiz ve paylaşmayız.

- **Veri klasöründe özel bir kopya tut** seçeneğini açık bırak (önerilir). Böylece asıl dosyayı taşısan ya da
  silsen de oyun çalışmaya devam eder.
- Başka sürümleri ya da değiştirilmiş APK’ları **Gelişmiş → Bilinmeyen sürümlere izin ver** ile deneyebilirsin.
  Açılmayabilirler.

![Blockheads PC ana ekranı: The Blockheads 1.7.6 için büyük Oyna düğmesi; oyun dosyasını değiştirme, kayıtları aktarma, veri klasörünü açma, günlükleri görme ve sunucuya katılmayı öğrenme düğmeleri.](/shots/tr/pc/home.webp)

*Kurulumdan sonra ana ekran.*

## Ayarlar

| Bölüm | Neleri değiştirebilirsin |
| --- | --- |
| **Oyun ve veri** | Oyun dosyan ve dünyalarının bulunduğu veri klasörü |
| **Pencere ve grafik** | Pencere boyutu veya tam ekran, dikey senkron, FPS sınırı, FPS sayacı, oyun arayüzü ölçeği, oyun hızı |
| **Kontroller** | Fare ve klavye atamaları, oyun kolu, ekrandaki yön tuşları |
| **Ses** | Sesi açma ve kapatma (ses düzeyi oyunun içinden ayarlanır) |
| **Dil ve tema** | Dil, açık veya koyu tema |
| **Güncelleme ve hakkında** | Sürüm, güncellemeler ve lisanslar |

### Grafik ve FPS

![Blockheads PC ayarları, Pencere ve grafik: pencere ya da tam ekran, 1600 × 900 pencere boyutu, VSync açık, 60 FPS sınırı, FPS gösterme ve oyun hızı.](/shots/tr/pc/settings-graphics.webp)

*Ayarlar → Pencere ve grafik.*

- **Tam ekran**: Ayarlar’dan aç ya da oynarken **F11**’e bas.
- **Dikey senkron (VSync)**: yırtılma olmadan daha akıcı görüntü. Yalnızca oyun geç tepki veriyorsa kapat.
- **FPS sınırı**: en yüksek kare hızı. Telefondaki oyun 30 FPS ile çalışır; daha yüksek bir sınır görüntüyü akıcı
  yapar ama oyunu hızlandırmaz. Düşük bir sınır enerji tasarrufu sağlar ve dizüstü bilgisayarları serin tutar.
- **FPS göster**: küçük bir kare hızı sayacı. Hangi köşede duracağını seçebilirsin.
- **Oyun arayüzü ölçeği**: oyundaki düğmeleri ve yazıları büyütür ya da küçültür.

### Oyun hızı

Dünyayı daha hızlı akıtır: yürüme, gece ve gündüz, ekinler, açlık ve diğer her şey. Yalnızca tek oyunculu oyunda
çalışır; çok oyunculu oyunlar her zaman normal hızda çalışır.

### Kontroller

![Blockheads PC ayarları, Kontroller: oyunun ekrandaki yön tuşları anahtarı ve dokun-sürükle, kaydır, yakınlaştır, sıkıştır, geri fare atamaları; her birinde Değiştir düğmesi.](/shots/tr/pc/settings-controls.webp)

*Ayarlar → Kontroller: istediğin atamayı değiştir.*

Oyun dokunmatik ekran için yapıldı, bu yüzden faren parmağının yerini alır:

| Fare / tuş | Ne yapar |
| --- | --- |
| Sol tuş | Dokunma ve sürükleme (uzun basmak için basılı tut) |
| Sağ tuşla sürükleme | Görünümü kaydırır |
| Fare tekerleği | Yakınlaştırır ve uzaklaştırır |
| Esc | Geri |
| F11 | Tam ekranı açar veya kapatır |
| H | Oyunun düğmelerini gizler veya gösterir |

Bunların hepsini **Ayarlar → Kontroller**’den değiştirebilir ya da varsayılanlara döndürebilirsin.

### Oyun kolu

![Blockheads PC ayarları, Oyun kolu: oyun kolu kullanma ve imleci kare kare taşıma anahtarları, oyun kolu düğmeleri ve görevleri tablosu.](/shots/tr/pc/settings-controller.webp)

*Oyun kolu bölümü her düğmenin ne yaptığını gösterir.*

Bir oyun kolunu istediğin zaman tak; ilk bağlanan oynar. Bir imleç, **A**’nın nereye dokunacağını gösterir.

| Tuş | Ne yapar |
| --- | --- |
| Sol çubuk | Yürür |
| Sağ çubuk | İmleci taşır |
| Yön tuşları | İmleci bir blok taşır, menülerde de |
| A | Dokunur; kazmak veya sürüklemek için basılı tut |
| B | Geri |
| X | Oyunun düğmelerini gizler veya gösterir |
| Y | Sonraki yakınlaştırma düzeyi |
| LB / RB | Uzaklaştırır / yakınlaştırır |
| Start | Duraklatma menüsü |

İmlecin bloktan bloğa atlamasını istersen **Oyun kolu imlecini kare kare taşı** seçeneğini aç.

### Ekrandaki yön tuşları

Telefondaki oyun, bir dünyadayken ekrana ok tuşları çizer. PC’de bunlar gizlidir, çünkü fare, klavye ve oyun kolu
blockhead’ini zaten hareket ettirir. Geri istersen **Oyunun ekrandaki yön tuşlarını göster** seçeneğini aç.

## Çevrimiçi oynama

Sunuculara telefondaki gibi katılabilirsin. Adresle katılmak için oyunda: **Join World → Advanced… → Online IP/Port…**,
adresi ve portu gir, ardından **Join Online World**. [Sunucu](/tr/server#connect-from-the-game) sayfasına bak.

## Sorun giderme

- **İlk açılış yavaş.** Oyunun yüklenmesi birkaç saniye sürer, ilk seferde daha uzun. Bir yükleme ekranı ilerlemeyi
  gösterir.
- **"Bu The Blockheads değil" / "Bu sürüm desteklenmiyor".** The Blockheads’in 1.7.4, 1.7.5 veya 1.7.6 sürümünün
  APK’sını seç.
- **"Dosya hasarlı".** Kopyalama tamamlanmamış. APK’yı telefonundan yeniden kopyala.
- **"Oyun dosyanı bulamıyoruz".** Dosyayı taşıdın ya da sildin ve özel kopya tutulmadı. Dosyayı yeniden seç;
  dünyaların etkilenmez.
- **Oyun beklenmedik şekilde kapandı.** Bir log dosyası kaydedilir. Ana ekrandaki **GitHub’da bildir**’i kullan ya da
  günlükleri **Günlükleri gör** ile açıp [hata bildirimine](https://github.com/Blockheads-Club/blockheads-pc/issues)
  ekle.
- **Oyun yavaş.** Kalabalık sahneler telefondan daha yavaş çalışabilir. Ağır programları kapat ve ekran kartı
  sürücülerini güncel tut.
- **Windows veya macOS uygulamayı engelliyor.** [İndirme ve kurulum](#download-and-install) bölümündeki ipuçlarına bak.
- **Dünyalarım nerede?** Ana ekrandaki **Veri klasörünü aç**’ı kullan.
