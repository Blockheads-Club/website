# PC Sürümü

**Blockheads PC**, Android oyununun kendi kopyanızı bilgisayarınızda çalıştırır. Windows, macOS ve Linux’ta, hem
normal (x86_64) hem de ARM (arm64) bilgisayarlarda çalışır.

::: warning Erken sürüm
PC Sürümü yeni. Oyunun büyük kısmı çalışıyor ama bazı pürüzler olabilir. Bulduğunuz sorunları lütfen
[bildirin](https://github.com/Blockheads-Club/blockheads-pc/issues).
:::

## İndirme ve kurulum {#download-and-install}

En son sürümü [sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-pc/releases) indirin.
Sisteminize uygun dosyayı seçin:

| Sistem | Dosya |
| --- | --- |
| Linux | `.AppImage`, `.deb` veya `.rpm` (`amd64`/`x86_64` ya da `arm64`/`aarch64`) |
| Windows | `_x64-setup.exe` veya `_x64_en-US.msi` (ARM bilgisayarlar için `arm64`) |
| macOS (Intel) | `_x64.dmg` |
| macOS (Apple Silicon) | `_aarch64.dmg` |

### Linux

- **AppImage** (her dağıtımda): çalıştırılabilir yapın ve açın.
  ```sh
  chmod +x Blockheads*.AppImage
  ./Blockheads*.AppImage
  ```
- **Debian, Ubuntu**: `sudo apt install ./Blockheads*.deb`
- **Fedora, openSUSE**: `sudo dnf install ./Blockheads*.rpm`

### Windows

`setup.exe` dosyasını (yalnızca sizin kullanıcınız için kurar, yönetici izni gerekmez) ya da `.msi` dosyasını
çalıştırın.

::: tip "Windows bilgisayarınızı korudu"
Yükleyici henüz kod imzalı değil, bu yüzden SmartScreen uyarı verebilir. **Ek bilgi**’ye, ardından **Yine de çalıştır**’a
tıklayın.
:::

### macOS

`.dmg` dosyasını açın, lisansı kabul edin ve **Blockheads PC**’yi **Uygulamalar** klasörüne sürükleyin.

::: tip "Blockheads PC açılamıyor"
Uygulama Apple tarafından onaylanmış (notarize) değil. İlk seferde uygulamaya **sağ tıklayıp** **Aç**’ı seçin. Ya da
**Sistem Ayarları → Gizlilik ve Güvenlik**’e gidip **Yine de Aç**’a tıklayın.
:::

## İlk açılış: oyun dosyanız

Blockheads PC’yi ilk kez açtığınızda kısa bir kurulum size yol gösterir:

1. **Hoş geldin** – oyuna sahip olduğunuzu ve yalnızca kendi kopyanızı kullanacağınızı onaylayın.
2. **Oyun dosyası** – APK’nızı seçin ya da sürükleyip bırakın.
3. **Pencere ve grafik** – pencere boyutu ve görüntü seçenekleri.
4. **Kontroller** – fare ve klavye tuşlarına göz atın.
5. **Kayıtları aktar** – isteğe bağlı: oyunun kayıt klasörünü telefonunuzdan (ya da bir zip yedeğini) kopyalayıp
   burada seçin.
6. **Hazır** – bir özet. **Oyna**’ya basın.

Hepsini daha sonra **Ayarlar**’dan değiştirebilirsiniz.

### Kendi APK’nız

Blockheads PC’nin, sahip olduğunuz The Blockheads’in APK’sına ihtiyacı var: **1.7.4, 1.7.5 veya 1.7.6** sürümü.
Dosyayı telefonunuzdan bilgisayarınıza kopyalayın, sonra kurulumda seçin. Oyunu asla indirmeyiz ve paylaşmayız.

- **Veri klasöründe özel bir kopya tut** seçeneğini açık bırakın (önerilir). Böylece asıl dosyayı taşısanız ya da
  silseniz de oyun çalışmaya devam eder.
- Başka sürümleri ya da değiştirilmiş APK’ları **Gelişmiş → Bilinmeyen sürümlere izin ver** ile deneyebilirsiniz.
  Açılmayabilirler.

## Ayarlar

| Bölüm | Neleri değiştirebilirsiniz |
| --- | --- |
| **Oyun ve veri** | Oyun dosyanız ve dünyalarınızın bulunduğu veri klasörü |
| **Pencere ve grafik** | Pencere boyutu veya tam ekran, dikey senkron, FPS sınırı, FPS sayacı, oyun arayüzü ölçeği, oyun hızı |
| **Kontroller** | Fare ve klavye atamaları, oyun kumandası, ekrandaki yön tuşları |
| **Ses** | Sesi açma ve kapatma (ses düzeyi oyunun içinden ayarlanır) |
| **Dil ve tema** | Dil, açık veya koyu tema |
| **Güncelleme ve hakkında** | Sürüm, güncellemeler ve lisanslar |

### Grafik ve FPS

- **Tam ekran**: Ayarlar’dan açın ya da oynarken **F11**’e basın.
- **Dikey senkron (VSync)**: yırtılma olmadan daha akıcı görüntü. Yalnızca oyun geç tepki veriyorsa kapatın.
- **FPS sınırı**: en yüksek kare hızı. Telefondaki oyun 30 FPS ile çalışır; daha yüksek bir sınır görüntüyü akıcı
  yapar ama oyunu hızlandırmaz. Düşük bir sınır enerji tasarrufu sağlar ve dizüstü bilgisayarları serin tutar.
- **FPS göster**: küçük bir kare hızı sayacı. Hangi köşede duracağını seçebilirsiniz.
- **Oyun arayüzü ölçeği**: oyundaki düğmeleri ve yazıları büyütür ya da küçültür.

### Oyun hızı

Dünyayı daha hızlı akıtır: yürüme, gece ve gündüz, ekinler, açlık ve diğer her şey. Yalnızca tek oyunculu oyunda
çalışır; çok oyunculu oyunlar her zaman normal hızda çalışır.

### Kontroller

Oyun dokunmatik ekran için yapıldı, bu yüzden fareniz parmağınızın yerini alır:

| Fare / tuş | Ne yapar |
| --- | --- |
| Sol tuş | Dokunma ve sürükleme (uzun basmak için basılı tutun) |
| Sağ tuşla sürükleme | Görünümü kaydırır |
| Fare tekerleği | Yakınlaştırır ve uzaklaştırır |
| Esc | Geri |
| F11 | Tam ekranı açar veya kapatır |
| H | Oyunun düğmelerini gizler veya gösterir |

Bunların hepsini **Ayarlar → Kontroller**’den değiştirebilir ya da varsayılanlara döndürebilirsiniz.

### Oyun kumandası

Bir oyun kumandasını istediğiniz zaman takın; ilk bağlanan oynar. Bir imleç, **A**’nın nereye dokunacağını gösterir.

| Tuş | Ne yapar |
| --- | --- |
| Sol çubuk | Yürür |
| Sağ çubuk | İmleci taşır |
| Yön tuşları | İmleci bir blok taşır, menülerde de |
| A | Dokunur; kazmak veya sürüklemek için basılı tutun |
| B | Geri |
| X | Oyunun düğmelerini gizler veya gösterir |
| Y | Sonraki yakınlaştırma düzeyi |
| LB / RB | Uzaklaştırır / yakınlaştırır |
| Start | Duraklatma menüsü |

İmlecin bloktan bloğa atlamasını isterseniz **Oyun kolu imlecini kare kare taşı** seçeneğini açın.

### Ekrandaki yön tuşları

Telefondaki oyun, bir dünyadayken ekrana ok tuşları çizer. PC’de bunlar gizlidir, çünkü fare, klavye ve kumanda
blockhead’inizi zaten hareket ettirir. Geri isterseniz **Oyunun ekrandaki yön tuşlarını göster** seçeneğini açın.

## Çevrimiçi oynama

Sunuculara telefondaki gibi katılabilirsiniz. Adresle katılmak için oyunda: **Join World → Advanced… → Online IP/Port…**,
adresi ve portu girin, ardından **Join Online World**. [Sunucu](/tr/server#connect-from-the-game) sayfasına bakın.

## Sorun giderme

- **İlk açılış yavaş.** Oyunun yüklenmesi birkaç saniye sürer, ilk seferde daha uzun. Bir yükleme ekranı ilerlemeyi
  gösterir.
- **"Bu The Blockheads değil" / "Bu sürüm desteklenmiyor".** The Blockheads’in 1.7.4, 1.7.5 veya 1.7.6 sürümünün
  APK’sını seçin.
- **"Dosya hasarlı".** Kopyalama tamamlanmamış. APK’yı telefonunuzdan yeniden kopyalayın.
- **"Oyun dosyanı bulamıyoruz".** Dosyayı taşıdınız ya da sildiniz ve özel kopya tutulmadı. Dosyayı yeniden seçin;
  dünyalarınız etkilenmez.
- **Oyun beklenmedik şekilde kapandı.** Bir günlük kaydedilir. Ana ekrandaki **GitHub’da bildir**’i kullanın ya da
  günlükleri **Günlükleri gör** ile açıp [hata bildiriminize](https://github.com/Blockheads-Club/blockheads-pc/issues)
  ekleyin.
- **Oyun yavaş.** Kalabalık sahneler telefondan daha yavaş çalışabilir. Ağır programları kapatın ve ekran kartı
  sürücülerinizi güncel tutun.
- **Windows veya macOS uygulamayı engelliyor.** [İndirme ve kurulum](#download-and-install) bölümündeki ipuçlarına bakın.
- **Dünyalarım nerede?** Ana ekrandaki **Veri klasörünü aç**’ı kullanın.
