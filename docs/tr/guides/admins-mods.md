# Yöneticiler, moderatörler ve yasaklar

Sunucunda kim ne yapabilir; oyuncuları uygulamadan, konsoldan ya da oyun sohbetinden nasıl yönetirsin.

::: info Nelere ihtiyacın var
- Çalışan bir Blockheads sunucusu
- Yönetmek istediğin oyuncu adları
:::

## 1. Rolleri tanı

Sunucu konsolunun tüm yetkileri vardır. **Yöneticiler** diğer yöneticiler dahil tam denetime sahiptir. **Moderatörler** oyuncuları atabilir ve yasaklayabilir, yöneticileri değiştiremez. Yöneticiler ve moderatörler komutları oyun sohbetine `/` ile başlayarak yazar.

- **Moderatörler:** `/players`, `/kick`, `/ban`, `/unban`, `/whitelist`, `/unwhitelist`, `/clear`
- **Yöneticiler ayrıca:** `/stop`, `/pvp-on`, `/pvp-off`, `/mod`, `/unmod`, `/admin`, `/unadmin`, `/load-lists`
- **Yalnızca sahip:** `/set-password`, `/remove-password`

## 2. Yönetici ve moderatör ekle

Uygulamada **Erişim listeleri** → **Yöneticiler** ya da **Moderatörler**’i aç ve **Yönetici ekle** ya da **Moderatör ekle**’ye dokun. Ya da **Oyuncular** altında bir oyuncuya dokunup **Yönetici yap** ya da **Moderatör yap**’ı seç. Konsolda:

```text
/admin playername
/mod playername
/list-adminlist
```

![Sunucunun “Erişim listeleri” ekranında dört kart: yöneticiler, moderatörler, beyaz liste ve kara liste; her birinde ad alanı ve ekleme düğmesi.](/shots/tr/server/access.webp)

*Yöneticiler, moderatörler, beyaz liste ve kara liste tek yerde.*

## 3. At ve yasakla

Uygulamada bir oyuncuya dokun ve **At…** ya da **Yasakla…**’yı seç. Bir yasak yalnızca adı değil **IP adresini de engelleyebilir**. `/ban` oyuncunun cihazını da yasaklar; `/ban-no-device` yalnızca adı yasaklar.

```text
/kick playername
/ban playername
/unban playername
```

![Sunucunun “Oyuncular” ekranında Sam adlı oyuncunun işlem menüsü açık: yönetici yap, moderatörlüğü kaldır, cihaz kimliğini kopyala, at ve yasakla.](/shots/tr/server/players-menu.webp)

*Rolünü değiştirmek, atmak veya yasaklamak için bir oyuncuya dokun.*

## 4. Beyaz liste kullan

Beyaz liste içine bir isim eklendiği anda açılır. O zaman yalnızca listedeki oyuncular katılabilir ve izni olmayan herkes atılır.

```text
/whitelist playername
/list-whitelist
```

## 5. Liste dosyalarını düzenle

Her dünya, `saves` altındaki klasöründe `adminlist.txt`, `modlist.txt`, `whitelist.txt` ve `blacklist.txt` tutar. Her satıra bir isim; büyük/küçük harf fark etmez ve ilk satır yok sayılır. Elle düzenledikten sonra yeniden yükle:

```text
/load-lists
```

## Bir şeyler ters giderse

- **“Sorry, you do not have permission to issue that command.”** — bu sunucuda moderatör ya da yönetici değilsin.
- Sunucu çalışırken uygulama liste değişikliklerini konsol komutlarıyla uygular.
- Soracağın bir şey mi var? [GitHub’da sorabilirsin](https://github.com/Blockheads-Club/blockheads-server/issues).
