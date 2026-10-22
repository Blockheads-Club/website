# İmza anahtarını güvende tut

Yamaladığın her oyun yalnızca cihazında duran bir anahtarla imzalanır. Bir yedeğini saklarsan gelecekteki düzeltmeler kaldırmadan kurulur.

::: info Nelere ihtiyacın var
- Blockheads Patcher (web, masaüstü ya da Android)
- Küçük bir dosya için güvenli bir yer ve hatırlayacağın bir parola
:::

## 1. Anahtarın ne işe yaradığını bil

Patcher anahtarı ilk yamalamada oluşturur. Android, düzeltilmiş oyununun üzerine bir güncellemeyi yalnızca **ikisi de aynı anahtarla imzalanmışsa** kurar. Yeni anahtar, yeniden kaldırmak demektir — yedeklemediysen yerel dünyaları kaybedersin.

::: warning
**Gizli tut.** Anahtarına sahip olan biri, oyununun güncellemesi gibi görünen uygulamalar yapabilir.
:::

## 2. Bir yedek dışa aktar

**İmza anahtarları**’nı aç ve **Yedeği dışa aktar…**’ı seç. Bir parola belirle, tekrarla ve **Yedeği kaydet**’e dokun. Varsayılan adı `blockheads-patcher-key.json` olan bir `.json` dosyası alırsın.

![Patcher “Anahtarlar” ekranı: SHA-256 parmak izli “Anahtarım” imza anahtarı ve parola ile parola tekrarı alanları ve “Yedeği kaydet” düğmesi olan açık yedek dışa aktarma formu.](/shots/tr/patcher/keys-export.webp)

*İmza anahtarının parolalı bir yedeğini dışa aktar.*

::: tip
Parolayı kurtaramayız, bu yüzden bir yere yaz. Parola olmadan dosya şifrelenmez ve dosyaya sahip olan herkes senin adına uygulama imzalayabilir.
:::

## 3. Başka bir cihaza taşı

Yeni cihazda **İmza anahtarları**’nı aç, **Anahtarı içe aktar**’ı seç ve `.json` dosyasını seç. Yedek parolasını gir, ardından **Bu anahtarı kullan**’a dokun.

Aynı anahtar olduğundan emin olmak için iki cihazda parmak izinin ilk ve son dört çiftini karşılaştır.

## 4. Anahtar kaybolursa

Yedeğin yoksa o anahtarla yamalanmış oyunları güncelleyemezsin. Dünyalarını yedekle, düzeltilmiş oyunu kaldır ve yeni bir anahtarla yeniden yamala. [Dünyalar nasıl yedeklenir](./backup-worlds)

## Bir şeyler ters giderse

- Web Patcher anahtarı tarayıcının bu siteye ait depolamasında tutar. Sitenin verilerini temizlemek onu siler — önce bir yedek al.
- İçe aktarma yalnızca Patcher’ın dışa aktardığı `.json` yedeklerini kabul eder.
- Soracağın bir şey mi var? [GitHub’da sorabilirsin](https://github.com/Blockheads-Club/blockheads-patcher/issues).
