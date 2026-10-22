# Sunucunu internete aç

Evinin dışındaki arkadaşların da dünyana katılsın. Önce sunucuyu kilitleyecek, sonra modeminde tek bir portu yönlendireceksin.

::: info Nelere ihtiyacın var
- Wi-Fi ağında zaten çalışan bir sunucu ([yerel ağ rehberi](./lan-play))
- Modeminin arayüzüne erişim
:::

## 1. Önce sunucuyu kilitle

Bir **parola** belirle: uygulamada **Ayarlar** → **Parola** (en çok 15 karakter) ya da konsolda `/set-password` ile.

Ya da isim ekleyerek **beyaz liste**yi aç: uygulamada **Erişim listeleri** → **Beyaz liste** ya da `/whitelist` ile. Beyaz listede isim olduğu anda yalnızca o oyuncular katılabilir.

```text
# in the server console
/set-password secret123
/whitelist friendname
```

![Sunucunun “Ayarlar” ekranı, bağlantı bölümü: port 15151, en çok oyuncu ve parola (en çok 15 karakter).](/shots/tr/server/settings.webp)

*Parola Ayarlar’daki bağlantı bölümündedir.*

## 2. Sunucuya sabit bir adres ver

Modeminde sunucu bilgisayarının yerel IP adresini ayır (genellikle DHCP rezervasyonu denir); böylece yeniden başlatınca değişmez.

## 3. Portu yönlendir

Modemin port yönlendirme sayfasında **UDP 15151**’i sunucu bilgisayarının yerel adresine yönlendir. Portu değiştirdiysen kendininkini kullan.

## 4. Genel adresini paylaş

Genel IP adresini öğren ve portla birlikte arkadaşlarına gönder. **Join World** → **Advanced...** → **Online IP/Port...** ile katılırlar.

::: warning
Genel IP’n kabaca nerede olduğunu gösterir. Yalnızca güvendiğin kişilerle paylaş.
:::

## Bir şeyler ters giderse

- **Evde çalışıyor, dışarıdan çalışmıyor** — modemin internet (WAN) adresi genel IP’nden farklı olabilir (bazı sağlayıcılar bir adresi müşteriler arasında paylaştırır). O zaman yönlendirme çalışamaz; sağlayıcına sor.
- **Hâlâ engelli** — sunucu bilgisayarındaki güvenlik duvarının UDP 15151’e izin verdiğini kontrol et.
- Yardım mı lazım? [GitHub’da sorun bildir](https://github.com/Blockheads-Club/blockheads-server/issues).
