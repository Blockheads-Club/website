# Yayınlama

Herkese açık liste [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods) içinde durur ve
<a href="../../../mods/" target="_self">Modlar sayfasında</a> gösterilir. Modlar çekme isteğiyle eklenir.

## Göndermeden önce

- Bir `LICENSE` dosyası ekle (istediğin lisans olur).
- `.bhmod` dosyasını HTTPS üzerinden herkese açık bir yere koy; örneğin bir GitHub sürüm eki olarak. Birleştirilince yansıtılır.
- Herkese açık liste kurallarıyla kontrol et:

  ```sh
  bhmod check . --index
  bhmod pack .
  ```

## Gönder

1. Modunun ayrıntılarını, indirme URL'sini, SHA-256'sını ve boyutunu içeren tek bir `mods/<ilk harf>/<id>.toml` dosyası ekle.
2. Bir çekme isteği aç. CI girdiyi ve paketi kontrol eder, istediği izinlerle yorum yapar.
3. Bir bakımcı, her **yeni** modun (ve izin ya da yerel kod ekleyen güncellemelerin) kodunu listelenmeden önce okur.

Tüm alanlar ve bir örnek: <a href="../../../mods/submit" target="_self">Mod gönder</a>.

## Güncellemeler

- Girdine yeni bir sürüm ekle; yayınlanmış sürümler asla düzenlenmez ya da silinmez.
- Bozuk bir sürüm `yanked = true` ile işaretlenebilir.
- Girdiyi yalnızca modun `owners` kişileri değiştirebilir.

CI'daki kontrollerin aynısını yerelde çalıştır: [`bhmod index validate`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/index.md).
