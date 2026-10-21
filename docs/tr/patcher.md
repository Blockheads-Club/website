# Patcher

**Blockheads Patcher**, The Blockheads’in Android için kendi kopyandaki hataları düzeltir; böylece oyun modern
telefonlarda iyi çalışır. Örneğin Android 10 ve üstünde bir sunucuya katılırken oyunun "WELCOME TO …!" penceresinde
donmasını önler.

Her şey cihazında olur. Hiçbir şey internete yüklenmez ve hiçbir oyun dosyası indirilmez.

## Nerede çalışır

| Nerede | Nasıl |
| --- | --- |
| **Web** | [Web Patcher](https://blockheads.club/patcher/)’ı tarayıcında aç. Bir kez yüklendikten sonra çevrimdışı da çalışır. |
| **Windows** | [Sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-patcher/releases) `_x64-setup.exe` veya `.msi` |
| **macOS** | `_universal.dmg` (Intel ve Apple Silicon) |
| **Linux** | `.AppImage` veya `.deb` |
| **Android** | Çoğu telefon için `android-arm64.apk` (eski 32 bit telefonlar için `android-arm.apk`, emülatörler için `android-x86_64.apk`) |

Android’de Patcher, telefonunda zaten yüklü olan oyunu okuyabilir; APK’yı kendin bulman gerekmez.

![Android’de Blockheads Patcher: “Bu telefonda bulundu” kartında The Blockheads 1.7.4 ve “Yüklü oyunu kullan” düğmesi; altında APK dosyası seçme düğmesi.](/shots/tr/patcher/phone-choose.webp)

*Android’de Patcher kurulu oyunu bulur.*

## Nasıl yamalanır

1. **Seç**: APK’yı (1.7.4, 1.7.5 veya 1.7.6 sürümü) sürükleyip bırak ya da seç. Android’de **Yüklü oyunu kullan**’a
   dokun.
2. **İncele**: sürümünün ihtiyaç duyduğu düzeltmeler zaten işaretlidir; istediğinin işaretini kaldırabilirsin.
3. **Yamala**: asıl dosyan değişmez.
4. **Kaydet**: yamalanmış APK’yı kaydet (web ve masaüstü).
5. **Kur**: telefonuna yükle:
   - Önce dünyalarını oyunun içinden yedekle.
   - Asıl oyunu kaldır. Yamalanmış oyun farklı bir anahtarla imzalandığı için Android onu üzerine kuramaz.
     **Telefonda kayıtlı dünyalar oyunla birlikte silinir.**
   - Yamalanmış APK’yı açarak kur. Android sorarsa bu kaynaktan yüklemeye izin ver.

![Blockheads Patcher, 1. adım “Oyununu seç”: oyunun APK dosyası için bırakma alanı ve dosya seçme düğmesi.](/shots/tr/patcher/choose.webp)

*1. adım: APK’nı seç.*

![Blockheads Patcher, 2. adım “Düzeltmeleri gözden geçir”: solda algılanan 1.7.4 oyununun ayrıntıları, sağda önerilen ve uyumlu etiketli yama listesi ve oyunu yamalama düğmesi.](/shots/tr/patcher/review.webp)

*2. adım: sürümünün ihtiyaç duyduğu düzeltmeler zaten işaretli.*

![Blockheads Patcher, oyun düzeltildi ekranı: blockheads-1.7.4-patched.apk dosyası, yamalı APK’yı kaydetme düğmesi ve telefona kurmak için sonraki adımlar.](/shots/tr/patcher/done.webp)

*3–4. adım: yamalı APK’yı kaydet, sonra kur.*

Android’de Patcher’da iki adım için de düğme vardır: önce **Orijinali kaldır**, sonra **Düzeltilmiş oyunu kur**.

::: tip İmza anahtarını sakla
Patcher ilk seferde senin için bir imza anahtarı oluşturur. **İmza anahtarları** bölümünden dışa aktarıp güvenli
bir yerde sakla. Daha sonra aynı anahtarla yeniden yamalarsan güncelleme yamalı oyununun üzerine kurulur ve
dünyaların korunur.
:::

![Blockheads Patcher “İmza anahtarları” ekranı: SHA-256 parmak izli anahtar ve parola belirleyerek yedeği dışa aktarma formu.](/shots/tr/patcher/keys-export.webp)

*Anahtarlar → Yedeği dışa aktar… anahtarını parolalı bir dosyaya kaydeder.*

## Önerilen yamalar

Bu düzeltmeler, sürümün ihtiyaç duyduğunda varsayılan olarak işaretlidir:

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
- **Uyarlanabilir başlatıcı simgesi** – simge diğer uygulamalarınla aynı biçimi alır.

Bazı yamalar deneysel olduğu ya da az cihazda denendiği için **varsayılan olarak kapalıdır**; örneğin oyun kolu
desteği, tablet düzeni ve "eski Android sürümü" uyarısını kaldırma. Uygulamadaki her yamanın neyi değiştirdiğini
anlatan kısa bir açıklaması vardır.

## Yama paketlerini içe aktarma

Ek yamalar **yama paketleri** (`.bhpack` dosyaları) olarak gelebilir.

1. **Ayarlar → İçe aktarılan yama paketleri**’ni aç.
2. **Paket içe aktar**’a tıklayıp dosyayı seç (dosyayı oraya sürükleyip de bırakabilirsin).
3. Paketteki yamalar, yama listesinde **Paket** etiketiyle görünür. Hiçbir zaman varsayılan olarak işaretli değildir.

![Blockheads Patcher ayarları, içe aktarılan yama paketleri: paketlerin başkalarından geldiği uyarısı, paket içe aktarma düğmesi ve kaldırma düğmeli örnek bir paket.](/shots/tr/patcher/packs.webp)

*Ayarlar → İçe aktarılan yama paketleri.*

Bir paketi kaldırmak için Ayarlar’da yanındaki kaldır düğmesini kullan.

::: warning Yalnızca güvendiğin kişilerin paketlerini içe aktar
Paket bir program değil, veridir: Patcher paketten asla kod çalıştırmaz. Yine de paket oyununu değiştirir;
bu yüzden yalnızca güvendiğin kişilerin paketlerini kullan.
:::
