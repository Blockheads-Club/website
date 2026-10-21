# Patcher

**Blockheads Patcher**, The Blockheads’in Android için kendi kopyanızdaki hataları düzeltir; böylece oyun modern
telefonlarda iyi çalışır. Örneğin Android 10 ve üstünde bir sunucuya katılırken oyunun "WELCOME TO …!" penceresinde
donmasını önler.

Her şey cihazınızda olur. Hiçbir şey internete yüklenmez ve hiçbir oyun dosyası indirilmez.

## Nerede çalışır

| Nerede | Nasıl |
| --- | --- |
| **Web** | [Web Patcher](https://blockheads.club/patcher/)’ı tarayıcınızda açın. Bir kez yüklendikten sonra çevrimdışı da çalışır. |
| **Windows** | [Sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-patcher/releases) `_x64-setup.exe` veya `.msi` |
| **macOS** | `_universal.dmg` (Intel ve Apple Silicon) |
| **Linux** | `.AppImage` veya `.deb` |
| **Android** | Çoğu telefon için `android-arm64.apk` (eski 32 bit telefonlar için `android-arm.apk`, emülatörler için `android-x86_64.apk`) |

Android’de Patcher, telefonunuzda zaten yüklü olan oyunu okuyabilir; APK’yı kendiniz bulmanız gerekmez.

![Android’de Blockheads Patcher: “Bu telefonda bulundu” kartında The Blockheads 1.7.4 ve “Yüklü oyunu kullan” düğmesi; altında APK dosyası seçme düğmesi.](/shots/tr/patcher/phone-choose.webp)

*Android’de Patcher kurulu oyunu bulur.*

## Nasıl yamalanır

1. **Seç**: APK’yı (1.7.4, 1.7.5 veya 1.7.6 sürümü) sürükleyip bırakın ya da seçin. Android’de **Yüklü oyunu kullan**’a
   dokunun.
2. **İncele**: sürümünüzün ihtiyaç duyduğu düzeltmeler zaten işaretlidir; istediğinizin işaretini kaldırabilirsiniz.
3. **Yamala**: asıl dosyanız değişmez.
4. **Kaydet**: yamalanmış APK’yı kaydedin (web ve masaüstü).
5. **Kur**: telefonunuza yükleyin:
   - Önce dünyalarınızı oyunun içinden yedekleyin.
   - Asıl oyunu kaldırın. Yamalanmış oyun farklı bir anahtarla imzalandığı için Android onu üzerine kuramaz.
     **Telefonda kayıtlı dünyalar oyunla birlikte silinir.**
   - Yamalanmış APK’yı açarak kurun. Android sorarsa bu kaynaktan yüklemeye izin verin.

![Blockheads Patcher, 1. adım “Oyununuzu seçin”: oyunun APK dosyası için bırakma alanı ve dosya seçme düğmesi.](/shots/tr/patcher/choose.webp)

*1. adım: APK’nızı seçin.*

![Blockheads Patcher, 2. adım “Düzeltmeleri gözden geçirin”: solda algılanan 1.7.4 oyununun ayrıntıları, sağda önerilen ve uyumlu etiketli yama listesi ve oyunu yamalama düğmesi.](/shots/tr/patcher/review.webp)

*2. adım: sürümünüzün ihtiyaç duyduğu düzeltmeler zaten işaretli.*

![Blockheads Patcher, oyun düzeltildi ekranı: blockheads-1.7.4-patched.apk dosyası, yamalı APK’yı kaydetme düğmesi ve telefona kurmak için sonraki adımlar.](/shots/tr/patcher/done.webp)

*3–4. adım: yamalı APK’yı kaydedin, sonra kurun.*

Android’de Patcher’da iki adım için de düğme vardır: önce **Orijinali kaldır**, sonra **Düzeltilmiş oyunu kur**.

::: tip İmza anahtarınızı saklayın
Patcher ilk seferde sizin için bir imza anahtarı oluşturur. **İmza anahtarları** bölümünden dışa aktarıp güvenli
bir yerde saklayın. Daha sonra aynı anahtarla yeniden yamalarsanız güncelleme yamalı oyununuzun üzerine kurulur ve
dünyalarınız korunur.
:::

![Blockheads Patcher “İmza anahtarları” ekranı: SHA-256 parmak izli anahtar ve parola belirleyerek yedeği dışa aktarma formu.](/shots/tr/patcher/keys-export.webp)

*Anahtarlar → Yedeği dışa aktar… anahtarınızı parolalı bir dosyaya kaydeder.*

## Önerilen yamalar

Bu düzeltmeler, sürümünüz ihtiyaç duyduğunda varsayılan olarak işaretlidir:

- **Karşılama penceresindeki donmayı düzelt** – oyun modern Android’de ilk pencerede takılmaz.
- **Eksik sistem yazı tiplerinden kaynaklanan çökmeleri düzelt** – yeni Android’de mağazada ve dünyalarda çökme olmaz.
- **Oyun arka plana geçerken oluşan donmaları düzelt** – ana ekrandan, paylaşım menüsünden ya da fotoğraf seçiciden
  geri dönmek sorunsuz çalışır.
- **Ekran değişince oyunun kapanmasını düzelt** – telefonu katlama, bölünmüş ekran, yazı boyutu veya koyu mod.
- **Web sayfası çökünce oyunun kapanmasını düzelt** – haberler, karşılama ve mağaza sayfaları oyunu kapatamaz.
- **Klavye yardımcı sayfasındaki donmayı düzelt.**
- **Ses kodundaki açılış takılmasını düzelt** – oyun açılırken yaşanan kısa donmayı giderir.
- **Yerel ağ (LAN) dünyalarını düzelt** – Wi-Fi dünyaları bulunabilir ve onlara katılınabilir.
- **Katılma bağlantılarını düzelt** – `blockheads://` ve katılma bağlantıları oyunu açar.
- **Davet e-postalarında kesilen bağlantıyı düzelt** ve davet e-postasındaki yazım hatasını düzelt.
- **Karşılama mesajlarında harfleri ve satır sonlarını koru** – Türkçe karakterler gibi özel harfler doğru görünür.
- **Tabelalarda küçük harf kullanımına izin ver.**
- **Yanlış "Gizlilik Ayarı Değişti" uyarısını kaldır.**
- **Daha iyi tam ekran** – durum ve gezinme çubukları gizli kalır.
- **Oyunun katlanabilir ve büyük ekranları doldurmasına izin ver.**
- **Müzik**: uygulama değiştirince müziği sürdür, ana menü müziğini döngüye al ve başka uygulamalar ses çalarken oyun
  müziğini çal.
- **Menüde seçili dünyayı koru.**
- **Oyun sesiyle ekran kaydına izin ver** ve **kaldırırken oyun verisini saklamayı öner** (Android 10 ve üstü).
- **Uyarlanabilir başlatıcı simgesi** – simge diğer uygulamalarınızla aynı biçimi alır.

Bazı yamalar deneysel olduğu ya da az cihazda denendiği için **varsayılan olarak kapalıdır**; örneğin oyun kolu
desteği, tablet düzeni ve "eski Android sürümü" uyarısını kaldırma. Uygulamadaki her yamanın neyi değiştirdiğini
anlatan kısa bir açıklaması vardır.

## Yama paketlerini içe aktarma

Ek yamalar **yama paketleri** (`.bhpack` dosyaları) olarak gelebilir.

1. **Ayarlar → İçe aktarılan yama paketleri**’ni açın.
2. **Paket içe aktar**’a tıklayıp dosyayı seçin (dosyayı oraya sürükleyip de bırakabilirsiniz).
3. Paketteki yamalar, yama listesinde **Paket** etiketiyle görünür. Hiçbir zaman varsayılan olarak işaretli değildir.

![Blockheads Patcher ayarları, içe aktarılan yama paketleri: paketlerin başkalarından geldiği uyarısı, paket içe aktarma düğmesi ve kaldırma düğmeli örnek bir paket.](/shots/tr/patcher/packs.webp)

*Ayarlar → İçe aktarılan yama paketleri.*

Bir paketi kaldırmak için Ayarlar’da yanındaki kaldır düğmesini kullanın.

::: warning Yalnızca güvendiğiniz kişilerin paketlerini içe aktarın
Paket bir program değil, veridir: Patcher paketten asla kod çalıştırmaz. Yine de paket oyununuzu değiştirir;
bu yüzden yalnızca güvendiğiniz kişilerin paketlerini kullanın.
:::
