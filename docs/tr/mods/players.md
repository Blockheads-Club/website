# Oyuncular için modlar

**Modlar** The Blockheads'e `/balance` ya da `/claim` gibi sohbet komutları, yeni kurallar, mini oyunlar ve ileride
oyunda göreceğin şeyler ekler. Hepsine <a href="../../../mods/" target="_self">Modlar sayfasından</a> göz atabilirsin.

## Sunucu modları: kurman gereken bir şey yok

Çoğu mod **sunucuda** çalışır. Normal oyununla her zamanki gibi katılırsın ve modun eklediği şeyleri kullanırsın;
örneğin komutlarını sohbete yazarak. Hangi modların çalışacağına sunucu sahibi karar verir ve komutları sana söyleyebilir.

## İstemci modlu bir sunucuya katılmak <Badge type="warning" text="yakında" />

Bazı modların **oyunun içinde** çalışan bir parçası da vardır (yeni bir blok, bir mini harita). Böyle bir sunucuya katılırken:

1. Oyunun, sunucunun modlarını ve her birinin neler yapabileceğini listeler.
2. Kabul edersin ya da vazgeçersin.
3. Kabul edersen istemci parçaları doğrudan sunucudan iner ve çalışır. Başka bir şey kurulmaz.

**native** izinli modlar güvenli korumalı alanın dışında çalışır. **Kırmızı uyarıyla** gösterilir, herkese açık
listede tam olarak aynı dosyayla bulunmalıdır ve onaylaman gerekir. Bir sunucu yerel kodu asla sessizce gönderemez.

Mod yükleyici olmadan da tüm modları sunucu tarafında olan sunuculara katılabilirsin. İstemci modu gereken sunucular
seni geri çevirir; oyun, istemcinin çok eski olduğunu söyler.

Mod yükleyici [PC Sürümü](../pc-port) ile ve Android'de [Patcher](../patcher) ile gelecek. İkisinde de henüz yok.

## Kendi istemci modların <Badge type="warning" text="yakında" />

İstemci modlarını (mini harita, koordinatlar, envanter sıralama, kozmetikler) herkese açık listeden ya da bir
dosyadan, PC Sürümü başlatıcısında veya Patcher'da kurabileceksin.

## Güvende kalmak

- Modları <a href="../../../mods/" target="_self">herkese açık listeden</a> al. Her yeni modu listelenmeden önce bir
  bakımcı okur ve her indirme SHA-256 ve boyutuyla karşılaştırılır.
- Kabul etmeden önce izinleri oku. Bir koordinat modunun oyuncuları atmak ya da sitelere bağlanmak için bir nedeni yoktur.
- **native** modlara dikkat et: oyunun yapabildiği her şeyi yapabilirler.
- Modlar asla oyun dosyalarını içermez.
