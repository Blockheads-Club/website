# Sahip olduğun oyunun APK’sını al

Web ve masaüstü Patcher oyunu bir `.apk` dosyası olarak ister. Android’de bu rehberi genellikle atlayabilirsin.

::: info Nelere ihtiyacın var
- Android telefonunda kurulu The Blockheads
- Bilgisayarla yapacaksan: bir USB kablosu ve Android’in `adb` aracı
:::

## 1. Android’de misin? Yüklü oyunu kullan

Android için Blockheads Patcher uygulaması telefonundaki oyunu bulur. **Yüklü oyunu kullan**’a dokun — dosya gerekmez. Elinde zaten bir dosya varsa **APK dosyası seç**’e dokun.

## 2. Oyunu bilgisayara kopyala

Telefonda USB hata ayıklamayı aç, telefonu bağla ve Android’e oyunun nerede olduğunu sor. Ardından o dosyayı kopyala:

```sh
adb shell pm path com.noodlecake.blockheads
# package:/data/app/…/base.apk
adb pull /data/app/…/base.apk blockheads.apk
```

::: warning
İlk komut **birden fazla** satır yazarsa oyun birden çok APK dosyasına bölünmüştür. Patcher bunları güvenle yamalayamaz — tam (evrensel) bir APK gerekir.
:::

## 3. Patcher’da aç

[Web Patcher](https://blockheads.club/patcher/)’ı ya da masaüstü uygulamasını aç ve dosyayı bırak. **Yalnızca .apk dosyaları** kabul edilir. Hiçbir şey internete yüklenmez.

![Masaüstü Patcher, “Oyununu seç” adımı: The Blockheads APK dosyası için bırakma alanı ve dosyaya göz atma düğmesi.](/shots/tr/patcher/choose.webp)

*.apk dosyasını bırak ya da seç.*

::: tip
Yalnızca kendi kopyanı kullan ve APK’yı başkalarıyla paylaşma.
:::

## Bir şeyler ters giderse

- **“Telefonundan kaydettiğin The Blockheads .apk dosyasını seç.”** — dosya başka bir uygulama.
- **“Yüklü oyun birden çok APK dosyasına bölünmüş…”** — bunun yerine tam (evrensel) bir APK kullan.
- Sonraki adım: [Oyunu telefonunda düzelt](./fix-game-on-phone).
